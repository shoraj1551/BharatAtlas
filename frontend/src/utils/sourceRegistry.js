// Source Registry
// First-class data source management (Stories 191-192)

/**
 * Source Types
 */
export const SourceType = {
    OFFICIAL_GOVERNMENT: 'official',
    ACADEMIC: 'academic',
    NGO: 'ngo',
    COMMUNITY: 'community',
    COMMERCIAL: 'commercial'
}

/**
 * Source Status (Story 210)
 */
export const SourceStatus = {
    ACTIVE: 'active',
    STALE: 'stale',
    RETIRED: 'retired',
    DEPRECATED: 'deprecated'
}

/**
 * Data Sources Registry (Story 191)
 */
export const SOURCES = {
    CENSUS_2011: {
        id: 'CENSUS_2011',
        name: 'Census of India 2011',
        type: SourceType.OFFICIAL_GOVERNMENT,
        reliability: 0.9,
        status: SourceStatus.ACTIVE,

        // Story 192: Source metadata is mandatory
        metadata: {
            coverage: 'national',
            granularity: 'district',
            lastUpdated: '2011',
            updateFrequency: '10 years',
            scope: 'Population, demographics, literacy, housing',
            limits: 'Does not capture informal economy, homeless population may be undercounted',
            url: 'https://censusindia.gov.in',
            contactEmail: 'census@gov.in'
        },

        // Story 204: Cost awareness
        ingestionCost: {
            estimated: 'low',
            reasoning: 'Static dataset, one-time download'
        }
    },

    NSSO: {
        id: 'NSSO',
        name: 'National Sample Survey Office',
        type: SourceType.OFFICIAL_GOVERNMENT,
        reliability: 0.85,
        status: SourceStatus.ACTIVE,

        metadata: {
            coverage: 'national',
            granularity: 'state',
            lastUpdated: '2019',
            updateFrequency: 'annual',
            scope: 'Employment, consumption, household surveys',
            limits: 'Sample-based, not comprehensive census',
            url: 'https://mospi.gov.in/nsso',
            contactEmail: 'nsso@gov.in'
        },

        ingestionCost: {
            estimated: 'medium',
            reasoning: 'Annual updates, requires processing'
        }
    },

    NITI_AAYOG: {
        id: 'NITI_AAYOG',
        name: 'NITI Aayog Development Indicators',
        type: SourceType.OFFICIAL_GOVERNMENT,
        reliability: 0.8,
        status: SourceStatus.ACTIVE,

        metadata: {
            coverage: 'national',
            granularity: 'district',
            lastUpdated: '2023',
            updateFrequency: 'quarterly',
            scope: 'Development indices, aspirational districts',
            limits: 'Composite indices, methodology may change',
            url: 'https://niti.gov.in',
            contactEmail: 'data@niti.gov.in'
        },

        ingestionCost: {
            estimated: 'medium',
            reasoning: 'Quarterly updates, API access'
        }
    },

    COMMUNITY_REPORTS: {
        id: 'COMMUNITY_REPORTS',
        name: 'Community-Sourced Reports',
        type: SourceType.COMMUNITY,
        reliability: 0.6,
        status: SourceStatus.ACTIVE,

        metadata: {
            coverage: 'variable',
            granularity: 'village',
            lastUpdated: 'ongoing',
            updateFrequency: 'continuous',
            scope: 'Local observations, ground reports',
            limits: 'Unverified, requires curation, potential bias',
            url: null,
            contactEmail: 'community@bharatatlas.in'
        },

        ingestionCost: {
            estimated: 'low',
            reasoning: 'Manual uploads, no API costs'
        }
    }
}

/**
 * Get source by ID (Story 191)
 */
export function getSource(sourceId) {
    return SOURCES[sourceId] || null
}

/**
 * Get active sources
 */
export function getActiveSources() {
    return Object.values(SOURCES).filter(s => s.status === SourceStatus.ACTIVE)
}

/**
 * Get sources by type
 */
export function getSourcesByType(type) {
    return Object.values(SOURCES).filter(s => s.type === type)
}

/**
 * Validate source metadata (Story 192)
 */
export function validateSourceMetadata(source) {
    const required = ['coverage', 'granularity', 'lastUpdated', 'scope', 'limits']
    const missing = required.filter(field => !source.metadata[field])

    if (missing.length > 0) {
        return {
            valid: false,
            errors: [`Missing required metadata: ${missing.join(', ')}`]
        }
    }

    return { valid: true }
}

/**
 * Retire source (Story 210)
 */
export function retireSource(sourceId, reason) {
    const source = SOURCES[sourceId]
    if (!source) {
        throw new Error(`Source ${sourceId} not found`)
    }

    // Story 210: Retire sources gracefully, not erase
    source.status = SourceStatus.RETIRED
    source.retiredAt = new Date().toISOString()
    source.retirementReason = reason

    return {
        sourceId,
        status: SourceStatus.RETIRED,
        message: `Source ${sourceId} retired: ${reason}`
    }
}

export default {
    SourceType,
    SourceStatus,
    SOURCES,
    getSource,
    getActiveSources,
    getSourcesByType,
    validateSourceMetadata,
    retireSource
}
