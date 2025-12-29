// BharatAtlas API Charter
// Embedded API ethics and values (Story 230)

/**
 * BHARATATLAS API CHARTER
 * 
 * APIs exist to inform, not exploit.
 * 
 * Version: 1.0
 * Last Updated: 2025-12-29
 */

export const API_CHARTER = {
    version: '1.0',
    lastUpdated: '2025-12-29',

    /**
     * Core Values (Story 230)
     */
    coreValues: [
        'APIs exist to inform, not exploit',
        'Openness with protection',
        'Access with attribution',
        'Transparency with limits',
        'Service without surveillance'
    ],

    /**
     * Access Principles
     */
    accessPrinciples: {
        publicRead: 'Read access is open by default',
        noPublicWrite: 'Mutation is never public',
        fairLimits: 'Rate limits balance openness and protection',
        attribution: 'Attribution is mandatory',
        ethics: 'Harmful data combinations are blocked'
    },

    /**
     * Data Licensing (Story 225)
     */
    licensing: {
        license: 'CC-BY-NC 4.0',
        description: 'Creative Commons Attribution-NonCommercial 4.0',
        requirements: [
            'Attribution required when publishing',
            'Non-commercial use only (commercial requires separate license)',
            'Share-alike encouraged',
            'No warranty provided'
        ],
        attributionFormat: 'Data from BharatAtlas (bharatatlas.in)'
    },

    /**
     * Usage Guidelines
     */
    usageGuidelines: {
        allowed: [
            'Research and analysis',
            'Journalism and reporting',
            'Educational purposes',
            'Public policy development',
            'Non-profit applications'
        ],

        prohibited: [
            'Commercial exploitation without license',
            'Surveillance or tracking',
            'Discriminatory profiling',
            'Misinformation campaigns',
            'Data scraping for resale'
        ]
    },

    /**
     * Rate Limits (Stories 213, 227)
     */
    rateLimits: {
        anonymous: {
            requestsPerMinute: 50,
            requestsPerHour: 1000,
            requestsPerDay: 10000
        },

        authenticated: {
            requestsPerMinute: 100,
            requestsPerHour: 5000,
            requestsPerDay: 50000
        },

        research: {
            requestsPerMinute: 500,
            requestsPerHour: 20000,
            requestsPerDay: 200000,
            requiresApproval: true
        }
    },

    /**
     * Deprecation Policy (Story 222)
     */
    deprecation: {
        warningPeriod: '90 days',
        process: [
            'Warning headers added to deprecated endpoints',
            'Documentation updated with migration guide',
            'Email notification to registered users',
            'Grace period of 90 days before removal'
        ]
    }
}

export default API_CHARTER
