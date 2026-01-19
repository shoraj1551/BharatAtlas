/**
 * Central Error Handling Middleware
 * 
 * Provides consistent error responses and logging across the API using Winston.
 * Hides stack traces in production.
 */

import { createLogger } from '../utils/logger.js'

const logger = createLogger('ErrorHandler')

class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.isOperational = true // Mark as operational (trusted) error
        Error.captureStackTrace(this, this.constructor)
    }
}

export const errorHandler = (err, req, res, next) => {
    // Default error values
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    // Log the error
    // Use request logger if available for context, otherwise global logger
    const log = req.logger || logger

    // Log stack trace for non-operational errors (bugs) or 500s
    if (!err.isOperational || err.statusCode === 500) {
        log.error(err.message, {
            error: err,
            stack: err.stack,
            path: req.originalUrl,
            method: req.method
        })
    } else {
        log.warn(err.message, {
            path: req.originalUrl,
            method: req.method,
            statusCode: err.statusCode
        })
    }

    // Send Response
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } else {
        let error = { ...err }
        error.message = err.message

        // Handle specific error types (Mongoose, JWT, etc.)
        if (error.name === 'CastError') error = handleCastErrorDB(error)
        if (error.code === 11000) error = handleDuplicateFieldsDB(error)
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error)

        sendErrorProd(error, res)
    }
}

// Development Error Response
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        success: false,
        error: {
            status: err.status,
            code: err.code || 'UNKNOWN',
            message: err.message,
            stack: err.stack,
            error: err
        }
    })
}

// Production Error Response
const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            success: false,
            error: {
                status: err.status,
                message: err.message
            }
        })
    } else {
        // Programming or other unknown error: don't leak details
        res.status(500).json({
            success: false,
            error: {
                status: 'error',
                message: 'Something went wrong!'
            }
        })
    }
}

// Error Helpers
const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400)
}

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
    const message = `Duplicate field value: ${value}. Please use another value!`
    return new AppError(message, 400)
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data. ${errors.join('. ')}`
    return new AppError(message, 400)
}

export { AppError }
