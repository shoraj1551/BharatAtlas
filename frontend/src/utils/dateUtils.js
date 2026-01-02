/**
 * Date Utilities for Data Decay Strategy
 * "Trust > Completeness"
 */

// Freshness Thresholds in Days
const THRESHOLDS = {
    CENSUS: 365 * 10,    // 10 Years
    INFRASTRUCTURE: 365 * 2, // 2 Years
    MARKET: 7,           // 1 Week
    GOVERNANCE: 365 * 1, // 1 Year
    DEFAULT: 365 * 2     // 2 Years default
}

/**
 * Check if data is stale
 * @param {string} dateString - ISO Date string
 * @param {string} type - Data category ('CENSUS', 'INFRASTRUCTURE', 'MARKET', 'GOVERNANCE')
 * @returns {boolean} True if stale
 */
export const isStale = (dateString, type = 'DEFAULT') => {
    if (!dateString) return true // No date = Stale/Unknown
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    const threshold = THRESHOLDS[type] || THRESHOLDS.DEFAULT
    return diffDays > threshold
}

/**
 * Get freshness level and color
 * @param {string} dateString 
 * @param {string} type 
 * @returns {Object} { status: 'fresh'|'aging'|'stale', color: string, label: string }
 */
export const getFreshnessInfo = (dateString, type = 'DEFAULT') => {
    if (!dateString) return { status: 'unknown', color: '#94a3b8', label: 'Unknown Date' }

    const date = new Date(dateString)
    const year = date.getFullYear()

    if (isStale(dateString, type)) {
        return { status: 'stale', color: '#ef4444', label: `⚠️ Verified ${year} (Stale)` }
    }

    // Check if "aging" (halfway to stale)
    const threshold = THRESHOLDS[type] || THRESHOLDS.DEFAULT
    const now = new Date()
    const diffDays = Math.ceil(Math.abs(now - date) / (1000 * 60 * 60 * 24))

    if (diffDays > threshold / 2) {
        return { status: 'aging', color: '#f59e0b', label: `Verified ${year}` }
    }

    return { status: 'fresh', color: '#10b981', label: `Fresh (${year})` }
}
