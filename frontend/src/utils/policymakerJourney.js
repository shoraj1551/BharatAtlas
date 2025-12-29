// Policymaker Journey
// Constraints-first view for policymakers (Stories 152-153)

/**
 * Identify constraints/gaps for a place (Story 152)
 * @param {Object} place - Place object
 * @returns {Array} Constraints sorted by severity
 */
export function identifyConstraints(place) {
    const constraints = []

    // Infrastructure gaps
    if (place.road_density < 50) {
        constraints.push({
            category: 'infrastructure',
            issue: 'Low road connectivity',
            severity: 'high',
            metric: 'road_density',
            value: place.road_density,
            benchmark: 50
        })
    }

    // Healthcare access
    if (place.hospitals_per_lakh < 5) {
        constraints.push({
            category: 'healthcare',
            issue: 'Insufficient healthcare facilities',
            severity: 'high',
            metric: 'hospitals_per_lakh',
            value: place.hospitals_per_lakh,
            benchmark: 5
        })
    }

    // Education gaps
    if (place.literacy_rate < 70) {
        constraints.push({
            category: 'education',
            issue: 'Low literacy rate',
            severity: 'medium',
            metric: 'literacy_rate',
            value: place.literacy_rate,
            benchmark: 70
        })
    }

    // Water access
    if (place.water_access < 80) {
        constraints.push({
            category: 'basic_services',
            issue: 'Limited water access',
            severity: 'high',
            metric: 'water_access',
            value: place.water_access,
            benchmark: 80
        })
    }

    // Employment
    if (place.unemployment_rate > 10) {
        constraints.push({
            category: 'employment',
            issue: 'High unemployment',
            severity: 'high',
            metric: 'unemployment_rate',
            value: place.unemployment_rate,
            benchmark: 10
        })
    }

    // Sort by severity
    const severityOrder = { high: 0, medium: 1, low: 2 }
    return constraints.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])
}

/**
 * Find peer districts for comparison (Story 153)
 * @param {Object} place - Place object
 * @param {Array} allPlaces - All available places
 * @returns {Array} Peer places
 */
export function findPeerDistricts(place, allPlaces) {
    // Define peer criteria
    const populationRange = 0.3 // ±30%
    const areaRange = 0.4 // ±40%

    const peers = allPlaces.filter(p => {
        if (p.place_id === place.place_id) return false
        if (p.place_type !== place.place_type) return false

        // Population similarity
        const popDiff = Math.abs(p.population - place.population) / place.population
        if (popDiff > populationRange) return false

        // Area similarity
        const areaDiff = Math.abs(p.area_sq_km - place.area_sq_km) / place.area_sq_km
        if (areaDiff > areaRange) return false

        return true
    })

    return peers.slice(0, 5) // Max 5 peers
}

/**
 * Compare place against peers (Story 153)
 * @param {Object} place - Place object
 * @param {Array} peers - Peer places
 * @param {string} metric - Metric to compare
 * @returns {Object} Peer comparison
 */
export function compareToPeers(place, peers, metric) {
    if (peers.length === 0) {
        return {
            position: 'unknown',
            peerAverage: null,
            gap: null
        }
    }

    const peerValues = peers.map(p => p[metric] || 0)
    const peerAverage = peerValues.reduce((sum, v) => sum + v, 0) / peerValues.length
    const placeValue = place[metric] || 0

    // Determine position
    const betterThanCount = peerValues.filter(v => placeValue > v).length
    const position = betterThanCount === peers.length ? 'leading' :
        betterThanCount > peers.length / 2 ? 'above_average' :
            betterThanCount === peers.length / 2 ? 'average' :
                'below_average'

    return {
        position,
        peerAverage: Math.round(peerAverage * 100) / 100,
        placeValue,
        gap: Math.round((placeValue - peerAverage) * 100) / 100,
        peerCount: peers.length
    }
}

/**
 * Generate policymaker summary (Story 152)
 * @param {Object} place - Place object
 * @param {Array} constraints - Identified constraints
 * @returns {string} Summary text
 */
export function generatePolicymakerSummary(place, constraints) {
    if (constraints.length === 0) {
        return `${place.canonical_name} shows no critical gaps in measured indicators.`
    }

    const highSeverity = constraints.filter(c => c.severity === 'high')

    if (highSeverity.length > 0) {
        const issues = highSeverity.map(c => c.issue.toLowerCase()).join(', ')
        return `${place.canonical_name} faces ${highSeverity.length} critical constraint${highSeverity.length > 1 ? 's' : ''}: ${issues}.`
    }

    return `${place.canonical_name} has ${constraints.length} development area${constraints.length > 1 ? 's' : ''} requiring attention.`
}

export default {
    identifyConstraints,
    findPeerDistricts,
    compareToPeers,
    generatePolicymakerSummary
}
