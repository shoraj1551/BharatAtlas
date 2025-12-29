// Governance Roles & Permissions
// Explicit roles with capability-based permissions (Stories 171-173)

/**
 * Explicit Roles (Story 171)
 */
export const ROLES = {
    VIEWER: 'viewer',           // Read-only access
    CONTRIBUTOR: 'contributor', // Can propose changes
    CURATOR: 'curator',         // Can approve changes
    AUDITOR: 'auditor'          // Can inspect, cannot edit
}

/**
 * Capabilities (Story 172: Granular permissions)
 */
export const CAPABILITIES = {
    // Viewing
    VIEW_PUBLIC_DATA: 'view_public_data',
    VIEW_PENDING_PROPOSALS: 'view_pending_proposals',
    VIEW_EDIT_HISTORY: 'view_edit_history',
    VIEW_GOVERNANCE_LOGS: 'view_governance_logs',

    // Contributing
    PROPOSE_DATA_CHANGE: 'propose_data_change',
    ATTACH_EVIDENCE: 'attach_evidence',
    INITIATE_DISPUTE: 'initiate_dispute',

    // Curating
    APPROVE_PROPOSAL: 'approve_proposal',
    REJECT_PROPOSAL: 'reject_proposal',
    EDIT_STATISTICS: 'edit_statistics',
    RESOLVE_DISPUTE: 'resolve_dispute',

    // Auditing
    INSPECT_ALL_DATA: 'inspect_all_data',
    EXPORT_AUDIT_TRAIL: 'export_audit_trail',
    FLAG_VIOLATIONS: 'flag_violations'
}

/**
 * Role-Capability Mapping (Story 172: Separate authority from identity)
 */
export const ROLE_CAPABILITIES = {
    [ROLES.VIEWER]: [
        CAPABILITIES.VIEW_PUBLIC_DATA
    ],

    [ROLES.CONTRIBUTOR]: [
        CAPABILITIES.VIEW_PUBLIC_DATA,
        CAPABILITIES.VIEW_PENDING_PROPOSALS,
        CAPABILITIES.PROPOSE_DATA_CHANGE,
        CAPABILITIES.ATTACH_EVIDENCE,
        CAPABILITIES.INITIATE_DISPUTE
    ],

    [ROLES.CURATOR]: [
        CAPABILITIES.VIEW_PUBLIC_DATA,
        CAPABILITIES.VIEW_PENDING_PROPOSALS,
        CAPABILITIES.VIEW_EDIT_HISTORY,
        CAPABILITIES.PROPOSE_DATA_CHANGE,
        CAPABILITIES.ATTACH_EVIDENCE,
        CAPABILITIES.APPROVE_PROPOSAL,
        CAPABILITIES.REJECT_PROPOSAL,
        CAPABILITIES.EDIT_STATISTICS,
        CAPABILITIES.RESOLVE_DISPUTE
    ],

    [ROLES.AUDITOR]: [
        CAPABILITIES.VIEW_PUBLIC_DATA,
        CAPABILITIES.VIEW_PENDING_PROPOSALS,
        CAPABILITIES.VIEW_EDIT_HISTORY,
        CAPABILITIES.VIEW_GOVERNANCE_LOGS,
        CAPABILITIES.INSPECT_ALL_DATA,
        CAPABILITIES.EXPORT_AUDIT_TRAIL,
        CAPABILITIES.FLAG_VIOLATIONS
    ]
}

/**
 * Check if user has capability (Story 172)
 * @param {string} role - User role
 * @param {string} capability - Required capability
 * @returns {boolean}
 */
export function hasCapability(role, capability) {
    const capabilities = ROLE_CAPABILITIES[role] || []
    return capabilities.includes(capability)
}

/**
 * Place Stewardship (Story 173)
 */
export class PlaceStewardship {
    constructor(placeId) {
        this.placeId = placeId
        this.stewards = [] // Story 173: Decentralize responsibility
        this.createdAt = new Date().toISOString()
    }

    /**
     * Add steward to place
     */
    addSteward(curatorId) {
        if (!this.stewards.includes(curatorId)) {
            this.stewards.push(curatorId)
        }
    }

    /**
     * Remove steward
     */
    removeSteward(curatorId) {
        this.stewards = this.stewards.filter(id => id !== curatorId)
    }

    /**
     * Check if user is steward
     */
    isSteward(curatorId) {
        return this.stewards.includes(curatorId)
    }

    /**
     * Get steward count
     */
    getStewardCount() {
        return this.stewards.length
    }
}

/**
 * Check edit permission (Story 172)
 */
export function canEditStats(role) {
    return hasCapability(role, CAPABILITIES.EDIT_STATISTICS)
}

/**
 * Audit mode check (Story 183)
 */
export function isAuditMode(role) {
    return role === ROLES.AUDITOR
}

export default {
    ROLES,
    CAPABILITIES,
    ROLE_CAPABILITIES,
    hasCapability,
    PlaceStewardship,
    canEditStats,
    isAuditMode
}
