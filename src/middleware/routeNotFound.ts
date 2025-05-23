import { Request, Response, NextFunction } from 'express';

export function routeNotFound(req: Request, res: Response, next: NextFunction) {
  const msg = `Route '${req.url}' not found`;
  const error = new Error(msg);
  console.error(msg);

  res.status(404).json({
    error: {
      message: error.message
    }
  });
}
