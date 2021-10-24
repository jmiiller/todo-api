import { Response, Request, NextFunction } from 'express';

/**
 * List of API examples.
 * @route GET /api
 */
const health = (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(200);

  next();
};

export default health;
