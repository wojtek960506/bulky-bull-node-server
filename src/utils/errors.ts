import { Response } from 'express';

export const apiRestError = (res: Response, statusCode: number, message: string) => {
  res.status(statusCode).json({ error: { message } });
}
