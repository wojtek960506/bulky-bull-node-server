import { Types } from "mongoose";
import { ExerciseDocument } from "../models/exercises";
import { ExerciseObj } from "../types/exerciseTypes";
import { WorkoutDocument, IWorkoutExercise, WorkoutObj } from "../types/workoutTypes";
import { UserDocument, UserObj } from "../types/userTypes";

export const dbUserToObj = (u: UserDocument): UserObj => ({
  id: u._id,
  firstName: u.firstName,
  lastName: u.lastName,
  email: u.email,
  weight: u.weight,
  height: u.height,
  age: u.age,
  workouts: u.workouts
});

const isExercisePopulated = (
  ex: Types.ObjectId | ExerciseDocument | null
): ex is ExerciseDocument => (typeof ex === 'object' && ex !== null && 'name' in ex);

export const dbWorkoutToObj = (w: WorkoutDocument): WorkoutObj => ({
  id: w._id,
  date: w.date,
  userId: w.userId,
  exercises: w.exercises.map((we: IWorkoutExercise) => ({
    comment: we.comment,
    sets: we.sets,
    exercise: isExercisePopulated(we.exercise)
      ? dbExerciseToObj(we.exercise)
      : we.exercise
  }))
});

export const dbUserWithWorkoutsToObj = (u: any) => ({
  ...dbUserToObj(u),
  workouts: u.workouts,
});

export const dbExerciseToObj = (e: ExerciseDocument): ExerciseObj => ({
  id: e._id,
  name: e.name,
  namePolish: e.namePolish,
  description: e.description,
  isStatic: e.isStatic,
});
