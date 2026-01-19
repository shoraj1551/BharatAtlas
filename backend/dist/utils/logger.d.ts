/**
 * Create a child logger with specific context
 */
export function createLogger(context: any): winston.Logger;
/**
 * Express Middleware for Request Logging
 * Attaches logger to req and logs response time
 */
export function requestLogger(req: any, res: any, next: any): void;
declare const _default: winston.Logger;
export default _default;
import winston from 'winston';
//# sourceMappingURL=logger.d.ts.map