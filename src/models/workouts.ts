import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  date: String,
  reps: Number,
  user_cde: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

export const Workout = mongoose.model('Workout', workoutSchema);

export async function getAllWorkouts() {
  return await Workout.find();
}

export async function getAllWorkoutsByUser(userId: string) {
  return await Workout.find({ user_cde: userId });
}

export async function getById(id: string) {
  return await Workout.findById(id);
}

export async function removeWorkout(id: string) {
  return await Workout.deleteOne({ _id: id });
}

export async function removeAllWorkoutsByUser(userId: string) {
  return await Workout.deleteMany({ user_cde: userId })
};
