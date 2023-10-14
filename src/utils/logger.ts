import { createLogger, format, transports } from "winston";

const logger = createLogger({
    level: 'info',
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
      )
    }));
  }

export default logger;