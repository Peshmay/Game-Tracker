import winston from "winston";

const isTest = process.env.NODE_ENV === "test";

export const logger = winston.createLogger({
  level: "info", // keep a valid level
  silent: isTest, // 👈 THIS is the correct way
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: isTest
    ? []
    : [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ level, message, timestamp, ...meta }) => {
              const rest = Object.keys(meta).length
                ? ` ${JSON.stringify(meta)}`
                : "";
              return `${timestamp} ${level}: ${message}${rest}`;
            })
          ),
        }),
      ],
});
