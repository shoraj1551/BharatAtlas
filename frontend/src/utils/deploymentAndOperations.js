// Deployment & Operations
// Reproducible deployment and operational plans (Stories 351, 357, 360, 363-368)

/**
 * Reproducible Deployment (Story 351)
 */
export const DEPLOYMENT_GUIDE = {
    // Story 351: Anyone with sufficient skill can deploy

    principle: 'Deployment is boring and repeatable',

    requirements: {
        infrastructure: [
            'Docker 20+',
            'PostgreSQL 14+',
            'Redis 6+',
            'Node.js 18+',
            'Nginx (or equivalent)'
        ],

        minimumSpecs: {
            cpu: '2 cores',
            ram: '4GB',
            storage: '50GB SSD',
            bandwidth: '100Mbps'
        }
    },

    // Story 351: Infra as code, no hidden services
    deploymentSteps: [
        '1. Clone repository',
        '2. Copy .env.example to .env',
        '3. Configure database connection',
        '4. Run: docker-compose up -d',
        '5. Run: npm run migrate',
        '6. Run: npm run seed (optional)',
        '7. Access at http://localhost:3000'
    ],

    infraAsCode: {
        terraform: 'infrastructure/terraform/',
        docker: 'docker-compose.yml',
        kubernetes: 'infrastructure/k8s/',
        ansible: 'infrastructure/ansible/'
    },

    noHiddenServices: true,

    documentation: 'DEPLOYMENT.md'
}

/**
 * Roadmap Strategy (Story 357)
 */
export const ROADMAP_STRATEGY = {
    // Story 357: Open roadmap, closed deadlines

    principle: 'Direction is public; delivery is cautious',

    public: {
        vision: 'Long-term direction and priorities',
        themes: 'Quarterly focus areas',
        proposals: 'Community-submitted ideas',
        decisions: 'Why we chose X over Y'
    },

    private: {
        deadlines: 'Internal only - avoid pressure',
        resources: 'Team capacity planning',
        risks: 'Technical debt and blockers'
    },

    // Story 357: Balance transparency and realism
    updates: 'Monthly public progress reports (no dates)',

    note: 'We share direction, not promises'
}

/**
 * Read-Only Forever Mode (Story 360)
 */
export class ReadOnlyForeverMode {
    /**
     * Enter permanent read-only mode (Story 360)
     */
    static enterForeverMode(reason) {
        // Story 360: Dignified end-of-life state

        return {
            mode: 'read_only_forever',
            reason,
            enteredAt: new Date().toISOString(),

            // Story 360: If all else fails, system freezes safely
            capabilities: {
                read: true,
                write: false,
                admin: false,
                contributions: false,
                apiAccess: true
            },

            message: 'BharatAtlas is now in permanent archive mode',

            dataPreservation: {
                snapshots: 'All data snapshots remain available',
                api: 'Read-only API continues',
                downloads: 'Full data export available',
                mirrors: 'Encourage community mirrors'
            },

            // Story 360: Design dignified end-of-life
            note: 'Better to preserve knowledge than force continuation'
        }
    }
}

/**
 * Public Access Protection (Story 363)
 */
export const PUBLIC_ACCESS_PROTECTION = {
    // Story 363: No mandatory user accounts

    principle: 'Public access remains public',

    guarantees: [
        'All place data accessible without login',
        'API access without authentication',
        'Search without account',
        'Download snapshots without registration'
    ],

    optionalAccounts: {
        purpose: 'Only for contributions and saved trails',
        notRequired: 'Never for reading public data'
    },

    // Story 363: Protect civic access
    commitment: 'Public knowledge stays public'
}

/**
 * International Mirrors (Story 364)
 */
export const INTERNATIONAL_MIRRORS = {
    // Story 364: Knowledge survives borders

    principle: 'Design for geopolitical risk',

    encouraged: true,

    mirrorRequirements: [
        'Maintain data integrity',
        'Declare official mirror status',
        'Sync regularly',
        'Preserve provenance'
    ],

    jurisdictions: [
        'India (primary)',
        'Europe (GDPR-compliant)',
        'North America',
        'Academic institutions worldwide'
    ],

    // Story 364: Knowledge survives borders
    note: 'No single jurisdiction can silence BharatAtlas'
}

/**
 * Legal Threat Playbook (Story 365)
 */
export const LEGAL_THREAT_PLAYBOOK = {
    // Story 365: Clear response to takedown demands

    principle: 'Prepare for pressure',

    responseProtocol: {
        step1: 'Log request publicly (redact personal info)',
        step2: 'Consult legal counsel',
        step3: 'Evaluate against charter',
        step4: 'Respond publicly',
        step5: 'Document decision rationale'
    },

    scenarios: {
        governmentTakedown: {
            response: 'Evaluate legality, publish request, seek legal review',
            principle: 'Transparency over compliance'
        },

        defamationClaim: {
            response: 'Review evidence, verify sources, engage legally',
            principle: 'Truth over fear'
        },

        dataRemovalRequest: {
            response: 'Deprecate if valid, never silent delete',
            principle: 'Memory over erasure'
        }
    },

    // Story 365: Prepare for pressure
    commitment: 'All legal threats handled transparently'
}

/**
 * Ethical Review Mechanism (Story 366)
 */
export class EthicalReviewMechanism {
    /**
     * Trigger ethical review (Story 366)
     */
    static triggerReview(decision) {
        // Story 366: Big decisions require ethical review

        const requiresReview = [
            'Major policy changes',
            'Data collection expansion',
            'Commercial partnerships',
            'Government collaborations',
            'Feature deprecation affecting access'
        ]

        const needsReview = requiresReview.some(trigger =>
            decision.type.includes(trigger.toLowerCase())
        )

        if (needsReview) {
            return {
                required: true,

                // Story 366: Institutionalize conscience
                process: [
                    '1. Submit to Ethics Panel',
                    '2. 14-day review period',
                    '3. Panel recommendation',
                    '4. Public summary',
                    '5. Board decision'
                ],

                panel: 'Independent Ethics Review Panel',

                note: 'Conscience is institutionalized, not optional'
            }
        }

        return { required: false }
    }
}

/**
 * Feature Stewardship (Story 367)
 */
export const FEATURE_STEWARDSHIP = {
    // Story 367: No feature without stewardship owner

    principle: 'Prevent orphaned systems',

    requirements: {
        everyFeature: {
            owner: 'Named steward',
            backup: 'Secondary steward',
            documentation: 'Maintained and current',
            tests: 'Automated and passing'
        }
    },

    orphanedFeaturePolicy: {
        warning: '30 days to find steward',
        deprecation: 'If no steward, mark deprecated',
        removal: 'After 90 days if no adoption'
    },

    // Story 367: Every feature has a caretaker
    note: 'Features without stewards are removed, not abandoned'
}

/**
 * Decommissioning Plan (Story 368)
 */
export const DECOMMISSIONING_PLAN = {
    // Story 368: Endings are planned, not panicked

    principle: 'Design graceful decommissioning',

    triggers: [
        'Funding exhausted with no prospects',
        'Legal environment becomes untenable',
        'Governance capture detected',
        'Community consensus to end'
    ],

    process: [
        '1. Public announcement (90 days notice)',
        '2. Enter read-only mode',
        '3. Create final snapshot',
        '4. Publish all data',
        '5. Transfer to archive.org',
        '6. Encourage community forks',
        '7. Preserve institutional memory',
        '8. Shut down write infrastructure'
    ],

    dataPreservation: {
        snapshots: 'All historical snapshots preserved',
        code: 'Repository remains public',
        documentation: 'Archived permanently',
        governance: 'All decisions documented'
    },

    // Story 368: Graceful decommissioning
    commitment: 'If we must end, we end with dignity and preserved knowledge'
}

export default {
    DEPLOYMENT_GUIDE,
    ROADMAP_STRATEGY,
    ReadOnlyForeverMode,
    PUBLIC_ACCESS_PROTECTION,
    INTERNATIONAL_MIRRORS,
    LEGAL_THREAT_PLAYBOOK,
    EthicalReviewMechanism,
    FEATURE_STEWARDSHIP,
    DECOMMISSIONING_PLAN
}
