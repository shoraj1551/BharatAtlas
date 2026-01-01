import './ConfidenceBadge.css'

/**
 * Confidence Badge Component
 * 
 * Visual indicator for data quality and confidence levels
 * Aligns with Product Oath: Transparency Over Persuasion
 */

const CONFIDENCE_LEVELS = {
    VERIFIED: { min: 0.9, label: 'Verified', color: '#10b981', icon: '✓' },
    HIGH: { min: 0.7, label: 'High Confidence', color: '#3b82f6', icon: '●' },
    MEDIUM: { min: 0.5, label: 'Medium Confidence', color: '#f59e0b', icon: '◐' },
    LOW: { min: 0.3, label: 'Low Confidence', color: '#ef4444', icon: '○' },
    UNKNOWN: { min: 0, label: 'Unknown', color: '#6b7280', icon: '?' }
}

function getConfidenceLevel(score) {
    if (score === null || score === undefined) return CONFIDENCE_LEVELS.UNKNOWN
    if (score >= CONFIDENCE_LEVELS.VERIFIED.min) return CONFIDENCE_LEVELS.VERIFIED
    if (score >= CONFIDENCE_LEVELS.HIGH.min) return CONFIDENCE_LEVELS.HIGH
    if (score >= CONFIDENCE_LEVELS.MEDIUM.min) return CONFIDENCE_LEVELS.MEDIUM
    if (score >= CONFIDENCE_LEVELS.LOW.min) return CONFIDENCE_LEVELS.LOW
    return CONFIDENCE_LEVELS.UNKNOWN
}

function ConfidenceBadge({ score, source, lastUpdated, variant = 'default', showLabel = true }) {
    const level = getConfidenceLevel(score)
    const percentage = score !== null && score !== undefined ? Math.round(score * 100) : null

    const tooltipText = [
        `Confidence: ${percentage !== null ? percentage + '%' : 'Unknown'}`,
        source && `Source: ${source}`,
        lastUpdated && `Updated: ${formatDate(lastUpdated)}`
    ].filter(Boolean).join('\n')

    return (
        <span
            className={`confidence-badge ${variant}`}
            style={{ backgroundColor: level.color }}
            title={tooltipText}
            aria-label={`Data confidence: ${level.label}`}
        >
            <span className="confidence-icon">{level.icon}</span>
            {showLabel && (
                <span className="confidence-label">
                    {percentage !== null ? `${percentage}%` : level.label}
                </span>
            )}
        </span>
    )
}

function formatDate(dateString) {
    if (!dateString) return 'Unknown'

    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
}

export default ConfidenceBadge
export { CONFIDENCE_LEVELS, getConfidenceLevel }
