import pkg from 'winston';
const { createLogger, format, transports } = pkg;

// Logger for tracking activities
const logService = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File({ filename: 'logs/error-log.log', level: 'error' }),
        new transports.Console({ format: format.simple() }),
    ],
});

export default logService;
