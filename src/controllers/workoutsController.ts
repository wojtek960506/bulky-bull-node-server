import {
  getAllWorkouts,
  getAllWorkoutsByUser,
  removeAllWorkoutsByUser,
  removeWorkout
} from "../models/workouts";
import { Request, Response } from "express";


export async function listWorkouts(req: Request, res: Response) {
  const workouts = await getAllWorkouts();
  res.status(200).json(workouts.map(dbWorkoutToObj));
}

export async function getUserWorkouts(req: Request, res: Response) {
  const workouts = await getAllWorkoutsByUser(req.params.userId);
  res.status(200).json(workouts.map(dbWorkoutToObj));
}

export async function deleteWorkout(req: Request, res: Response) {
  const deletedWorkout = await removeWorkout(req.params.id);
  console.log('deletedWorkout:', deletedWorkout)
  res.status(200).json(deletedWorkout);
}

export async function deleteAllWorkoutsByUser(req: Request, res: Response) {
  const deletedWorkouts = await removeAllWorkoutsByUser(req.params.userId);
  console.log('deleted Workouts:', deletedWorkouts);
  res.status(200).json(deletedWorkouts);
}

export const dbWorkoutToObj = (w: any) => ({
  id: w._id,
  date: w.date,
  reps: w.reps,
});