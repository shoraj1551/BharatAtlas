// Entrepreneur Friction Analysis
// Honest exposure of business obstacles (Story 155)

/**
 * Friction Categories
 */
export const FrictionCategory = {
    PERMITS: 'permits',
    INFRASTRUCTURE: 'infrastructure',
    LOGISTICS: 'logistics',
    REGULATORY: 'regulatory',
    MARKET_ACCESS: 'market_access'
}

/**
 * Identify business friction points (Story 155)
 * @param {Object} place - Place object
 * @returns {Array} Friction points
 */
export function identifyFrictionPoints(place) {
    const frictions = []

    // Permit complexity
    if (place.ease_of_doing_business_rank > 100 || place.avg_permit_days > 30) {
        frictions.push({
            category: FrictionCategory.PERMITS,
            issue: 'Complex permit process',
            severity: 'high',
            details: `Average ${place.avg_permit_days || 'unknown'} days for permits`,
            impact: 'Delays business setup and operations'
        })
    }

    // Infrastructure gaps
    if (place.power_reliability < 80) {
        frictions.push({
            category: FrictionCategory.INFRASTRUCTURE,
            issue: 'Unreliable power supply',
            severity: 'high',
            details: `${place.power_reliability}% reliability`,
            impact: 'Requires backup power investment'
        })
    }

    if (place.road_quality_index < 60) {
        frictions.push({
            category: FrictionCategory.INFRASTRUCTURE,
            issue: 'Poor road quality',
            severity: 'medium',
            details: `Road quality index: ${place.road_quality_index}/100`,
            impact: 'Increases logistics costs'
        })
    }

    // Logistics challenges
    if (place.distance_to_port > 200 && place.rail_connectivity === 'poor') {
        frictions.push({
            category: FrictionCategory.LOGISTICS,
            issue: 'Limited freight connectivity',
            severity: 'high',
            details: `${place.distance_to_port}km to nearest port, poor rail access`,
            impact: 'High transportation costs for goods'
        })
    }

    if (place.cold_chain_availability === 'limited') {
        frictions.push({
            category: FrictionCategory.LOGISTICS,
            issue: 'Limited cold chain',
            severity: 'medium',
            details: 'Inadequate cold storage and transport',
            impact: 'Restricts perishable goods business'
        })
    }

    // Regulatory environment
    if (place.labor_law_complexity === 'high') {
        frictions.push({
            category: FrictionCategory.REGULATORY,
            issue: 'Complex labor regulations',
            severity: 'medium',
            details: 'Multiple compliance requirements',
            impact: 'Increases HR and legal costs'
        })
    }

    // Market access
    if (place.digital_payment_adoption < 40) {
        frictions.push({
            category: FrictionCategory.MARKET_ACCESS,
            issue: 'Low digital payment adoption',
            severity: 'low',
            details: `${place.digital_payment_adoption}% adoption`,
            impact: 'Cash-heavy operations required'
        })
    }

    // Sort by severity
    const severityOrder = { high: 0, medium: 1, low: 2 }
    return frictions.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])
}

/**
 * Calculate friction score (lower is better)
 * @param {Array} frictions - Friction points
 * @returns {Object} Friction assessment
 */
export function calculateFrictionScore(frictions) {
    const weights = { high: 3, medium: 2, low: 1 }
    const totalScore = frictions.reduce((sum, f) => sum + weights[f.severity], 0)
    const maxScore = frictions.length * 3

    const normalizedScore = maxScore > 0 ? (totalScore / maxScore) * 100 : 0

    return {
        score: Math.round(normalizedScore),
        level: normalizedScore < 30 ? 'low' : normalizedScore < 60 ? 'medium' : 'high',
        message: normalizedScore < 30 ? 'Relatively smooth operations' :
            normalizedScore < 60 ? 'Moderate friction expected' :
                'Significant operational challenges'
    }
}

/**
 * Generate friction summary (Story 155)
 * @param {Object} place - Place object
 * @param {Array} frictions - Friction points
 * @returns {string} Honest summary
 */
export function generateFrictionSummary(place, frictions) {
    if (frictions.length === 0) {
        return `${place.canonical_name}: No major friction points detected in available data.`
    }

    const highFriction = frictions.filter(f => f.severity === 'high')

    if (highFriction.length > 0) {
        const issues = highFriction.map(f => f.issue.toLowerCase()).join(', ')
        return `${place.canonical_name}: ${highFriction.length} significant obstacle${highFriction.length > 1 ? 's' : ''} - ${issues}. Plan accordingly.`
    }

    return `${place.canonical_name}: ${frictions.length} moderate friction point${frictions.length > 1 ? 's' : ''} to consider.`
}

export default {
    FrictionCategory,
    identifyFrictionPoints,
    calculateFrictionScore,
    generateFrictionSummary
}
