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