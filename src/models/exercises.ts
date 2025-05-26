import mongoose from "mongoose";
import { ExercisesToCreate, ExerciseToCreate } from "../types/exerciseTypes";

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  namePolish: {
    type: String,
    unique: true,
    required: true,
  },
  description: String,
  isStatic: {
    type: Boolean,
    required: true,
  }
});

export const Exercise = mongoose.model('Exercise', exerciseSchema);

export async function findAllExercises() {
  return await Exercise.find({});
}

export async function findExerciseById(id: string) {
  return await Exercise.findOne({id})
}

export async function findExerciseByName(name: string) {
  return await Exercise.findOne({ name: new RegExp(name, 'i') });
}

export async function findExerciseByNamePolish(namePolish: string) {
  return await Exercise.findOne({ namePolish: new RegExp(namePolish, 'i') });
}

export async function insertExercise(exercise: ExerciseToCreate) {
  return await Exercise.create(exercise);
}

export async function insertExercisesBulk(exercises: ExercisesToCreate) {
  return await Exercise.insertMany(exercises, { ordered: true });
}

export async function removeExerciseById(id: string) {
  return await Exercise.findByIdAndDelete(id);
}

export async function removeAllExercises() {
  return await Exercise.deleteMany({});
}
