// Ingestion Monitoring & Ethics
// Dashboard, coverage tracking, and ethical filtering (Stories 198, 207-209)

/**
 * Ingestion Summary (Story 207)
 */
export class IngestionSummary {
    constructor() {
        this.sources = new Map()
    }

    /**
     * Update source status
     */
    updateSource(sourceId, status) {
        this.sources.set(sourceId, {
            sourceId,
            status,
            lastUpdated: new Date().toISOString()
        })
    }

    /**
     * Get dashboard summary (Story 207)
     */
    getDashboard() {
        const sources = Array.from(this.sources.values())

        return {
            totalSources: sources.length,
            active: sources.filter(s => s.status === 'active').length,
            stale: sources.filter(s => s.status === 'stale').length,
            failed: sources.filter(s => s.status === 'failed').length,
            lastUpdated: new Date().toISOString()
        }
    }
}

/**
 * Place Coverage Tracker (Story 208)
 */
export class PlaceCoverageTracker {
    constructor() {
        this.coverage = new Map()
    }

    /**
     * Calculate coverage score (Story 208: Expose blind spots)
     */
    calculateCoverageScore(placeId, metrics) {
        const totalMetrics = metrics.length
        const availableMetrics = metrics.filter(m => m.value !== null && m.value !== undefined).length

        const score = totalMetrics > 0 ? (availableMetrics / totalMetrics) * 100 : 0

        this.coverage.set(placeId, {
            placeId,
            score: Math.round(score),
            totalMetrics,
            availableMetrics,
            missingMetrics: totalMetrics - availableMetrics,
            calculatedAt: new Date().toISOString()
        })

        return score
    }

    /**
     * Get coverage for place
     */
    getCoverage(placeId) {
        return this.coverage.get(placeId) || {
            placeId,
            score: 0,
            message: 'No coverage data available'
        }
    }

    /**
     * Get low coverage places (Story 208: Track where data is thin)
     */
    getLowCoveragePlaces(threshold = 50) {
        return Array.from(this.coverage.values())
            .filter(c => c.score < threshold)
            .sort((a, b) => a.score - b.score)
    }
}

/**
 * Ingestion Ethics Filter (Story 209)
 */
export class IngestionEthicsFilter {
    /**
     * Check if data violates charter (Story 209)
     */
    static checkEthics(data) {
        const violations = []

        // Story 209: Filter unethical data

        // Check for personally identifiable information
        if (this.containsPII(data)) {
            violations.push({
                type: 'pii_violation',
                reason: 'Data contains personally identifiable information'
            })
        }

        // Check for discriminatory categorization
        if (this.isDiscriminatory(data)) {
            violations.push({
                type: 'discrimination',
                reason: 'Data uses discriminatory categorization'
            })
        }

        // Check for surveillance data
        if (this.isSurveillanceData(data)) {
            violations.push({
                type: 'surveillance',
                reason: 'Data derived from surveillance without consent'
            })
        }

        // Check for unverified sensitive claims
        if (this.isUnverifiedSensitive(data)) {
            violations.push({
                type: 'unverified_sensitive',
                reason: 'Sensitive claim without credible verification'
            })
        }

        return {
            ethical: violations.length === 0,
            violations
        }
    }

    /**
     * Check for PII
     */
    static containsPII(data) {
        const piiFields = ['name', 'email', 'phone', 'address', 'aadhaar', 'pan']
        return piiFields.some(field => data.hasOwnProperty(field))
    }

    /**
     * Check for discriminatory data
     */
    static isDiscriminatory(data) {
        // Check for categorization by protected characteristics without justification
        const sensitiveCategories = ['caste', 'religion', 'ethnicity']
        return sensitiveCategories.some(cat =>
            data.metric?.includes(cat) && !data.justification
        )
    }

    /**
     * Check for surveillance data
     */
    static isSurveillanceData(data) {
        return data.collectionMethod === 'surveillance' && !data.consentObtained
    }

    /**
     * Check for unverified sensitive data
     */
    static isUnverifiedSensitive(data) {
        const sensitiveMetrics = ['crime_rate', 'communal_incidents', 'poverty_rate']
        return sensitiveMetrics.includes(data.metric) &&
            (!data.sourceReliability || data.sourceReliability < 0.7)
    }
}

/**
 * Ingestion Log (Story 198)
 */
export class IngestionLog {
    constructor() {
        this.logs = []
    }

    /**
     * Log ingestion event (Story 198: Public summarized logs)
     */
    log(event) {
        this.logs.push({
            ...event,
            timestamp: new Date().toISOString()
        })
    }

    /**
     * Get public summary (Story 198: Expose data freshness)
     */
    getPublicSummary() {
        const recent = this.logs.slice(-10)

        return {
            lastIngestions: recent.map(log => ({
                sourceId: log.sourceId,
                status: log.status,
                recordCount: log.recordCount,
                timestamp: log.timestamp
            })),
            summary: `Last updated: ${recent[recent.length - 1]?.sourceId || 'Never'}`
        }
    }

    /**
     * Get detailed logs (internal only)
     */
    getDetailedLogs(limit = 100) {
        return this.logs.slice(-limit).reverse()
    }
}

export default {
    IngestionSummary,
    PlaceCoverageTracker,
    IngestionEthicsFilter,
    IngestionLog
}
