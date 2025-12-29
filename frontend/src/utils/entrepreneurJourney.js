// Entrepreneur Journey
// Opportunity signals and feasibility for entrepreneurs (Story 154)

/**
 * Translate stats into feasibility signals (Story 154)
 * @param {Object} place - Place object
 * @returns {Array} Feasibility signals
 */
export function generateFeasibilitySignals(place) {
    const signals = []

    // Market opportunity signals
    if (place.population > 100000 && place.business_density < 50) {
        signals.push({
            category: 'market_gap',
            signal: 'Underserved market',
            explanation: 'Large population with low business density indicates market opportunity',
            strength: 'high',
            factors: [
                { name: 'Population', value: place.population },
                { name: 'Business density', value: place.business_density }
            ]
        })
    }

    // Infrastructure readiness
    if (place.road_density > 70 && place.electricity_access > 90) {
        signals.push({
            category: 'infrastructure',
            signal: 'Infrastructure ready',
            explanation: 'Good connectivity and power supply support business operations',
            strength: 'high',
            factors: [
                { name: 'Road density', value: place.road_density },
                { name: 'Electricity access', value: place.electricity_access }
            ]
        })
    }

    // Skilled workforce
    if (place.literacy_rate > 75 && place.youth_population_percent > 30) {
        signals.push({
            category: 'workforce',
            signal: 'Skilled workforce available',
            explanation: 'High literacy and young population provide talent pool',
            strength: 'medium',
            factors: [
                { name: 'Literacy rate', value: place.literacy_rate },
                { name: 'Youth population', value: place.youth_population_percent }
            ]
        })
    }

    // Tourism potential
    if (place.tourist_attractions > 5 && place.hotel_capacity < 100) {
        signals.push({
            category: 'tourism',
            signal: 'Tourism infrastructure gap',
            explanation: 'Tourist attractions present but limited accommodation',
            strength: 'medium',
            factors: [
                { name: 'Tourist attractions', value: place.tourist_attractions },
                { name: 'Hotel capacity', value: place.hotel_capacity }
            ]
        })
    }

    // Agriculture opportunity
    if (place.agricultural_land_percent > 50 && place.cold_storage_facilities < 5) {
        signals.push({
            category: 'agriculture',
            signal: 'Agri-infrastructure opportunity',
            explanation: 'High agricultural activity with limited storage infrastructure',
            strength: 'high',
            factors: [
                { name: 'Agricultural land', value: place.agricultural_land_percent },
                { name: 'Cold storage', value: place.cold_storage_facilities }
            ]
        })
    }

    // Digital opportunity
    if (place.internet_penetration > 60 && place.digital_services < 20) {
        signals.push({
            category: 'digital',
            signal: 'Digital services gap',
            explanation: 'Good internet access but limited digital service providers',
            strength: 'medium',
            factors: [
                { name: 'Internet penetration', value: place.internet_penetration },
                { name: 'Digital services', value: place.digital_services }
            ]
        })
    }

    return signals.sort((a, b) => {
        const strengthOrder = { high: 0, medium: 1, low: 2 }
        return strengthOrder[a.strength] - strengthOrder[b.strength]
    })
}

/**
 * Calculate feasibility score for opportunity
 * @param {Object} place - Place object
 * @param {string} category - Opportunity category
 * @returns {Object} Feasibility assessment
 */
export function calculateFeasibility(place, category) {
    const factors = {
        market_gap: ['population', 'business_density', 'purchasing_power'],
        infrastructure: ['road_density', 'electricity_access', 'water_supply'],
        workforce: ['literacy_rate', 'youth_population_percent', 'skill_centers'],
        tourism: ['tourist_attractions', 'connectivity', 'safety_index'],
        agriculture: ['agricultural_land_percent', 'irrigation_coverage', 'market_access'],
        digital: ['internet_penetration', 'smartphone_usage', 'digital_literacy']
    }

    const relevantFactors = factors[category] || []
    let score = 0
    let count = 0

    relevantFactors.forEach(factor => {
        if (place[factor] !== undefined) {
            score += place[factor]
            count++
        }
    })

    const avgScore = count > 0 ? score / count : 0

    return {
        score: Math.round(avgScore),
        level: avgScore >= 70 ? 'high' : avgScore >= 50 ? 'medium' : 'low',
        factors: relevantFactors.map(f => ({
            name: f,
            value: place[f] || 0
        }))
    }
}

/**
 * Generate entrepreneur summary (Story 154)
 * @param {Object} place - Place object
 * @param {Array} signals - Feasibility signals
 * @returns {string} Summary text
 */
export function generateEntrepreneurSummary(place, signals) {
    if (signals.length === 0) {
        return `${place.canonical_name}: Limited opportunity signals detected. Consider niche markets or further research.`
    }

    const highStrength = signals.filter(s => s.strength === 'high')

    if (highStrength.length > 0) {
        const opportunities = highStrength.map(s => s.signal.toLowerCase()).join(', ')
        return `${place.canonical_name}: ${highStrength.length} strong signal${highStrength.length > 1 ? 's' : ''} - ${opportunities}.`
    }

    return `${place.canonical_name}: ${signals.length} moderate opportunity signal${signals.length > 1 ? 's' : ''} identified.`
}

export default {
    generateFeasibilitySignals,
    calculateFeasibility,
    generateEntrepreneurSummary
}
