// Long-Term Stewardship Charter
// Constitutional design for BharatAtlas (Story 369)

/**
 * BHARATATLAS LONG-TERM STEWARDSHIP CHARTER
 * 
 * We hold this in trust for those we will never meet.
 * 
 * Version: 1.0
 * Last Updated: 2025-12-29
 */

export const STEWARDSHIP_CHARTER = {
    version: '1.0',
    lastUpdated: '2025-12-29',

    /**
     * Core Philosophy (Story 369)
     */
    corePhilosophy: [
        'We hold this in trust for those we will never meet',
        'Cannot be quietly captured',
        'Cannot be abandoned accidentally',
        'Can evolve without betrayal',
        'Has a clear failure plan'
    ],

    /**
     * Ownership & Control (Stories 352-353)
     */
    ownershipStructure: {
        // Story 352: No single legal owner
        legalModel: 'Public Trust / Multi-stakeholder Foundation',

        // Story 353: Governance roles are separated
        separatedRoles: {
            dataGovernance: 'Curator Board (elected)',
            infrastructure: 'Technical Committee (appointed)',
            policy: 'Governance Council (multi-stakeholder)',
            ethics: 'Ethics Review Panel (independent)'
        },

        principle: 'Prevent concentration of power',

        board: {
            composition: [
                '3 elected curators',
                '2 technical experts',
                '2 academic representatives',
                '2 civil society representatives',
                '1 government observer (non-voting)'
            ],

            term: '3 years, staggered',
            termLimits: '2 consecutive terms maximum'
        }
    },

    /**
     * Policy Evolution (Story 354)
     */
    policyEvolution: {
        // Story 354: Policy changes are slow by design
        principle: 'Rules cannot change overnight',

        changeProcess: [
            '1. Proposal published (30-day comment period)',
            '2. Impact assessment',
            '3. Ethical review',
            '4. Board vote (2/3 majority required)',
            '5. 90-day implementation delay',
            '6. Deployment with rollback plan'
        ],

        // Story 354: Introduce policy latency
        minimumLatency: '120 days from proposal to implementation',

        exceptions: 'Only for critical security fixes (logged publicly)'
    },

    /**
     * Emergency Powers (Story 355)
     */
    emergencyPowers: {
        // Story 355: Crisis tools exist but are constrained
        principle: 'Emergency authority without abuse',

        allowedActions: [
            'Enable read-only mode',
            'Block specific IPs (DDoS)',
            'Temporarily disable contributions',
            'Rollback to last known good state'
        ],

        prohibited: [
            'Silent data deletion',
            'Unlogged admin actions',
            'Permanent policy changes',
            'User data access without warrant'
        ],

        // Story 355: Narrow & logged
        requirements: {
            dualApproval: true,
            publicLog: true,
            timeLimit: '72 hours maximum',
            reviewRequired: 'Within 7 days'
        }
    },

    /**
     * Funding (Story 356)
     */
    fundingStrategy: {
        // Story 356: Survival doesn't depend on single donor
        principle: 'Financial resilience',

        sources: [
            'Government grants (< 30% of total)',
            'Academic partnerships (< 25%)',
            'Foundation grants (< 25%)',
            'Commercial licenses (< 20%)',
            'Individual donations (encouraged)'
        ],

        reserves: 'Maintain 12-month operating reserve',

        transparency: 'Annual financial report published'
    },

    /**
     * Succession (Story 358)
     */
    successionPlanning: {
        // Story 358: No irreplaceable humans
        principle: 'Design for maintainer turnover',

        requirements: [
            'Every role has documented backup',
            'Knowledge transfer every 6 months',
            'Cross-training mandatory',
            'Bus factor > 3 for critical systems'
        ],

        maintainerRotation: 'Encouraged after 3 years'
    },

    /**
     * Institutional Memory (Story 359)
     */
    institutionalMemory: {
        // Story 359: Knowledge stored outside code
        principle: 'Institutional memory persists',

        documentation: [
            'Decision rationale (why, not just what)',
            'Historical context',
            'Failed experiments',
            'Community discussions',
            'Governance meeting minutes'
        ],

        storage: 'Public wiki + version-controlled docs',

        ownership: 'Community, not individuals'
    },

    /**
     * Forking (Story 361)
     */
    forkingPolicy: {
        // Story 361: Forking allowed, capture not
        principle: 'Encourage diversity without confusion',

        allowed: true,

        requirements: [
            'Declare lineage clearly',
            'Use different name',
            'Maintain attribution',
            'Preserve license'
        ],

        encouraged: 'Regional adaptations, experimental features',

        prohibited: 'Claiming to be official BharatAtlas'
    },

    /**
     * Accountability (Story 362)
     */
    publicAccountability: {
        // Story 362: Annual public health report
        principle: 'Make stewardship visible',

        annualReport: {
            includes: [
                'Governance decisions',
                'Financial summary',
                'Data quality metrics',
                'Security incidents',
                'Community contributions',
                'Challenges and failures'
            ],

            published: 'Every January',
            format: 'Public, machine-readable'
        }
    },

    /**
     * The Final Test (Story 370)
     */
    finalTest: {
        // Story 370: Ask before every major change
        question: 'Would this still be acceptable if power changes hands?',

        principle: 'Test decisions against adversarial future',

        examples: [
            'If hostile government takes over?',
            'If funding source becomes corrupt?',
            'If maintainers are compromised?',
            'If legal environment becomes hostile?'
        ],

        mandate: 'All major decisions must pass this test'
    }
}

export default STEWARDSHIP_CHARTER
