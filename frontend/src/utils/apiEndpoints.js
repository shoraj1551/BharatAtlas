// API Endpoint Registry
// Explicit purpose declarations and versioning (Stories 211-212, 214)

/**
 * API Version
 */
export const API_VERSION = 'v1'

/**
 * API Endpoint Registry (Stories 211-212)
 */
export const API_ENDPOINTS = {
    // Story 211: Public read API
    GET_PLACE: {
        path: `/api/${API_VERSION}/place/:placeId`,
        method: 'GET',
        version: API_VERSION,

        // Story 212: Explicit purpose declaration
        purpose: 'Retrieve place profile for public viewing',
        description: 'Returns comprehensive place data including demographics, infrastructure, and opportunities',

        auth: false, // No auth required
        rateLimit: 'anonymous',

        response: {
            includesTrustMetadata: true, // Story 216
            includesSourceInfo: true
        }
    },

    GET_PLACE_NARRATIVE: {
        path: `/api/${API_VERSION}/place/:placeId/narrative`,
        method: 'GET',
        version: API_VERSION,
        purpose: 'Retrieve place narrative and story',
        description: 'Returns curated narrative sections with confidence scores',
        auth: false,
        rateLimit: 'anonymous'
    },

    GET_PLACE_OPPORTUNITIES: {
        path: `/api/${API_VERSION}/place/:placeId/opportunities`,
        method: 'GET',
        version: API_VERSION,
        purpose: 'Retrieve opportunity signals for place',
        description: 'Returns approved opportunities with feasibility assessments',
        auth: false,
        rateLimit: 'anonymous'
    },

    SEARCH_PLACES: {
        path: `/api/${API_VERSION}/search`,
        method: 'GET',
        version: API_VERSION,
        purpose: 'Search for places by name or criteria',
        description: 'Returns matching places with basic metadata',
        auth: false,
        rateLimit: 'anonymous',

        // Story 215: No bulk dump
        maxResults: 50
    },

    GET_SOURCES: {
        path: `/api/${API_VERSION}/sources`,
        method: 'GET',
        version: API_VERSION,
        purpose: 'List all data sources with metadata',
        description: 'Returns source registry with reliability and coverage info',
        auth: false,
        rateLimit: 'anonymous'
    },

    GET_GOVERNANCE_LOGS: {
        path: `/api/${API_VERSION}/governance/logs`,
        method: 'GET',
        version: API_VERSION,
        purpose: 'Retrieve public governance logs',
        description: 'Returns recent governance actions and decisions',
        auth: false,
        rateLimit: 'anonymous',
        maxResults: 100
    },

    // Story 220: No write APIs (public)
    // POST, PUT, DELETE endpoints return 403
}

/**
 * Get endpoint definition
 */
export function getEndpoint(name) {
    return API_ENDPOINTS[name] || null
}

/**
 * Check if endpoint allows writes (Story 220)
 */
export function allowsWrites(endpoint) {
    // Story 220: Mutation is never public
    return endpoint.method !== 'GET' && endpoint.auth === true
}

/**
 * Get API version
 */
export function getApiVersion() {
    return API_VERSION
}

export default {
    API_VERSION,
    API_ENDPOINTS,
    getEndpoint,
    allowsWrites,
    getApiVersion
}
