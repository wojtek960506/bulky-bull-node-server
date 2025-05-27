import { Locals } from "express";
import { HydratedDocument, Types } from "mongoose";
import { IExercise } from "./exerciseTypes";
import { ExerciseDocument } from "../models/exercises";

export type WorkoutSet = { thoughts: string } & ({
  reps: Number,
  weightKg: Number,
} | {
  timeSec: Number,
});

export type WorkoutExercise = {
  exercise: Types.ObjectId | ExerciseDocument | null,
  comment?: string,
  sets: WorkoutSet[],
};

export interface IWorkout {
  date: string,
  timeStart?: string,
  timeEnd?: string,
  exercises: WorkoutExercise[],
  user: Types.ObjectId
}

export type WorkoutDocument = HydratedDocument<IWorkout>;

export interface WorkoutResLocals extends Locals {
  workout: WorkoutDocument;
}