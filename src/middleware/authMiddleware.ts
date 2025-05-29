import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { apiRestError } from '../utils/errors';
import { config } from '../config/config';
import { Types } from 'mongoose';

export interface AuthenticatedRequest <
  Params = Record<string, any>,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Record<string, any>
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
  userId: Types.ObjectId
}

export interface JwtPayload {
  userId: Types.ObjectId
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authenticationHeader = req.headers['authentication'] as string | undefined;
  if (!authenticationHeader?.startsWith('Bearer ')) {
    apiRestError(res, 401, 'Wrong format of authentication header');
    return;
  }

  const authToken = authenticationHeader.split(' ')[1];
  try {
    const payload = jwt.verify(authToken, config.JWT_SECRET) as JwtPayload;
    (req as AuthenticatedRequest).userId = payload.userId;
    next();
  } catch (err: any) {
    apiRestError(res, 403, 'Not authorized access');
  }
}