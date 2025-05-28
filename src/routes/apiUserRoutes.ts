import { Router } from "express";
import { getUser,
  getUsersByFullName,
  getUsers,
  deleteAllUsers,
  deleteUser,
  createUser,
} from "../controllers/usersController";
import { userNotFound } from "../middleware/userNotFound";
import { workoutNotBelongToUser } from "../middleware/workoutNotBelongToUser";
import { workoutNotFound } from "../middleware/workoutNotFound";
import {
  createWorkout,
  deleteUserWorkout,
  deleteUserWorkouts,
  getUserWorkout,
  getUserWorkouts
} from "../controllers/workoutsController";


export const routes = Router();

// /api/users
routes.get('/', getUsers);
routes.post('/', createUser);
routes.delete('/', deleteAllUsers);
routes.get('/:id', userNotFound, getUser);
routes.delete('/:id', userNotFound, deleteUser);
routes.get('/:firstName-:lastName', getUsersByFullName);
routes.get('/:id/workouts', userNotFound, getUserWorkouts);
routes.post('/:id/workouts', userNotFound, createWorkout);
routes.delete(
  '/:id/workouts',
  userNotFound,
  deleteUserWorkouts
);
routes.get(
  '/:id/workouts/:workoutId',
  userNotFound,
  workoutNotBelongToUser,
  workoutNotFound,
  getUserWorkout
);
routes.delete(
  '/:id/workouts/:workoutId',
  userNotFound,
  workoutNotBelongToUser,
  deleteUserWorkout
);

