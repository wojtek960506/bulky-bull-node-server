import { Locals } from 'express';
import { Types } from 'mongoose';
import { ExerciseDocument } from '../models/exercises';

export type IExercise = {
  name: string,
  namePolish: string,
  description?: string,
  isStatic: boolean
}

export type BulkExercises = IExercise[];

export type ExerciseWithId = BulkExercises & { id: string };

export interface ExerciseResLocals extends Locals {
  exercise: ExerciseDocument;
}

export type ExerciseObj = IExercise & {
  id: Types.ObjectId,
}