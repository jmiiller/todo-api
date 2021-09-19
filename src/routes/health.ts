"use strict";

import { Response, Request, NextFunction } from "express";


/**
 * List of API examples.
 * @route GET /api
 */
export const health = (req: Request, res: Response) => {
    res.sendStatus(200);
};
