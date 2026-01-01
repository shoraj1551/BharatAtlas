/**
 * Rate Limiting Configuration
 * 
 * Protects API from abuse and DoS attacks
 */

import rateLimit from 'express-rate-limit'

// General API rate limiter
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.',
        retryAfter: '15 minutes'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Stricter rate limiter for expensive operations
export const strictLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // Limit each IP to 30 requests per windowMs
    message: {
        error: 'Too many requests for this resource, please try again later.',
        retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
})
