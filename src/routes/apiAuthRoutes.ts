import { Router } from "express";
import { registerUser, logIn } from "../controllers/authController";

export const router = Router();

// /api/auth
router.post('/register', registerUser);
router.post('/login', logIn);
