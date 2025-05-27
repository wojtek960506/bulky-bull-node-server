import { Locals } from 'express';
import { Types } from 'mongoose';
import { ExerciseDocument } from '../models/exercises';

export interface IExercise {
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

export interface ExerciseObj {
  id: string,
  name: string,
  namePolish: string,
  description?: string,
  isStatic: boolean
}