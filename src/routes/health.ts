import { Response, Request, NextFunction } from 'express';

/**
 * List of API examples.
 * @route GET /api
 */
const health = (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const reqa = req;

  res.sendStatus(200);

  next();
};

export default health;
