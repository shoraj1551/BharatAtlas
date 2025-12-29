// Data Storage Separation & Multi-Source Merging
// Raw vs curated separation and conflict resolution (Stories 195, 201-203, 205)

/**
 * Data Storage Paths (Story 195)
 */
export const STORAGE_PATHS = {
    RAW: '/raw',
    CURATED: '/curated',
    TRANSFORMED: '/transformed',
    ARCHIVED: '/archived'
}

/**
 * Data Separation Manager (Story 195)
 */
export class DataSeparationManager {
    constructor() {
        this.rawData = new Map() // Story 195: Raw data never mixes with curated
        this.curatedData = new Map()
    }

    /**
     * Store raw data (Story 195: Prevent contamination)
     */
    storeRaw(sourceId, data) {
        const path = `${STORAGE_PATHS.RAW}/${sourceId}`

        if (!this.rawData.has(path)) {
            this.rawData.set(path, [])
        }

        this.rawData.get(path).push({
            ...data,
            storedAt: new Date().toISOString()
        })
    }

    /**
     * Store curated data
     */
    storeCurated(placeId, data) {
        const path = `${STORAGE_PATHS.CURATED}/place_profiles/${placeId}`
        this.curatedData.set(path, data)
    }

    /**
     * Get raw data
     */
    getRaw(sourceId) {
        const path = `${STORAGE_PATHS.RAW}/${sourceId}`
        return this.rawData.get(path) || []
    }

    /**
     * Get curated data
     */
    getCurated(placeId) {
        const path = `${STORAGE_PATHS.CURATED}/place_profiles/${placeId}`
        return this.curatedData.get(path) || null
    }
}

/**
 * Multi-Source Merger (Story 201)
 */
export class MultiSourceMerger {
    /**
     * Merge data from multiple sources (Story 201: Deterministic conflict resolution)
     */
    static merge(placeId, metric, sources) {
        if (sources.length === 0) {
            return null
        }

        if (sources.length === 1) {
            return sources[0]
        }

        // Story 201: Resolve conflicts transparently
        return this.resolveConflict(sources)
    }

    /**
     * Resolve conflict between sources (Story 201)
     */
    static resolveConflict(sources) {
        // Story 201: Choose higher reliability
        const sorted = sources.sort((a, b) => {
            // Primary: Reliability
            if (b.reliability !== a.reliability) {
                return b.reliability - a.reliability
            }

            // Secondary: Recency
            const dateA = new Date(a.effectiveFrom)
            const dateB = new Date(b.effectiveFrom)
            return dateB - dateA
        })

        const chosen = sorted[0]
        const alternatives = sorted.slice(1)

        return {
            value: chosen.value,
            sourceId: chosen.sourceId,
            reliability: chosen.reliability,
            effectiveFrom: chosen.effectiveFrom,

            // Story 201: Transparency - show what was not chosen
            conflictResolution: {
                method: 'higher_reliability',
                alternativeSources: alternatives.map(a => ({
                    sourceId: a.sourceId,
                    value: a.value,
                    reliability: a.reliability,
                    reason: 'Lower reliability or older data'
                }))
            }
        }
    }
}

/**
 * Manual Upload Handler (Story 202)
 */
export class ManualUploadHandler {
    /**
     * Handle CSV upload (Story 202: Support human-sourced truth)
     */
    static async uploadCSV(file, uploadedBy, options = {}) {
        const requiresReview = options.requiresReview !== false // Default true

        const upload = {
            id: `upload_${Date.now()}`,
            file: file.name,
            uploadedBy,
            uploadedAt: new Date().toISOString(),
            status: requiresReview ? 'pending_review' : 'processing',
            requiresReview,
            records: []
        }

        // Parse CSV (simplified - in production use proper CSV parser)
        const records = await this.parseCSV(file)
        upload.records = records
        upload.recordCount = records.length

        return upload
    }

    /**
     * Parse CSV file
     */
    static async parseCSV(file) {
        // Simplified parser - production would use papaparse or similar
        return []
    }
}

/**
 * Source Failure Handler (Story 203)
 */
export class SourceFailureHandler {
    constructor() {
        this.sourceHealth = new Map()
    }

    /**
     * Mark source as unavailable (Story 203: Design for missing feeds)
     */
    markUnavailable(sourceId, reason) {
        this.sourceHealth.set(sourceId, {
            status: 'unavailable',
            reason,
            markedAt: new Date().toISOString(),
            lastAttempt: new Date().toISOString()
        })

        // Story 203: A dead source doesn't kill the system
        console.warn(`[SOURCE FAILURE] ${sourceId}: ${reason}`)
    }

    /**
     * Mark data as stale (Story 203)
     */
    markStale(sourceId) {
        const health = this.sourceHealth.get(sourceId) || {}
        health.dataStatus = 'stale'
        health.markedStaleAt = new Date().toISOString()
        this.sourceHealth.set(sourceId, health)
    }

    /**
     * Check if source is available
     */
    isAvailable(sourceId) {
        const health = this.sourceHealth.get(sourceId)
        return !health || health.status !== 'unavailable'
    }

    /**
     * Get source health
     */
    getHealth(sourceId) {
        return this.sourceHealth.get(sourceId) || { status: 'healthy' }
    }
}

/**
 * Schema Evolution Handler (Story 205)
 */
export class SchemaEvolutionHandler {
    /**
     * Handle missing field (Story 205: Handle schema drift safely)
     */
    static handleMissingField(record, fieldName) {
        // Story 205: If field doesn't exist, set unknown
        if (!record.hasOwnProperty(fieldName)) {
            record[fieldName] = {
                value: null,
                status: 'unknown',
                reason: 'Field not present in source schema'
            }
        }
        return record
    }

    /**
     * Handle schema change
     */
    static handleSchemaChange(oldSchema, newSchema) {
        const added = Object.keys(newSchema).filter(k => !oldSchema.hasOwnProperty(k))
        const removed = Object.keys(oldSchema).filter(k => !newSchema.hasOwnProperty(k))
        const changed = Object.keys(newSchema).filter(k =>
            oldSchema.hasOwnProperty(k) && oldSchema[k] !== newSchema[k]
        )

        return {
            added,
            removed,
            changed,
            hasChanges: added.length > 0 || removed.length > 0 || changed.length > 0
        }
    }
}

export default {
    STORAGE_PATHS,
    DataSeparationManager,
    MultiSourceMerger,
    ManualUploadHandler,
    SourceFailureHandler,
    SchemaEvolutionHandler
}
