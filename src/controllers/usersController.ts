import { getAll, getOne, User } from "../models/users";
import { Request, Response } from "express";
import { Workout } from "../models/workouts";

export async function listUsers(req: Request, res: Response) {
  console.log('listAllUsers');
  // const users = await getAll();
  // res.status(200).json(users);

  // const oneUser = await getOne('Woj').populate('workouts');

  const oneUser = await User.findOne({ name: 'Woj'}).populate('workouts');
  // res.status(200).json(oneUser);

  const workout1 = await Workout.findOne({ reps: 5}).populate('user_cde');
  const workout2 = await Workout.findOne({ reps: 55}).populate('user_cde');
  
  
  
  res.status(200).json({
    workout1,
    workout2,
    oneUser
  });
}