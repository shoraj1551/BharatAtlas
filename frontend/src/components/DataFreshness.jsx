import './DataFreshness.css'

/**
 * Format relative time (human-readable)
 */
function getRelativeTime(dateString) {
    if (!dateString) return 'Unknown'

    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffMonths = Math.floor(diffDays / 30)
    const diffYears = Math.floor(diffDays / 365)

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 30) return `${diffDays} days ago`
    if (diffMonths === 1) return '1 month ago'
    if (diffMonths < 12) return `${diffMonths} months ago`
    if (diffYears === 1) return '1 year ago'
    return `${diffYears} years ago`
}

/**
 * Get freshness status
 */
function getFreshnessStatus(dateString) {
    if (!dateString) return 'unknown'

    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

    if (diffDays < 90) return 'fresh'      // < 3 months
    if (diffDays < 365) return 'recent'    // < 1 year
    if (diffDays < 730) return 'aging'     // < 2 years
    return 'stale'                          // > 2 years
}

function DataFreshness({ lastUpdated, label = 'Last updated' }) {
    if (!lastUpdated) {
        return (
            <div className="data-freshness data-freshness-unknown">
                <span className="freshness-label">{label}:</span>
                <span className="freshness-value">Unknown</span>
            </div>
        )
    }

    const relativeTime = getRelativeTime(lastUpdated)
    const status = getFreshnessStatus(lastUpdated)
    const absoluteDate = new Date(lastUpdated).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <div className={`data-freshness data-freshness-${status}`}>
            <span className="freshness-label">{label}:</span>
            <span className="freshness-value" title={absoluteDate}>
                {relativeTime}
            </span>
        </div>
    )
}

export default DataFreshness
