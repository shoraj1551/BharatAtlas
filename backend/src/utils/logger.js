/**
 * Structured Logging Utility
 * 
 * Provides consistent logging format across the application
 */

const LOG_LEVELS = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR'
}

class Logger {
    constructor(context = 'App') {
        this.context = context
        this.isDevelopment = process.env.NODE_ENV === 'development'
    }

    /**
     * Format log message with timestamp and context
     */
    formatMessage(level, message, meta = {}) {
        const timestamp = new Date().toISOString()
        const logEntry = {
            timestamp,
            level,
            context: this.context,
            message,
            ...meta
        }

        // In development, pretty print
        if (this.isDevelopment) {
            return logEntry
        }

        // In production, JSON format for log aggregation
        return JSON.stringify(logEntry)
    }

    debug(message, meta = {}) {
        if (this.isDevelopment) {
            console.debug(this.formatMessage(LOG_LEVELS.DEBUG, message, meta))
        }
    }

    info(message, meta = {}) {
        console.info(this.formatMessage(LOG_LEVELS.INFO, message, meta))
    }

    warn(message, meta = {}) {
        console.warn(this.formatMessage(LOG_LEVELS.WARN, message, meta))
    }

    error(message, error = null, meta = {}) {
        const errorMeta = error ? {
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name
            },
            ...meta
        } : meta

        console.error(this.formatMessage(LOG_LEVELS.ERROR, message, errorMeta))
    }

    /**
     * Log HTTP request
     */
    logRequest(req, res, duration) {
        this.info('HTTP Request', {
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip,
            userAgent: req.get('user-agent')
        })
    }
}

/**
 * Create logger instance
 */
export function createLogger(context) {
    return new Logger(context)
}

/**
 * Express middleware for request logging
 */
export function requestLogger(req, res, next) {
    const logger = createLogger('HTTP')
    const startTime = Date.now()

    // Log when response finishes
    res.on('finish', () => {
        const duration = Date.now() - startTime
        logger.logRequest(req, res, duration)
    })

    next()
}

export default createLogger('App')
