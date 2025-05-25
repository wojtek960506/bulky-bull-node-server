import { Request, Response, NextFunction } from 'express';
import { getUserById } from '../models/users';
import { apiRestError } from '../utils/errors';

export async function userNotFound(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const user = await getUserById(id);
  if (!user) {
    apiRestError(res, 404, `User with id: '${id}' not found`);
    return;
  }
  res.locals.user = user;
  next();
}