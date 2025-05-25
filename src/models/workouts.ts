import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  date: String,
  reps: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

export const Workout = mongoose.model('Workout', workoutSchema);

export async function getAllWorkoutsByUser(userId: string) {
  return await Workout.find({ user: userId });
}

export async function getWorkoutById(id: string) {
  return await Workout.findById(id);
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
