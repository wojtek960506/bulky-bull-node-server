import { Request, Response, NextFunction } from 'express';
import { apiRestError } from '../utils/errors';
import { getWorkoutById } from '../models/workouts';

export async function workoutNotFound(req: Request, res: Response, next: NextFunction) {
  const { workoutId } = req.params;
  const workout = await getWorkoutById(req.params.workoutId);
  if (!workout) {
    apiRestError(res, 404, `Workout with id: '${workoutId}' not found`);
    return;
  }
  res.locals.workout = workout;
  next();
}