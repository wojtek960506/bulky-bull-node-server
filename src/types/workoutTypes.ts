import { Locals } from "express";
import { HydratedDocument, Types } from "mongoose";
import { ExerciseDocument } from "../models/exercises";
import { ExerciseObj } from "./exerciseTypes";

// TODO try to omit id creation for sets in model
type NotStaticSet = { thoughts: string, _id?: Types.ObjectId, reps: number, weightKg: number }
export type StaticSet = { thoughts: string, _id?: Types.ObjectId, timeSec: number }

export type WorkoutSet = NotStaticSet | StaticSet;

export type WorkoutSetObj = Omit<StaticSet, '_id'> | Omit<NotStaticSet, '_id'>

export type WorkoutExercise = {
  exercise: Types.ObjectId | ExerciseDocument | null,
  comment?: string,
  sets: WorkoutSet[],
};

export type WorkoutExerciseObj = Omit<WorkoutExercise, 'exercise' | 'sets'> & {
  exercise: Types.ObjectId | ExerciseObj | null,
  sets: WorkoutSetObj[]
}

export interface IWorkout {
  date: string,
  timeStart?: string,
  timeEnd?: string,
  exercises: WorkoutExercise[],
  userId: Types.ObjectId
}

export type WorkoutDocument = HydratedDocument<IWorkout>;

export interface WorkoutResLocals extends Locals {
  workout: WorkoutDocument;
}

export type WorkoutObj = Omit<IWorkout, 'exercises'> & {
  exercises: WorkoutExerciseObj[],
  id: Types.ObjectId
}