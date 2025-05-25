import { Router } from "express";
import { listWorkouts } from "../controllers/workoutsController";


export const routes = Router();

// /api/workouts
routes.get('/', listWorkouts);
