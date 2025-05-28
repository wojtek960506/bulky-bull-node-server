import mongoose, { DeleteResult } from "mongoose";
import { IWorkout, WorkoutDocument } from "../types/workoutTypes";
import { Types } from "mongoose";

const workoutSchema = new mongoose.Schema<IWorkout>({
  date: {
    type: String,
    required: true
  },
  timeStart: String,
  timeEnd: String,
  exercises: { 
    type: [{
      exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true
      },
      comment: String,
      sets: {
        type: [{
          reps: Number,
          weightKg: Number,
          timeSec: Number,
          thoughts: String
        }],
      }
    }],
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
