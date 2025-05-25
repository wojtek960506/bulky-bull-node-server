import { 
  getAllUsers,
  getByFullName,
  getUserById,
  removeUser,
 } from "../models/users";
import { Request, Response } from "express";
import { dbWorkoutToObj } from "./workoutsController";


export async function listUsers(req: Request, res: Response) {
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
  const user = await getUserById(req.params.id);
  res.status(200).json(dbUserWithWorkoutsToObj(user))
}

export async function deleteUser(req: Request, res: Response) {
  const deletedUser = await removeUser(req.params.id)
  console.log('deletedUser:', deletedUser);
}

const dbUserToObj = (u: any) => ({
  id: u._id,
  firstName: u.firstName,
  lastName: u.lastName,
  weight: u.weight,
  height: u.height,
  age: u.age,
  workouts: u.workouts.map((w: any) => ({ id: w._id }))
});

const dbUserWithWorkoutsToObj = (u: any) => ({
  ...dbUserToObj(u),
  workouts: u.workouts.map(dbWorkoutToObj),
});