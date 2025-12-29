// Trust Posture Summary
// Qualitative trust assessment for places (not a single score)

import { KnowledgeType } from '../models/KnowledgeType'

/**
 * Trust Posture Categories
 */
export const TrustPosture = {
    HIGH_CONFIDENCE: 'high_confidence',       // Well-documented, verified
    MODERATE_CONFIDENCE: 'moderate_confidence', // Mix of official and inferred
    LOW_CONFIDENCE: 'low_confidence',         // Mostly inferred or old
    INCOMPLETE: 'incomplete',                 // Significant gaps
    UNKNOWN: 'unknown'                        // Insufficient data
}

/**
 * Calculate trust posture for a place
 * @param {Object} place - Place object with data points
 * @returns {Object} Trust posture summary
 */
export function calculateTrustPosture(place) {
    const dataPoints = extractDataPoints(place)

    if (dataPoints.length === 0) {
        return {
            posture: TrustPosture.UNKNOWN,
            summary: 'No data available to assess trust',
            details: {
                total_data_points: 0,
                verified_facts: 0,
                official_statistics: 0,
                local_reports: 0,
                ai_inferences: 0,
                unknown: 0
            }
        }
    }

    // Count by knowledge type
    const counts = {
        verified_facts: dataPoints.filter(d => d.knowledge_type === KnowledgeType.VERIFIED_FACT).length,
        official_statistics: dataPoints.filter(d => d.knowledge_type === KnowledgeType.OFFICIAL_STATISTIC).length,
        local_reports: dataPoints.filter(d => d.knowledge_type === KnowledgeType.LOCAL_REPORT).length,
        ai_inferences: dataPoints.filter(d => d.knowledge_type === KnowledgeType.AI_INFERENCE).length,
        unknown: dataPoints.filter(d => d.knowledge_type === KnowledgeType.UNKNOWN).length
    }

    const total = dataPoints.length
    const highTrust = counts.verified_facts + counts.official_statistics
    const highTrustPercentage = (highTrust / total) * 100

    // Determine posture
    let posture
    let summary

    if (highTrustPercentage >= 70) {
        posture = TrustPosture.HIGH_CONFIDENCE
        summary = 'Most data is verified or from official sources'
    } else if (highTrustPercentage >= 40) {
        posture = TrustPosture.MODERATE_CONFIDENCE
        summary = 'Mix of official sources and inferred data'
    } else if (counts.unknown > total * 0.5) {
        posture = TrustPosture.INCOMPLETE
        summary = 'Significant data gaps - many unknowns'
    } else {
        posture = TrustPosture.LOW_CONFIDENCE
        summary = 'Mostly inferred or unverified data'
    }

    return {
        posture,
        summary,
        details: {
            total_data_points: total,
            ...counts,
            high_trust_percentage: Math.round(highTrustPercentage)
        },
        recommendations: generateRecommendations(counts, total)
    }
}

/**
 * Extract data points from place object
 * @param {Object} place - Place object
 * @returns {Array} Data points with knowledge type
 */
function extractDataPoints(place) {
    const points = []

    // Extract from place properties
    if (place.population?.knowledge_type) {
        points.push(place.population)
    }
    if (place.area_sq_km?.knowledge_type) {
        points.push(place.area_sq_km)
    }

    // Extract from narrative sections
    if (place.narrative?.sections) {
        place.narrative.sections.forEach(section => {
            if (section.knowledge_type) {
                points.push(section)
            }
        })
    }

    // Extract from opportunities
    if (place.opportunities) {
        place.opportunities.forEach(opp => {
            if (opp.knowledge_type) {
                points.push(opp)
            }
        })
    }

    return points
}

/**
 * Generate recommendations for improving trust posture
 * @param {Object} counts - Knowledge type counts
 * @param {number} total - Total data points
 * @returns {Array} Recommendations
 */
function generateRecommendations(counts, total) {
    const recommendations = []

    if (counts.unknown > total * 0.3) {
        recommendations.push('Reduce unknowns by adding verified sources')
    }

    if (counts.ai_inferences > total * 0.5) {
        recommendations.push('Verify AI inferences with official sources')
    }

    if (counts.verified_facts === 0) {
        recommendations.push('Add human-verified facts to increase trust')
    }

    if (counts.official_statistics < total * 0.2) {
        recommendations.push('Include more official statistics')
    }

    return recommendations
}

/**
 * Get trust posture label
 * @param {string} posture - Trust posture
 * @returns {string} Human-readable label
 */
export function getTrustPostureLabel(posture) {
    const labels = {
        [TrustPosture.HIGH_CONFIDENCE]: 'High Confidence',
        [TrustPosture.MODERATE_CONFIDENCE]: 'Moderate Confidence',
        [TrustPosture.LOW_CONFIDENCE]: 'Low Confidence',
        [TrustPosture.INCOMPLETE]: 'Incomplete Data',
        [TrustPosture.UNKNOWN]: 'Unknown'
    }
    return labels[posture] || 'Unknown'
}

/**
 * Get trust posture color
 * @param {string} posture - Trust posture
 * @returns {string} Color code
 */
export function getTrustPostureColor(posture) {
    const colors = {
        [TrustPosture.HIGH_CONFIDENCE]: '#2e7d32',
        [TrustPosture.MODERATE_CONFIDENCE]: '#f57c00',
        [TrustPosture.LOW_CONFIDENCE]: '#d32f2f',
        [TrustPosture.INCOMPLETE]: '#616161',
        [TrustPosture.UNKNOWN]: '#9e9e9e'
    }
    return colors[posture] || '#9e9e9e'
}

export default {
    TrustPosture,
    calculateTrustPosture,
    getTrustPostureLabel,
    getTrustPostureColor
}
