import { Response, Request, NextFunction } from 'express';

/**
 * List of API examples.
 * @route GET /api
 */
const pageNotFound = (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);

  next();
};

export default pageNotFound;
