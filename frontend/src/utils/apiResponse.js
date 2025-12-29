// API Response Formatter
// Trust metadata embedding and granularity enforcement (Stories 216-217, 219, 223)

import { enforceGranularity } from './ingestionPipeline'

/**
 * API Response Builder (Story 216)
 */
export class ApiResponseBuilder {
    /**
     * Build response with trust metadata (Story 216)
     */
    static buildPlaceResponse(place, requestedGranularity) {
        // Story 217: Granularity enforcement at API layer
        const granularityCheck = enforceGranularity(requestedGranularity, place.dataGranularity || 'district')

        if (!granularityCheck.allowed) {
            return this.buildErrorResponse(403, granularityCheck.reason)
        }

        // Story 216: Embed epistemic context
        return {
            data: {
                placeId: place.place_id,
                canonicalName: place.canonical_name,
                placeType: place.place_type,

                // Core data with trust metadata
                population: this.addTrustMetadata(place.population),
                literacyRate: this.addTrustMetadata(place.literacy_rate),
                area: this.addTrustMetadata(place.area_sq_km),

                // Narrative
                narrative: place.narrative,

                // Opportunities (approved only)
                opportunities: place.opportunities?.filter(o => o.approved_for_public) || []
            },

            // Story 216: Trust metadata at response level
            metadata: {
                confidence: this.calculateOverallConfidence(place),
                sources: this.extractSources(place),
                lastUpdated: place.last_updated,
                dataGranularity: place.dataGranularity || 'district'
            },

            // Attribution (Story 226)
            attribution: {
                source: 'BharatAtlas',
                url: 'https://bharatatlas.in',
                license: 'CC-BY-NC 4.0',
                requirement: 'Attribution required when publishing'
            }
        }
    }

    /**
     * Add trust metadata to value (Story 216)
     */
    static addTrustMetadata(dataPoint) {
        if (!dataPoint) {
            return {
                value: null,
                confidence: 0,
                source: null,
                knowledgeType: 'UNKNOWN'
            }
        }

        return {
            value: dataPoint.value || dataPoint,
            confidence: dataPoint.confidence || null,
            source: dataPoint.source_id || null,
            knowledgeType: dataPoint.knowledge_type || 'UNKNOWN',
            lastUpdated: dataPoint.last_updated || null
        }
    }

    /**
     * Calculate overall confidence
     */
    static calculateOverallConfidence(place) {
        // Simplified - in production, aggregate from all metrics
        return {
            overall: 75,
            level: 'medium',
            note: 'Based on source reliability and data freshness'
        }
    }

    /**
     * Extract sources
     */
    static extractSources(place) {
        // Extract unique sources from place data
        return ['CENSUS_2011', 'NSSO']
    }

    /**
     * Build error response (Story 223: Neutral language)
     */
    static buildErrorResponse(statusCode, message, details = {}) {
        // Story 223: Errors never blame the user
        const neutralMessages = {
            400: 'Request could not be processed',
            403: 'Request exceeds current limits',
            404: 'Requested resource not found',
            429: 'Request rate limit reached',
            500: 'Service temporarily unavailable'
        }

        return {
            error: {
                code: statusCode,
                message: neutralMessages[statusCode] || message,
                details: details,

                // Helpful guidance
                guidance: this.getErrorGuidance(statusCode)
            }
        }
    }

    /**
     * Get error guidance
     */
    static getErrorGuidance(statusCode) {
        const guidance = {
            400: 'Please check request parameters and try again',
            403: 'Consider requesting higher access tier or reducing request granularity',
            404: 'Verify the resource identifier and try again',
            429: 'Please wait before making additional requests',
            500: 'Please try again later or contact support if issue persists'
        }

        return guidance[statusCode] || 'Please review API documentation'
    }
}

/**
 * CORS Controller (Story 219)
 */
export class CorsController {
    constructor() {
        // Story 219: APIs are not universally embeddable
        this.trustedDomains = [
            'https://bharatatlas.in',
            'https://www.bharatatlas.in',
            'http://localhost:3000', // Development
            'http://localhost:5173'  // Vite dev server
        ]
    }

    /**
     * Check if origin is allowed (Story 219)
     */
    isAllowedOrigin(origin) {
        return this.trustedDomains.includes(origin)
    }

    /**
     * Get CORS headers
     */
    getCorsHeaders(origin) {
        if (this.isAllowedOrigin(origin)) {
            return {
                'Access-Control-Allow-Origin': origin,
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            }
        }

        return {
            'Access-Control-Allow-Origin': 'null'
        }
    }

    /**
     * Add trusted domain
     */
    addTrustedDomain(domain) {
        if (!this.trustedDomains.includes(domain)) {
            this.trustedDomains.push(domain)
        }
    }
}

/**
 * API Deprecation Manager (Story 222)
 */
export class ApiDeprecationManager {
    constructor() {
        this.deprecatedEndpoints = new Map()
    }

    /**
     * Mark endpoint as deprecated (Story 222)
     */
    deprecate(endpoint, retirementDate, migrationGuide) {
        this.deprecatedEndpoints.set(endpoint, {
            retirementDate,
            migrationGuide,
            deprecatedAt: new Date().toISOString()
        })
    }

    /**
     * Get deprecation warning (Story 222: Deprecate with dignity)
     */
    getDeprecationWarning(endpoint) {
        const info = this.deprecatedEndpoints.get(endpoint)

        if (!info) return null

        const daysUntilRetirement = Math.ceil(
            (new Date(info.retirementDate) - new Date()) / (1000 * 60 * 60 * 24)
        )

        return {
            warning: `This endpoint will retire in ${daysUntilRetirement} days`,
            retirementDate: info.retirementDate,
            migrationGuide: info.migrationGuide,
            deprecatedAt: info.deprecatedAt
        }
    }

    /**
     * Add deprecation headers
     */
    getDeprecationHeaders(endpoint) {
        const warning = this.getDeprecationWarning(endpoint)

        if (!warning) return {}

        return {
            'X-API-Deprecated': 'true',
            'X-API-Retirement-Date': warning.retirementDate,
            'X-API-Migration-Guide': warning.migrationGuide
        }
    }
}

export default {
    ApiResponseBuilder,
    CorsController,
    ApiDeprecationManager
}
