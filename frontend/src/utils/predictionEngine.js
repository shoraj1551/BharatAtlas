/**
 * Predictive Analytics Engine
 * 
 * Forecasts future trends using statistical methods
 */

/**
 * Simple linear regression
 */
function linearRegression(x, y) {
    const n = x.length
    const sumX = x.reduce((a, b) => a + b, 0)
    const sumY = y.reduce((a, b) => a + b, 0)
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0)
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0)

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n

    return { slope, intercept }
}

/**
 * Predict population for future years
 */
export function predictPopulation(place, targetYear = 2030) {
    // Using Census 2011 as baseline
    const baseYear = 2011
    const basePopulation = place.population?.value || 0

    if (basePopulation === 0) return null

    // Assume average growth rate of 1.2% per year (India's avg)
    const growthRate = 0.012
    const years = targetYear - baseYear
    const predictedPopulation = basePopulation * Math.pow(1 + growthRate, years)

    return {
        year: targetYear,
        value: Math.round(predictedPopulation),
        confidence: 0.7, // 70% confidence
        method: 'exponential-growth'
    }
}

/**
 * Predict literacy rate
 */
export function predictLiteracy(place, targetYear = 2030) {
    const baseLiteracy = place.literacy_rate?.value || 0

    if (baseLiteracy === 0) return null

    // Assume literacy improves by 0.5% per year
    const baseYear = 2011
    const improvement = 0.5
    const years = targetYear - baseYear
    const predictedLiteracy = Math.min(100, baseLiteracy + improvement * years)

    return {
        year: targetYear,
        value: Math.round(predictedLiteracy * 10) / 10,
        confidence: 0.6,
        method: 'linear-trend'
    }
}

/**
 * Generate prediction summary
 */
export function generatePredictions(place) {
    const predictions = []

    // Population prediction
    const popPrediction = predictPopulation(place, 2030)
    if (popPrediction) {
        predictions.push({
            metric: 'Population',
            current: place.population.value,
            predicted: popPrediction.value,
            year: popPrediction.year,
            change: ((popPrediction.value - place.population.value) / place.population.value * 100).toFixed(1),
            confidence: popPrediction.confidence,
            icon: '👥'
        })
    }

    // Literacy prediction
    const litPrediction = predictLiteracy(place, 2030)
    if (litPrediction) {
        predictions.push({
            metric: 'Literacy Rate',
            current: place.literacy_rate.value,
            predicted: litPrediction.value,
            year: litPrediction.year,
            change: (litPrediction.value - place.literacy_rate.value).toFixed(1),
            confidence: litPrediction.confidence,
            icon: '📚'
        })
    }

    return predictions
}

/**
 * Get trend direction
 */
export function getTrendDirection(change) {
    if (change > 5) return 'strong-up'
    if (change > 0) return 'up'
    if (change < -5) return 'strong-down'
    if (change < 0) return 'down'
    return 'stable'
}

/**
 * Get trend icon
 */
export function getTrendIcon(direction) {
    const icons = {
        'strong-up': '📈',
        'up': '↗️',
        'stable': '➡️',
        'down': '↘️',
        'strong-down': '📉'
    }
    return icons[direction] || '➡️'
}
