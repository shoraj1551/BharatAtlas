// Comparison System
// Ethical place comparison with explicit user initiation and metric validation

import { checkComparability } from './comparability'

/**
 * Comparison Mode State
 */
export const ComparisonMode = {
    DISABLED: 'disabled',
    SELECTING: 'selecting',
    COMPARING: 'comparing'
}

/**
 * Comparison Scope Types
 */
export const ComparisonScope = {
    WITHIN_STATE: 'within_state',
    WITHIN_DISTRICT: 'within_district',
    COASTAL_DISTRICTS: 'coastal_districts',
    POPULATION_RANGE: 'population_range',
    CUSTOM: 'custom'
}

/**
 * Create comparison session
 * @param {Array} places - Places to compare
 * @param {Array} metrics - Metrics to compare
 * @param {Object} scope - Comparison scope
 * @returns {Object} Comparison session
 */
export function createComparisonSession({ places, metrics, scope, userId = 'anonymous' }) {
    // Story 131: Comparison is explicit - must be user-initiated
    if (!places || places.length < 2) {
        throw new Error('Comparison requires at least 2 places')
    }

    // Story 134: No global rankings - scope is required
    if (!scope || !scope.type) {
        throw new Error('Comparison requires explicit scope')
    }

    // Story 145: Readability check - limit metrics
    if (metrics.length > 7) {
        console.warn('Too many metrics selected - comparison may be hard to read')
    }

    const session = {
        id: `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        places,
        metrics,
        scope,
        createdAt: new Date().toISOString(),
        createdBy: userId,

        // Story 132: Metric eligibility
        eligibility: validateMetricEligibility(places, metrics),

        // Story 136: Confidence indicator
        confidence: calculateComparisonConfidence(places, metrics),

        // Story 147: Bias disclosure
        biasWarnings: detectPotentialBias(places, metrics)
    }

    return session
}

/**
 * Validate metric eligibility (Story 132)
 * @param {Array} places - Places to compare
 * @param {Array} metrics - Metrics to compare
 * @returns {Object} Eligibility result
 */
function validateMetricEligibility(places, metrics) {
    const results = {}

    metrics.forEach(metric => {
        const eligible = places.every((place, i) => {
            if (i === 0) return true

            const placeA = places[0][metric]
            const placeB = place[metric]

            // Check same unit
            if (placeA?.unit !== placeB?.unit) return false

            // Check same time window
            if (placeA?.year !== placeB?.year) return false

            // Check same normalization
            if (placeA?.normalization !== placeB?.normalization) return false

            return true
        })

        results[metric] = {
            eligible,
            reason: eligible ? 'Valid comparison' : 'Incompatible metrics'
        }
    })

    return results
}

/**
 * Calculate comparison confidence (Story 136)
 * @param {Array} places - Places to compare
 * @param {Array} metrics - Metrics to compare
 * @returns {Object} Confidence assessment
 */
function calculateComparisonConfidence(places, metrics) {
    let totalConfidence = 0
    let count = 0

    places.forEach(place => {
        metrics.forEach(metric => {
            if (place[metric]?.confidence) {
                totalConfidence += place[metric].confidence
                count++
            }
        })
    })

    const avgConfidence = count > 0 ? totalConfidence / count : 0

    let level = 'low'
    if (avgConfidence >= 80) level = 'high'
    else if (avgConfidence >= 60) level = 'medium'

    return {
        score: Math.round(avgConfidence),
        level,
        message: `Confidence: ${level} (${count > 0 ? 'partial data' : 'no data'})`
    }
}

/**
 * Detect potential bias (Story 147)
 * @param {Array} places - Places to compare
 * @param {Array} metrics - Metrics to compare
 * @returns {Array} Bias warnings
 */
function detectPotentialBias(places, metrics) {
    const warnings = []

    // Check for missing informal data
    const hasInformalData = places.some(p => p.hasInformalEconomy)
    if (!hasInformalData) {
        warnings.push('Bias possible due to missing informal economy data')
    }

    // Check for data age variance
    const years = places.map(p => metrics.map(m => p[m]?.year)).flat().filter(Boolean)
    const uniqueYears = [...new Set(years)]
    if (uniqueYears.length > 1) {
        warnings.push('Data from different years - temporal bias possible')
    }

    return warnings
}

/**
 * Create scoped ranking (Story 135)
 * @param {Array} places - Places to rank
 * @param {string} metric - Metric to rank by
 * @param {Object} scope - Ranking scope
 * @returns {Object} Scoped ranking
 */
export function createScopedRanking({ places, metric, scope }) {
    // Story 134: No global rankings
    if (!scope || !scope.description) {
        throw new Error('Ranking requires explicit scope')
    }

    const ranked = [...places].sort((a, b) => {
        const valA = a[metric]?.value || 0
        const valB = b[metric]?.value || 0
        return valB - valA
    })

    // Story 141: Ranking decay over time
    const decayedRanking = ranked.map(place => {
        const dataAge = place[metric]?.dataAge || 0
        const confidenceDecay = dataAge * 0.1
        const adjustedConfidence = Math.max(0, (place[metric]?.confidence || 50) - confidenceDecay)

        return {
            ...place,
            rankingConfidence: adjustedConfidence
        }
    })

    return {
        metric,
        scope: scope.description,
        ranked: decayedRanking,
        createdAt: new Date().toISOString(),

        // Story 136: Confidence indicator
        overallConfidence: calculateRankingConfidence(decayedRanking)
    }
}

/**
 * Calculate ranking confidence
 */
function calculateRankingConfidence(ranked) {
    const avg = ranked.reduce((sum, p) => sum + (p.rankingConfidence || 0), 0) / ranked.length
    return {
        score: Math.round(avg),
        level: avg >= 70 ? 'high' : avg >= 50 ? 'medium' : 'low'
    }
}

export default {
    ComparisonMode,
    ComparisonScope,
    createComparisonSession,
    createScopedRanking
}
