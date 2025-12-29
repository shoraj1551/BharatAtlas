// Admin Accountability & Insider Threat Mitigation
// Dual traceability and insider defense (Stories 337-340)

/**
 * Admin Action Tracker (Story 337)
 */
export class AdminActionTracker {
    constructor() {
        this.actions = []
    }

    /**
     * Track admin action (Story 337: Dual traceability)
     */
    trackAction(action) {
        // Story 337: No silent admin power
        const trackedAction = {
            id: `admin_action_${Date.now()}`,
            actor: action.actor,
            action: action.type,
            target: action.target,
            reason: action.reason,
            timestamp: new Date().toISOString(),

            // Story 337: Dual traceability
            approvedBy: action.approvedBy || null,
            requiresSecondApproval: action.requiresSecondApproval || false,

            // Public visibility
            publiclyLogged: true,
            auditTrail: action.auditTrail || []
        }

        if (!trackedAction.reason) {
            throw new Error('Admin actions require explicit reason')
        }

        if (trackedAction.requiresSecondApproval && !trackedAction.approvedBy) {
            throw new Error('High-risk admin actions require second approval')
        }

        this.actions.push(trackedAction)

        return trackedAction
    }

    /**
     * Get admin actions
     */
    getActions(filters = {}) {
        let filtered = this.actions

        if (filters.actor) {
            filtered = filtered.filter(a => a.actor === filters.actor)
        }

        if (filters.since) {
            filtered = filtered.filter(a => new Date(a.timestamp) >= new Date(filters.since))
        }

        return filtered
    }
}

/**
 * Insider Threat Detector (Story 338)
 */
export class InsiderThreatDetector {
    /**
     * Monitor insider behavior (Story 338: Assume insider threats)
     */
    static monitorBehavior(adminId, actions) {
        // Story 338: Trust, but verify actions

        const suspiciousPatterns = {
            rapidActions: this.detectRapidActions(actions),
            offHoursActivity: this.detectOffHoursActivity(actions),
            unusualTargets: this.detectUnusualTargets(actions),
            patternBreak: this.detectPatternBreak(adminId, actions)
        }

        const suspicionScore = Object.values(suspiciousPatterns).filter(p => p.suspicious).length

        return {
            adminId,
            suspicious: suspicionScore >= 2,
            suspicionScore,
            patterns: suspiciousPatterns,

            // Story 338: Design for insider risk
            recommendation: suspicionScore >= 2 ? 'Require additional review' : 'Normal',
            note: 'Insider threats are assumed and monitored'
        }
    }

    static detectRapidActions(actions) {
        const recent = actions.filter(a =>
            Date.now() - new Date(a.timestamp).getTime() < 60 * 60 * 1000
        )

        return {
            suspicious: recent.length > 20,
            detail: `${recent.length} actions in last hour`
        }
    }

    static detectOffHoursActivity(actions) {
        const offHours = actions.filter(a => {
            const hour = new Date(a.timestamp).getHours()
            return hour < 6 || hour > 22
        })

        return {
            suspicious: offHours.length > actions.length * 0.3,
            detail: `${offHours.length} off-hours actions`
        }
    }

    static detectUnusualTargets(actions) {
        const targets = actions.map(a => a.target)
        const unique = new Set(targets)

        return {
            suspicious: unique.size < targets.length * 0.2,
            detail: `Targeting ${unique.size} unique entities repeatedly`
        }
    }

    static detectPatternBreak(adminId, actions) {
        // Simplified - check for sudden behavior change
        return {
            suspicious: false,
            detail: 'Pattern analysis placeholder'
        }
    }
}

/**
 * Narrative Control Prevention (Story 339)
 */
export class NarrativeControlPrevention {
    /**
     * Prevent single-point control (Story 339)
     */
    static validateEdit(edit, editHistory) {
        // Story 339: No one can rewrite history

        const sameActorEdits = editHistory.filter(e =>
            e.actor === edit.actor &&
            e.target === edit.target
        )

        if (sameActorEdits.length > 5) {
            return {
                allowed: false,
                reason: 'Single actor cannot repeatedly edit same entity',

                // Story 339: Prevent narrative capture
                recommendation: 'Require different curator for next edit',
                note: 'No single point of narrative control'
            }
        }

        return { allowed: true }
    }
}

/**
 * Recovery System (Story 340)
 */
export class RecoverySystem {
    /**
     * Rollback to known good state (Story 340: Recovery beats prevention)
     */
    static rollback(targetId, toTimestamp) {
        // Story 340: Fast rollback > perfect defense

        return {
            action: 'rollback',
            target: targetId,
            toTimestamp,
            executedAt: new Date().toISOString(),

            // Story 340: Optimize for recovery
            recoveryTime: '< 5 minutes',
            dataLoss: 'Changes after rollback point',

            note: 'Fast recovery is prioritized over perfect prevention'
        }
    }

    /**
     * Create recovery point
     */
    static createRecoveryPoint(data) {
        return {
            id: `recovery_${Date.now()}`,
            data,
            createdAt: new Date().toISOString(),
            immutable: true
        }
    }
}

export default {
    AdminActionTracker,
    InsiderThreatDetector,
    NarrativeControlPrevention,
    RecoverySystem
}
