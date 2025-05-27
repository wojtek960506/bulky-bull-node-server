import { ExerciseDocument } from "../models/exercises";
import { ExerciseObj } from "../types/exerciseTypes";

export const dbUserToObj = (u: any) => ({
  id: u._id,
  firstName: u.firstName,
  lastName: u.lastName,
  weight: u.weight,
  height: u.height,
  age: u.age,
});

// TODO: update it according to updates in Workout model
export const dbWorkoutToObj = (w: any) => ({
  id: w._id,
  date: w.date,
  userId: w.user,
  exercises: w.exercises
});

export const dbUserWithWorkoutsToObj = (u: any) => ({
  ...dbUserToObj(u),
  workouts: u.workouts.map(dbWorkoutToObj),
});

export const dbExerciseToObj = (e: ExerciseDocument): ExerciseObj => ({
  id: e._id.toString(),
  name: e.name,
  namePolish: e.namePolish,
  description: e.description,
  isStatic: e.isStatic,
});
