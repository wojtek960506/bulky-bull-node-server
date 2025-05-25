import {
  getAllWorkouts
} from "../models/workouts";
import { Request, Response } from "express";


export async function listWorkouts(req: Request, res: Response) {
  const workouts = await getAllWorkouts();
  res.status(200).json(workouts.map(dbWorkoutToObj));
}

const dbWorkoutToObj = (w: any) => ({
  id: w._id,
  date: w.date,
  reps: w.reps,
});