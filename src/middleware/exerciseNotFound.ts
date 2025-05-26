import { Request, Response, NextFunction } from 'express';
import { apiRestError } from '../utils/errors';
import { getExerciseById } from '../controllers/exercisesController';
import { findExerciseById } from '../models/exercises';

export async function exerciseNotFound(req: Request, res: Response, next: NextFunction) {
  const { exerciseId } = req.params;
  const exercise = await findExerciseById(exerciseId);
  if (!exercise) {
    apiRestError(res, 404, `Workout with id: '${exerciseId}' not found`);
    return;
  }
  res.locals.workout = exercise;
  next();
}
