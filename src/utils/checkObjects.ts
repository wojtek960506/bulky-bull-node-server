import { Response } from "express";
import { IExercise } from "../types/exerciseTypes";
import { apiRestError } from "./errors";

export function checkExercise(res: Response, exercise: IExercise) {
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