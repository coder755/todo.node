import { Request, Response, NextFunction } from 'express';
import { decodeProtectedHeader, jwtVerify } from 'jose';
import { getJwtFromAuthHeader } from './header/authHeader';
import JwkCache from '../../models/auth/JwkCache';

// make env var later
const authority = 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_Bjw6HeTgZ';
const cache = new JwkCache(authority);

export const userAuthVerification = async (
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
