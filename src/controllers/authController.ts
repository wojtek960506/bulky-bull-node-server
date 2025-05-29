import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IUser } from '../types/userTypes';
import { dbUserToObj } from '../utils/objectConverters';
import { getUserByEmail, insertUser, User } from '../models/users';
import { apiRestError } from '../utils/errors';
import { config } from '../config/config';

export async function registerUser (req: Request<{}, {}, IUser>, res: Response): Promise<void> {
  
  try {
    const user = req.body;
    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword;
    const newUser = await insertUser(user);
    res.status(201).json(dbUserToObj(newUser))
  } catch (error: any) {
    apiRestError(res, 500, error.message);
    return;
  }
}

export async function logIn(
  req: Request<{}, {}, { email: string, password: string }>,
  res: Response
): Promise<void> {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      apiRestError(res, 401, 'Invalid credentials');
      return;
    }

    const authToken = jwt.sign({ userId: user.id }, config.JWT_SECRET, {
      expiresIn: '1m'
    })

    res.status(201).json({ authToken });
  } catch (error: any) {
    apiRestError(res, 500, error.message);
    return;
  }
}