import { Request, Response, NextFunction } from 'express';
import { apiRestError } from '../utils/errors';
import { Types } from 'mongoose';

export async function workoutNotBelongToUser(req: Request, res: Response, next: NextFunction) {
  const { id, workoutId } = req.params;
  const { user } = res.locals;
  if (!user.workouts.some((w: { _id: Types.ObjectId } ) => w._id.equals(workoutId))) {
    apiRestError(res, 403, `Workout with id: '${workoutId}' does not belong to user with id: '${id}'`)
    return;
  }  
  next();
}


