// Community Contribution Charter
// Embedded contribution ethics (Story 270)

/**
 * BHARATATLAS COMMUNITY CONTRIBUTION CHARTER
 * 
 * We document India as it is, not as we wish it to be.
 * 
 * Version: 1.0
 * Last Updated: 2025-12-29
 */

export const CONTRIBUTION_CHARTER = {
    version: '1.0',
    lastUpdated: '2025-12-29',

    /**
     * Core Principles (Story 270)
     */
    corePrinciples: [
        'We document India as it is, not as we wish it to be',
        'Local knowledge is valued, not dismissed',
        'Disagreement is preserved, not erased',
        'Evidence over assertion',
        'Traceability over anonymity',
        'Plurality over consensus'
    ],

    /**
     * Contribution Values (Stories 251-257)
     */
    contributionValues: {
        scoped: 'Contributions are place-specific, not general',
        reviewed: 'Nothing appears instantly - all goes through review',
        traceable: 'Claims must point somewhere',
        respectful: 'Describe reality, not belief',
        deliberate: 'Slow system prevents noise'
    },

    /**
     * What We Accept (Story 253)
     */
    acceptedTypes: [
        {
            type: 'fact',
            description: 'Verifiable factual information with source',
            example: 'Population increased by 15% (Census 2011)'
        },
        {
            type: 'correction',
            description: 'Correction to existing data with evidence',
            example: 'Literacy rate is 78%, not 75% (NSSO 2019)'
        },
        {
            type: 'source',
            description: 'Additional credible source for existing claim',
            example: 'Government report confirms infrastructure data'
        },
        {
            type: 'local_insight',
            description: 'Ground-level observation (not opinion)',
            example: 'Market operates on Tuesdays and Fridays'
        }
    ],

    /**
     * What We Reject
     */
    rejected: [
        'Opinions without factual basis',
        'Political advocacy',
        'Marketing or promotion',
        'Personal attacks',
        'Unverifiable claims without context',
        'General commentary not tied to place'
    ],

    /**
     * Knowledge Types (Story 256)
     */
    knowledgeTypes: {
        documented: 'Written sources (preferred when available)',
        oral: 'Oral tradition (first-class, labeled as such)',
        observed: 'Direct observation (with context)',
        derived: 'Calculated from other sources (show method)'
    },

    /**
     * Review Philosophy (Story 259)
     */
    reviewPhilosophy: {
        evidenceBased: 'Approvals require reasons, not votes',
        contextual: 'Local expertise valued',
        transparent: 'Review reasons are public',
        preserving: 'Conflicts stored, not erased'
    },

    /**
     * Anti-Patterns (Stories 261-262)
     */
    antiPatterns: {
        noGamification: 'No points, scores, or leaderboards',
        noVirality: 'No likes, shares, or trending',
        noDebates: 'Structured rebuttals only, no comment threads',
        noAnonymousMass: 'Anonymous users suggest, not publish'
    },

    /**
     * Contributor Agreement
     */
    agreement: {
        text: 'By contributing, I agree to:',
        terms: [
            'Provide truthful, verifiable information',
            'Cite sources when possible',
            'Respect local knowledge and oral traditions',
            'Accept that contributions require review',
            'Preserve disagreement rather than force consensus',
            'Focus on documentation, not advocacy'
        ]
    }
}

export default CONTRIBUTION_CHARTER
