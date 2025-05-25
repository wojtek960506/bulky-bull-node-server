import { 
  getAllUsers,
  getByFullName,
  removeUser,
  removeAllUsers,
 } from "../models/users";
import { Request, Response } from "express";
import {
  getAllWorkoutsByUser,
  removeAllWorkouts,
  removeAllWorkoutsByUser,
  removeWorkout,
  removeWorkouts
} from "../models/workouts";
import {
  dbUserToObj,
  dbUserWithWorkoutsToObj,
  dbWorkoutToObj
} from "../utils/objectConverters";


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

export async function getUserWorkouts(req: Request, res: Response) {
  const { id } = req.params;
  const workouts = await getAllWorkoutsByUser(id);
  res.status(200).json(workouts.map(dbWorkoutToObj));
}

export async function getUserWorkout(req: Request, res: Response) {
  const { workout } = res.locals;
  res.status(200).json(dbWorkoutToObj(workout));
}

export async function deleteUserWorkout(req: Request, res: Response) {
  const deletedWorkout = await removeWorkout(req.params.workoutId);
  res.status(200).json(deletedWorkout);
}

export async function deleteUserWorkouts(req: Request, res: Response) {
  const deletedWorkouts = await removeAllWorkoutsByUser(req.params.id);
  res.status(200).json(deletedWorkouts);
}

export async function deleteUser(req: Request, res: Response) {
  const { user } = res.locals;

  const workoutsIds: string[] = user.workouts.map((w: { id: string }) => w.id);
  const deletedWorkouts = await removeWorkouts(workoutsIds);
  const deletedUser = await removeUser(user.id)
  
  res.status(200).json({ deletedUser, deletedWorkouts });
}
