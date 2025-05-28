import { 
  getAllUsers,
  getByFullName,
  removeUser,
  removeAllUsers,
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

export async function deleteAllUsers(req: Request, res: Response) {
  const deletedWorkouts = await removeAllWorkouts();
  const deletedUsers = await removeAllUsers();
  res.status(200).json({ deletedUsers, deletedWorkouts });
}


export async function deleteUser(req: Request, res: Response): Promise<void> {
  const { user } = res.locals;

  const workoutsIds: string[] = user.workouts.map((w: { id: string }) => w.id);
  const deletedWorkouts: DeleteResult = await removeWorkouts(workoutsIds);
  const deletedUser: DeleteResult = await removeUser(user.id)
  
  res.status(200).json({ deletedUser, deletedWorkouts });
}
