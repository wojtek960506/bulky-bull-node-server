import { Request, Response, NextFunction } from 'express';
import { apiRestError } from '../utils/errors';
import { getWorkoutById } from '../models/workouts';
import { WorkoutDocument, WorkoutResLocals } from '../types/workoutTypes';

export async function workoutNotFound(
  req: Request,
  res: Response<unknown, WorkoutResLocals>,
  next: NextFunction
) {
  const { workoutId } = req.params;
  const workout = await getWorkoutById(workoutId);
  if (!workout) {
    apiRestError(res, 404, `Workout with id: '${workoutId}' not found`);
    return;
  }
  res.locals.workout = workout;
  next();
}