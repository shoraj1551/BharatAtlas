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

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}))
app.use(compression()) // Compress responses
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    })
})

// API Routes
app.use('/api/geo', geoRouter)
app.use('/api/images', imagesRouter)

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        path: req.path
    })
})

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err)
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
})

// Start server
app.listen(PORT, () => {
    console.log(`🚀 BharatAtlas API server running on http://localhost:${PORT}`)
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`)
})
