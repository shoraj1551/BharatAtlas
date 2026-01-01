/**
 * Express Server for BharatAtlas API
 * 
 * Provides hierarchical geo data and image services
 */

import express from 'express'
import cors from 'cors'
import compression from 'compression'
import dotenv from 'dotenv'
import geoRouter from './api/geo.js'
import imagesRouter from './api/images.js'
import placesRouter from './api/places.js'
import aiRoutes from './api/ai.js'
import communityRouter from './api/community.js' // Added Community import
import { connectMongo } from './services/mongoService.js'
import { apiLimiter } from './middleware/rateLimiter.js'
import { securityHeaders } from './middleware/securityHeaders.js'
import { requestLogger } from './utils/logger.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(securityHeaders) // Security headers first
app.use(requestLogger) // Request logging
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}))
app.use(compression()) // Compress responses
app.use(express.json())

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter)

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime()
    })
})

// API Routes
app.use('/api/geo', geoRouter)
app.use('/api/images', imagesRouter)
app.use('/api/places', placesRouter)
app.use('/api/ai', aiRoutes)
app.use('/api/community', communityRouter)

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `The requested resource '${req.path}' was not found`,
        path: req.path,
        timestamp: new Date().toISOString()
    })
})

// Error handler - Standardized error responses
app.use((err, req, res, next) => {
    console.error('Error:', err)

    const statusCode = err.statusCode || 500
    const errorResponse = {
        error: err.name || 'Internal Server Error',
        message: err.message || 'An unexpected error occurred',
        timestamp: new Date().toISOString()
    }

    // Include stack trace in development
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack
        errorResponse.details = err.details
    }

    res.status(statusCode).json(errorResponse)
})

// Initialize MongoDB and start server
async function startServer() {
    try {
        // Connect to MongoDB Atlas
        await connectMongo()
        console.log('✅ MongoDB Atlas connected')

        // Start Express server
        app.listen(PORT, () => {
            console.log(`🚀 BharatAtlas API server running on http://localhost:${PORT}`)
            console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
            console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`)
            console.log(`🛡️  Rate limiting: Enabled (100 requests per 15 minutes)`)
            console.log(`🔒 Security headers: Enabled (CSP, HSTS, X-Frame-Options, etc.)`)
            console.log(`📝 Structured logging: Enabled`)
            console.log(`🗄️  MongoDB Atlas: Connected`)
        })
    } catch (error) {
        console.error('❌ Failed to start server:', error)
        process.exit(1)
    }
}

startServer()
