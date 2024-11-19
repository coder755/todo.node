import { Request, Response, NextFunction } from 'express';
import {
  decodeProtectedHeader, generateSecret, jwtVerify, KeyLike, SignJWT,
} from 'jose';
import { getJwtFromAuthHeader } from './header/authHeader';
import JwkCache from '../../models/auth/JwkCache';
import UnauthorizedError from '../../models/error/UnauthorizedError';

// For use with AWS Cognito
const authority = 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_Bjw6HeTgZ';
const cache = new JwkCache(authority);

// For quick demo useage
const ALGORITHM = 'HS256';
let SECRET: KeyLike | Uint8Array;

/**
 * Quick and dirty create a key and use it to sign and validate JWTs
 */
export const createSecret = async () => {
  SECRET = await generateSecret(ALGORITHM);
};

export const createUserToken = async (userId: string) => {
  const payload = {
    sub: userId,
  };

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(SECRET);

  return jwt;
};

/**
 * Quick and dirty JWT verification
 */
const verifyJWT = async (jwt: string) => {
  try {
    await jwtVerify(jwt, SECRET);
  } catch (err) {
    console.error('Verification Failed:', err);
    throw new UnauthorizedError();
  }
};

export const userAuthVerification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jwt = getJwtFromAuthHeader(req);
    await verifyJWT(jwt);
    next();
  } catch (e) {
    res.status(401).send();
  }
};

/**
 * More robust authorization. For use with AWS Cognito
 */
export const cognitoUserAuthVerification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jwt = getJwtFromAuthHeader(req);
    const { kid } = decodeProtectedHeader(jwt);
    if (kid) {
      const key = await cache.getJwk(kid);
      jwtVerify(jwt, key);
      next();
    } else {
      res.status(401).send();
    }
  } catch (e) {
    res.status(401).send();
  }
};

export const NO_OP = () => {};
