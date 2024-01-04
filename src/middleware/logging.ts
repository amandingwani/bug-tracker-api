import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import getFormattedTime from '../utils/formattedTime';

const logging = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  next();
  const endTime = Date.now();
  const elapsedTime = endTime - startTime;
  const requestPadding = ' '.repeat(8 - req.method.length);

  logger.info(
    `[${getFormattedTime()}] ${req.method}${requestPadding}${elapsedTime}ms ${req.originalUrl}`
  );
};

export default logging;
