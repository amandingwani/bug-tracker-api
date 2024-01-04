import { createLogger, format, transports } from 'winston';
import { NODE_ENV } from '../config/env';

const logger = createLogger({
  level: 'info',
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

export default logger;
