import { 
 } from "../models/users";
import { Request, Response } from "express";
import {
  getAllWorkoutsByUser,
  getWorkoutById,
  insertWorkout,
  removeAllWorkoutsByUser,
  removeWorkout,
} from "../models/workouts";
import {
  dbWorkoutToObj
} from "../utils/objectConverters";
import { apiRestError } from "../utils/errors";
import { DeleteResult } from "mongoose";
import { IWorkout, WorkoutResLocals } from "../types/workoutTypes";


export async function getUserWorkouts(req: Request, res: Response) {
  const { id } = req.params;
  const workouts = await getAllWorkoutsByUser(id);
  res.status(200).json(workouts.map(dbWorkoutToObj));
}

export async function getUserWorkout(
  req: Request,
  res: Response<unknown, WorkoutResLocals>
): Promise<void> {
  const { workout } = res.locals;
  res.status(200).json(dbWorkoutToObj(workout));
}

export async function createWorkout(req: Request<{}, {}, IWorkout>, res: Response): Promise<void> {
  const { user } = res.locals;
  const workoutBody = req.body;

  try {
    workoutBody.userId = user._id;
    const newWorkout = await insertWorkout(workoutBody);
    if (!newWorkout) {
      apiRestError(res, 400, `Workout for user with id: '${user._id}' was not created`);
      return;
    }
    user.workouts.push(newWorkout._id);
    await user.save();
    const newWorkoutPopulated = await getWorkoutById(newWorkout._id.toString()) 
    res.status(201).json(dbWorkoutToObj(newWorkoutPopulated!));
  } catch (error: any) {
    console.log(error);
    apiRestError(res, 500, error.message);
    return;
  }
}

export async function deleteUserWorkout(req: Request, res: Response): Promise<void> {
  const deletedWorkout: DeleteResult = await removeWorkout(req.params.workoutId);
  res.status(200).json(deletedWorkout);
}

export async function deleteUserWorkouts(req: Request, res: Response): Promise<void> {
  const deletedWorkouts: DeleteResult = await removeAllWorkoutsByUser(req.params.id);
  res.status(200).json(deletedWorkouts);
}
