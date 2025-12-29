// Comparison Narrative Generator
// AI-generated neutral summaries for comparisons (Story 146)

/**
 * Generate neutral comparison narrative (Story 146)
 * @param {Object} comparisonSession - Comparison session
 * @returns {string} Neutral narrative summary
 */
export function generateComparisonNarrative(comparisonSession) {
    const { places, metrics, eligibility } = comparisonSession

    if (places.length < 2) {
        return 'Insufficient places for comparison'
    }

    const narrativeParts = []

    // Compare each metric
    metrics.forEach(metric => {
        if (!eligibility[metric]?.eligible) {
            narrativeParts.push(`${metric}: Not comparable (incompatible data)`)
            return
        }

        const values = places.map(p => ({
            name: p.canonical_name,
            value: p[metric]?.value || 0
        }))

        // Sort by value
        const sorted = [...values].sort((a, b) => b.value - a.value)

        // Neutral statement
        const highest = sorted[0]
        const lowest = sorted[sorted.length - 1]

        narrativeParts.push(
            `${metric}: ${highest.name} has higher ${metric} (${highest.value}), ` +
            `${lowest.name} has lower ${metric} (${lowest.value})`
        )
    })

    return narrativeParts.join('. ')
}

/**
 * Prevent composite score creation (Story 142)
 * @throws {Error} Always throws - composite scores not allowed
 */
export function createCompositeScore() {
    // Story 142: No composite "magic score"
    throw new Error('Composite score not allowed - scores must be transparent with breakdown')
}

/**
 * Check if place opts out of rankings (Story 148)
 * @param {Object} place - Place object
 * @returns {boolean} Whether place opts out
 */
export function checkRankingOptOut(place) {
    // Story 148: Ranking opt-out
    return place.optOutOfRankings === true
}

/**
 * Filter places for ranking (respects opt-out)
 * @param {Array} places - Places to rank
 * @returns {Array} Filtered places
 */
export function filterRankablePlaces(places) {
    return places.filter(place => !checkRankingOptOut(place))
}

export default {
    generateComparisonNarrative,
    createCompositeScore,
    checkRankingOptOut,
    filterRankablePlaces
}
