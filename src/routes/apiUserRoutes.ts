import { Router } from "express";
import { getUser, getUsersByFullName, listUsers } from "../controllers/usersController";


export const routes = Router();

// /api/users
routes.get('/', listUsers);
routes.get('/:id', getUser);
routes.get('/:firstName-:lastName', getUsersByFullName);
