/**
 * Export Service
 * 
 * Handles data export in multiple formats (CSV, JSON, PDF)
 */

/**
 * Export comparison data to CSV
 */
export function exportToCSV(comparisonData, places) {
    if (!comparisonData || !places || places.length === 0) {
        throw new Error('No data to export')
    }

    // Build CSV header
    const headers = ['Metric', ...places.map(p => p.canonical_name)]

    // Build CSV rows
    const rows = comparisonData.map(row => {
        const metricName = row.unit ? `${row.metric} (${row.unit})` : row.metric
        const values = row.values.map(v => v.displayValue)
        return [metricName, ...values]
    })

    // Combine headers and rows
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n')

    return csvContent
}

/**
 * Export comparison data to JSON
 */
export function exportToJSON(comparisonData, places) {
    if (!comparisonData || !places || places.length === 0) {
        throw new Error('No data to export')
    }

    const exportData = {
        metadata: {
            exportDate: new Date().toISOString(),
            placesCount: places.length,
            places: places.map(p => ({
                id: p.place_id,
                name: p.canonical_name,
                type: p.place_type
            }))
        },
        comparison: comparisonData.map(row => ({
            metric: row.metric,
            unit: row.unit,
            comparable: row.comparable,
            values: row.values.map(v => ({
                placeName: v.placeName,
                value: v.rawValue,
                displayValue: v.displayValue,
                confidence: v.confidence,
                timestamp: v.timestamp
            })),
            min: row.min,
            max: row.max
        }))
    }

    return JSON.stringify(exportData, null, 2)
}

/**
 * Download file to user's computer
 */
export function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

/**
 * Export comparison to CSV file
 */
export function exportComparisonToCSV(comparisonData, places) {
    const csv = exportToCSV(comparisonData, places)
    const filename = `bharatatlas-comparison-${Date.now()}.csv`
    downloadFile(csv, filename, 'text/csv')
}

/**
 * Export comparison to JSON file
 */
export function exportComparisonToJSON(comparisonData, places) {
    const json = exportToJSON(comparisonData, places)
    const filename = `bharatatlas-comparison-${Date.now()}.json`
    downloadFile(json, filename, 'application/json')
}

/**
 * Export single place data to JSON
 */
export function exportPlaceToJSON(place) {
    if (!place) {
        throw new Error('No place data to export')
    }

    const exportData = {
        metadata: {
            exportDate: new Date().toISOString(),
            source: 'BharatAtlas'
        },
        place: {
            id: place.place_id,
            name: place.canonical_name,
            type: place.place_type,
            population: place.population,
            area: place.area_sq_km,
            literacyRate: place.literacy_rate,
            numDistricts: place.num_districts,
            majorIndustries: place.major_industries,
            dataQuality: place.data_quality_score,
            verificationStatus: place.verification_status,
            lastUpdated: place.last_updated
        }
    }

    const json = JSON.stringify(exportData, null, 2)
    const filename = `bharatatlas-${place.canonical_name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`
    downloadFile(json, filename, 'application/json')
}

export default {
    exportToCSV,
    exportToJSON,
    exportComparisonToCSV,
    exportComparisonToJSON,
    exportPlaceToJSON,
    downloadFile
}
