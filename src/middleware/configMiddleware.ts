import { Request, Response, NextFunction } from 'express';
import Config from '../lib/config';

export default async function configMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const config = new Config();

  req.config = config;

  next();
}
