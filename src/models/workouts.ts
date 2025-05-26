import mongoose from "mongoose";
import { WorkoutToCreate } from "../types/workoutTypes";

const workoutSchema = new mongoose.Schema({
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
        // required: true
      }
    }],
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});


// exercises: [{
//   exercise: 'id_bench_press',
//   sets: [{
//     reps: 5,
//     weightKg: 20
//   }]

// }, {
//   exercise: 'id_hand_stand',
//   sets: [{
//     timeSec: 10
//   }, {
//     timeSec: 15
//   }]
// }]


export const Workout = mongoose.model('Workout', workoutSchema);

export async function getAllWorkoutsByUser(userId: string) {
  return await Workout.find({ user: userId });
}

export async function getWorkoutById(id: string) {
  return await Workout.findById(id);
}

export async function insertWorkout(workout: WorkoutToCreate) {
  return await Workout.create(workout);
}

export async function removeWorkout(id: string) {
  return await Workout.deleteOne({ _id: id });
}

export async function removeAllWorkoutsByUser(userId: string) {
  return await Workout.deleteMany({ user: userId })
};

export async function removeWorkouts(workoutsIds: string[]) {
  return await Workout.deleteMany({ _id: { $in: workoutsIds }});
}

export async function removeAllWorkouts() {
  return await Workout.deleteMany({});
}
