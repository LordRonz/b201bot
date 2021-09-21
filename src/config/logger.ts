import winston from 'winston';

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.printf((log) => `[${log.level.toUpperCase()}] - ${log.message}`),
});

export default logger;
