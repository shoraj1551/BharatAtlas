// Edit History & Governance Transparency
// Immutable history and public accountability (Stories 181-182, 187-189)

/**
 * Edit History Entry (Story 181: Immutable)
 */
export class EditHistoryEntry {
    constructor({ placeId, metric, oldValue, newValue, editedBy, reason, evidence }) {
        this.id = `edit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        this.placeId = placeId
        this.metric = metric
        this.oldValue = oldValue
        this.newValue = newValue
        this.editedBy = editedBy
        this.editedAt = new Date().toISOString()
        this.reason = reason
        this.evidence = evidence || []

        // Story 181: Truth has memory - freeze to prevent modification
        Object.freeze(this)
    }
}

/**
 * Edit History Manager (Story 181)
 */
export class EditHistory {
    constructor() {
        this.entries = []
    }

    /**
     * Add edit to history (Story 181: Never rewrite history)
     */
    addEdit(entry) {
        // Freeze entry to make it immutable
        const frozenEntry = Object.freeze(entry)
        this.entries.push(frozenEntry)

        // Story 181: Edit history is immutable
        Object.freeze(this.entries)
    }

    /**
     * Get history for place
     */
    getPlaceHistory(placeId) {
        return this.entries.filter(e => e.placeId === placeId)
    }

    /**
     * Get history for metric
     */
    getMetricHistory(placeId, metric) {
        return this.entries.filter(e => e.placeId === placeId && e.metric === metric)
    }
}

/**
 * Deletion Record (Story 188: No silent deletions)
 */
export class DeletionRecord {
    constructor({ placeId, metric, deletedValue, deletedBy, reason }) {
        this.id = `deletion_${Date.now()}`
        this.placeId = placeId
        this.metric = metric
        this.deletedValue = deletedValue
        this.deletedBy = deletedBy
        this.deletedAt = new Date().toISOString()
        this.reason = reason

        // Story 188: Ban silent erasure
        this.status = 'deprecated'
        this.isVisible = true // Deletion is traceable

        Object.freeze(this)
    }
}

/**
 * Governance Log Entry (Story 187)
 */
export class GovernanceLogEntry {
    constructor({ action, performedBy, details, affectedEntities }) {
        this.id = `gov_log_${Date.now()}`
        this.action = action // 'approve_proposal', 'resolve_dispute', 'escalate', etc.
        this.performedBy = performedBy
        this.performedAt = new Date().toISOString()
        this.details = details
        this.affectedEntities = affectedEntities // places, metrics, proposals, disputes

        Object.freeze(this)
    }
}

/**
 * Governance Log (Story 187: Public decision trails)
 */
export class GovernanceLog {
    constructor() {
        this.entries = []
    }

    /**
     * Log governance action (Story 187)
     */
    logAction(entry) {
        const frozenEntry = Object.freeze(entry)
        this.entries.push(frozenEntry)
    }

    /**
     * Get recent actions
     */
    getRecentActions(limit = 50) {
        return this.entries.slice(-limit).reverse()
    }

    /**
     * Get actions by curator
     */
    getActionsByCurator(curatorId) {
        return this.entries.filter(e => e.performedBy === curatorId)
    }

    /**
     * Publish log (Story 187: Expose decision trails)
     */
    publish() {
        return {
            totalActions: this.entries.length,
            recentActions: this.getRecentActions(100),
            publishedAt: new Date().toISOString()
        }
    }
}

/**
 * Governance Load Monitor (Story 189)
 */
export class GovernanceLoadMonitor {
    constructor(threshold = 50) {
        this.threshold = threshold
        this.pendingReviews = 0
        this.pendingDisputes = 0
    }

    /**
     * Update pending counts
     */
    update(proposals, disputes) {
        this.pendingReviews = proposals.filter(p => p.status === 'pending_review').length
        this.pendingDisputes = disputes.filter(d =>
            d.state === 'raised' || d.state === 'under_review'
        ).length
    }

    /**
     * Check if governance is stressed (Story 189)
     */
    checkStress() {
        const totalPending = this.pendingReviews + this.pendingDisputes

        if (totalPending > this.threshold) {
            return {
                stressed: true,
                level: totalPending > this.threshold * 2 ? 'critical' : 'high',
                message: `${totalPending} items pending review (threshold: ${this.threshold})`,
                pendingReviews: this.pendingReviews,
                pendingDisputes: this.pendingDisputes
            }
        }

        return { stressed: false }
    }

    /**
     * Alert on stress (Story 189: Detect governance stress)
     */
    alert() {
        const stress = this.checkStress()
        if (stress.stressed) {
            console.warn('[GOVERNANCE STRESS]', stress)
            return stress
        }
        return null
    }
}

export default {
    EditHistoryEntry,
    EditHistory,
    DeletionRecord,
    GovernanceLogEntry,
    GovernanceLog,
    GovernanceLoadMonitor
}
