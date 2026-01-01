/**
 * Correlation Analysis Engine
 * 
 * Calculates correlations between metrics and detects relationships
 */

/**
 * Calculate Pearson correlation coefficient
 */
export function calculateCorrelation(x, y) {
    if (x.length !== y.length || x.length === 0) return 0

    const n = x.length
    const sumX = x.reduce((a, b) => a + b, 0)
    const sumY = y.reduce((a, b) => a + b, 0)
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0)
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0)
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0)

    const numerator = n * sumXY - sumX * sumY
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))

    if (denominator === 0) return 0

    return numerator / denominator
}

/**
 * Generate correlation matrix for all metrics
 */
export function generateCorrelationMatrix(places) {
    const metrics = [
        { key: 'population', label: 'Population', getValue: p => p.population?.value || 0 },
        { key: 'literacy', label: 'Literacy', getValue: p => p.literacy_rate?.value || 0 },
        { key: 'density', label: 'Density', getValue: p => p.population_density || 0 },
        { key: 'area', label: 'Area', getValue: p => p.area_sq_km || 0 }
    ]

    const matrix = []

    for (let i = 0; i < metrics.length; i++) {
        const row = []
        const xValues = places.map(metrics[i].getValue).filter(v => v > 0)

        for (let j = 0; j < metrics.length; j++) {
            const yValues = places.map(metrics[j].getValue).filter(v => v > 0)
            const correlation = calculateCorrelation(xValues, yValues)

            row.push({
                x: metrics[i].label,
                y: metrics[j].label,
                correlation: correlation,
                strength: getCorrelationStrength(correlation)
            })
        }
        matrix.push(row)
    }

    return matrix
}

/**
 * Get correlation strength label
 */
function getCorrelationStrength(r) {
    const abs = Math.abs(r)
    if (abs > 0.7) return 'strong'
    if (abs > 0.4) return 'moderate'
    if (abs > 0.2) return 'weak'
    return 'none'
}

/**
 * Find interesting correlations
 */
export function findInterestingCorrelations(places) {
    const matrix = generateCorrelationMatrix(places)
    const interesting = []

    matrix.forEach(row => {
        row.forEach(cell => {
            if (cell.x !== cell.y && Math.abs(cell.correlation) > 0.5) {
                interesting.push({
                    metric1: cell.x,
                    metric2: cell.y,
                    correlation: cell.correlation,
                    strength: cell.strength,
                    description: getCorrelationDescription(cell)
                })
            }
        })
    })

    // Remove duplicates
    return interesting.filter((item, index, self) =>
        index === self.findIndex(t =>
            (t.metric1 === item.metric1 && t.metric2 === item.metric2) ||
            (t.metric1 === item.metric2 && t.metric2 === item.metric1)
        )
    )
}

/**
 * Get correlation description
 */
function getCorrelationDescription(cell) {
    const direction = cell.correlation > 0 ? 'positive' : 'negative'
    const strength = cell.strength

    return `${strength.charAt(0).toUpperCase() + strength.slice(1)} ${direction} correlation between ${cell.x} and ${cell.y}`
}

/**
 * Get correlation color
 */
export function getCorrelationColor(correlation) {
    if (correlation > 0.7) return '#10b981'
    if (correlation > 0.4) return '#84cc16'
    if (correlation > 0) return '#fbbf24'
    if (correlation > -0.4) return '#fb923c'
    if (correlation > -0.7) return '#f87171'
    return '#ef4444'
}
