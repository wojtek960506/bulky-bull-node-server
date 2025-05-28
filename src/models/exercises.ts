import mongoose, { DeleteResult, HydratedDocument, UpdateQuery } from "mongoose";
import { BulkExercises, IExercise } from "../types/exerciseTypes";

export type ExerciseDocument = HydratedDocument<IExercise>;

const exerciseSchema = new mongoose.Schema<IExercise>({
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

export const Exercise = mongoose.model<IExercise>('Exercise', exerciseSchema);

export async function findAllExercises(): Promise<ExerciseDocument[]> {
  return await Exercise.find({});
}

export async function findExerciseById(id: string): Promise<ExerciseDocument | null> {
  return await Exercise.findById(id);
}

export async function findExerciseByName(name: string): Promise<ExerciseDocument| null> {
  return await Exercise.findOne({ name: new RegExp(name, 'i') });
}

export async function findExerciseByNamePolish(namePolish: string): Promise<ExerciseDocument | null> {
  return await Exercise.findOne({ namePolish: new RegExp(namePolish, 'i') });
}

export async function insertExercise(exercise: IExercise): Promise<ExerciseDocument> {
  return await Exercise.create(exercise);
}

export async function insertExercisesBulk(exercises: BulkExercises): Promise<ExerciseDocument[]> {
  return await Exercise.insertMany(exercises, { ordered: true });
}

export async function updateExerciseById(id: string, updates: UpdateQuery<IExercise>): Promise<ExerciseDocument | null> {
  return await Exercise.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
}

export async function removeExerciseById(id: string): Promise<ExerciseDocument | null> {
  return await Exercise.findByIdAndDelete(id);
}

export async function removeAllExercises(): Promise<DeleteResult> {
  return await Exercise.deleteMany({});
}
