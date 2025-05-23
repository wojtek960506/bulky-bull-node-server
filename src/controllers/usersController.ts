import mongoose from "mongoose";
import { getAll, getByFullName, userSchema } from "../models/users";
import { Request, Response } from "express";


export async function listUsers(req: Request, res: Response) {
  console.log('listAllUsers');
  const users = await getAll();
  res.status(200).json(users.map(dbUserToObj));

  // const oneUser = await User.findOne({ name: 'Woj'}).populate('workouts');
  // res.status(200).json(oneUser);

  // const workout1 = await Workout.findOne({ reps: 5}).populate('user_cde');
  // const workout2 = await Workout.findOne({ reps: 55}).populate('user_cde');
  
}

export async function getUserByFullName(req: Request, res: Response) {
  const users = await getByFullName(
    req.params.firstName.toLowerCase(),
    req.params.lastName.toLowerCase()
  );
  res.status(200).json(users.map(dbUserToObj));
}

const dbUserToObj = (u: any) => (
  {
    id: u._id,
    firstName: u.firstName,
    lastName: u.lastName,
    weight: u.weight,
    height: u.height,
    age: u.age,
    workouts: u.workouts.map((w: any) => ({ id: w._id }))
  }
);