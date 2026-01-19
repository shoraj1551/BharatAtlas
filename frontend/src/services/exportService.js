/**
 * Export Service
 * 
 * Handle data export downloads
 */

const API_BASE = '/api/v1/export'

export async function exportPlaces(placeIds, format = 'json') {
    // ... existing implementation ...
    const response = await fetch(`${API_BASE}/places`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('api_key') || ''}`
        },
        body: JSON.stringify({ place_ids: placeIds, format })
    })

    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Export failed: ${errorText}`)
    }

    // Handle file download
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `places_export.${format}`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
}

/**
 * Export comparison data to CSV (Client-side)
 */
export function exportComparisonToCSV(comparisonData, places) {
    if (!comparisonData || !places) return

    // Create CSV content
    // Header
    const headers = ['Metric', ...places.map(p => p.canonical_name)]
    const rows = [headers.join(',')]

    // Rows
    Object.keys(comparisonData).forEach(metric => {
        const row = [formatMetricName(metric)]
        places.forEach(place => {
            const val = comparisonData[metric][place.place_id]
            row.push(val !== undefined ? val : 'N/A')
        })
        rows.push(row.join(','))
    })

    const csvContent = "data:text/csv;charset=utf-8," + rows.join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "bharatatlas_comparison.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

/**
 * Export comparison data to JSON (Client-side)
 */
export function exportComparisonToJSON(comparisonData, places) {
    if (!comparisonData || !places) return

    const exportData = {
        meta: {
            date: new Date().toISOString(),
            source: 'BharatAtlas',
            places: places.map(p => ({ id: p.place_id, name: p.canonical_name }))
        },
        data: comparisonData
    }

    const jsonString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2))
    const link = document.createElement("a")
    link.setAttribute("href", jsonString)
    link.setAttribute("download", "bharatatlas_comparison.json")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

function formatMetricName(key) {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}
