import { Types } from "mongoose";
import { ExerciseDocument } from "../models/exercises";
import { ExerciseObj } from "../types/exerciseTypes";
import { WorkoutDocument, WorkoutExercise } from "../types/workoutTypes";

export const dbUserToObj = (u: any) => ({
  id: u._id,
  firstName: u.firstName,
  lastName: u.lastName,
  weight: u.weight,
  height: u.height,
  age: u.age,
});


// TODO add function `dbExerciseSetToObj`

function isExercisePopulated(
  ex: Types.ObjectId | ExerciseDocument | null
): ex is ExerciseDocument {
  return typeof ex === 'object' && ex !== null && 'name' in ex;
}

// TODO: update it according to updates in Workout model
export const dbWorkoutToObj = (w: WorkoutDocument) => ({
  id: w._id,
  date: w.date,
  userId: w.user,
  exercises: w.exercises.map((we: WorkoutExercise) => ({
    comment: we.comment,
    sets: we.sets,
    exercise: isExercisePopulated(we.exercise)
      ? dbExerciseToObj(we.exercise)
      : we.exercise
  }))
});

export const dbUserWithWorkoutsToObj = (u: any) => ({
  ...dbUserToObj(u),
  workouts: u.workouts.map(dbWorkoutToObj),
});

export const dbExerciseToObj = (e: ExerciseDocument): ExerciseObj => ({
  id: e._id,
  name: e.name,
  namePolish: e.namePolish,
  description: e.description,
  isStatic: e.isStatic,
});
