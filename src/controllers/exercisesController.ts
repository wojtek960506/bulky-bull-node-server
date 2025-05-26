import { Request, Response } from "express";
import {
  removeExerciseById,
  findAllExercises,
  findExerciseByName,
  findExerciseByNamePolish,
  insertExercise,
  insertExercisesBulk,
  removeAllExercises
} from "../models/exercises";
import { dbExerciseToObj } from "../utils/objectConverters";
import { apiRestError } from "../utils/errors";
import { ExercisesToCreate, ExerciseToCreate } from "../types/exerciseTypes";


export async function getExercises(req: Request, res: Response) {
  const { name, namePolish } = req.query;

  if (name) {
    const exercise = await findExerciseByName(name as string);
    if (!exercise) {
      apiRestError(res, 404, `Exercise with name '${name}' not found.`)
      return;
    }
    res.status(200).json(dbExerciseToObj(exercise));
    return;
  }
  if (namePolish) {
    const exercise = await findExerciseByNamePolish(namePolish as string);
    if (!exercise) {
      apiRestError(res, 404, `Exercise with polish name '${namePolish}' not found.`)
      return;
    }
    res.status(200).json(dbExerciseToObj(exercise));
    return;
  }
  
  const exercises = await findAllExercises();
  res.status(200).json(exercises.map(dbExerciseToObj));
}

export async function getExerciseById(req: Request, res: Response) {
  const { exercise } = res.locals.exercise;
  res.status(200).json(exercise);
}

function checkExercise(res: Response, exercise: ExerciseToCreate) {
  const { name, namePolish, isStatic } = exercise;
  if (!name || !namePolish || isStatic === undefined) {
    apiRestError(
      res,
      400,
      "Parameters 'name', 'namePolish' and 'isStatic' are required when creating new exercise"
    );
    return false;
  }
  return true;
}

export async function createExercise(req: Request, res: Response) {
  try {
    const exercise: ExerciseToCreate = req.body;
    
    if (!checkExercise(res, exercise)) return;

    const newExercise = await insertExercise(exercise);
    res.status(201).json(dbExerciseToObj(newExercise));
  } catch (error: any) {
    apiRestError(res, 500, error.message);
    return;
  }
}

export async function createExercisesBulk(req: Request, res: Response) {
  try {
    const exercises: ExercisesToCreate = req.body;

    for (let exercise of exercises) {
      if (!checkExercise(res, exercise)) return;
    }

    const newExercises = await insertExercisesBulk(exercises);
    res.status(201).json(newExercises.map(dbExerciseToObj));
  } catch (error: any) {
    apiRestError(res, 500, error.message);
    return;
  }
}

export async function deleteExercise(req: Request, res: Response) {
  // TODO not allow to delete exercise if it is used in any workout

  const deletedExercise = await removeExerciseById(req.params.id);
  res.status(200).json(deletedExercise);
}

export async function deleteAllExercises(req: Request, res: Response) {
  // TODO remove this function at some point of implementation as it is just for easier manual testing

  const deletedExercises = await removeAllExercises();
  res.status(200).json(deletedExercises);
}