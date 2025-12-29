// Trust Computation & Source Credibility
// Computed confidence and dynamic source trust (Stories 272, 277-278, 285, 288)

/**
 * Source Entity (Story 272)
 */
export class Source {
    constructor({ id, name, type, organization, credibilityNotes }) {
        // Story 272: Sources are first-class entities
        this.id = id
        this.name = name
        this.type = type // 'gov', 'survey', 'oral', 'academic', 'ngo'
        this.organization = organization
        this.credibilityNotes = credibilityNotes

        // Story 285: Source credibility evolves
        this.baseCredibility = this.getBaseCredibility(type)
        this.credibilityHistory = []
        this.currentCredibility = this.baseCredibility

        this.createdAt = new Date().toISOString()
        this.lastUpdated = new Date().toISOString()
    }

    /**
     * Get base credibility by type
     */
    getBaseCredibility(type) {
        const baseCredibility = {
            'gov': 0.85,
            'academic': 0.80,
            'survey': 0.75,
            'ngo': 0.70,
            'oral': 0.60,
            'community': 0.55
        }
        return baseCredibility[type] || 0.50
    }

    /**
     * Update credibility (Story 285: Dynamic)
     */
    updateCredibility(newCredibility, reason) {
        this.credibilityHistory.push({
            oldCredibility: this.currentCredibility,
            newCredibility,
            reason,
            updatedAt: new Date().toISOString()
        })

        this.currentCredibility = newCredibility
        this.lastUpdated = new Date().toISOString()
    }
}

/**
 * Trust Computation Engine (Story 277)
 */
export class TrustComputationEngine {
    /**
     * Calculate confidence (Story 277: Computed, not declared)
     */
    static calculateConfidence(fact, allFacts, sources) {
        // Story 277: confidence = f(source_count, recency, agreement)

        const sourceConfidence = this.getSourceConfidence(fact.sourceId, sources)
        const recencyFactor = this.getRecencyFactor(fact.capturedAt)
        const agreementFactor = this.getAgreementFactor(fact, allFacts)

        // Weighted combination
        const confidence = (
            sourceConfidence * 0.5 +
            recencyFactor * 0.3 +
            agreementFactor * 0.2
        )

        return {
            overall: Math.round(confidence * 100),
            breakdown: {
                sourceConfidence: Math.round(sourceConfidence * 100),
                recencyFactor: Math.round(recencyFactor * 100),
                agreementFactor: Math.round(agreementFactor * 100)
            },
            computation: 'Weighted: source(50%) + recency(30%) + agreement(20%)'
        }
    }

    /**
     * Get source confidence
     */
    static getSourceConfidence(sourceId, sources) {
        const source = sources.get(sourceId)
        return source ? source.currentCredibility : 0.5
    }

    /**
     * Get recency factor (Story 278: Trust decays over time)
     */
    static getRecencyFactor(capturedAt) {
        const now = new Date()
        const captured = new Date(capturedAt)
        const yearsOld = (now - captured) / (1000 * 60 * 60 * 24 * 365)

        // Story 278: Temporal trust decay
        const decayFactor = Math.exp(-0.1 * yearsOld) // Exponential decay

        return Math.max(0.3, decayFactor) // Floor at 30%
    }

    /**
     * Get agreement factor
     */
    static getAgreementFactor(fact, allFacts) {
        // Check how many other sources agree
        const samePlaceMetric = allFacts.filter(f =>
            f.placeId === fact.placeId &&
            f.metric === fact.metric &&
            f.status === 'active'
        )

        if (samePlaceMetric.length === 1) {
            return 0.7 // Single source
        }

        const agreeing = samePlaceMetric.filter(f =>
            Math.abs(f.value - fact.value) / fact.value < 0.1 // Within 10%
        )

        return agreeing.length / samePlaceMetric.length
    }
}

/**
 * Localized Trust (Story 288)
 */
export class LocalizedTrust {
    constructor() {
        this.regionalTrust = new Map() // region -> sourceId -> trust
    }

    /**
     * Get trust for region (Story 288: Trust is local, not global)
     */
    getTrust(sourceId, region) {
        if (!this.regionalTrust.has(region)) {
            return null // Use global trust
        }

        const regionalSources = this.regionalTrust.get(region)
        return regionalSources.get(sourceId) || null
    }

    /**
     * Set regional trust
     */
    setRegionalTrust(sourceId, region, trust, reason) {
        if (!this.regionalTrust.has(region)) {
            this.regionalTrust.set(region, new Map())
        }

        this.regionalTrust.get(region).set(sourceId, {
            trust,
            reason,
            setAt: new Date().toISOString()
        })
    }
}

/**
 * Trust Signals (Story 281)
 */
export class TrustSignals {
    /**
     * Get public trust signals (Story 281)
     */
    static getPublicSignals(fact, confidence) {
        // Story 281: Separate public trust from ops trust
        return {
            confidence: confidence.overall,
            sourceType: fact.sourceType,
            dataAge: this.getDataAge(fact.capturedAt),
            isInferred: fact.inferred,
            hasConflicts: false // Would check from store
        }
    }

    /**
     * Get internal trust signals (ops only)
     */
    static getInternalSignals(fact, confidence) {
        return {
            ...this.getPublicSignals(fact, confidence),

            // Internal only
            sourceCredibilityHistory: [],
            reviewHistory: [],
            flagCount: 0,
            disputeCount: 0
        }
    }

    /**
     * Get data age
     */
    static getDataAge(capturedAt) {
        const now = new Date()
        const captured = new Date(capturedAt)
        const years = (now - captured) / (1000 * 60 * 60 * 24 * 365)

        return {
            years: Math.floor(years),
            label: years < 1 ? 'recent' : years < 5 ? 'moderate' : 'old'
        }
    }
}

export default {
    Source,
    TrustComputationEngine,
    LocalizedTrust,
    TrustSignals
}
