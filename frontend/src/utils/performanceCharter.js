// Performance Charter
// Sustainability over spectacle (Story 330)

/**
 * BHARATATLAS PERFORMANCE CHARTER
 * 
 * We choose sustainability over spectacle.
 * 
 * Version: 1.0
 * Last Updated: 2025-12-29
 */

export const PERFORMANCE_CHARTER = {
    version: '1.0',
    lastUpdated: '2025-12-29',

    /**
     * Core Philosophy (Story 330)
     */
    corePhilosophy: [
        'We choose sustainability over spectacle',
        'Predictability over peak performance',
        'Graceful degradation over catastrophic failure',
        'Slow is acceptable, failure is not',
        'Modest budgets, not infinite scale'
    ],

    /**
     * Architecture Principles (Stories 311-314)
     */
    architecturePrinciples: {
        asymmetricReadWrite: 'Reads dominate, writes are rare and controlled',
        preComputation: 'Common views are pre-rendered',
        mandatoryCaching: 'No request hits DB unnecessarily',
        explicitInvalidation: 'Cache behavior is visible'
    },

    /**
     * Cost Discipline (Stories 315, 329)
     */
    costDiscipline: {
        measurable: 'Cost per place is tracked',
        hardCeilings: 'System refuses work if budget exceeded',
        predictable: 'No surprise bills',
        sustainable: 'Can run on modest budgets'
    },

    /**
     * Resilience (Stories 316-318, 327)
     */
    resilience: {
        fairThrottling: 'Popular places don\'t starve others',
        gracefulDegradation: 'Shed features, not availability',
        latencyTolerance: 'Correctness over speed',
        nationalSpikes: 'Elections, exams, disasters assumed'
    },

    /**
     * Operational Discipline (Stories 319-326, 328)
     */
    operationalDiscipline: {
        killableJobs: 'No zombie processes',
        hardLimits: 'Search depth capped',
        noGlobalLocks: 'Horizontal scale design',
        predictableColdStart: 'Restart behavior known',
        replaceableInfra: 'No cloud lock-in',
        respectfulObservability: 'Metrics > logs > traces',
        explicitErrorBudgets: 'Failure quantified',
        offPeakBatch: 'Heavy compute runs at night',
        boringBackups: 'Optimize for restore, not novelty'
    },

    /**
     * Performance Targets
     */
    targets: {
        p50_latency: '< 200ms',
        p95_latency: '< 1000ms',
        p99_latency: '< 3000ms',
        availability: '99.5%', // Realistic, not 99.99%
        cache_hit_rate: '> 90%',
        cost_per_place_per_month: '< ₹1'
    },

    /**
     * Degradation Strategy (Story 317)
     */
    degradationTiers: [
        { level: 1, name: 'Live data', description: 'Full functionality' },
        { level: 2, name: 'Cached data', description: 'Slightly stale, fast' },
        { level: 3, name: 'Static snapshot', description: 'Last known good state' },
        { level: 4, name: 'Read-only archive', description: 'Historical access only' }
    ]
}

export default PERFORMANCE_CHARTER
