/**
 * Geo API Router
 * 
 * Endpoints for hierarchical geo data
 */

import express from 'express'
import NodeCache from 'node-cache'
import * as geoService from '../services/geoService.js'

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
router.get('/districts', async (req, res, next) => {
    try {
        const { state } = req.query

        if (!state) {
            return res.status(400).json({ error: 'State parameter is required' })
        }

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
router.get('/tehsils', async (req, res, next) => {
    try {
        const { district } = req.query

        if (!district) {
            return res.status(400).json({ error: 'District parameter is required' })
        }

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
router.get('/thanas', async (req, res, next) => {
    try {
        const { tehsil } = req.query

        if (!tehsil) {
            return res.status(400).json({ error: 'Tehsil parameter is required' })
        }

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
router.get('/villages', async (req, res, next) => {
    try {
        const { thana, limit = 100 } = req.query

        if (!thana) {
            return res.status(400).json({ error: 'Thana parameter is required' })
        }

        const data = await geoService.getVillagesForThana(thana, parseInt(limit))
        res.json(data)
    } catch (err) {
        next(err)
    }
})

export default router
