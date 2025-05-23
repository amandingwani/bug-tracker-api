import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';

import { JWT_SECRET } from '../config/env';

const authChecker = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  try {
    if (token) {
      jwt.verify(token, JWT_SECRET, {}, (err, userData) => {
        if (err) throw err;
        res.locals.userData = userData;
        next();
      });
    } else {
      res.status(401).json('no token');
    }
  } catch (error) {
    res.status(401).json('Unauthorized');
    logger.error(req.url, error);
  }
};

export default authChecker;
