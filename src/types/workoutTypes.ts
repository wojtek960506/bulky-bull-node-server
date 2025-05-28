import { Locals } from "express";
import { HydratedDocument, Types } from "mongoose";
import { ExerciseDocument } from "../models/exercises";
import { ExerciseObj } from "./exerciseTypes";

// TODO try to omit id creation for sets in model
export type NotStaticSet = { thoughts: string, reps: number, weightKg: number }
export type StaticSet = { thoughts: string, timeSec: number }
export type IWorkoutSet = NotStaticSet | StaticSet;

export type IWorkoutExercise = {
  exercise: Types.ObjectId | ExerciseDocument | null,
  comment?: string,
  sets: IWorkoutSet[],
};

export type WorkoutExerciseObj = Omit<IWorkoutExercise, 'exercise'> & {
  exercise: Types.ObjectId | ExerciseObj | null,
}

export interface IWorkout {
  date: string,
  timeStart?: string,
  timeEnd?: string,
  exercises: IWorkoutExercise[],
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