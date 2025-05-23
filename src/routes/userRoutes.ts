import { Router } from "express";
import { getUserByFullName, listUsers } from "../controllers/usersController";


export const routes = Router();

// /users
routes.get('/', listUsers);
routes.get('/:firstName-:lastName', getUserByFullName);
