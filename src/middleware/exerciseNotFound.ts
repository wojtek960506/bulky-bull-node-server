import { Request, Response, NextFunction } from 'express';
import { apiRestError } from '../utils/errors';
import { ExerciseDocument, findExerciseById } from '../models/exercises';
import { ExerciseResLocals } from '../types/exerciseTypes';

export async function exerciseNotFound(
  req: Request,
  res: Response<unknown, ExerciseResLocals>,
  next: NextFunction
) {
  const {id } = req.params;
  const exercise: ExerciseDocument | null = await findExerciseById(id);
  if (!exercise) {
    apiRestError(res, 404, `Exercise with id: '${id}' not found`);
    return;
  }
  
  res.locals.exercise = exercise;
  next();
}
