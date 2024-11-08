import { Request } from 'express';
import { decodeJwt } from 'jose';
import UnauthorizedError from '../../../models/error/UnauthorizedError';

const bearerPrefix = 'Bearer ';

export const getJwtFromAuthHeader = (req: Request) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith(bearerPrefix)) {
    return authHeader.substring(bearerPrefix.length);
  }

  throw new UnauthorizedError();
};

export const getUserId = (req: Request) => {
  const token = getJwtFromAuthHeader(req);
  const { sub } = decodeJwt(token);
  if (!sub) {
    throw new UnauthorizedError();
  }
  return sub;
};

export const NO_OP = () => {};
