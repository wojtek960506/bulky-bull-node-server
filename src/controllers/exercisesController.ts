import { Request, Response } from "express";
import {
  removeExerciseById,
  findAllExercises,
  findExerciseByName,
  findExerciseByNamePolish,
  insertExercise,
  insertExercisesBulk,
  removeAllExercises,
  ExerciseDocument,
  updateExerciseById
} from "../models/exercises";
import { dbExerciseToObj } from "../utils/objectConverters";
import { apiRestError } from "../utils/errors";
import { ExerciseResLocals, BulkExercises, IExercise } from "../types/exerciseTypes";
import { checkExercise } from "../utils/checkObjects";
import { DeleteResult, UpdateQuery } from "mongoose";


export async function getExercises(
  req: Request<{}, any, any, { name?: string, namePolish?: string}>,
  res: Response
): Promise<void> {
  const { name , namePolish } = req.query;

  if (name) {
    const exercise: ExerciseDocument | null = await findExerciseByName(name as string);
    if (!exercise) {
      apiRestError(res, 404, `Exercise with name '${name}' not found.`)
      return;
    }
    res.status(200).json(dbExerciseToObj(exercise));
    return;
  }
  if (namePolish) {
    const exercise: ExerciseDocument | null = await findExerciseByNamePolish(namePolish as string);
    if (!exercise) {
      apiRestError(res, 404, `Exercise with polish name '${namePolish}' not found.`)
      return;
    }
    res.status(200).json(dbExerciseToObj(exercise));
    return;
  }
  
  const exercises: ExerciseDocument[] = await findAllExercises();
  res.status(200).json(exercises.map(dbExerciseToObj));
}

export async function getExerciseById(req: Request, res: Response<unknown, ExerciseResLocals>) {
  const { exercise } = res.locals;
  res.status(200).json(dbExerciseToObj(exercise));
}

export async function createExercise(req: Request<{}, {}, IExercise>, res: Response) {
  try {
    const exercise: IExercise = req.body;
    
    if (!checkExercise(res, exercise)) return;

    const newExercise: ExerciseDocument = await insertExercise(exercise);
    res.status(201).json(dbExerciseToObj(newExercise));
  } catch (error: any) {
    apiRestError(res, 500, error.message);
    return;
  }
}

export async function handleUpdateExercise(
  req: Request<{ id: string }, {}, UpdateQuery<IExercise>>,
  res: Response
): Promise<void> {
  const { id } = req.params;
  const updates = req.body;

  const updatedExercise = await updateExerciseById(id, updates);
  if (!updatedExercise) {
    apiRestError(res, 404, `Exercise with id: '${id}' was not found for update`)
    return;
  }
  res.status(200).json(dbExerciseToObj(updatedExercise));
}

export async function createExercisesBulk(req: Request<{}, {}, BulkExercises>, res: Response) {
  try {
    const exercises: BulkExercises = req.body;

    for (let exercise of exercises) {
      if (!checkExercise(res, exercise)) return;
    }

    const newExercises: ExerciseDocument[] = await insertExercisesBulk(exercises);
    res.status(201).json(newExercises.map(dbExerciseToObj));
  } catch (error: any) {
    apiRestError(res, 500, error.message);
    return;
  }
}

export async function deleteExercise(req: Request, res: Response) {
  // TODO not allow to delete exercise if it is used in any workout
  const { id } = req.params;
  const deletedExercise: ExerciseDocument | null = await removeExerciseById(id);
  if (!deletedExercise) {
    apiRestError(res, 404, `Exercise with id: '${id}' not found`);
    return;
  }
  res.status(200).json(dbExerciseToObj(deletedExercise));
}

export async function deleteAllExercises(req: Request, res: Response) {
  // TODO remove this function at some point of implementation as it is just for easier manual testing

  const deletedExercises: DeleteResult = await removeAllExercises();
  res.status(200).json(deletedExercises);
}