import { createLogger, format, transports } from 'winston';
import { WinstonTransport as AxiomTransport } from '@axiomhq/winston';
import { NODE_ENV, AXIOM_TOKEN } from '../config/env';

const logger = createLogger({
  level: 'info',
  transports: [
    // // - Write all logs with importance level of `error` or less to `error.log`
    // new transports.File({
    //   filename: 'error.log',
    //   level: 'error',
    //   maxsize: 10485760,
    //   maxFiles: 10,
    //   tailable: true,
    //   format: format.combine(format.simple()),
    // }),
    // - Write all logs with importance level of `info` or less to `combined.log`
    // new transports.File({
    //   filename: 'logs/combined.log',
    //   maxsize: 10485760,
    //   maxFiles: 20,
    //   tailable: true,
    //   format: format.combine(format.simple()),
    // }),
  ],
});

if (AXIOM_TOKEN) {
  if (NODE_ENV === 'production') {
    logger.add(
      new AxiomTransport({
        dataset: 'bug-tracker-api-production-logs',
        token: AXIOM_TOKEN,
      })
    );
  } else if (NODE_ENV === 'development') {
    logger.add(
      new AxiomTransport({
        dataset: 'bug-tracker-api-staging-logs',
        token: AXIOM_TOKEN,
      })
    );
  }
} else {
  console.log('Axiom Logging Error: Please set AXIOM_TOKEN env variable!');
}

//
// If we're not in production then log to the `console` as well.
// with the colorized simple format.
//
if (NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
  logger.add(
    new transports.File({
      filename: 'logs/combined.log',
      maxsize: 10485760,
      maxFiles: 20,
      tailable: true,
      format: format.combine(format.simple()),
    })
  );
}

export default logger;
