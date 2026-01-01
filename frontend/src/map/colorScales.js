/**
 * Color scales for map visualizations
 */

export const POPULATION_DENSITY_SCALE = {
    stops: [
        [0, '#d4edda'],      // Very Low - Light Green
        [100, '#c3e6cb'],    // Low - Green
        [300, '#ffc107'],    // Medium - Yellow
        [600, '#ff9800'],    // High - Orange
        [1000, '#f44336'],   // Very High - Red
        [5000, '#b71c1c']    // Extreme - Dark Red
    ],
    property: 'population_density',
    unit: 'people/km²'
}

export const LITERACY_RATE_SCALE = {
    stops: [
        [0, '#ffebee'],      // Very Low - Light Red
        [50, '#fff9c4'],     // Low - Light Yellow
        [70, '#c8e6c9'],     // Medium - Light Green
        [80, '#81c784'],     // High - Green
        [90, '#4caf50'],     // Very High - Dark Green
        [100, '#2e7d32']     // Excellent - Darkest Green
    ],
    property: 'literacy_rate',
    unit: '%'
}

/**
 * Get color for a value based on scale
 */
export function getColorForValue(value, scale) {
    if (value === null || value === undefined) {
        return '#cccccc' // Gray for no data
    }

    const stops = scale.stops

    for (let i = 0; i < stops.length - 1; i++) {
        if (value >= stops[i][0] && value < stops[i + 1][0]) {
            return stops[i][1]
        }
    }

    return stops[stops.length - 1][1]
}

/**
 * Create MapLibre expression for choropleth
 */
export function createChoroplethExpression(scale) {
    const expression = ['interpolate', ['linear'], ['get', scale.property]]

    scale.stops.forEach(([value, color]) => {
        expression.push(value, color)
    })

    return expression
}

/**
 * Get legend items for a scale
 */
export function getLegendItems(scale) {
    return scale.stops.map((stop, idx) => {
        const [value, color] = stop
        const nextValue = scale.stops[idx + 1]?.[0]

        return {
            color,
            label: nextValue
                ? `${value.toLocaleString()}-${nextValue.toLocaleString()}`
                : `${value.toLocaleString()}+`,
            value
        }
    })
}
