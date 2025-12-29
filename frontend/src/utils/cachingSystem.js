// Caching & Pre-Computation System
// Mandatory caching and pre-computed views (Stories 311-314)

/**
 * Cache Layers (Story 313)
 */
export const CacheLayers = {
    CDN: 'cdn',
    EDGE: 'edge',
    APP: 'app',
    DB: 'db' // Last resort
}

/**
 * Cache Manager (Story 313)
 */
export class CacheManager {
    constructor() {
        this.caches = new Map()
        this.hits = 0
        this.misses = 0
    }

    /**
     * Get from cache (Story 313: Mandatory caching)
     */
    async get(key, layer = CacheLayers.APP) {
        // Story 313: CDN → Edge → App → DB (last)

        // Try CDN first
        if (layer === CacheLayers.CDN) {
            const cdnResult = await this.getCDN(key)
            if (cdnResult) {
                this.hits++
                return cdnResult
            }
        }

        // Try Edge
        if (layer === CacheLayers.EDGE || layer === CacheLayers.CDN) {
            const edgeResult = await this.getEdge(key)
            if (edgeResult) {
                this.hits++
                return edgeResult
            }
        }

        // Try App cache
        const appResult = this.caches.get(key)
        if (appResult && !this.isExpired(appResult)) {
            this.hits++
            return appResult.data
        }

        // Cache miss
        this.misses++
        return null
    }

    /**
     * Set cache (Story 314: Explicit invalidation)
     */
    set(key, data, ttl = 3600) {
        // Story 314: Make cache behavior visible
        const entry = {
            data,
            cachedAt: Date.now(),
            expiresAt: Date.now() + (ttl * 1000),
            ttl,
            invalidatedAt: null
        }

        this.caches.set(key, entry)

        return {
            cached: true,
            key,
            expiresAt: new Date(entry.expiresAt).toISOString(),
            ttl
        }
    }

    /**
     * Explicit invalidation (Story 314)
     */
    invalidate(key, reason) {
        // Story 314: No "magic" cache clearing
        const entry = this.caches.get(key)

        if (entry) {
            entry.invalidatedAt = Date.now()
            entry.invalidationReason = reason
            this.caches.delete(key)

            return {
                invalidated: true,
                key,
                reason,
                timestamp: new Date().toISOString()
            }
        }

        return { invalidated: false, reason: 'Key not found' }
    }

    /**
     * Check if expired
     */
    isExpired(entry) {
        return Date.now() > entry.expiresAt
    }

    /**
     * Get cache stats
     */
    getStats() {
        const total = this.hits + this.misses
        const hitRate = total > 0 ? (this.hits / total) * 100 : 0

        return {
            hits: this.hits,
            misses: this.misses,
            hitRate: Math.round(hitRate),
            size: this.caches.size
        }
    }

    /**
     * CDN cache (placeholder)
     */
    async getCDN(key) {
        return null
    }

    /**
     * Edge cache (placeholder)
     */
    async getEdge(key) {
        return null
    }
}

/**
 * Pre-Computation Manager (Story 312)
 */
export class PreComputationManager {
    constructor() {
        this.precomputed = new Map()
        this.schedule = []
    }

    /**
     * Pre-compute place page (Story 312)
     */
    async preComputePlace(placeId) {
        // Story 312: Common views are pre-rendered
        const placeData = await this.fetchPlaceData(placeId)
        const rendered = this.renderPlace(placeData)

        const entry = {
            placeId,
            rendered,
            computedAt: Date.now(),

            // Story 312: Nightly builds
            nextRefresh: this.getNextNightlyBuild(),

            cost: this.calculateComputeCost(rendered)
        }

        this.precomputed.set(placeId, entry)

        return entry
    }

    /**
     * On-demand refresh (Story 312)
     */
    async refreshPlace(placeId, reason) {
        const entry = await this.preComputePlace(placeId)

        return {
            refreshed: true,
            placeId,
            reason,
            computedAt: new Date(entry.computedAt).toISOString()
        }
    }

    /**
     * Get next nightly build time
     */
    getNextNightlyBuild() {
        // Story 326: Batch jobs prefer night
        const now = new Date()
        const tonight = new Date(now)
        tonight.setHours(2, 0, 0, 0) // 2 AM

        if (now.getHours() >= 2) {
            tonight.setDate(tonight.getDate() + 1)
        }

        return tonight.getTime()
    }

    /**
     * Calculate compute cost (Story 315)
     */
    calculateComputeCost(rendered) {
        // Simplified cost calculation
        const sizeKB = JSON.stringify(rendered).length / 1024
        const costPerKB = 0.0001 // ₹0.0001 per KB

        return sizeKB * costPerKB
    }

    /**
     * Fetch place data (placeholder)
     */
    async fetchPlaceData(placeId) {
        return { place_id: placeId }
    }

    /**
     * Render place (placeholder)
     */
    renderPlace(placeData) {
        return { html: '<div>Place</div>', data: placeData }
    }
}

/**
 * Read/Write Path Manager (Story 311)
 */
export class ReadWritePathManager {
    constructor() {
        this.writeQueue = []
    }

    /**
     * Read path (Story 311: Always cheaper)
     */
    async read(placeId, cacheManager) {
        // Story 311: Read endpoints O(1) or cached
        const cached = await cacheManager.get(`place_${placeId}`)

        if (cached) {
            return {
                data: cached,
                source: 'cache',
                cost: 0.0001 // Very cheap
            }
        }

        // Fetch from DB (more expensive)
        const data = await this.fetchFromDB(placeId)
        cacheManager.set(`place_${placeId}`, data)

        return {
            data,
            source: 'db',
            cost: 0.001 // 10x more expensive
        }
    }

    /**
     * Write path (Story 311: Queued)
     */
    async write(data) {
        // Story 311: Writes queued
        this.writeQueue.push({
            data,
            queuedAt: Date.now(),
            status: 'queued'
        })

        return {
            queued: true,
            position: this.writeQueue.length,
            note: 'Writes are processed asynchronously'
        }
    }

    /**
     * Fetch from DB (placeholder)
     */
    async fetchFromDB(placeId) {
        return { place_id: placeId }
    }
}

export default {
    CacheLayers,
    CacheManager,
    PreComputationManager,
    ReadWritePathManager
}
