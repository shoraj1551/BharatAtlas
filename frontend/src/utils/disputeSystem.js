// Dispute Management System
// Public disputes with lifecycle and minority opinion preservation (Stories 178-180)

/**
 * Dispute States (Story 179)
 */
export const DisputeState = {
    RAISED: 'raised',
    UNDER_REVIEW: 'under_review',
    RESOLVED: 'resolved',
    ARCHIVED: 'archived'
}

/**
 * Resolution Types (Story 186)
 */
export const ResolutionType = {
    CENTRAL_DATA_CONFIRMED: 'central_data_confirmed',
    LOCAL_OVERRIDE: 'local_override',
    CONSENSUS_REACHED: 'consensus_reached',
    ESCALATED: 'escalated'
}

/**
 * Data Dispute (Stories 178-180)
 */
export class DataDispute {
    constructor({ placeId, metric, disputedValue, raisedBy, reason }) {
        this.id = `dispute_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        this.placeId = placeId
        this.metric = metric
        this.disputedValue = disputedValue
        this.currentValue = null // Will be set from existing data

        // Story 179: Formalize disagreement
        this.state = DisputeState.RAISED

        this.raisedBy = raisedBy
        this.raisedAt = new Date().toISOString()
        this.reason = reason

        // Story 178: Disputes are visible, not buried
        this.isPublic = true

        // Tracking
        this.reviews = []
        this.notes = [] // Story 180: Preserve minority views
        this.resolution = null
        this.resolvedAt = null
        this.resolvedBy = null

        // Story 185: Escalation tracking
        this.escalationLevel = 0
        this.lastEscalatedAt = null
    }

    /**
     * Add review comment
     */
    addReview(curatorId, comment, position) {
        this.reviews.push({
            curatorId,
            comment,
            position, // 'support_dispute' or 'support_current'
            reviewedAt: new Date().toISOString()
        })

        if (this.state === DisputeState.RAISED) {
            this.state = DisputeState.UNDER_REVIEW
        }
    }

    /**
     * Resolve dispute (Story 180: Preserve minority opinions)
     */
    resolve(resolvedBy, decision, resolutionType, minorityViews = []) {
        this.state = DisputeState.RESOLVED
        this.resolvedBy = resolvedBy
        this.resolvedAt = new Date().toISOString()

        // Story 186: Local vs national authority resolution
        this.resolution = {
            decision,
            type: resolutionType,
            explanation: this.getResolutionExplanation(resolutionType)
        }

        // Story 180: Minority opinions are preserved
        if (minorityViews.length > 0) {
            minorityViews.forEach(view => {
                this.notes.push({
                    type: 'minority_view',
                    content: view,
                    recordedAt: new Date().toISOString()
                })
            })
        }
    }

    /**
     * Get resolution explanation (Story 186)
     */
    getResolutionExplanation(resolutionType) {
        const explanations = {
            [ResolutionType.CENTRAL_DATA_CONFIRMED]: 'Central/official data confirmed as accurate',
            [ResolutionType.LOCAL_OVERRIDE]: 'Local knowledge overrides central data with documented evidence',
            [ResolutionType.CONSENSUS_REACHED]: 'Curators reached consensus through review',
            [ResolutionType.ESCALATED]: 'Dispute escalated to higher authority'
        }
        return explanations[resolutionType] || 'Resolution type not specified'
    }

    /**
     * Check if dispute needs escalation (Story 185)
     */
    needsEscalation() {
        const daysOpen = this.getDaysOpen()

        // Story 185: Prevent stagnation
        if (daysOpen > 30 && this.state === DisputeState.UNDER_REVIEW) {
            return {
                shouldEscalate: true,
                reason: `Dispute open for ${daysOpen} days without resolution`
            }
        }

        return { shouldEscalate: false }
    }

    /**
     * Escalate dispute (Story 185)
     */
    escalate(escalatedBy, reason) {
        this.escalationLevel++
        this.lastEscalatedAt = new Date().toISOString()

        this.notes.push({
            type: 'escalation',
            content: `Escalated to level ${this.escalationLevel}: ${reason}`,
            escalatedBy,
            recordedAt: new Date().toISOString()
        })
    }

    /**
     * Get days open
     */
    getDaysOpen() {
        const now = new Date()
        const raised = new Date(this.raisedAt)
        return Math.floor((now - raised) / (1000 * 60 * 60 * 24))
    }

    /**
     * Archive dispute
     */
    archive() {
        if (this.state !== DisputeState.RESOLVED) {
            throw new Error('Only resolved disputes can be archived')
        }
        this.state = DisputeState.ARCHIVED
    }
}

/**
 * Get active disputes for place
 */
export function getActiveDisputes(placeId, disputes) {
    return disputes.filter(d =>
        d.placeId === placeId &&
        (d.state === DisputeState.RAISED || d.state === DisputeState.UNDER_REVIEW)
    )
}

/**
 * Check if data is under dispute (Story 178)
 */
export function isDataDisputed(placeId, metric, disputes) {
    const activeDisputes = getActiveDisputes(placeId, disputes)
    return activeDisputes.some(d => d.metric === metric)
}

export default {
    DisputeState,
    ResolutionType,
    DataDispute,
    getActiveDisputes,
    isDataDisputed
}
