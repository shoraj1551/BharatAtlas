/**
 * Format large numbers with locale-specific separators
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
    return num?.toLocaleString() || '0'
}

/**
 * Format percentage with specified decimal places
 * @param {number} value - Value to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 1) => {
    return `${value?.toFixed(decimals)}%` || '0%'
}

/**
 * Get confidence level label from score
 * @param {number} score - Confidence score (0.0-1.0)
 * @returns {string} Confidence level
 */
export const getConfidenceLevel = (score) => {
    if (score >= 0.8) return 'High'
    if (score >= 0.5) return 'Medium'
    return 'Low'
}

/**
 * Get verification status color
 * @param {string} status - Verification status
 * @returns {string} CSS color class
 */
export const getStatusColor = (status) => {
    const colors = {
        verified: '#2e7d32',
        inferred: '#f57c00',
        unverified: '#757575',
        disputed: '#d32f2f'
    }
    return colors[status] || colors.unverified
}

export default {
    formatNumber,
    formatPercentage,
    getConfidenceLevel,
    getStatusColor
}
