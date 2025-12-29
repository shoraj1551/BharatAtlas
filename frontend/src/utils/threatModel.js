// Threat Model & Attack Surface
// Explicit threats and minimized surface (Stories 331-336)

import SECURITY_CHARTER from './securityCharter'

/**
 * Public Threat Model (Story 331)
 */
export const PUBLIC_THREAT_MODEL = {
    // Story 331: Document who might attack and why

    version: '1.0',
    lastUpdated: '2025-12-29',
    public: true,

    threatClasses: SECURITY_CHARTER.threatClasses,

    // Realistic assessment
    likelyAttacks: [
        {
            threat: 'Coordinated data poisoning',
            likelihood: 'high',
            impact: 'medium',
            mitigation: 'Pattern drift detection, multi-curator review'
        },
        {
            threat: 'Admin account compromise',
            likelihood: 'medium',
            impact: 'high',
            mitigation: 'Dual traceability, immutable audit logs'
        },
        {
            threat: 'Political pressure for censorship',
            likelihood: 'high',
            impact: 'high',
            mitigation: 'Jurisdiction-agnostic design, public incident logs'
        },
        {
            threat: 'Economic manipulation (rankings)',
            likelihood: 'medium',
            impact: 'medium',
            mitigation: 'No rankings, evidence-based contributions'
        }
    ],

    outOfScope: [
        'Nation-state infrastructure attacks (DDoS)',
        'Physical threats to operators',
        'Legal seizure of infrastructure'
    ],

    note: 'Threat model is public to enable community vigilance'
}

/**
 * Attack Surface Minimizer (Story 332)
 */
export class AttackSurfaceMinimizer {
    /**
     * Get writable surfaces (Story 332: Few mutation paths)
     */
    static getWritableSurfaces() {
        // Story 332: Reduce writable surfaces
        return {
            total: 3,

            surfaces: [
                {
                    name: 'Contribution submission',
                    access: 'authenticated_users',
                    friction: 'high',
                    review: 'mandatory'
                },
                {
                    name: 'Curator approval',
                    access: 'curators_only',
                    friction: 'medium',
                    review: 'dual_traceability'
                },
                {
                    name: 'Admin override',
                    access: 'admins_only',
                    friction: 'very_high',
                    review: 'public_log'
                }
            ],

            // Story 332: Attack surface minimized by design
            note: 'Only 3 mutation paths. All require friction and review.'
        }
    }
}

/**
 * Friction-Based Abuse Prevention (Story 333)
 */
export class FrictionBasedPrevention {
    /**
     * Apply friction (Story 333: Effort > identity)
     */
    static applyFriction(action, user) {
        const frictionLevels = {
            contribution: {
                minLength: 50,
                requiresEvidence: true,
                cooldownSeconds: 60,
                dailyLimit: 20,

                // Story 333: Effort, not identity checks
                requiresIdentity: false,
                requiresEffort: true
            },

            dispute: {
                minLength: 100,
                requiresCounterEvidence: true,
                cooldownSeconds: 300,
                dailyLimit: 5,
                requiresEffort: true
            },

            adminAction: {
                requiresReason: true,
                requiresSecondApproval: true,
                publiclyLogged: true,
                requiresEffort: true
            }
        }

        return frictionLevels[action] || { requiresEffort: false }
    }
}

/**
 * Adaptive Rate Limiter (Story 334)
 */
export class AdaptiveRateLimiter {
    constructor() {
        this.userBehavior = new Map()
    }

    /**
     * Check rate limit (Story 334: Adaptive & local)
     */
    checkLimit(userId, action) {
        // Story 334: Throttle by behavior, not IP alone

        const behavior = this.userBehavior.get(userId) || {
            actions: [],
            suspicionScore: 0
        }

        // Analyze recent behavior
        const recentActions = behavior.actions.filter(a =>
            Date.now() - a.timestamp < 60 * 60 * 1000 // Last hour
        )

        // Adaptive limits based on behavior
        const baseLimit = 100
        const suspicionPenalty = behavior.suspicionScore * 10
        const effectiveLimit = Math.max(10, baseLimit - suspicionPenalty)

        if (recentActions.length >= effectiveLimit) {
            return {
                allowed: false,
                reason: 'Adaptive rate limit exceeded',
                baseLimit,
                effectiveLimit,
                suspicionScore: behavior.suspicionScore,

                // Story 334: Behavior-based
                note: 'Limit adapts to behavior patterns'
            }
        }

        // Track action
        behavior.actions.push({
            action,
            timestamp: Date.now()
        })
        this.userBehavior.set(userId, behavior)

        return { allowed: true }
    }

    /**
     * Update suspicion score
     */
    updateSuspicion(userId, delta, reason) {
        const behavior = this.userBehavior.get(userId) || {
            actions: [],
            suspicionScore: 0
        }

        behavior.suspicionScore = Math.max(0, Math.min(10, behavior.suspicionScore + delta))
        behavior.suspicionReasons = behavior.suspicionReasons || []
        behavior.suspicionReasons.push({
            delta,
            reason,
            timestamp: Date.now()
        })

        this.userBehavior.set(userId, behavior)
    }
}

/**
 * Data Poisoning Detector (Story 335)
 */
export class DataPoisoningDetector {
    /**
     * Detect pattern drift (Story 335: Coordinated subtle edits)
     */
    static detectDrift(contributions, timeWindow = 24 * 60 * 60 * 1000) {
        const recent = contributions.filter(c =>
            Date.now() - new Date(c.contributedAt).getTime() < timeWindow
        )

        // Story 335: Monitor semantic drift
        const patterns = {
            coordinatedTiming: this.detectCoordinatedTiming(recent),
            semanticSimilarity: this.detectSemanticSimilarity(recent),
            targetedPlaces: this.detectTargetedPlaces(recent),
            unusualVolume: this.detectUnusualVolume(recent, contributions)
        }

        const suspicionScore = Object.values(patterns).filter(p => p.suspicious).length

        return {
            suspicious: suspicionScore >= 2,
            suspicionScore,
            patterns,

            // Story 335: Detect coordinated subtle edits
            note: 'Pattern drift detection for data poisoning'
        }
    }

    static detectCoordinatedTiming(contributions) {
        // Check if multiple contributions within short time
        const timestamps = contributions.map(c => new Date(c.contributedAt).getTime())
        const clusters = this.findTimeClusters(timestamps, 5 * 60 * 1000) // 5 min clusters

        return {
            suspicious: clusters.some(c => c.length > 5),
            detail: `Found ${clusters.length} time clusters`
        }
    }

    static detectSemanticSimilarity(contributions) {
        // Simplified - check for identical phrasing
        const contents = contributions.map(c => c.content.toLowerCase())
        const unique = new Set(contents)

        return {
            suspicious: unique.size < contents.length * 0.5,
            detail: `${unique.size} unique out of ${contents.length} total`
        }
    }

    static detectTargetedPlaces(contributions) {
        const places = contributions.map(c => c.placeId)
        const placeCounts = {}
        places.forEach(p => placeCounts[p] = (placeCounts[p] || 0) + 1)

        const maxCount = Math.max(...Object.values(placeCounts))

        return {
            suspicious: maxCount > contributions.length * 0.5,
            detail: `${maxCount} contributions to single place`
        }
    }

    static detectUnusualVolume(recent, all) {
        const avgDaily = all.length / 30
        const recentDaily = recent.length

        return {
            suspicious: recentDaily > avgDaily * 3,
            detail: `${recentDaily} vs avg ${avgDaily.toFixed(1)}`
        }
    }

    static findTimeClusters(timestamps, windowMs) {
        const sorted = timestamps.sort((a, b) => a - b)
        const clusters = []
        let current = []

        sorted.forEach(ts => {
            if (current.length === 0 || ts - current[current.length - 1] < windowMs) {
                current.push(ts)
            } else {
                if (current.length > 1) clusters.push(current)
                current = [ts]
            }
        })

        if (current.length > 1) clusters.push(current)
        return clusters
    }
}

/**
 * High-Risk Topic Flagging (Story 336)
 */
export class HighRiskTopicFlagging {
    /**
     * Check if topic is high-risk (Story 336: Flagged, not blocked)
     */
    static checkTopic(contribution) {
        const highRiskTopics = [
            'communal_incidents',
            'crime_rate',
            'caste_demographics',
            'religious_demographics',
            'political_affiliation'
        ]

        const isHighRisk = highRiskTopics.some(topic =>
            contribution.metric?.includes(topic) ||
            contribution.category?.includes(topic)
        )

        if (isHighRisk) {
            return {
                highRisk: true,

                // Story 336: Extra scrutiny, not blocking
                action: 'flag_for_extra_review',
                reviewers: 2, // Require 2 curators instead of 1

                note: 'Sensitive domain gets extra scrutiny, not blocked'
            }
        }

        return { highRisk: false }
    }
}

export default {
    PUBLIC_THREAT_MODEL,
    AttackSurfaceMinimizer,
    FrictionBasedPrevention,
    AdaptiveRateLimiter,
    DataPoisoningDetector,
    HighRiskTopicFlagging
}
