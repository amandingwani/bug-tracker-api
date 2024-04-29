import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

const infoLog = (req: Request, res: Response, next: NextFunction) => {
  next();

  // ip: ${req.ip} | ips: ${req.ips}
  logger.info(
    `New Request
        Origin: ${req.header('Origin')}
        Referer: ${req.header('Referer')}
        ip: ${req.ip} | ips: ${req.ips}
        sec-ch-ua: ${req.header('sec-ch-ua')} | sec-ch-ua-mobile: ${req.header(
          'sec-ch-ua-mobile'
        )} | sec-ch-ua-platform: ${req.header('sec-ch-ua-platform')} | 
        User-Agent: ${req.header('User-Agent')}
        Accept-Language: ${req.header('Accept-Language')}
        The above logs are for this request below.`
  );
};

export default infoLog;
