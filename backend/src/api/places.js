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

const router = express.Router()

/**
 * GET /api/places/states
 * Get all states with full data
 */
router.get('/states', async (req, res, next) => {
    try {
        const states = await getAllStates()
        res.json({
            success: true,
            count: states.length,
            data: states
        })
    } catch (error) {
        next(error)
    }
})

/**
 * GET /api/places/:id
 * Get place by ID with all enhanced data
 */
router.get('/:id', async (req, res, next) => {
    try {
        const place = await getPlaceById(req.params.id)

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
        const place = await getPlaceById(req.params.id)

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
        const place = await getPlaceById(req.params.id)

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
        const place = await getPlaceById(req.params.id)

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
        const place = await getPlaceById(req.params.id)

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
router.get('/search', async (req, res, next) => {
    try {
        const { q } = req.query

        if (!q) {
            return res.status(400).json({
                success: false,
                error: 'Query parameter "q" is required'
            })
        }

        const results = await searchPlaces(q)

        res.json({
            success: true,
            count: results.length,
            data: results
        })
    } catch (error) {
        next(error)
    }
})

export default router
