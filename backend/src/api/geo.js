/**
 * Geo API Router
 * 
 * Endpoints for hierarchical geo data
 */

import express from 'express'
import NodeCache from 'node-cache'
import * as geoService from '../services/geoService.js'
import {
    validateStateName,
    validateDistrictName,
    validateTehsilName,
    validateThanaName,
    validateLimit
} from '../middleware/validation.js'

const router = express.Router()

// Cache instance (TTL: 1 hour)
const cache = new NodeCache({ stdTTL: 3600 })

/**
 * GET /api/geo/states
 * Returns all states
 */
router.get('/states', async (req, res, next) => {
    try {
        const cacheKey = 'states'

        // Check cache
        const cached = cache.get(cacheKey)
        if (cached) {
            console.log('✓ Cache hit: states')
            return res.json(cached)
        }

        // Load from service
        const data = await geoService.getStates()

        // Cache result
        cache.set(cacheKey, data)
        console.log(`✓ Loaded ${data.features?.length || 0} states`)

        res.json(data)
    } catch (err) {
        next(err)
    }
})

/**
 * GET /api/geo/districts?state=Karnataka
 * Returns districts for specified state
 */
router.get('/districts', validateStateName, async (req, res, next) => {
    try {
        const { state } = req.query

        const cacheKey = `districts:${state}`

        // Check cache
        const cached = cache.get(cacheKey)
        if (cached) {
            console.log(`✓ Cache hit: districts for ${state}`)
            return res.json(cached)
        }

        // Load from service
        const data = await geoService.getDistrictsForState(state)

        // Cache result
        cache.set(cacheKey, data)
        console.log(`✓ Loaded ${data.features?.length || 0} districts for ${state}`)

        res.json(data)
    } catch (err) {
        next(err)
    }
})

/**
 * GET /api/geo/tehsils?district=Bangalore
 * Returns tehsils for specified district
 */
router.get('/tehsils', validateDistrictName, async (req, res, next) => {
    try {
        const { district } = req.query

        const data = await geoService.getTehsilsForDistrict(district)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

/**
 * GET /api/geo/thanas?tehsil=Anekal
 * Returns thanas for specified tehsil
 */
router.get('/thanas', validateTehsilName, async (req, res, next) => {
    try {
        const { tehsil } = req.query

        const data = await geoService.getThanasForTehsil(tehsil)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

/**
 * GET /api/geo/villages?thana=Jigani&limit=100
 * Returns villages for specified thana (paginated)
 */
router.get('/villages', validateThanaName, validateLimit, async (req, res, next) => {
    try {
        const { thana, limit } = req.query

        const data = await geoService.getVillagesForThana(thana, limit)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

export default router
