/**
 * Comparison Service
 * 
 * Handles comparison logic and metric alignment
 */

/**
 * Align metrics across multiple places for comparison
 * Ensures temporal alignment and handles missing data
 */
export function alignMetrics(places) {
    if (!places || places.length === 0) {
        return []
    }

    // Define comparable metrics
    const metrics = [
        {
            key: 'population',
            label: 'Population',
            accessor: (place) => place.population?.value,
            formatter: (value) => value?.toLocaleString() ?? 'N/A',
            unit: '',
            comparable: true
        },
        {
            key: 'area',
            label: 'Area',
            accessor: (place) => place.area_sq_km,
            formatter: (value) => value?.toLocaleString() ?? 'N/A',
            unit: 'km²',
            comparable: true
        },
        {
            key: 'density',
            label: 'Population Density',
            accessor: (place) => {
                const pop = place.population?.value
                const area = place.area_sq_km
                return pop && area ? Math.round(pop / area) : null
            },
            formatter: (value) => value?.toLocaleString() ?? 'N/A',
            unit: 'per km²',
            comparable: true
        },
        {
            key: 'literacy_rate',
            label: 'Literacy Rate',
            accessor: (place) => place.literacy_rate?.value,
            formatter: (value) => value ?? 'N/A',
            unit: '%',
            comparable: true
        },
        {
            key: 'num_districts',
            label: 'Number of Districts',
            accessor: (place) => place.num_districts?.value,
            formatter: (value) => value ?? 'N/A',
            unit: '',
            comparable: true
        },
        {
            key: 'data_quality',
            label: 'Data Quality Score',
            accessor: (place) => place.data_quality_score,
            formatter: (value) => value ? `${(value * 100).toFixed(0)}%` : 'N/A',
            unit: '',
            comparable: false
        }
    ]

    // Build comparison table
    const comparisonData = metrics.map(metric => {
        const row = {
            metric: metric.label,
            unit: metric.unit,
            comparable: metric.comparable,
            values: places.map(place => ({
                placeId: place.place_id,
                placeName: place.canonical_name,
                rawValue: metric.accessor(place),
                displayValue: metric.formatter(metric.accessor(place)),
                confidence: place.data_quality_score,
                timestamp: place.last_updated || 'Unknown'
            }))
        }

        // Calculate min/max for highlighting
        const numericValues = row.values
            .map(v => v.rawValue)
            .filter(v => v !== null && v !== undefined && !isNaN(v))

        if (numericValues.length > 0) {
            row.min = Math.min(...numericValues)
            row.max = Math.max(...numericValues)
        }

        return row
    })

    return comparisonData
}

/**
 * Generate comparison summary
 */
export function generateComparisonSummary(places) {
    if (!places || places.length < 2) {
        return null
    }

    const summary = {
        totalPlaces: places.length,
        placeTypes: [...new Set(places.map(p => p.place_type))],
        avgPopulation: null,
        avgArea: null,
        avgLiteracy: null
    }

    // Calculate averages
    const populations = places
        .map(p => p.population?.value)
        .filter(v => v !== null && v !== undefined)

    if (populations.length > 0) {
        summary.avgPopulation = Math.round(
            populations.reduce((a, b) => a + b, 0) / populations.length
        )
    }

    const areas = places
        .map(p => p.area_sq_km)
        .filter(v => v !== null && v !== undefined)

    if (areas.length > 0) {
        summary.avgArea = Math.round(
            areas.reduce((a, b) => a + b, 0) / areas.length
        )
    }

    const literacyRates = places
        .map(p => p.literacy_rate?.value)
        .filter(v => v !== null && v !== undefined)

    if (literacyRates.length > 0) {
        summary.avgLiteracy = (
            literacyRates.reduce((a, b) => a + b, 0) / literacyRates.length
        ).toFixed(1)
    }

    return summary
}

/**
 * Check if places are comparable
 * Returns warnings if comparison might be misleading
 */
export function checkComparability(places) {
    const warnings = []

    if (!places || places.length < 2) {
        warnings.push('At least 2 places required for comparison')
        return { comparable: false, warnings }
    }

    // Check if all same type
    const types = [...new Set(places.map(p => p.place_type))]
    if (types.length > 1) {
        warnings.push(
            `Comparing different place types: ${types.join(', ')}. ` +
            'Metrics may not be directly comparable.'
        )
    }

    // Check data quality
    const lowQuality = places.filter(p =>
        (p.data_quality_score || 0) < 0.5
    )
    if (lowQuality.length > 0) {
        warnings.push(
            `${lowQuality.length} place(s) have low data quality scores. ` +
            'Comparison may be unreliable.'
        )
    }

    // Check data freshness (if timestamps available)
    const oldData = places.filter(p => {
        if (!p.last_updated) return false
        const daysSinceUpdate = (Date.now() - new Date(p.last_updated)) / (1000 * 60 * 60 * 24)
        return daysSinceUpdate > 365
    })
    if (oldData.length > 0) {
        warnings.push(
            `${oldData.length} place(s) have data older than 1 year. ` +
            'Comparison may not reflect current state.'
        )
    }

    return {
        comparable: warnings.length === 0 || types.length === 1,
        warnings
    }
}

export default {
    alignMetrics,
    generateComparisonSummary,
    checkComparability
}
