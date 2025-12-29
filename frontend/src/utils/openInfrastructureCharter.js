// Open Infrastructure Charter
// Final statement of openness (Story 310)

/**
 * BHARATATLAS OPEN INFRASTRUCTURE CHARTER
 * 
 * We open knowledge without surrendering responsibility.
 * 
 * Version: 1.0
 * Last Updated: 2025-12-29
 */

export const OPEN_INFRASTRUCTURE_CHARTER = {
    version: '1.0',
    lastUpdated: '2025-12-29',

    /**
     * Core Philosophy (Story 310)
     */
    corePhilosophy: [
        'We open knowledge without surrendering responsibility',
        'Programmable without being exploitable',
        'Forkable without fragmentation',
        'Federated without losing coherence',
        'Open without being corruptible'
    ],

    /**
     * API Principles (Stories 291-295)
     */
    apiPrinciples: {
        readOnly: 'Anyone can read. Nobody can mutate publicly.',
        placeCentric: 'APIs expose entities, not UI artifacts',
        timeAware: 'Historical truth is queryable',
        provenanceIncluded: 'Trust metadata never stripped',
        confidenceMandatory: 'Epistemic humility enforced'
    },

    /**
     * Bulk Access (Stories 296-297)
     */
    bulkAccess: {
        snapshotBased: 'Large consumers get versioned dumps',
        stableIds: 'Snapshots are citable and permanent',
        noLiveScraping: 'Avoid hammering live systems',
        academicSupport: 'Research use is first-class'
    },

    /**
     * Federation (Stories 298-301)
     */
    federation: {
        decentralized: 'States, universities, NGOs can host mirrors',
        sharedSchema: 'Schema is the constitution',
        pullBased: 'No forced updates from center',
        extensible: 'Local nodes can add layers, not rewrite core',
        coherent: 'Prevent fragmentation while allowing diversity'
    },

    /**
     * Privacy & Access (Stories 302-303)
     */
    privacyAndAccess: {
        quotaNotSurveillance: 'Abuse prevention via quotas, not tracking',
        equalAccess: 'Government users consume like everyone else',
        noPrivilegedPipelines: 'No special backdoors',
        respectPrivacy: 'No cross-request user tracking'
    },

    /**
     * Openness Standards (Stories 304-308)
     */
    opennessStandards: {
        machineReadableLicenses: 'Usage terms are explicit',
        boringFormats: 'CSV, JSON, Parquet - optimized for longevity',
        noDarkAPIs: 'If it exists, it is documented',
        publicChangeLogs: 'Breaking changes are visible',
        offlineFirst: 'Low-connectivity users matter'
    },

    /**
     * API Ethics (Story 309)
     */
    apiEthics: {
        statement: 'APIs exist to inform and empower, not exploit',

        prohibited: [
            'Surveillance applications',
            'Discriminatory profiling',
            'Misinformation campaigns',
            'Commercial exploitation without attribution',
            'Data resale without license'
        ],

        encouraged: [
            'Academic research',
            'Civic applications',
            'Government planning',
            'Educational tools',
            'Journalism'
        ]
    },

    /**
     * Longevity Commitments
     */
    longevity: {
        schemaStability: 'Schema changes are rare and deliberate',
        backwardCompatibility: 'Old versions supported for 2+ years',
        dataPreservation: 'Snapshots maintained indefinitely',
        documentationPermanence: 'API docs are versioned and archived'
    }
}

export default OPEN_INFRASTRUCTURE_CHARTER
