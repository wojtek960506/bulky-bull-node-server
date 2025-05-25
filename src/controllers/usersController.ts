import { 
  getAllUsers,
  getByFullName,
  getUserById,
  removeUser,
 } from "../models/users";
import { Request, Response } from "express";
import { getAllWorkoutsByUser, getWorkoutById } from "../models/workouts";
import { apiRestError } from "../utils/errors";
import {
  dbUserToObj,
  dbUserWithWorkoutsToObj,
  dbWorkoutToObj
} from "../utils/objectConverters";
import { Types } from "mongoose";


export async function getUsers(req: Request, res: Response) {
  const users = await getAllUsers();
  res.status(200).json(users.map(dbUserToObj));
}

export async function getUsersByFullName(req: Request, res: Response) {
  const users = await getByFullName(
    req.params.firstName.toLowerCase(),
    req.params.lastName.toLowerCase()
  );
  res.status(200).json(users.map(dbUserToObj));
}

export async function getUser(req: Request, res: Response) {
  const { user } = res.locals;
  res.status(200).json(dbUserWithWorkoutsToObj(user))
}

export async function getUserWorkouts(req: Request, res: Response) {
  const { id } = req.params;
  const workouts = await getAllWorkoutsByUser(id);
  res.status(200).json(workouts.map(dbWorkoutToObj));
}

export async function getUserWorkout(req: Request, res: Response) {
  const { id, workoutId } = req.params;
  const { user } = res.locals;

  if (!user.workouts.some((w: { _id: Types.ObjectId } ) => w._id.equals(workoutId))) {
    apiRestError(res, 403, `Workout with id: '${workoutId}' does not belong to user with id: '${id}'`)
    return;
  }

  const workout = await getWorkoutById(req.params.workoutId);

  if (!workout) {
    apiRestError(res, 404, `Workout with id: '${workoutId}' not found`);
    return;
  }

  res.status(200).json(dbWorkoutToObj(workout));
}

export async function deleteUserWorkouts(req: Request, res: Response) {

}


export async function deleteUser(req: Request, res: Response) {
  const deletedUser = await removeUser(req.params.id)
  console.log('deletedUser:', deletedUser);
}
