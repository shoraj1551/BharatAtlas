/**
 * Structured Logging Utility (Winston)
 *
 * Provides consistent, structured logging with multiple transports (Console, File)
 * and automatic log correlation support.
 */
import winston from 'winston';
import 'winston-daily-rotate-file';
import { v4 as uuidv4 } from 'uuid';
// Ensure logs directory exists - structure mimics strategy
const LOG_DIR = 'logs';
// Define Log Format
const jsonFormat = winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json());
const prettyFormat = winston.format.combine(winston.format.colorize(), winston.format.timestamp({ format: 'HH:mm:ss' }), winston.format.printf(({ level, message, timestamp, context, ...meta }) => {
    const ctx = context ? `[${context}]` : '';
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return `${timestamp} ${level}: ${ctx} ${message} ${metaStr}`;
}));
// Create base logger
const outputFormat = process.env.NODE_ENV === 'production' ? jsonFormat : prettyFormat;
const baseLogger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info', // Default to info
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    defaultMeta: { service: 'bharatatlas-api' },
    transports: [
        // Console Transport
        new winston.transports.Console({
            format: outputFormat
        }),
        // Daily Rotate File for Errors
        new winston.transports.DailyRotateFile({
            filename: `${LOG_DIR}/error-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error'
        }),
        // Daily Rotate File for Combined Logs
        new winston.transports.DailyRotateFile({
            filename: `${LOG_DIR}/combined-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});
/**
 * Create a child logger with specific context
 */
export function createLogger(context) {
    return baseLogger.child({ context });
}
/**
 * Express Middleware for Request Logging
 * Attaches logger to req and logs response time
 */
export function requestLogger(req, res, next) {
    const startTime = Date.now();
    const requestId = req.headers['x-request-id'] || uuidv4();
    // Attach correlation ID and logger to request
    req.id = requestId;
    req.logger = baseLogger.child({
        context: 'HTTP',
        requestId
    });
    // Log Request Start (Debug only)
    // req.logger.debug(`Incoming ${req.method} ${req.originalUrl}`)
    // Log Response on Finish
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        // Determine log level based on status code
        let level = 'info';
        if (res.statusCode >= 500)
            level = 'error';
        else if (res.statusCode >= 400)
            level = 'warn';
        req.logger.log(level, 'HTTP Request', {
            method: req.method,
            path: req.originalUrl || req.url,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip,
            userAgent: req.get('user-agent')
        });
    });
    next();
}
// Default export for backward compatibility
export default baseLogger.child({ context: 'App' });
//# sourceMappingURL=logger.js.map