/**
 * Insight Generation Engine
 * 
 * Generates AI-powered insights about places using statistical analysis
 */

/**
 * Generate insights for a place
 */
export function generateInsights(place, allPlaces = []) {
    const insights = []

    // Population insights
    if (place.population?.value) {
        insights.push(...getPopulationInsights(place, allPlaces))
    }

    // Literacy insights
    if (place.literacy_rate?.value) {
        insights.push(...getLiteracyInsights(place, allPlaces))
    }

    // Density insights
    if (place.population_density) {
        insights.push(...getDensityInsights(place, allPlaces))
    }

    // Growth insights
    insights.push(...getGrowthInsights(place))

    // Ranking insights
    insights.push(...getRankingInsights(place, allPlaces))

    return insights.slice(0, 5) // Top 5 insights
}

/**
 * Population insights
 */
function getPopulationInsights(place, allPlaces) {
    const insights = []
    const pop = place.population.value

    // Percentile ranking
    const percentile = calculatePercentile(pop, allPlaces.map(p => p.population?.value || 0))

    if (percentile >= 90) {
        insights.push({
            type: 'highlight',
            icon: '👥',
            title: 'High Population',
            description: `In the top 10% of places by population with ${(pop / 1000000).toFixed(1)}M people`,
            severity: 'positive'
        })
    } else if (percentile <= 10) {
        insights.push({
            type: 'info',
            icon: '👥',
            title: 'Low Population',
            description: `Among the least populated areas with ${(pop / 1000).toFixed(0)}K people`,
            severity: 'neutral'
        })
    }

    // Mega city detection
    if (pop > 10000000) {
        insights.push({
            type: 'highlight',
            icon: '🏙️',
            title: 'Mega City',
            description: 'One of India\'s mega cities with over 10 million residents',
            severity: 'positive'
        })
    }

    return insights
}

/**
 * Literacy insights
 */
function getLiteracyInsights(place, allPlaces) {
    const insights = []
    const literacy = place.literacy_rate.value

    // National average comparison
    const nationalAvg = 74.04 // Census 2011
    const diff = literacy - nationalAvg

    if (diff > 10) {
        insights.push({
            type: 'highlight',
            icon: '📚',
            title: 'High Literacy',
            description: `Literacy rate of ${literacy}% is ${diff.toFixed(1)}% above national average`,
            severity: 'positive'
        })
    } else if (diff < -10) {
        insights.push({
            type: 'warning',
            icon: '📚',
            title: 'Below Average Literacy',
            description: `Literacy rate of ${literacy}% is ${Math.abs(diff).toFixed(1)}% below national average`,
            severity: 'negative'
        })
    }

    // Excellence detection
    if (literacy > 90) {
        insights.push({
            type: 'highlight',
            icon: '🎓',
            title: 'Educational Excellence',
            description: 'Exceptional literacy rate above 90%',
            severity: 'positive'
        })
    }

    return insights
}

/**
 * Density insights
 */
function getDensityInsights(place, allPlaces) {
    const insights = []
    const density = place.population_density

    // Outlier detection
    const densities = allPlaces.map(p => p.population_density || 0)
    const avg = densities.reduce((a, b) => a + b, 0) / densities.length
    const stdDev = Math.sqrt(densities.reduce((sq, n) => sq + Math.pow(n - avg, 2), 0) / densities.length)

    if (density > avg + 2 * stdDev) {
        insights.push({
            type: 'warning',
            icon: '🏘️',
            title: 'Very High Density',
            description: `Population density of ${density.toLocaleString()}/km² is significantly above average`,
            severity: 'warning'
        })
    } else if (density < avg - stdDev && density > 0) {
        insights.push({
            type: 'info',
            icon: '🌳',
            title: 'Low Density',
            description: `Spacious area with ${density.toLocaleString()} people per km²`,
            severity: 'neutral'
        })
    }

    return insights
}

/**
 * Growth insights
 */
function getGrowthInsights(place) {
    const insights = []

    // Industry diversity
    if (place.major_industries && place.major_industries.length > 5) {
        insights.push({
            type: 'highlight',
            icon: '🏭',
            title: 'Diverse Economy',
            description: `${place.major_industries.length} major industries driving economic growth`,
            severity: 'positive'
        })
    }

    return insights
}

/**
 * Ranking insights
 */
function getRankingInsights(place, allPlaces) {
    const insights = []

    if (allPlaces.length === 0) return insights

    // Rank by population
    const popRank = allPlaces
        .filter(p => p.population?.value)
        .sort((a, b) => (b.population?.value || 0) - (a.population?.value || 0))
        .findIndex(p => p.place_id === place.place_id) + 1

    if (popRank <= 10 && popRank > 0) {
        insights.push({
            type: 'highlight',
            icon: '🏆',
            title: `#${popRank} by Population`,
            description: `Ranked ${popRank} among all places by population`,
            severity: 'positive'
        })
    }

    return insights
}

/**
 * Calculate percentile
 */
function calculatePercentile(value, values) {
    const sorted = values.filter(v => v > 0).sort((a, b) => a - b)
    const index = sorted.findIndex(v => v >= value)
    return (index / sorted.length) * 100
}

/**
 * Get insight color
 */
export function getInsightColor(severity) {
    const colors = {
        positive: '#10b981',
        warning: '#f59e0b',
        negative: '#ef4444',
        neutral: '#6b7280'
    }
    return colors[severity] || colors.neutral
}
