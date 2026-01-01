/**
 * Place Cache Middleware
 * 
 * Caches place data to reduce database load
 * - TTL: 1 hour (3600 seconds)
 * - Cache key: place:{id} or places:{type}
 * - Automatic invalidation on updates
 */

import NodeCache from 'node-cache'

// Initialize cache with 1 hour TTL
const cache = new NodeCache({
    stdTTL: 3600,           // 1 hour default
    checkperiod: 600,       // Check for expired keys every 10 minutes
    useClones: false        // Don't clone objects (faster)
})

/**
 * Cache middleware for single place requests
 * GET /api/places/:id
 */
export function cachePlaceById(req, res, next) {
    const cacheKey = `place:${req.params.id}`

    // Check cache
    const cached = cache.get(cacheKey)
    if (cached) {
        console.log(`[CACHE HIT] ${cacheKey}`)
        return res.json(cached)
    }

    console.log(`[CACHE MISS] ${cacheKey}`)

    // Store original res.json
    const originalJson = res.json.bind(res)

    // Override res.json to cache the response
    res.json = (data) => {
        cache.set(cacheKey, data)
        return originalJson(data)
    }

    next()
}

/**
 * Cache middleware for place lists
 * GET /api/places/states, etc.
 */
export function cachePlaceList(req, res, next) {
    // Build cache key from route and query params
    const route = req.route.path
    const queryString = JSON.stringify(req.query)
    const cacheKey = `places:${route}:${queryString}`

    // Check cache
    const cached = cache.get(cacheKey)
    if (cached) {
        console.log(`[CACHE HIT] ${cacheKey}`)
        return res.json(cached)
    }

    console.log(`[CACHE MISS] ${cacheKey}`)

    // Store original res.json
    const originalJson = res.json.bind(res)

    // Override res.json to cache the response
    res.json = (data) => {
        cache.set(cacheKey, data)
        return originalJson(data)
    }

    next()
}

/**
 * Invalidate cache for a specific place
 * Call this when place data is updated
 */
export function invalidatePlaceCache(placeId) {
    const cacheKey = `place:${placeId}`
    cache.del(cacheKey)
    console.log(`[CACHE INVALIDATE] ${cacheKey}`)

    // Also invalidate list caches (they might contain this place)
    const keys = cache.keys()
    keys.forEach(key => {
        if (key.startsWith('places:')) {
            cache.del(key)
        }
    })
}

/**
 * Clear all cache (use sparingly)
 */
export function clearAllCache() {
    cache.flushAll()
    console.log('[CACHE] All cache cleared')
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
    return cache.getStats()
}

export default {
    cachePlaceById,
    cachePlaceList,
    invalidatePlaceCache,
    clearAllCache,
    getCacheStats
}
