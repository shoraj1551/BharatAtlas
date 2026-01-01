/**
 * Opportunity Scoring Service
 * 
 * Calculates multi-factor opportunity scores for places
 * Aligns with Product Oath: Transparency, Uncertainty, Provenance
 */

/**
 * Calculate opportunity score for a place
 * Returns score (0-100) with breakdown by factor
 */
export function calculateOpportunityScore(place) {
    if (!place) {
        return {
            totalScore: 0,
            confidence: 0,
            breakdown: {},
            warnings: ['No place data available']
        }
    }

    const factors = {
        population: calculatePopulationScore(place),
        growth: calculateGrowthScore(place),
        infrastructure: calculateInfrastructureScore(place),
        literacy: calculateLiteracyScore(place),
        economic: calculateEconomicScore(place)
    }

    // Calculate weighted total
    const weights = {
        population: 0.20,
        growth: 0.25,
        infrastructure: 0.20,
        literacy: 0.15,
        economic: 0.20
    }

    let totalScore = 0
    let totalWeight = 0
    const breakdown = {}
    const warnings = []

    for (const [factor, data] of Object.entries(factors)) {
        if (data.available) {
            totalScore += data.score * weights[factor]
            totalWeight += weights[factor]
            breakdown[factor] = {
                score: data.score,
                weight: weights[factor],
                confidence: data.confidence,
                details: data.details
            }
        } else {
            warnings.push(`${factor} data not available`)
        }
    }

    // Normalize score if some factors are missing
    const finalScore = totalWeight > 0 ? (totalScore / totalWeight) : 0
    const overallConfidence = calculateOverallConfidence(factors)

    return {
        totalScore: Math.round(finalScore),
        confidence: overallConfidence,
        breakdown,
        warnings,
        timestamp: new Date().toISOString()
    }
}

/**
 * Population factor score (0-100)
 */
function calculatePopulationScore(place) {
    const population = place.population?.value

    if (!population) {
        return { available: false, score: 0, confidence: 0 }
    }

    // Score based on population size (logarithmic scale)
    let score = 0
    if (population > 10000000) score = 100      // Mega cities
    else if (population > 5000000) score = 90   // Large cities
    else if (population > 1000000) score = 80   // Cities
    else if (population > 500000) score = 70    // Medium cities
    else if (population > 100000) score = 60    // Small cities
    else if (population > 50000) score = 50     // Towns
    else score = 30                              // Villages

    return {
        available: true,
        score,
        confidence: place.data_quality_score || 0.7,
        details: {
            population,
            category: getPopulationCategory(population)
        }
    }
}

/**
 * Growth potential score (0-100)
 */
function calculateGrowthScore(place) {
    // Placeholder - would use historical data in production
    const hasGrowthData = place.growth_rate !== undefined

    if (!hasGrowthData) {
        return { available: false, score: 0, confidence: 0 }
    }

    const growthRate = place.growth_rate || 0
    const score = Math.min(100, Math.max(0, 50 + (growthRate * 10)))

    return {
        available: true,
        score,
        confidence: 0.6,
        details: {
            growthRate: `${growthRate}%`,
            trend: growthRate > 2 ? 'High' : growthRate > 0 ? 'Moderate' : 'Low'
        }
    }
}

/**
 * Infrastructure score (0-100)
 */
function calculateInfrastructureScore(place) {
    // Based on place type and available data
    const placeType = place.place_type

    let score = 50 // Default
    if (placeType === 'state') score = 80
    else if (placeType === 'district') score = 70
    else if (placeType === 'tehsil') score = 60
    else if (placeType === 'thana') score = 50
    else if (placeType === 'village') score = 40

    return {
        available: true,
        score,
        confidence: 0.5,
        details: {
            placeType,
            level: score > 70 ? 'High' : score > 50 ? 'Medium' : 'Basic'
        }
    }
}

/**
 * Literacy score (0-100)
 */
function calculateLiteracyScore(place) {
    const literacyRate = place.literacy_rate?.value

    if (!literacyRate) {
        return { available: false, score: 0, confidence: 0 }
    }

    // Direct mapping (literacy rate is already 0-100)
    const score = literacyRate

    return {
        available: true,
        score,
        confidence: place.data_quality_score || 0.7,
        details: {
            literacyRate: `${literacyRate}%`,
            level: literacyRate > 80 ? 'High' : literacyRate > 60 ? 'Medium' : 'Low'
        }
    }
}

/**
 * Economic opportunity score (0-100)
 */
function calculateEconomicScore(place) {
    const industries = place.major_industries

    if (!industries || industries.length === 0) {
        return { available: false, score: 0, confidence: 0 }
    }

    // Score based on industry diversity
    const diversityScore = Math.min(100, industries.length * 20)

    return {
        available: true,
        score: diversityScore,
        confidence: 0.6,
        details: {
            industries: industries.join(', '),
            diversity: industries.length
        }
    }
}

/**
 * Calculate overall confidence
 */
function calculateOverallConfidence(factors) {
    const confidences = Object.values(factors)
        .filter(f => f.available)
        .map(f => f.confidence)

    if (confidences.length === 0) return 0

    return confidences.reduce((a, b) => a + b, 0) / confidences.length
}

/**
 * Get population category
 */
function getPopulationCategory(population) {
    if (population > 10000000) return 'Mega City'
    if (population > 5000000) return 'Large City'
    if (population > 1000000) return 'City'
    if (population > 500000) return 'Medium City'
    if (population > 100000) return 'Small City'
    if (population > 50000) return 'Town'
    return 'Village'
}

/**
 * Compare opportunity scores
 */
export function compareOpportunityScores(places) {
    const scores = places.map(place => ({
        place,
        score: calculateOpportunityScore(place)
    }))

    // Sort by total score
    scores.sort((a, b) => b.score.totalScore - a.score.totalScore)

    return {
        scores,
        highest: scores[0],
        lowest: scores[scores.length - 1],
        average: scores.reduce((sum, s) => sum + s.score.totalScore, 0) / scores.length
    }
}

export default {
    calculateOpportunityScore,
    compareOpportunityScores
}
