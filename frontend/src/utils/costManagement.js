// Cost & Resource Management
// Measurable costs and fair throttling (Stories 315-316, 320, 329)

/**
 * Cost Tracker (Story 315)
 */
export class CostTracker {
    constructor() {
        this.costs = new Map() // placeId -> cost breakdown
    }

    /**
     * Track cost per place (Story 315: Measurable)
     */
    trackPlaceCost(placeId, operation, cost) {
        if (!this.costs.has(placeId)) {
            this.costs.set(placeId, {
                placeId,
                totalCost: 0,
                operations: []
            })
        }

        const placeCost = this.costs.get(placeId)
        placeCost.totalCost += cost
        placeCost.operations.push({
            operation,
            cost,
            timestamp: Date.now()
        })
    }

    /**
     * Get cost per place (Story 315)
     */
    getCostPerPlace(placeId) {
        const placeCost = this.costs.get(placeId)

        if (!placeCost) {
            return {
                placeId,
                totalCost: 0,
                breakdown: []
            }
        }

        // Group by operation type
        const breakdown = {}
        placeCost.operations.forEach(op => {
            if (!breakdown[op.operation]) {
                breakdown[op.operation] = 0
            }
            breakdown[op.operation] += op.cost
        })

        return {
            placeId,
            totalCost: placeCost.totalCost,
            breakdown,

            // Story 315: Compute/storage footprint
            footprint: {
                compute: breakdown.compute || 0,
                storage: breakdown.storage || 0,
                bandwidth: breakdown.bandwidth || 0
            }
        }
    }

    /**
     * Get total cost
     */
    getTotalCost() {
        let total = 0
        this.costs.forEach(placeCost => {
            total += placeCost.totalCost
        })
        return total
    }
}

/**
 * Fair Throttler (Story 316)
 */
export class FairThrottler {
    constructor(globalLimit = 1000) {
        this.globalLimit = globalLimit
        this.placeRequests = new Map() // placeId -> request count
        this.totalRequests = 0
    }

    /**
     * Check if request allowed (Story 316: Fair throttling)
     */
    checkAllowed(placeId) {
        // Story 316: Popular places don't starve others

        const placeCount = this.placeRequests.get(placeId) || 0
        const fairShare = this.globalLimit / Math.max(this.placeRequests.size, 1)
        const maxPerPlace = Math.max(fairShare * 2, 10) // Allow 2x fair share, min 10

        if (placeCount >= maxPerPlace) {
            return {
                allowed: false,
                reason: 'Place quota exceeded - preventing hotspot starvation',
                fairShare,
                currentUsage: placeCount,
                maxAllowed: maxPerPlace
            }
        }

        // Track request
        this.placeRequests.set(placeId, placeCount + 1)
        this.totalRequests++

        return { allowed: true }
    }

    /**
     * Reset counters
     */
    reset() {
        this.placeRequests.clear()
        this.totalRequests = 0
    }
}

/**
 * Search Complexity Limiter (Story 320)
 */
export class SearchComplexityLimiter {
    /**
     * Enforce complexity limits (Story 320: Hard limits)
     */
    static enforceLimit(searchParams) {
        const limits = {
            maxDepth: 3,
            maxResults: 100,
            maxFilters: 5,
            maxJoins: 2
        }

        const violations = []

        // Story 320: Search depth is capped
        if (searchParams.depth > limits.maxDepth) {
            violations.push(`Depth ${searchParams.depth} exceeds limit ${limits.maxDepth}`)
            searchParams.depth = limits.maxDepth
        }

        if (searchParams.limit > limits.maxResults) {
            violations.push(`Results ${searchParams.limit} exceeds limit ${limits.maxResults}`)
            searchParams.limit = limits.maxResults
        }

        if (searchParams.filters && searchParams.filters.length > limits.maxFilters) {
            violations.push(`Filters ${searchParams.filters.length} exceeds limit ${limits.maxFilters}`)
            searchParams.filters = searchParams.filters.slice(0, limits.maxFilters)
        }

        return {
            params: searchParams,
            limited: violations.length > 0,
            violations,
            note: 'Complexity limits prevent runaway queries'
        }
    }
}

/**
 * Cost Ceiling Enforcer (Story 329)
 */
export class CostCeilingEnforcer {
    constructor(monthlyCeiling = 10000) {
        this.monthlyCeiling = monthlyCeiling // ₹10,000
        this.currentMonthCost = 0
        this.monthStart = Date.now()
    }

    /**
     * Check if operation allowed (Story 329: Hard limits)
     */
    checkOperationAllowed(estimatedCost) {
        // Reset if new month
        const now = Date.now()
        const monthMs = 30 * 24 * 60 * 60 * 1000
        if (now - this.monthStart > monthMs) {
            this.currentMonthCost = 0
            this.monthStart = now
        }

        // Story 329: System must refuse work if it exceeds budget
        if (this.currentMonthCost + estimatedCost > this.monthlyCeiling) {
            return {
                allowed: false,
                reason: 'Monthly cost ceiling reached',
                currentCost: this.currentMonthCost,
                ceiling: this.monthlyCeiling,
                remaining: this.monthlyCeiling - this.currentMonthCost,

                // Story 329: Fail safely under budget pressure
                degradationSuggestion: 'Switch to cached/static mode'
            }
        }

        this.currentMonthCost += estimatedCost

        return {
            allowed: true,
            currentCost: this.currentMonthCost,
            remaining: this.monthlyCeiling - this.currentMonthCost
        }
    }

    /**
     * Get budget status
     */
    getBudgetStatus() {
        const used = (this.currentMonthCost / this.monthlyCeiling) * 100

        return {
            ceiling: this.monthlyCeiling,
            used: this.currentMonthCost,
            remaining: this.monthlyCeiling - this.currentMonthCost,
            percentageUsed: Math.round(used),
            status: used > 90 ? 'critical' : used > 75 ? 'warning' : 'healthy'
        }
    }
}

export default {
    CostTracker,
    FairThrottler,
    SearchComplexityLimiter,
    CostCeilingEnforcer
}
