// Service for fetching and managing Place data
// Uses central registry as single source of truth

import placeRegistry from '../data/placeRegistry'

class PlaceService {
    /**
     * Get place by ID
     * @param {string} placeId - Unique place identifier
     * @returns {Promise<Object>} Place object
     */
    async getPlaceById(placeId) {
        const place = placeRegistry.getPlaceById(placeId)
        if (place) {
            return Promise.resolve(place)
        }
        return Promise.reject(new Error('Place not found'))
    }

    /**
     * Get place by name
     * @param {string} name - Place name
     * @returns {Promise<Object>} Place object
     */
    async getPlaceByName(name) {
        const place = placeRegistry.getPlaceByName(name)
        if (place) {
            return Promise.resolve(place)
        }
        return Promise.reject(new Error('Place not found'))
    }

    /**
     * Search places by query
     * @param {string} query - Search query
     * @returns {Promise<Array>} Array of matching places
     */
    async searchPlaces(query) {
        return Promise.resolve(placeRegistry.searchPlaces(query))
    }

    /**
     * Get all states
     * @returns {Promise<Array>} Array of state places
     */
    async getAllStates() {
        return Promise.resolve(placeRegistry.getAllStates())
    }

    /**
     * List places with pagination support
     * @param {Object} options - Query options
     * @param {string} options.parent_id - Filter by parent place ID
     * @param {string} options.place_type - Filter by place type
     * @param {number} options.limit - Maximum results (default: 100)
     * @param {number} options.offset - Results to skip (default: 0)
     * @returns {Promise<Object>} Paginated response
     */
    async listPlaces(options = {}) {
        return Promise.resolve(placeRegistry.listPlaces(options))
    }

    /**
     * Get children of a place (e.g., districts of a state)
     * @param {string} placeId - Parent place ID
     * @param {Object} options - Query options (limit, offset)
     * @returns {Promise<Object>} Paginated response with child places
     */
    async getChildren(placeId, options = {}) {
        return this.listPlaces({
            ...options,
            parent_id: placeId
        })
    }
}

export default new PlaceService()
