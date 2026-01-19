import NodeCache from 'node-cache';
// Initialize cache with 1 hour TTL
const cache = new NodeCache({
    stdTTL: 3600,
    checkperiod: 600,
    useClones: false
});
// Helper to sanitize/sort query params for cache key stability
const getQueryKey = (query) => {
    if (!query)
        return '{}';
    const sorted = Object.keys(query).sort().reduce((acc, key) => {
        acc[key] = query[key];
        return acc;
    }, {});
    return JSON.stringify(sorted);
};
/**
 * Cache middleware for single place requests
 * GET /api/places/:id
 */
export function cachePlaceById(req, res, next) {
    const queryKey = getQueryKey(req.query);
    const cacheKey = `place:${req.params.id}:${queryKey}`;
    const cached = cache.get(cacheKey);
    if (cached) {
        console.log(`[CACHE HIT] ${cacheKey}`);
        return res.json(cached);
    }
    console.log(`[CACHE MISS] ${cacheKey}`);
    const originalJson = res.json.bind(res);
    res.json = (data) => {
        cache.set(cacheKey, data);
        return originalJson(data);
    };
    next();
}
/**
 * Cache middleware for place lists
 * GET /api/places/states, /search, etc.
 */
export function cachePlaceList(req, res, next) {
    const route = req.route.path;
    const queryKey = getQueryKey(req.query);
    const cacheKey = `places:${route}:${queryKey}`;
    const cached = cache.get(cacheKey);
    if (cached) {
        console.log(`[CACHE HIT] ${cacheKey}`);
        return res.json(cached);
    }
    console.log(`[CACHE MISS] ${cacheKey}`);
    const originalJson = res.json.bind(res);
    res.json = (data) => {
        cache.set(cacheKey, data);
        return originalJson(data);
    };
    next();
}
/**
 * Invalidate cache for a specific place
 * Call this when place data is updated
 */
export function invalidatePlaceCache(placeId) {
    // 1. Invalidate all variations of this place (different fields/projections)
    const placePrefix = `place:${placeId}`;
    // 2. Invalidate all lists (safest approach)
    const listPrefix = 'places:';
    const keys = cache.keys();
    let count = 0;
    keys.forEach(key => {
        if (key.startsWith(placePrefix) || key.startsWith(listPrefix)) {
            cache.del(key);
            count++;
        }
    });
    console.log(`[CACHE INVALIDATE] ${placeId} (${count} keys removed)`);
}
export function clearAllCache() {
    cache.flushAll();
    console.log('[CACHE] All cache cleared');
}
export function getCacheStats() {
    return cache.getStats();
}
export default {
    cachePlaceById,
    cachePlaceList,
    invalidatePlaceCache,
    clearAllCache,
    getCacheStats
};
//# sourceMappingURL=placeCache.js.map