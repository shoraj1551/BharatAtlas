// Contextual Reputation & Conflict Management
// Place-specific reputation and conflict preservation (Stories 258, 260, 263-265, 269)

/**
 * Contextual Reputation (Story 258)
 */
export class ContextualReputation {
    constructor() {
        // Story 258: Reputation is contextual, not global
        this.reputation = new Map() // contributorId -> Map(placeId -> score)
    }

    /**
     * Add reputation (Story 258: Per region, not globally)
     */
    addReputation(contributorId, placeId, points = 1) {
        if (!this.reputation.has(contributorId)) {
            this.reputation.set(contributorId, new Map())
        }

        const contributorRep = this.reputation.get(contributorId)
        const currentScore = contributorRep.get(placeId) || 0
        contributorRep.set(placeId, currentScore + points)
    }

    /**
     * Get reputation for place
     */
    getReputation(contributorId, placeId) {
        const contributorRep = this.reputation.get(contributorId)
        if (!contributorRep) return 0

        return contributorRep.get(placeId) || 0
    }

    /**
     * Get total reputation (across all places)
     */
    getTotalReputation(contributorId) {
        const contributorRep = this.reputation.get(contributorId)
        if (!contributorRep) return 0

        return Array.from(contributorRep.values()).reduce((sum, score) => sum + score, 0)
    }

    /**
     * Check if contributor has local expertise
     */
    hasLocalExpertise(contributorId, placeId, threshold = 10) {
        return this.getReputation(contributorId, placeId) >= threshold
    }
}

/**
 * Conflict Preservation (Story 260)
 */
export class ConflictPreservation {
    constructor() {
        this.conflicts = new Map() // placeId_metric -> conflicts
    }

    /**
     * Record conflict (Story 260: Disagreements stored, not erased)
     */
    recordConflict(placeId, metric, contributions) {
        const key = `${placeId}_${metric}`

        const conflict = {
            placeId,
            metric,
            contributions: contributions.map(c => ({
                id: c.id,
                value: c.content,
                source: c.source,
                contributedBy: c.contributedBy,
                contributedAt: c.contributedAt,
                evidence: c.evidence || []
            })),
            recordedAt: new Date().toISOString(),

            // Story 260: Preserve plurality
            status: 'active',
            note: 'Multiple accounts exist for this'
        }

        this.conflicts.set(key, conflict)

        return conflict
    }

    /**
     * Get conflicts for place
     */
    getConflicts(placeId) {
        return Array.from(this.conflicts.values())
            .filter(c => c.placeId === placeId && c.status === 'active')
    }

    /**
     * Check if metric has conflict
     */
    hasConflict(placeId, metric) {
        const key = `${placeId}_${metric}`
        return this.conflicts.has(key)
    }
}

/**
 * Structured Rebuttal (Story 263)
 */
export class StructuredRebuttal {
    /**
     * Create rebuttal (Story 263: Factual disagreement)
     */
    static create({ claimId, rebuttalBy, counterEvidence, reasoning }) {
        // Story 263: Disagreements must be factual
        if (!counterEvidence || counterEvidence.length === 0) {
            throw new Error('Rebuttal requires counter-evidence')
        }

        const rebuttal = {
            id: `rebuttal_${Date.now()}`,
            claimId,
            rebuttalBy,
            counterEvidence,
            reasoning,
            createdAt: new Date().toISOString(),

            // Story 262: No comment threads - structured only
            type: 'structured_rebuttal',
            status: 'pending_review'
        }

        return rebuttal
    }

    /**
     * Validate rebuttal
     */
    static validate(rebuttal) {
        const errors = []

        if (!rebuttal.counterEvidence || rebuttal.counterEvidence.length === 0) {
            errors.push('Counter-evidence required')
        }

        if (!rebuttal.reasoning) {
            errors.push('Reasoning required')
        }

        // Check for hostile language
        if (this.containsHostileLanguage(rebuttal.reasoning)) {
            errors.push('Rebuttal must be factual, not hostile')
        }

        return {
            valid: errors.length === 0,
            errors
        }
    }

    /**
     * Check for hostile language
     */
    static containsHostileLanguage(text) {
        const hostileIndicators = ['stupid', 'idiot', 'wrong', 'liar', 'fake']
        const lowerText = text.toLowerCase()
        return hostileIndicators.some(word => lowerText.includes(word))
    }
}

/**
 * Expert Flags (Story 264)
 */
export class ExpertFlags {
    constructor() {
        this.experts = new Map() // contributorId -> expertise areas
    }

    /**
     * Flag as expert (Story 264: Non-elite recognition)
     */
    flagAsExpert(contributorId, expertiseAreas, verifiedBy) {
        this.experts.set(contributorId, {
            areas: expertiseAreas,
            verifiedBy,
            verifiedAt: new Date().toISOString(),

            // Story 264: Expert flag → review priority only
            benefit: 'review_priority',
            note: 'Experts are recognized, not elevated'
        })
    }

    /**
     * Check if expert
     */
    isExpert(contributorId) {
        return this.experts.has(contributorId)
    }

    /**
     * Get expertise areas
     */
    getExpertise(contributorId) {
        return this.experts.get(contributorId) || null
    }

    /**
     * Get review priority
     */
    getReviewPriority(contributorId) {
        return this.isExpert(contributorId) ? 'high' : 'normal'
    }
}

/**
 * Contribution History (Story 269)
 */
export class ContributionHistory {
    constructor() {
        this.history = []
    }

    /**
     * Record contribution (Story 269: Immutable)
     */
    record(contribution) {
        const entry = {
            contributionId: contribution.id,
            placeId: contribution.placeId,
            type: contribution.type,
            content: contribution.content,
            contributedBy: contribution.contributedBy,
            contributedAt: contribution.contributedAt,
            status: contribution.status
        }

        // Story 269: Edits never erase past
        Object.freeze(entry)
        this.history.push(entry)
    }

    /**
     * Get history for place
     */
    getPlaceHistory(placeId) {
        return this.history.filter(h => h.placeId === placeId)
    }

    /**
     * Get contributor history
     */
    getContributorHistory(contributorId) {
        return this.history.filter(h => h.contributedBy === contributorId)
    }
}

export default {
    ContextualReputation,
    ConflictPreservation,
    StructuredRebuttal,
    ExpertFlags,
    ContributionHistory
}
