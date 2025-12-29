// Data Ingestion Pipeline
// Append-only, validated, auditable ingestion (Stories 193-200)

/**
 * Ingestion Status
 */
export const IngestionStatus = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    SUCCESS: 'success',
    PARTIAL_SUCCESS: 'partial_success',
    FAILED: 'failed'
}

/**
 * Raw Data Store (Story 193: Append-only)
 */
export class RawDataStore {
    constructor() {
        this.records = []
    }

    /**
     * Append record (Story 193: Never overwrite)
     */
    append(record) {
        // Story 193: Raw ingested data is never overwritten
        const timestampedRecord = {
            ...record,
            ingestedAt: new Date().toISOString(),
            id: `raw_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        }

        this.records.push(timestampedRecord)

        // Make immutable
        Object.freeze(timestampedRecord)

        return timestampedRecord.id
    }

    /**
     * Get all records for place
     */
    getRecords(placeId) {
        return this.records.filter(r => r.placeId === placeId)
    }

    /**
     * Get records by source
     */
    getRecordsBySource(sourceId) {
        return this.records.filter(r => r.sourceId === sourceId)
    }
}

/**
 * Transformation Registry (Story 194)
 */
export const TRANSFORMATIONS = {
    NORMALIZE_POPULATION_V1: {
        name: 'normalize_population_v1',
        version: '1.0',
        description: 'Normalize population to per capita',
        function: (value, population) => value / population
    },

    STANDARDIZE_LITERACY_V1: {
        name: 'standardize_literacy_v1',
        version: '1.0',
        description: 'Convert literacy to percentage',
        function: (value) => (value * 100).toFixed(2)
    }
}

/**
 * Ingestion Validator (Story 196)
 */
export class IngestionValidator {
    /**
     * Validate record (Story 196: Fail early)
     */
    static validate(record) {
        const errors = []

        // Story 196: Invalid data fails early
        if (!record.placeId) {
            errors.push('Missing placeId')
        }

        if (!record.sourceId) {
            errors.push('Missing sourceId')
        }

        if (!record.metric) {
            errors.push('Missing metric')
        }

        if (record.value === undefined || record.value === null) {
            errors.push('Missing value')
        }

        // Story 199: Temporal tagging mandatory
        if (!record.effectiveFrom) {
            errors.push('Missing effectiveFrom (temporal tag)')
        }

        if (errors.length > 0) {
            throw new Error(`Validation failed: ${errors.join(', ')}`)
        }

        return { valid: true }
    }
}

/**
 * Ingestion Pipeline (Stories 193-200)
 */
export class IngestionPipeline {
    constructor(sourceId, dryRun = false) {
        this.sourceId = sourceId
        this.dryRun = dryRun // Story 206: Dry-run mode
        this.rawStore = new RawDataStore()
        this.results = {
            total: 0,
            success: 0,
            failed: 0,
            errors: []
        }
    }

    /**
     * Ingest batch of records (Story 197: Partial ingestion allowed)
     */
    async ingestBatch(records) {
        this.results.total = records.length

        for (const record of records) {
            try {
                // Story 196: Validation gate
                IngestionValidator.validate(record)

                // Story 199: Temporal tagging
                const taggedRecord = this.addTemporalTag(record)

                // Story 193: Append to raw store (if not dry-run)
                if (!this.dryRun) {
                    this.rawStore.append(taggedRecord)
                }

                this.results.success++
            } catch (error) {
                // Story 197: One bad record doesn't block others
                this.results.failed++
                this.results.errors.push({
                    record,
                    error: error.message
                })
            }
        }

        return this.getResults()
    }

    /**
     * Add temporal tag (Story 199)
     */
    addTemporalTag(record) {
        // Story 199: Time is inseparable from truth
        if (!record.effectiveFrom) {
            record.effectiveFrom = new Date().toISOString()
        }

        if (!record.effectiveTo) {
            record.effectiveTo = null // Open-ended
        }

        return record
    }

    /**
     * Get ingestion results
     */
    getResults() {
        const status = this.results.failed === 0 ? IngestionStatus.SUCCESS :
            this.results.success > 0 ? IngestionStatus.PARTIAL_SUCCESS :
                IngestionStatus.FAILED

        return {
            status,
            ...this.results,
            dryRun: this.dryRun
        }
    }
}

/**
 * Granularity Enforcement (Story 200)
 */
export function enforceGranularity(requestedLevel, sourceGranularity) {
    const granularityHierarchy = ['national', 'state', 'district', 'tehsil', 'village']

    const requestedIndex = granularityHierarchy.indexOf(requestedLevel)
    const sourceIndex = granularityHierarchy.indexOf(sourceGranularity)

    // Story 200: Prevent false precision
    if (requestedIndex > sourceIndex) {
        return {
            allowed: false,
            reason: `Data cannot be shown below ${sourceGranularity} level`,
            requestedLevel,
            sourceGranularity
        }
    }

    return { allowed: true }
}

export default {
    IngestionStatus,
    RawDataStore,
    TRANSFORMATIONS,
    IngestionValidator,
    IngestionPipeline,
    enforceGranularity
}
