// Service for fetching and managing Place data from MongoDB API
// Replaces hardcoded placeRegistry with real API calls

const API_BASE = '/api/places'

class PlaceService {
    /**
     * Get place by ID
     * @param {string} placeId - Unique place identifier
     * @returns {Promise<Object>} Place object
     */
    async getPlaceById(placeId) {
        // 1. Try Cache First (if offline or just for speed - Stale-While-Revalidate could be better but let's do Cache-First-Offline)
        // Actually, "Tier 3 Resilient" usually means: Try Network, if fail -> Cache.
        // OR: Show Cache immediately, then update.
        // Let's go with: Try Network. If error (offline), return Cache.

        try {
            const response = await fetch(`${API_BASE}/${placeId}`)
            if (!response.ok) {
                throw new Error('Place not found')
            }
            const result = await response.json()
            const placeData = result.data || result // Handle both wrapped and direct responses

            // SAVE TO CACHE
            import('./cachingService_v2').then(({ cachingService }) => cachingService.cachePlaceData(placeData))

            return placeData
        } catch (error) {
            console.warn('Network fetch failed, trying cache...', error)

            // FALLBACK TO CACHE
            const { cachingService } = await import('./cachingService_v2')
            const cached = cachingService.getCachedPlace(placeId)

            if (cached) {
                console.log(`Served ${placeId} from offline cache`)
                return { ...cached, is_offline_copy: true } // Mark as offline
            }

            throw error
        }
    }

    /**
     * Get place by name
     * @param {string} name - Place name
     * @returns {Promise<Object>} Place object
     */
    async getPlaceByName(name) {
        try {
            const results = await this.searchPlaces(name)
            const exactMatch = results.find(
                p => p.canonical_name.toLowerCase() === name.toLowerCase()
            )
            if (exactMatch) {
                return exactMatch
            }
            throw new Error('Place not found')
        } catch (error) {
            console.error('Error fetching place by name:', error)
            throw error
        }
    }

    /**
     * Search places by query
     * @param {string} query - Search query
     * @returns {Promise<Array>} Array of matching places
     */
    async searchPlaces(query) {
        try {
            const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`)
            if (!response.ok) {
                return []
            }
            const result = await response.json()
            return result.data || result || []
        } catch (error) {
            console.error('Error searching places:', error)
            return []
        }
    }

    /**
     * Get all states
     * @returns {Promise<Array>} Array of state places
     */
    async getAllStates() {
        try {
            const response = await fetch(`${API_BASE}/states`)
            if (!response.ok) {
                console.error('Failed to fetch states:', response.status)
                return [] // Return empty array on error
            }
            const result = await response.json()
            
            // Handle different response formats
            // Backend returns: { success: true, data: [...], pagination: {...} }
            if (result.data && Array.isArray(result.data)) {
                return result.data
            }
            
            // Fallback: if result itself is an array
            if (Array.isArray(result)) {
                return result
            }
            
            // If neither, log error and return empty array
            console.error('Unexpected response format from /api/places/states:', result)
            return []
        } catch (error) {
            console.error('Error fetching states:', error)
            return [] // Return empty array instead of throwing
        }
    }

    /**
     * Get children of a place (e.g., districts of a state)
     * @param {string} placeId - Parent place ID
     * @param {Object} options - Query options (limit, offset)
     * @returns {Promise<Object>} Paginated response with child places
     */
    async getChildren(placeId, options = {}) {
        try {
            const { limit = 100, offset = 0 } = options
            const response = await fetch(
                `${API_BASE}/${placeId}/children?limit=${limit}&offset=${offset}`
            )
            if (!response.ok) {
                return { data: [], total: 0, limit, offset }
            }
            return await response.json()
        } catch (error) {
            console.error('Error fetching children:', error)
            return { data: [], total: 0, limit: options.limit || 100, offset: options.offset || 0 }
        }
    }

    /**
     * List places with pagination support
     * @param {Object} options - Query options
     * @returns {Promise<Object>} Paginated response
     */
    async listPlaces(options = {}) {
        // For now, just return states if no parent_id specified
        if (!options.parent_id) {
            const states = await this.getAllStates()
            return {
                data: states,
                total: states.length,
                limit: options.limit || 100,
                offset: options.offset || 0
            }
        }

        return await this.getChildren(options.parent_id, options)
    }
}

export default new PlaceService()
