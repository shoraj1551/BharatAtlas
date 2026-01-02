/**
 * Data Confidence Calculator
 * 
 * Grades the completeness and freshness of place data.
 * Trust beats completeness - we tell the user if data is weak.
 */

export const calculateDataConfidence = (place) => {
    if (!place) return { score: 0, label: 'Unknown', color: '#9ca3af', missing: [] }

    let score = 0
    let totalPoints = 100
    let missingLog = []

    // 1. Core Demographics (30 pts)
    if (place.population?.value) score += 10
    else missingLog.push("Population Data")

    if (place.literacy_rate?.value) score += 10
    else missingLog.push("Literacy Rate")

    // 2. Geographic Basics (10 pts)
    if (place.area_sq_km) score += 10
    else missingLog.push("Area Size")

    // 3. Governance Layer (20 pts)
    if (place.governance?.administration) score += 10
    else missingLog.push("Admin Contacts")

    if (place.governance?.schemes && place.governance.schemes.length > 0) score += 10
    else missingLog.push("Govt Schemes")

    // 4. Cultural/Market Context (20 pts)
    if (place.culture_society?.languages) score += 10
    else missingLog.push("Language Data")

    if (place.major_industries && place.major_industries.length > 0) score += 10
    else missingLog.push("Industry List")

    // 5. Freshness (20 pts)
    const lastUpdated = new Date(place.updated_at || place.created_at)
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

    if (lastUpdated > oneYearAgo) score += 20
    else missingLog.push("Data > 1 Year Old")

    // Determine Label & Color
    let label = 'Low Confidence'
    let color = '#ef4444' // Red

    if (score >= 80) {
        label = 'High Confidence'
        color = '#10b981' // Green
    } else if (score >= 50) {
        label = 'Medium Confidence'
        color = '#f59e0b' // Yellow
    }

    return {
        score,
        label,
        color,
        missing: missingLog
    }
}
