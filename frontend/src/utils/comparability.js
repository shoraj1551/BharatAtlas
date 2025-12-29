// Place Comparability System
// Prevents misleading comparisons by ensuring metric alignment

/**
 * Comparability Rules
 * Two places can only be compared if they meet these criteria
 */
export const ComparabilityRules = {
    // Same administrative level (state vs state, district vs district)
    SAME_LEVEL: 'same_level',

    // Same data collection period (census year, survey period)
    SAME_PERIOD: 'same_period',

    // Same metric definition (population count method, area calculation)
    SAME_METRIC: 'same_metric',

    // Same knowledge type (verified fact vs verified fact)
    SAME_KNOWLEDGE_TYPE: 'same_knowledge_type'
}

/**
 * Check if two places are comparable
 * @param {Object} place1 - First place
 * @param {Object} place2 - Second place
 * @param {string} metric - Metric to compare (e.g., 'population', 'area')
 * @returns {Object} Comparability result
 */
export function checkComparability(place1, place2, metric) {
    const issues = []
    const warnings = []

    // Rule 1: Same administrative level
    if (place1.place_type !== place2.place_type) {
        issues.push({
            rule: ComparabilityRules.SAME_LEVEL,
            message: `Cannot compare ${place1.place_type} with ${place2.place_type}`,
            severity: 'error'
        })
    }

    // Rule 2: Same data collection period
    const period1 = place1[metric]?.data_collection_period
    const period2 = place2[metric]?.data_collection_period

    if (period1 && period2 && period1 !== period2) {
        warnings.push({
            rule: ComparabilityRules.SAME_PERIOD,
            message: `Data from different periods: ${period1} vs ${period2}`,
            severity: 'warning'
        })
    }

    // Rule 3: Same metric definition
    const definition1 = place1[metric]?.definition
    const definition2 = place2[metric]?.definition

    if (definition1 && definition2 && definition1 !== definition2) {
        issues.push({
            rule: ComparabilityRules.SAME_METRIC,
            message: `Different metric definitions`,
            severity: 'error'
        })
    }

    // Rule 4: Same knowledge type
    const knowledgeType1 = place1[metric]?.knowledge_type
    const knowledgeType2 = place2[metric]?.knowledge_type

    if (knowledgeType1 && knowledgeType2 && knowledgeType1 !== knowledgeType2) {
        warnings.push({
            rule: ComparabilityRules.SAME_KNOWLEDGE_TYPE,
            message: `Comparing ${knowledgeType1} with ${knowledgeType2}`,
            severity: 'warning'
        })
    }

    const comparable = issues.length === 0

    return {
        comparable,
        issues,
        warnings,
        recommendation: comparable
            ? 'Comparison is valid'
            : 'Comparison not recommended - metrics do not align'
    }
}

/**
 * Get comparable places for a given place
 * @param {Object} place - Reference place
 * @param {Array} allPlaces - All available places
 * @param {string} metric - Metric to compare
 * @returns {Array} List of comparable places
 */
export function getComparablePlaces(place, allPlaces, metric) {
    return allPlaces
        .filter(p => p.place_id !== place.place_id)
        .map(p => ({
            place: p,
            comparability: checkComparability(place, p, metric)
        }))
        .filter(result => result.comparability.comparable)
        .map(result => result.place)
}

/**
 * Create comparison disclaimer
 * @param {Object} comparability - Comparability check result
 * @returns {string} Human-readable disclaimer
 */
export function createComparisonDisclaimer(comparability) {
    if (comparability.comparable && comparability.warnings.length === 0) {
        return 'These places can be compared directly.'
    }

    const parts = []

    if (!comparability.comparable) {
        parts.push('⚠️ Comparison not recommended:')
        comparability.issues.forEach(issue => {
            parts.push(`• ${issue.message}`)
        })
    }

    if (comparability.warnings.length > 0) {
        parts.push('⚠️ Comparison caveats:')
        comparability.warnings.forEach(warning => {
            parts.push(`• ${warning.message}`)
        })
    }

    return parts.join('\n')
}

export default {
    ComparabilityRules,
    checkComparability,
    getComparablePlaces,
    createComparisonDisclaimer
}
