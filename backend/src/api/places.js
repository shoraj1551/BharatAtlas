/**
 * Enhanced Place API Routes
 * 
 * Provides access to all place data including enhanced metrics
 */

import express from 'express'
import {
    getAllStates,
    getPlaceById,
    getPlaceByName,
    searchPlaces
} from '../services/mongoPlaceService.js'
import Place from '../../models/Place.js'
import PlaceHistory from '../../models/PlaceHistory.js'
import { cachePlaceById, cachePlaceList, invalidatePlaceCache } from '../middleware/placeCache.js'
import opportunitiesRouter from './opportunities.js'

const router = express.Router()

// Mount sub-routers
router.use('/:placeId/opportunities', opportunitiesRouter)

/**
 * GET /api/places/:placeId/history
 * Fetch the Audit Log / Trust Ledger for a place
 */
router.get('/:placeId/history', async (req, res, next) => {
    try {
        const { placeId } = req.params
        const history = await PlaceHistory.find({ place_id: placeId })
            .sort({ timestamp: -1 })
            .limit(50)

        res.json({ success: true, data: history })
    } catch (error) {
        next(error)
    }
})

/**
 * GET /api/places/states
 * Get all states with full data
 */
router.get('/states', cachePlaceList, async (req, res, next) => {
    try {
        const { page = 1, limit = 50, fields } = req.query
        const result = await getAllStates(parseInt(page), parseInt(limit), fields?.split(','))
        res.json({
            success: true,
            ...result
        })
    } catch (error) {
        next(error)
    }
})

/**
 * GET /api/places/:id
 * Get place by ID with all enhanced data
 */
router.get('/:id', cachePlaceById, async (req, res, next) => {
    try {
        const { fields } = req.query
        const place = await getPlaceById(req.params.id, fields?.split(','))

        if (!place) {
            return res.status(404).json({
                success: false,
                error: 'Place not found'
            })
        }

        res.json({
            success: true,
            data: place
        })
    } catch (error) {
        next(error)
    }
})

/**
 * GET /api/places/:id/economic
 * Get economic data for a place
 */
router.get('/:id/economic', async (req, res, next) => {
    try {
        const place = await getPlaceById(req.params.id, ['economic_data'])

        if (!place) {
            return res.status(404).json({
                success: false,
                error: 'Place not found'
            })
        }

        res.json({
            success: true,
            data: place.economic_data || null
        })
    } catch (error) {
        next(error)
    }
})

/**
 * GET /api/places/:id/infrastructure
 * Get infrastructure data for a place
 */
router.get('/:id/infrastructure', async (req, res, next) => {
    try {
        const place = await getPlaceById(req.params.id, ['infrastructure'])

        if (!place) {
            return res.status(404).json({
                success: false,
                error: 'Place not found'
            })
        }

        res.json({
            success: true,
            data: place.infrastructure || null
        })
    } catch (error) {
        next(error)
    }
})

/**
 * GET /api/places/:id/health-education
 * Get health & education data for a place
 */
router.get('/:id/health-education', async (req, res, next) => {
    try {
        const place = await getPlaceById(req.params.id, ['health_education'])

        if (!place) {
            return res.status(404).json({
                success: false,
                error: 'Place not found'
            })
        }

        res.json({
            success: true,
            data: place.health_education || null
        })
    } catch (error) {
        next(error)
    }
})

/**
 * GET /api/places/:id/climate
 * Get climate & environment data for a place
 */
router.get('/:id/climate', async (req, res, next) => {
    try {
        const place = await getPlaceById(req.params.id, ['climate_environment'])

        if (!place) {
            return res.status(404).json({
                success: false,
                error: 'Place not found'
            })
        }

        res.json({
            success: true,
            data: place.climate_environment || null
        })
    } catch (error) {
        next(error)
    }
})

/**
 * GET /api/places/search
 * Search places by name
 */
router.get('/search', cachePlaceList, async (req, res, next) => {
    try {
        const { q, page = 1, limit = 10 } = req.query

        if (!q) {
            return res.status(400).json({
                success: false,
                error: 'Query parameter "q" is required'
            })
        }

        const result = await searchPlaces(q, parseInt(page), parseInt(limit))

        res.json({
            success: true,
            ...result
        })
    } catch (error) {
        next(error)
    }
})

/**
 * PATCH /api/places/:id
 * Update place data (for adding water resources, etc.)
 */
router.patch('/:id', async (req, res, next) => {
    try {
        const Place = (await import('../models/Place.js')).default

        const place = await Place.findOneAndUpdate(
            { place_id: req.params.id },
            { $set: req.body },
            { new: true, runValidators: true }
        )

        if (!place) {
            return res.status(404).json({
                success: false,
                error: 'Place not found'
            })
        }

        // Invalidate cache for this place
        invalidatePlaceCache(req.params.id)

        res.json({
            success: true,
            data: place
        })
    } catch (error) {
        next(error)
    }
})

export default router
