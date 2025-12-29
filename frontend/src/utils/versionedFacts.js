// Versioned Facts System
// Append-only, time-indexed truth (Stories 271-276)

/**
 * Fact with Provenance (Story 271)
 */
export class VersionedFact {
    constructor({ placeId, metric, value, sourceId, capturedAt, validFrom, validTo }) {
        // Story 271: Every data point has an origin
        if (!sourceId) {
            throw new Error('Source ID is mandatory - no anonymous facts')
        }

        this.id = `fact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        this.placeId = placeId
        this.metric = metric
        this.value = value

        // Story 271: Provenance
        this.sourceId = sourceId
        this.capturedAt = capturedAt || new Date().toISOString()

        // Story 274: Time-indexed truth
        this.validFrom = validFrom || capturedAt
        this.validTo = validTo || null // null = still valid

        // Story 273: Versioning
        this.version = 1
        this.previousVersion = null

        // Story 283: Machine inference labeling
        this.inferred = false
        this.inferenceMethod = null

        // Story 279: Deprecation, not deletion
        this.status = 'active' // 'active', 'deprecated', 'superseded'
        this.deprecatedAt = null
        this.deprecationReason = null

        // Metadata
        this.createdAt = new Date().toISOString()
        this.createdBy = null

        // Story 282: Human overrides
        this.isOverride = false
        this.overrideReason = null
    }

    /**
     * Create new version (Story 273: Versioned, not overwritten)
     */
    createNewVersion(newValue, sourceId, reason) {
        const newVersion = new VersionedFact({
            placeId: this.placeId,
            metric: this.metric,
            value: newValue,
            sourceId,
            capturedAt: new Date().toISOString(),
            validFrom: new Date().toISOString(),
            validTo: null
        })

        // Story 273: Append-only
        newVersion.version = this.version + 1
        newVersion.previousVersion = this.id

        // Close validity of current version
        this.validTo = new Date().toISOString()
        this.status = 'superseded'

        return newVersion
    }

    /**
     * Deprecate fact (Story 279: No deletions)
     */
    deprecate(reason) {
        // Story 279: Bad data is deprecated, not erased
        this.status = 'deprecated'
        this.deprecatedAt = new Date().toISOString()
        this.deprecationReason = reason
        this.validTo = new Date().toISOString()
    }

    /**
     * Mark as inferred (Story 283)
     */
    markAsInferred(method) {
        // Story 283: AI-derived data is never silent
        this.inferred = true
        this.inferenceMethod = method
    }

    /**
     * Mark as human override (Story 282)
     */
    markAsOverride(reason, overriddenBy) {
        // Story 282: Human overrides are traceable
        if (!reason) {
            throw new Error('Override reason is mandatory')
        }

        this.isOverride = true
        this.overrideReason = reason
        this.createdBy = overriddenBy
    }
}

/**
 * Fact Store (Stories 273-276)
 */
export class FactStore {
    constructor() {
        this.facts = new Map() // factId -> VersionedFact
        this.factsByPlace = new Map() // placeId -> Set(factIds)
        this.factsByMetric = new Map() // placeId_metric -> [factIds]
    }

    /**
     * Add fact
     */
    addFact(fact) {
        this.facts.set(fact.id, fact)

        // Index by place
        if (!this.factsByPlace.has(fact.placeId)) {
            this.factsByPlace.set(fact.placeId, new Set())
        }
        this.factsByPlace.get(fact.placeId).add(fact.id)

        // Index by place+metric
        const key = `${fact.placeId}_${fact.metric}`
        if (!this.factsByMetric.has(key)) {
            this.factsByMetric.set(key, [])
        }
        this.factsByMetric.get(key).push(fact.id)
    }

    /**
     * Get current fact (Story 274: Time-indexed)
     */
    getCurrentFact(placeId, metric, asOf = null) {
        const key = `${placeId}_${metric}`
        const factIds = this.factsByMetric.get(key) || []

        const targetDate = asOf ? new Date(asOf) : new Date()

        // Story 275: Historical views are queryable
        const validFacts = factIds
            .map(id => this.facts.get(id))
            .filter(fact => {
                const validFrom = new Date(fact.validFrom)
                const validTo = fact.validTo ? new Date(fact.validTo) : new Date()

                return targetDate >= validFrom && targetDate <= validTo && fact.status === 'active'
            })
            .sort((a, b) => new Date(b.validFrom) - new Date(a.validFrom))

        return validFacts[0] || null
    }

    /**
     * Get all versions (Story 273)
     */
    getAllVersions(placeId, metric) {
        const key = `${placeId}_${metric}`
        const factIds = this.factsByMetric.get(key) || []

        return factIds
            .map(id => this.facts.get(id))
            .sort((a, b) => a.version - b.version)
    }

    /**
     * Get conflicting facts (Story 276)
     */
    getConflictingFacts(placeId, metric) {
        // Story 276: Multiple truths allowed
        const key = `${placeId}_${metric}`
        const factIds = this.factsByMetric.get(key) || []

        const activeFacts = factIds
            .map(id => this.facts.get(id))
            .filter(fact => fact.status === 'active')

        if (activeFacts.length > 1) {
            return {
                hasConflict: true,
                facts: activeFacts,
                note: 'Multiple active facts exist for this metric'
            }
        }

        return { hasConflict: false }
    }
}

/**
 * Historical Query (Story 275)
 */
export class HistoricalQuery {
    /**
     * Query place state as of date (Story 275: Time-travel)
     */
    static queryAsOf(placeId, asOf, factStore) {
        const placeFactIds = factStore.factsByPlace.get(placeId) || new Set()
        const targetDate = new Date(asOf)

        const snapshot = {}

        placeFactIds.forEach(factId => {
            const fact = factStore.facts.get(factId)

            const validFrom = new Date(fact.validFrom)
            const validTo = fact.validTo ? new Date(fact.validTo) : new Date()

            if (targetDate >= validFrom && targetDate <= validTo) {
                snapshot[fact.metric] = {
                    value: fact.value,
                    sourceId: fact.sourceId,
                    version: fact.version,
                    validFrom: fact.validFrom,
                    validTo: fact.validTo
                }
            }
        })

        return {
            placeId,
            asOf,
            snapshot,
            note: `Historical state as of ${asOf}`
        }
    }
}

export default {
    VersionedFact,
    FactStore,
    HistoricalQuery
}
