import { Router } from "express";
import { getUser, getUsersByFullName, getUserWorkout, getUserWorkouts, getUsers } from "../controllers/usersController";
import { userNotFound } from "../middleware/userNotFound";


export const routes = Router();

// /api/users
routes.get('/', getUsers);
routes.get('/:id', userNotFound, getUser);
routes.get('/:firstName-:lastName', getUsersByFullName);
routes.get('/:id/workouts', userNotFound, getUserWorkouts);
routes.get('/:id/workouts/:workoutId', userNotFound, getUserWorkout);
