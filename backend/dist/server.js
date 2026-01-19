/**
 * Express Server for BharatAtlas API
 *
 * Provides hierarchical geo data and image services
 */
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
import v1Router from './api/v1/index.js';
import geoRouter from './api/geo.js';
import imagesRouter from './api/images.js';
import placesRouter from './api/places.js';
import aiRoutes from './api/ai.js';
import communityRouter from './api/community.js';
import opportunitiesRouter from './api/opportunities.js';
import workspaceRouter from './api/workspace.js';
import { connectMongo } from './services/mongoService.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { securityHeaders } from './middleware/securityHeaders.js';
import { requestLogger } from './utils/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(securityHeaders); // Security headers first
app.use(requestLogger); // Request logging
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(compression()); // Compress responses
app.use(express.json());
// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);
// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime()
    });
});
// Deprecation middleware
const deprecationWarning = (routeName) => (req, res, next) => {
    res.setHeader('X-API-Warn', `This endpoint is deprecated. Please use /api/v1/${routeName}`);
    res.setHeader('Deprecation', 'true');
    next();
};
// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'BharatAtlas API Documentation',
    customCss: '.swagger-ui .topbar { display: none }'
}));
// API v1 Routes (Primary)
app.use('/api/v1', v1Router);
// Backward Compatibility - Mount individual routers under legacy paths with deprecation warnings
app.use('/api/geo', deprecationWarning('geo'), geoRouter);
app.use('/api/images', deprecationWarning('images'), imagesRouter);
app.use('/api/places', deprecationWarning('places'), placesRouter);
app.use('/api/ai', deprecationWarning('ai'), aiRoutes);
app.use('/api/community', deprecationWarning('community'), communityRouter);
app.use('/api/opportunities', deprecationWarning('opportunities'), opportunitiesRouter);
app.use('/api/workspace', deprecationWarning('workspace'), workspaceRouter);
// 404 handler
app.use((req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on this server!`);
    error.statusCode = 404;
    error.status = 'fail';
    next(error);
});
// Central Error Handler
app.use(errorHandler);
// Initialize MongoDB and start server
async function startServer() {
    try {
        // Connect to MongoDB Atlas
        await connectMongo();
        console.log('✅ MongoDB Atlas connected');
        // Start Express server
        app.listen(PORT, () => {
            console.log(`🚀 BharatAtlas API server running on http://localhost:${PORT}`);
            console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
            console.log(`🛡️  Rate limiting: Enabled (100 requests per 15 minutes)`);
            console.log(`🔒 Security headers: Enabled (CSP, HSTS, X-Frame-Options, etc.)`);
            console.log(`📝 Structured logging: Enabled`);
            console.log(`🗄️  MongoDB Atlas: Connected`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map