import { Router } from "express";
import { getUser,
  getUsersByFullName,
  getUsers,
  deleteAllUsers,
  deleteUser,
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
import { authMiddleware } from "../middleware/authMiddleware";


export const router = Router();
router.use(authMiddleware);

// /api/users
router.get('/', getUsers);
router.delete('/', deleteAllUsers);
router.get('/:id', userNotFound, getUser);
router.delete('/:id', userNotFound, deleteUser);
router.get('/:firstName-:lastName', getUsersByFullName);
router.get('/:id/workouts', userNotFound, getUserWorkouts);
router.post('/:id/workouts', userNotFound, createWorkout);
router.delete(
  '/:id/workouts',
  userNotFound,
  deleteUserWorkouts
);
router.get(
  '/:id/workouts/:workoutId',
  userNotFound,
  workoutNotBelongToUser,
  workoutNotFound,
  getUserWorkout
);
router.delete(
  '/:id/workouts/:workoutId',
  userNotFound,
  workoutNotBelongToUser,
  deleteUserWorkout
);

