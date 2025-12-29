// Moderation & Incident Handling
// Transparent moderation and public incidents (Stories 343-345, 347-349)

/**
 * Structured Abuse Report (Story 343)
 */
export class StructuredAbuseReport {
    /**
     * Create report (Story 343: Structured, not free-text)
     */
    static createReport(report) {
        // Story 343: No harassment vectors

        const allowedTypes = [
            'data_poisoning',
            'coordinated_manipulation',
            'spam',
            'copyright_violation',
            'privacy_violation'
        ]

        if (!allowedTypes.includes(report.type)) {
            throw new Error(`Invalid report type. Allowed: ${allowedTypes.join(', ')}`)
        }

        return {
            id: `report_${Date.now()}`,
            type: report.type,

            // Structured fields only
            targetId: report.targetId,
            targetType: report.targetType,
            evidence: report.evidence || [],

            // Story 343: Design safe abuse reporting
            // No free-text to prevent harassment
            predefinedReason: report.predefinedReason,

            reportedBy: report.reportedBy,
            reportedAt: new Date().toISOString(),
            status: 'pending_review'
        }
    }
}

/**
 * Evidence-Driven Moderation (Story 344)
 */
export class EvidenceDrivenModeration {
    /**
     * Moderate content (Story 344: Requires justification)
     */
    static moderate(targetId, decision, evidence) {
        // Story 344: Actions require justification

        if (!evidence || evidence.length === 0) {
            throw new Error('Moderation requires evidence')
        }

        const action = {
            targetId,
            decision, // 'remove', 'flag', 'no_action'
            evidence,
            moderatedBy: 'curator_id',
            moderatedAt: new Date().toISOString(),

            // Story 344: Avoid discretionary takedowns
            justification: this.generateJustification(decision, evidence),

            // Public record
            publiclyLogged: true
        }

        return action
    }

    /**
     * Generate justification
     */
    static generateJustification(decision, evidence) {
        return {
            decision,
            evidenceCount: evidence.length,
            reasoning: `Decision based on ${evidence.length} piece(s) of evidence`,
            appealable: true
        }
    }
}

/**
 * No Shadow Bans (Story 345)
 */
export class TransparentActions {
    /**
     * Notify affected user (Story 345: All actions visible)
     */
    static notifyUser(userId, action) {
        // Story 345: Reject opaque punishment

        return {
            userId,
            notification: {
                type: 'moderation_action',
                action: action.decision,
                target: action.targetId,
                reason: action.justification.reasoning,
                evidence: action.evidence.map(e => e.summary),

                // Story 345: No shadow bans
                visible: true,
                appealProcess: 'Contact curators@bharatatlas.in with evidence',

                timestamp: new Date().toISOString()
            },

            note: 'All moderation actions are visible to affected users'
        }
    }
}

/**
 * Security Incident Logger (Story 347)
 */
export class SecurityIncidentLogger {
    constructor() {
        this.incidents = []
    }

    /**
     * Log incident (Story 347: Publicly logged)
     */
    logIncident(incident) {
        // Story 347: Transparency over embarrassment

        const loggedIncident = {
            id: `incident_${Date.now()}`,
            type: incident.type,
            severity: incident.severity,
            description: incident.description,
            detectedAt: incident.detectedAt,

            // Story 347: Publish incident reports
            public: true,

            response: {
                actions: incident.actions || [],
                mitigations: incident.mitigations || [],
                resolved: incident.resolved || false,
                resolvedAt: incident.resolvedAt || null
            },

            lessons: incident.lessons || [],

            publishedAt: new Date().toISOString()
        }

        this.incidents.push(loggedIncident)

        return loggedIncident
    }

    /**
     * Get public incidents
     */
    getPublicIncidents() {
        return this.incidents
            .filter(i => i.public)
            .sort((a, b) => new Date(b.detectedAt) - new Date(a.detectedAt))
    }
}

/**
 * Jurisdiction-Agnostic Design (Story 348)
 */
export const JURISDICTION_AGNOSTIC_DESIGN = {
    // Story 348: No assumption of friendly law

    principle: 'Design beyond legal comfort',

    assumptions: {
        hostileRegulation: 'Assume regulations may be hostile',
        dataRequests: 'Assume government data requests',
        censorship: 'Assume censorship attempts',
        seizure: 'Assume infrastructure seizure possible'
    },

    mitigations: {
        federation: 'Decentralized hosting across jurisdictions',
        encryption: 'Data encrypted at rest and in transit',
        minimalData: 'Collect minimal user data',
        publicLogs: 'All actions publicly logged',

        // Story 348: Design beyond legal comfort
        noBackdoors: 'No special access for any government',
        transparentCompliance: 'All legal requests publicly logged'
    }
}

/**
 * Capture-Failure Mode (Story 349)
 */
export class CaptureFailureMode {
    /**
     * Enter read-only mode (Story 349: Safer than capture)
     */
    static enterReadOnlyMode(reason) {
        // Story 349: Better to go read-only than be hijacked

        return {
            mode: 'read_only',
            reason,
            enteredAt: new Date().toISOString(),

            // Story 349: Shutdown is safer than capture
            capabilities: {
                read: true,
                write: false,
                admin: false,
                contributions: false
            },

            message: 'System in read-only mode to prevent capture',

            recovery: {
                process: 'Manual review and community consensus required',
                contact: 'governance@bharatatlas.in'
            },

            note: 'Better dormant than corrupted'
        }
    }

    /**
     * Check for capture indicators
     */
    static checkCaptureIndicators() {
        const indicators = [
            'Unusual admin activity',
            'Mass content removal',
            'Governance process bypass',
            'External pressure documented'
        ]

        return {
            indicators,
            threshold: 2,
            note: 'If 2+ indicators present, consider read-only mode'
        }
    }
}

export default {
    StructuredAbuseReport,
    EvidenceDrivenModeration,
    TransparentActions,
    SecurityIncidentLogger,
    JURISDICTION_AGNOSTIC_DESIGN,
    CaptureFailureMode
}
