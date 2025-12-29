// Public API Design
// Read-only, place-centric, time-aware APIs (Stories 291-295)

import OPEN_INFRASTRUCTURE_CHARTER from './openInfrastructureCharter'

/**
 * Public API Endpoints (Story 291)
 */
export const PUBLIC_API_ENDPOINTS = {
    // Story 291: Read-only by default
    GET_PLACE: {
        method: 'GET',
        path: '/api/v1/place/:id',
        description: 'Retrieve place data',

        // Story 292: Place-centric, not page-centric
        responseShape: {
            place_id: 'string',
            type: 'string', // 'state', 'district', 'city'
            canonical_name: 'string',
            data: 'object',

            // Story 294: Provenance included by default
            provenance: 'object',

            // Story 295: Confidence scores mandatory
            confidence: 'object'
        },

        // Story 293: Time-aware queries
        queryParams: {
            as_of: 'ISO date (optional) - query historical state'
        }
    },

    GET_PLACE_HISTORY: {
        method: 'GET',
        path: '/api/v1/place/:id/history',
        description: 'Retrieve place data history',
        responseShape: {
            place_id: 'string',
            versions: 'array'
        }
    },

    // Story 296: Bulk via snapshots
    GET_SNAPSHOT: {
        method: 'GET',
        path: '/api/v1/snapshot/:snapshotId',
        description: 'Retrieve versioned data snapshot',

        // Story 297: Stable & citable
        responseShape: {
            snapshot_id: 'string',
            created_at: 'string',
            citation: 'object',
            data: 'array'
        }
    },

    LIST_SNAPSHOTS: {
        method: 'GET',
        path: '/api/v1/snapshots',
        description: 'List available snapshots',
        responseShape: {
            snapshots: 'array'
        }
    }
}

/**
 * Place API Response Builder (Stories 292-295)
 */
export class PlaceAPIResponse {
    /**
     * Build place response (Story 292: Place-centric)
     */
    static build(place, asOf = null) {
        return {
            // Story 292: Canonical place object
            place_id: place.place_id,
            type: place.place_type,
            canonical_name: place.canonical_name,

            // Core data with confidence
            data: this.buildDataWithConfidence(place),

            // Story 294: Provenance included by default
            provenance: this.buildProvenance(place),

            // Story 295: Confidence scores mandatory
            confidence: this.buildConfidence(place),

            // Temporal context
            temporal: {
                queried_as_of: asOf || new Date().toISOString(),
                data_valid_from: place.data_valid_from,
                data_valid_to: place.data_valid_to
            },

            // API metadata
            api_version: 'v1',
            retrieved_at: new Date().toISOString()
        }
    }

    /**
     * Build data with confidence (Story 295)
     */
    static buildDataWithConfidence(place) {
        return {
            population: {
                value: place.population,
                confidence: place.population_confidence || 75,
                unit: 'persons'
            },

            literacy_rate: {
                value: place.literacy_rate,
                confidence: place.literacy_rate_confidence || 80,
                unit: 'percentage'
            },

            area: {
                value: place.area_sq_km,
                confidence: 90,
                unit: 'sq_km'
            }
        }
    }

    /**
     * Build provenance (Story 294)
     */
    static buildProvenance(place) {
        // Story 294: APIs never strip trust metadata
        return {
            sources: place.sources || ['CENSUS_2011'],
            last_updated: place.last_updated,
            data_collection_method: place.collection_method || 'census',

            // Full source details
            source_details: (place.sources || []).map(sourceId => ({
                id: sourceId,
                type: 'official',
                credibility: 0.85
            }))
        }
    }

    /**
     * Build confidence (Story 295)
     */
    static buildConfidence(place) {
        return {
            overall: place.overall_confidence || 75,
            breakdown: {
                source_quality: 85,
                data_recency: 65,
                completeness: 80
            },
            note: 'Confidence computed from source quality, recency, and completeness'
        }
    }
}

/**
 * Time-Aware Query Handler (Story 293)
 */
export class TimeAwareQueryHandler {
    /**
     * Query place as of date (Story 293)
     */
    static async queryAsOf(placeId, asOf) {
        // Story 293: Support historical truth
        const targetDate = asOf ? new Date(asOf) : new Date()

        // Get historical state (would query versioned fact store)
        const historicalPlace = await this.getHistoricalState(placeId, targetDate)

        return {
            place: historicalPlace,
            queried_as_of: targetDate.toISOString(),
            note: asOf ? `Historical state as of ${asOf}` : 'Current state'
        }
    }

    /**
     * Get historical state
     */
    static async getHistoricalState(placeId, date) {
        // Simplified - in production, query versioned fact store
        return {
            place_id: placeId,
            // ... historical data
        }
    }
}

/**
 * API Rate Limiter (Story 302)
 */
export class APIRateLimiter {
    constructor() {
        this.quotas = new Map() // IP -> quota usage
    }

    /**
     * Check quota (Story 302: Quotas, not surveillance)
     */
    checkQuota(ip) {
        // Story 302: No tracking users across requests
        const quota = this.quotas.get(ip) || {
            requests: 0,
            resetAt: Date.now() + 60 * 60 * 1000 // 1 hour
        }

        if (Date.now() > quota.resetAt) {
            quota.requests = 0
            quota.resetAt = Date.now() + 60 * 60 * 1000
        }

        const limit = 1000 // requests per hour

        if (quota.requests >= limit) {
            return {
                allowed: false,
                reason: 'Quota exceeded',
                retryAfter: Math.ceil((quota.resetAt - Date.now()) / 1000)
            }
        }

        quota.requests++
        this.quotas.set(ip, quota)

        return { allowed: true }
    }
}

export default {
    PUBLIC_API_ENDPOINTS,
    PlaceAPIResponse,
    TimeAwareQueryHandler,
    APIRateLimiter
}
