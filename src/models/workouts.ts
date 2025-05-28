import mongoose, { DeleteResult } from "mongoose";
import { IWorkout, IWorkoutExercise, IWorkoutSet, WorkoutDocument } from "../types/workoutTypes";
import { Schema, Types } from "mongoose";


const workoutSetSchema = new Schema<IWorkoutSet>({
  reps: Number,
  weightKg: Number,
  timeSec: Number,
  thoughts: String
}, { _id: false });

const workoutExerciseSchema = new Schema<IWorkoutExercise>({
  exercise: {
    type: Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true
  },
  comment: String,
  sets: {
    type: [workoutSetSchema],
    required: true
  }
}, { _id: false });

const workoutSchema = new Schema<IWorkout>({
  date: {
    type: String,
    required: true
  },
  timeStart: String,
  timeEnd: String,
  exercises: { 
    type: [workoutExerciseSchema],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);

export async function getAllWorkoutsByUser(userId: string): Promise<WorkoutDocument[]> {
  return await Workout.find({ userId: userId }).populate('exercises.exercise');
}

export async function getWorkoutById(id: string | Types.ObjectId) : Promise<WorkoutDocument | null> {
  return await Workout.findById(id).populate('exercises.exercise');
}

export async function insertWorkout(workout: IWorkout): Promise<WorkoutDocument> {
  return await Workout.create(workout);
}

export async function removeWorkout(id: string): Promise<DeleteResult> {
  return await Workout.deleteOne({ _id: id });
}

export async function removeAllWorkoutsByUser(userId: string): Promise<DeleteResult> {
  return await Workout.deleteMany({ userId: userId })
};

export async function removeWorkouts(workoutsIds: string[]): Promise<DeleteResult> {
  return await Workout.deleteMany({ _id: { $in: workoutsIds }});
}

export async function removeAllWorkouts(): Promise<DeleteResult> {
  return await Workout.deleteMany({});
}
