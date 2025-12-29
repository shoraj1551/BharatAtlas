// API Rate Limiting & Abuse Detection
// Gentle rate limiting and abuse prevention (Stories 213, 224, 227)

import API_CHARTER from './apiCharter'

/**
 * Rate Limiter
 */
export class RateLimiter {
    constructor() {
        this.requests = new Map() // IP -> request history
    }

    /**
     * Check rate limit (Story 213, 227)
     */
    checkLimit(ip, userType = 'anonymous') {
        const limits = API_CHARTER.rateLimits[userType] || API_CHARTER.rateLimits.anonymous
        const now = Date.now()

        // Get request history for IP
        if (!this.requests.has(ip)) {
            this.requests.set(ip, [])
        }

        const history = this.requests.get(ip)

        // Clean old requests
        const oneMinuteAgo = now - 60 * 1000
        const oneHourAgo = now - 60 * 60 * 1000
        const oneDayAgo = now - 24 * 60 * 60 * 1000

        const recentRequests = history.filter(t => t > oneMinuteAgo)
        const hourlyRequests = history.filter(t => t > oneHourAgo)
        const dailyRequests = history.filter(t => t > oneDayAgo)

        // Check limits
        if (recentRequests.length >= limits.requestsPerMinute) {
            return {
                allowed: false,
                reason: 'Rate limit exceeded (per minute)',
                retryAfter: 60,
                limit: limits.requestsPerMinute
            }
        }

        if (hourlyRequests.length >= limits.requestsPerHour) {
            return {
                allowed: false,
                reason: 'Rate limit exceeded (per hour)',
                retryAfter: 3600,
                limit: limits.requestsPerHour
            }
        }

        if (dailyRequests.length >= limits.requestsPerDay) {
            return {
                allowed: false,
                reason: 'Rate limit exceeded (per day)',
                retryAfter: 86400,
                limit: limits.requestsPerDay
            }
        }

        // Add current request
        history.push(now)
        this.requests.set(ip, history.filter(t => t > oneDayAgo)) // Keep only last 24h

        return { allowed: true }
    }

    /**
     * Get usage stats for IP
     */
    getUsageStats(ip) {
        const history = this.requests.get(ip) || []
        const now = Date.now()

        return {
            lastMinute: history.filter(t => t > now - 60 * 1000).length,
            lastHour: history.filter(t => t > now - 60 * 60 * 1000).length,
            lastDay: history.filter(t => t > now - 24 * 60 * 60 * 1000).length
        }
    }
}

/**
 * Abuse Detector (Story 224)
 */
export class AbuseDetector {
    constructor() {
        this.patterns = new Map()
    }

    /**
     * Detect abnormal usage (Story 224)
     */
    detectAbuse(ip, requestPattern) {
        const flags = []

        // Story 224: Detect scraping or misuse

        // Check for rate spike
        if (this.isRateSpike(ip, requestPattern)) {
            flags.push({
                type: 'rate_spike',
                severity: 'medium',
                message: 'Sudden spike in request rate'
            })
        }

        // Check for sequential scraping
        if (this.isSequentialScraping(requestPattern)) {
            flags.push({
                type: 'sequential_scraping',
                severity: 'high',
                message: 'Sequential ID enumeration detected'
            })
        }

        // Check for bulk download attempt
        if (this.isBulkDownload(requestPattern)) {
            flags.push({
                type: 'bulk_download',
                severity: 'high',
                message: 'Bulk download attempt detected'
            })
        }

        // Check for bot-like behavior
        if (this.isBotBehavior(requestPattern)) {
            flags.push({
                type: 'bot_behavior',
                severity: 'low',
                message: 'Bot-like request pattern'
            })
        }

        return {
            isAbusive: flags.some(f => f.severity === 'high'),
            flags
        }
    }

    /**
     * Check for rate spike
     */
    isRateSpike(ip, pattern) {
        const baseline = this.patterns.get(ip)?.averageRate || 10
        const currentRate = pattern.requestsPerMinute || 0

        return currentRate > baseline * 5 // 5x spike
    }

    /**
     * Check for sequential scraping
     */
    isSequentialScraping(pattern) {
        // Check if requests are sequential IDs
        if (!pattern.requestedIds || pattern.requestedIds.length < 10) {
            return false
        }

        const ids = pattern.requestedIds.map(id => parseInt(id)).filter(id => !isNaN(id))
        if (ids.length < 10) return false

        // Check if sequential
        let sequential = 0
        for (let i = 1; i < ids.length; i++) {
            if (ids[i] === ids[i - 1] + 1) sequential++
        }

        return sequential / ids.length > 0.8 // 80% sequential
    }

    /**
     * Check for bulk download
     */
    isBulkDownload(pattern) {
        return pattern.uniqueEndpoints > 100 && pattern.timeSpan < 60 // 100+ unique requests in 1 min
    }

    /**
     * Check for bot behavior
     */
    isBotBehavior(pattern) {
        return !pattern.userAgent || pattern.userAgent.includes('bot') || pattern.userAgent.includes('crawler')
    }
}

/**
 * API Usage Tracker (Story 218)
 */
export class ApiUsageTracker {
    constructor() {
        this.dailyStats = {
            requests: 0,
            uniqueIPs: new Set(),
            endpoints: new Map()
        }
    }

    /**
     * Track request
     */
    trackRequest(ip, endpoint) {
        this.dailyStats.requests++
        this.dailyStats.uniqueIPs.add(ip)

        const count = this.dailyStats.endpoints.get(endpoint) || 0
        this.dailyStats.endpoints.set(endpoint, count + 1)
    }

    /**
     * Get public stats (Story 218: Expose usage openly)
     */
    getPublicStats() {
        return {
            dailyRequests: this.dailyStats.requests,
            uniqueUsers: this.dailyStats.uniqueIPs.size,
            topEndpoints: Array.from(this.dailyStats.endpoints.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([endpoint, count]) => ({ endpoint, count }))
        }
    }
}

export default {
    RateLimiter,
    AbuseDetector,
    ApiUsageTracker
}
