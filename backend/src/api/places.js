/**
 * Places API Router (MongoDB Version)
 * 
 * Endpoints for place data from MongoDB Atlas
 */

import express from 'express'
import * as mongoPlaceService from '../services/mongoPlaceService.js'
import { getMongoDb } from '../services/mongoService.js'
import { validateLimit } from '../middleware/validation.js'

const router = express.Router()

/**
 * GET /api/places/states
 * Returns all states from MongoDB
 */
router.get('/states', async (req, res, next) => {
    try {
        const states = await mongoPlaceService.getAllStates()
        res.json(states)
    } catch (error) {
        next(error)
    }
})

/**
 * GET /api/places/cities
 * Returns top cities by population
 */
router.get('/cities', async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 50
        const db = getMongoDb()

        // Get districts sorted by population (major cities)
        const cities = await db.collection('places')
            .find({
                place_type: 'district',
                'population.value': { $exists: true, $ne: null },
                'coordinates': { $exists: true }
            })
            .sort({ 'population.value': -1 })
            .limit(limit)
            .toArray()

        res.json(cities)
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
        const { q, limit = 10 } = req.query

        if (!q) {
            return res.status(400).json({ error: 'Query parameter "q" is required' })
        }

        const places = await mongoPlaceService.searchPlaces(q, parseInt(limit))
        res.json(places)
    } catch (error) {
        next(error)
    }
})

/**
 * GET /api/places/:placeId
 * Get place by ID
 */
router.get('/:placeId', async (req, res, next) => {
    try {
        const { placeId } = req.params
        const place = await mongoPlaceService.getPlaceById(placeId)

        if (!place) {
            return res.status(404).json({ error: 'Place not found' })
        }

        res.json(place)
    } catch (error) {
        next(error)
    }
})

/**
 * GET /api/places/:placeId/children
 * Get children of a place
 */
router.get('/:placeId/children', validateLimit, async (req, res, next) => {
    try {
        const { placeId } = req.params
        const { limit = 100, offset = 0 } = req.query

        const result = await mongoPlaceService.getChildren(placeId, {
            limit: parseInt(limit),
            offset: parseInt(offset)
        })

        res.json(result)
    } catch (error) {
        next(error)
    }
})

export default router
