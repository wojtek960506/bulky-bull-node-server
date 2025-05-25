import { Router } from "express";
import { deleteAllWorkoutsByUser, deleteWorkout, listWorkouts } from "../controllers/workoutsController";



export const routes = Router();

// /api/workouts
routes.get('/', listWorkouts);
routes.delete('/:id', deleteWorkout);
routes.delete('/user/:userId', deleteAllWorkoutsByUser);
