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

export const routes = Router();

// /api/exercises

routes.get('/', getExercises);
routes.post('/', createExercise);
routes.delete('/', deleteAllExercises);
routes.post('/bulk', createExercisesBulk);
routes.get('/:id', exerciseNotFound, getExerciseById);
routes.patch('/:id', handleUpdateExercise);
routes.delete('/:id', deleteExercise);
