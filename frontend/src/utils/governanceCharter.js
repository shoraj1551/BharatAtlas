// BharatAtlas Governance Charter
// Institutional memory embedded in codebase (Story 190)

/**
 * BHARATATLAS GOVERNANCE CHARTER
 * 
 * This charter defines how truth is maintained, disputes are resolved,
 * and trust is earned in the BharatAtlas system.
 * 
 * Version: 1.0
 * Last Updated: 2025-12-29
 * Status: Active
 */

export const GOVERNANCE_CHARTER = {
    version: '1.0',
    lastUpdated: '2025-12-29',
    status: 'active',

    /**
     * Core Principles (Story 190)
     */
    corePrinciples: [
        'Truth over speed',
        'Transparency over convenience',
        'Disagreement over silence',
        'Evidence over assertion',
        'Memory over erasure',
        'Locality over centralization'
    ],

    /**
     * Roles & Responsibilities
     */
    roles: {
        viewer: {
            description: 'Public access to all published data',
            responsibilities: ['Consume information critically', 'Report issues']
        },

        contributor: {
            description: 'Propose data changes with evidence',
            responsibilities: [
                'Attach credible evidence to all proposals',
                'Engage honestly in disputes',
                'Respect review process'
            ]
        },

        curator: {
            description: 'Review and approve data changes',
            responsibilities: [
                'Review proposals objectively',
                'Disclose conflicts of interest',
                'Preserve minority opinions',
                'Document all decisions'
            ]
        },

        auditor: {
            description: 'Inspect and verify governance integrity',
            responsibilities: [
                'Monitor governance processes',
                'Flag violations',
                'Ensure transparency',
                'Maintain independence'
            ]
        }
    },

    /**
     * Decision-Making Process
     */
    decisionMaking: {
        proposals: {
            standard: 'Requires 1 curator approval',
            sensitive: 'Requires 2+ curator approvals',
            evidenceRequired: true,
            publicVisibility: true
        },

        disputes: {
            initiationThreshold: 'Any contributor can raise',
            resolutionAuthority: 'Curator consensus or escalation',
            minorityOpinionsPreserved: true,
            escalationDeadline: '30 days'
        },

        deletions: {
            allowed: false,
            alternative: 'Deprecation with full trace',
            permanentRecord: true
        }
    },

    /**
     * Transparency Requirements
     */
    transparency: {
        editHistory: 'Immutable and public',
        governanceLogs: 'Published and inspectable',
        disputes: 'Visible during lifecycle',
        curatorAffiliations: 'Disclosed and public',
        sourceWeighting: 'Explicit and documented'
    },

    /**
     * Conflict Resolution
     */
    conflictResolution: {
        localVsCentral: 'Local knowledge can override with evidence',
        deadlocks: 'Escalate after 30 days',
        minorityViews: 'Always preserved in record',
        appeals: 'Available for all rejected proposals'
    },

    /**
     * Governance Limits
     */
    limits: {
        noSilentDeletions: true,
        noRewritingHistory: true,
        noForcedConsensus: true,
        noHiddenDecisions: true
    },

    /**
     * Accountability Mechanisms
     */
    accountability: {
        auditTrail: 'Complete and immutable',
        publicLogs: 'All governance actions logged',
        loadMonitoring: 'Backlog tracked and alerted',
        performanceMetrics: 'Review times and approval rates published'
    }
}

/**
 * Get charter section
 */
export function getCharterSection(section) {
    return GOVERNANCE_CHARTER[section] || null
}

/**
 * Validate action against charter
 */
export function validateAgainstCharter(action, context) {
    const violations = []

    // Check for silent deletions
    if (action === 'delete' && !context.hasTrace) {
        violations.push({
            principle: 'No silent deletions',
            violation: 'Deletion attempted without trace'
        })
    }

    // Check for history rewriting
    if (action === 'edit_history' && context.modifyingPast) {
        violations.push({
            principle: 'No rewriting history',
            violation: 'Attempted to modify historical record'
        })
    }

    // Check for evidence requirement
    if (action === 'propose_change' && !context.hasEvidence) {
        violations.push({
            principle: 'Evidence over assertion',
            violation: 'Proposal submitted without evidence'
        })
    }

    return {
        valid: violations.length === 0,
        violations
    }
}

export default GOVERNANCE_CHARTER
