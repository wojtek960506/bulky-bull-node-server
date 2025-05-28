import { 
  getAllUsers,
  getByFullName,
  removeUser,
  removeAllUsers,
  insertUser,
 } from "../models/users";
import { Request, Response } from "express";
import {
  removeAllWorkouts,
  removeWorkouts,
} from "../models/workouts";
import {
  dbUserToObj,
  dbUserWithWorkoutsToObj,
} from "../utils/objectConverters";
import { DeleteResult } from "mongoose";
import { IUser, UserResLocals } from "../types/userTypes";
import { apiRestError } from "../utils/errors";


export async function getUsers(req: Request, res: Response): Promise<void> {
  const users = await getAllUsers();
  res.status(200).json(users.map(dbUserToObj));
}

export async function getUsersByFullName(req: Request, res: Response): Promise<void> {
  const { firstName, lastName } = req.params;
  const users = await getByFullName(firstName, lastName);
  res.status(200).json(users.map(dbUserToObj));
}

export async function getUser(req: Request, res: Response<unknown, UserResLocals>): Promise<void> {
  const { user } = res.locals;
  res.status(200).json(dbUserWithWorkoutsToObj(user))
}

export async function createUser(req: Request<{}, {}, IUser>, res: Response): Promise<void> {
  const user = req.body;

  try {
    const newUser = await insertUser(user);
    res.status(201).json(dbUserToObj(newUser));
  } catch (error: any) {
    apiRestError(res, 500, error.message);
    return;
  }
}

export async function deleteAllUsers(req: Request, res: Response): Promise<void> {
  const deletedWorkouts = await removeAllWorkouts();
  const deletedUsers = await removeAllUsers();
  res.status(200).json({ deletedUsers, deletedWorkouts });
}


export async function deleteUser(req: Request, res: Response<unknown, UserResLocals>): Promise<void> {
  const { user } = res.locals;

  const workoutsIds: string[] = user.workouts.map(w => w.id.toString());
  const deletedWorkouts: DeleteResult = await removeWorkouts(workoutsIds);
  const deletedUser: DeleteResult = await removeUser(user.id)
  
  res.status(200).json({ deletedUser, deletedWorkouts });
}
