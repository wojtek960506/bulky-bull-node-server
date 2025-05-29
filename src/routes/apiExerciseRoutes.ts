import { Router } from "express";
import { exerciseNotFound } from "../middleware/exerciseNotFound";
import {
  getExerciseById,
  getExercises,
  deleteExercise,
  deleteAllExercises,
  createExercise,
  createExercisesBulk,
  handleUpdateExercise,
} from "../controllers/exercisesController";
import { authMiddleware } from "../middleware/authMiddleware";

export const router = Router();
router.use(authMiddleware);

// /api/exercises

router.get('/', getExercises);
router.post('/', createExercise);
router.delete('/', deleteAllExercises);
router.post('/bulk', createExercisesBulk);
router.get('/:id', exerciseNotFound, getExerciseById);
router.patch('/:id', handleUpdateExercise);
router.delete('/:id', deleteExercise);
