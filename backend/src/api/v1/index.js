/**
 * API v1 Router
 * 
 * Central router for all v1 API endpoints.
 * Provides versioned API access with backward compatibility support.
 */

import express from 'express'
import geoRouter from '../geo.js'
import imagesRouter from '../images.js'
import placesRouter from '../places.js'
import aiRoutes from '../ai.js'
import communityRouter from '../community.js'
import opportunitiesRouter from '../opportunities.js'
import workspaceRouter from '../workspace.js'
import searchRouter from '../search.js'
import keysRouter from '../keys.js'
import exportRouter from '../export.js'
import authRouter from '../auth.js'
import collaborationRouter from '../collaboration.js'
import analyticsRouter from '../analytics.js'
import dashboardsRouter from '../dashboards.js'
import notificationsRouter from '../notifications.js'
import historicalRouter from '../historical.js'
// communityRouter is already imported above
// import communityRouter from '../community.js'

const v1Router = express.Router()

// Mount all v1 routes
v1Router.use('/geo', geoRouter)
v1Router.use('/images', imagesRouter)
v1Router.use('/places', placesRouter)
v1Router.use('/ai', aiRoutes)
v1Router.use('/community', communityRouter)
v1Router.use('/opportunities', opportunitiesRouter)
v1Router.use('/workspace', workspaceRouter)
v1Router.use('/search', searchRouter)
v1Router.use('/keys', keysRouter)
v1Router.use('/export', exportRouter)
v1Router.use('/auth', authRouter)
v1Router.use('/analytics', analyticsRouter)
v1Router.use('/dashboards', dashboardsRouter)
v1Router.use('/notifications', notificationsRouter)
v1Router.use('/historical', historicalRouter)
v1Router.use('/', collaborationRouter) // Collaboration routes (workspaces/:id/share, etc.)

// API v1 Info Endpoint
v1Router.get('/', (req, res) => {
    res.json({
        version: 'v1',
        status: 'active',
        endpoints: {
            geo: '/api/v1/geo',
            images: '/api/v1/images',
            places: '/api/v1/places',
            ai: '/api/v1/ai',
            community: '/api/v1/community',
            opportunities: '/api/v1/opportunities',
            workspace: '/api/v1/workspace',
            search: '/api/v1/search',
            keys: '/api/v1/keys',
            export: '/api/v1/export',
            auth: '/api/v1/auth'
        },
        documentation: '/api-docs',
        timestamp: new Date().toISOString()
    })
})

export default v1Router
