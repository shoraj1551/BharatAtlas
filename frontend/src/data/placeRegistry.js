// Central Place Data Registry
// Single source of truth for all place data in the application

import karnataka from './places/karnataka'

/**
 * Place Registry - All places indexed by place_id
 */
const placeRegistry = {
    'place_ka_001': karnataka,
    // Future places will be added here
    // 'place_mh_001': maharashtra,
    // 'place_tn_001': tamilNadu,
}

/**
 * Get place by ID
 * @param {string} placeId - Unique place identifier
 * @returns {Object|null} Place object or null if not found
 */
export const getPlaceById = (placeId) => {
    return placeRegistry[placeId] || null
}

/**
 * Get place by name (case-insensitive)
 * @param {string} name - Place name
 * @returns {Object|null} Place object or null if not found
 */
export const getPlaceByName = (name) => {
    const normalizedName = name.toLowerCase()
    return Object.values(placeRegistry).find(
        place => place.canonical_name.toLowerCase() === normalizedName
    ) || null
}

/**
 * Get all places
 * @returns {Array} Array of all place objects
 */
export const getAllPlaces = () => {
    return Object.values(placeRegistry)
}

/**
 * Get places by type
 * @param {string} type - Place type (state, district, etc.)
 * @returns {Array} Array of places matching the type
 */
export const getPlacesByType = (type) => {
    return Object.values(placeRegistry).filter(
        place => place.place_type === type
    )
}

/**
 * Get all states
 * @returns {Array} Array of all state objects
 */
export const getAllStates = () => {
    return getPlacesByType('state')
}

/**
 * Search places by query
 * @param {string} query - Search query
 * @returns {Array} Array of matching places
 */
export const searchPlaces = (query) => {
    const normalizedQuery = query.toLowerCase()
    return Object.values(placeRegistry).filter(place =>
        place.canonical_name.toLowerCase().includes(normalizedQuery) ||
        place.canonical_name_local?.toLowerCase().includes(normalizedQuery)
    )
}

/**
 * List places with pagination support
 * Designed to scale to pagination even though MVP loads all data
 * 
 * @param {Object} options - Query options
 * @param {string} options.parent_id - Filter by parent place ID
 * @param {string} options.place_type - Filter by place type
 * @param {number} options.limit - Maximum number of results (default: 100)
 * @param {number} options.offset - Number of results to skip (default: 0)
 * @returns {Object} Paginated response with data and metadata
 */
export const listPlaces = (options = {}) => {
    const {
        parent_id = null,
        place_type = null,
        limit = 100,
        offset = 0
    } = options

    // Get all places
    let places = Object.values(placeRegistry)

    // Filter by parent_id if provided
    if (parent_id) {
        places = places.filter(place => place.parent_place_id === parent_id)
    }

    // Filter by place_type if provided
    if (place_type) {
        places = places.filter(place => place.place_type === place_type)
    }

    // Calculate pagination
    const total = places.length
    const paginatedPlaces = places.slice(offset, offset + limit)

    // Return pagination-ready response
    return {
        data: paginatedPlaces,
        pagination: {
            total,
            limit,
            offset,
            has_more: offset + limit < total,
            returned: paginatedPlaces.length
        }
    }
}

export default {
    getPlaceById,
    getPlaceByName,
    getAllPlaces,
    getPlacesByType,
    getAllStates,
    searchPlaces,
    listPlaces
}
