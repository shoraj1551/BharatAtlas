// Contributor Impact & Abuse Prevention
// Non-gamified feedback and friction-based abuse prevention (Stories 261-262, 265, 268)

/**
 * Contributor Impact (Story 261)
 */
export class ContributorImpact {
    /**
     * Get impact summary (Story 261: Impact, not metrics)
     */
    static getImpact(contributorId, contributions) {
        const approved = contributions.filter(c => c.status === 'approved')
        const placesImproved = new Set(approved.map(c => c.placeId)).size

        // Story 261: No points, no scores
        return {
            message: this.generateImpactMessage(approved.length, placesImproved),

            // Qualitative, not quantitative
            contributions: {
                approved: approved.length,
                pending: contributions.filter(c => c.status === 'pending_review').length
            },

            impact: {
                placesImproved,
                dataCompleteness: this.calculateDataCompleteness(approved),
                categories: this.getCategories(approved)
            },

            // Story 261: Avoid gamification
            note: 'Your contributions help build collective knowledge'
        }
    }

    /**
     * Generate impact message (Story 261)
     */
    static generateImpactMessage(approvedCount, placesImproved) {
        if (approvedCount === 0) {
            return 'Your contributions are under review'
        }

        if (approvedCount === 1) {
            return 'Your contribution improved data completeness'
        }

        return `Your contributions improved data for ${placesImproved} place${placesImproved > 1 ? 's' : ''}`
    }

    /**
     * Calculate data completeness contribution
     */
    static calculateDataCompleteness(contributions) {
        // Simplified - in production, calculate actual completeness improvement
        return {
            before: 65,
            after: 70,
            improvement: 5
        }
    }

    /**
     * Get contribution categories
     */
    static getCategories(contributions) {
        const categories = new Set(contributions.map(c => c.category))
        return Array.from(categories)
    }
}

/**
 * Government Data Marker (Story 265)
 */
export class GovernmentDataMarker {
    /**
     * Mark government data (Story 265: Marked, not privileged)
     */
    static mark(data, source) {
        return {
            ...data,

            // Story 265: Gov sources visible but not unquestionable
            sourceType: 'government',
            sourceLabel: this.getSourceLabel(source),

            note: 'Government data is one source among many',

            // Still requires same validation
            requiresValidation: true,
            canBeDisputed: true
        }
    }

    /**
     * Get source label
     */
    static getSourceLabel(source) {
        if (source.organization === 'census') {
            return `Source: Census of India (${source.year})`
        }

        if (source.organization === 'nsso') {
            return `Source: National Sample Survey Office (${source.year})`
        }

        return `Source: Government of India (${source.year})`
    }
}

/**
 * Abuse Prevention (Story 268)
 */
export class AbusePreventionSystem {
    constructor() {
        this.contributionCounts = new Map() // userId -> count
        this.lastContribution = new Map() // userId -> timestamp
    }

    /**
     * Check if contribution allowed (Story 268: Friction, not policing)
     */
    checkAllowed(userId) {
        const now = Date.now()
        const lastTime = this.lastContribution.get(userId)

        // Story 268: Rate limits + effort-based forms

        // Time-based friction
        if (lastTime) {
            const timeSinceLastContribution = now - lastTime
            const minInterval = 60 * 1000 // 1 minute

            if (timeSinceLastContribution < minInterval) {
                return {
                    allowed: false,
                    reason: 'Please wait before contributing again',
                    retryAfter: Math.ceil((minInterval - timeSinceLastContribution) / 1000)
                }
            }
        }

        // Daily limit
        const today = new Date().toDateString()
        const todayKey = `${userId}_${today}`
        const todayCount = this.contributionCounts.get(todayKey) || 0
        const dailyLimit = 20

        if (todayCount >= dailyLimit) {
            return {
                allowed: false,
                reason: 'Daily contribution limit reached',
                limit: dailyLimit
            }
        }

        return { allowed: true }
    }

    /**
     * Record contribution
     */
    recordContribution(userId) {
        const now = Date.now()
        const today = new Date().toDateString()
        const todayKey = `${userId}_${today}`

        this.lastContribution.set(userId, now)

        const count = this.contributionCounts.get(todayKey) || 0
        this.contributionCounts.set(todayKey, count + 1)
    }

    /**
     * Get effort-based form requirements
     */
    static getFormRequirements(contributionType) {
        // Story 268: Effort-based forms prevent spam
        return {
            minContentLength: 50,
            requiresSource: contributionType !== 'local_insight',
            requiresCategory: true,
            requiresPlace: true,

            // Deliberate friction
            confirmationRequired: true,
            confirmationText: 'I confirm this contribution is factual and traceable'
        }
    }
}

/**
 * No Comment Threads (Story 262)
 */
export class NoCommentThreads {
    /**
     * Prevent comment threads (Story 262)
     */
    static preventComments() {
        return {
            allowed: false,
            reason: 'Discussion happens via structured rebuttals only',
            alternative: 'Use structured rebuttal format to disagree with factual claims'
        }
    }
}

export default {
    ContributorImpact,
    GovernmentDataMarker,
    AbusePreventionSystem,
    NoCommentThreads
}
