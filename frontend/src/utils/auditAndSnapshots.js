// Immutable Audit & Snapshots
// Tamper-resistant logs and citable versions (Stories 280, 284, 286-287, 289)

/**
 * Audit Log Entry (Story 280)
 */
export class AuditLogEntry {
    constructor({ actor, action, targetId, targetType, changes, reason }) {
        this.id = `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        this.actor = actor
        this.action = action // 'create', 'update', 'deprecate', 'override'
        this.targetId = targetId
        this.targetType = targetType // 'fact', 'source', 'place'
        this.changes = changes
        this.reason = reason
        this.timestamp = new Date().toISOString()

        // Story 280: Immutable
        Object.freeze(this)
    }
}

/**
 * Immutable Audit Log (Story 280)
 */
export class ImmutableAuditLog {
    constructor() {
        this.entries = []
    }

    /**
     * Log action (Story 280: Tamper-resistant)
     */
    log(entry) {
        // Story 280: All changes logged forever
        const frozenEntry = Object.freeze(entry)
        this.entries.push(frozenEntry)

        // Make entries array immutable
        Object.freeze(this.entries)
    }

    /**
     * Get logs for target
     */
    getLogsFor(targetId) {
        return this.entries.filter(e => e.targetId === targetId)
    }

    /**
     * Get logs by actor
     */
    getLogsByActor(actor) {
        return this.entries.filter(e => e.actor === actor)
    }

    /**
     * Get recent logs
     */
    getRecentLogs(limit = 100) {
        return this.entries.slice(-limit).reverse()
    }
}

/**
 * Dataset Snapshot (Story 284)
 */
export class DatasetSnapshot {
    constructor({ placeIds, metrics, createdBy }) {
        // Story 284: Researchers can cite versions
        this.id = `snapshot_${Date.now()}`
        this.placeIds = placeIds
        this.metrics = metrics
        this.createdBy = createdBy
        this.createdAt = new Date().toISOString()

        // Snapshot data
        this.data = new Map()
        this.metadata = {
            factCount: 0,
            sourceCount: 0,
            versionHash: null
        }

        // Citation info
        this.citation = this.generateCitation()
    }

    /**
     * Add fact to snapshot
     */
    addFact(fact) {
        const key = `${fact.placeId}_${fact.metric}`
        this.data.set(key, {
            value: fact.value,
            sourceId: fact.sourceId,
            version: fact.version,
            capturedAt: fact.capturedAt,
            validFrom: fact.validFrom
        })

        this.metadata.factCount++
    }

    /**
     * Generate citation (Story 284)
     */
    generateCitation() {
        return {
            format: 'APA',
            text: `BharatAtlas. (${new Date().getFullYear()}). Dataset Snapshot ${this.id}. Retrieved from https://bharatatlas.in/snapshots/${this.id}`,
            bibtex: `@misc{bharatatlas_${this.id},
  author = {BharatAtlas},
  title = {Dataset Snapshot ${this.id}},
  year = {${new Date().getFullYear()}},
  url = {https://bharatatlas.in/snapshots/${this.id}}
}`
        }
    }

    /**
     * Export snapshot (Story 289: Preserve provenance)
     */
    export() {
        // Story 289: Exports never strip context
        return {
            snapshotId: this.id,
            createdAt: this.createdAt,
            createdBy: this.createdBy,

            data: Array.from(this.data.entries()).map(([key, fact]) => ({
                ...fact,
                // Story 289: Include provenance
                provenance: {
                    sourceId: fact.sourceId,
                    version: fact.version,
                    capturedAt: fact.capturedAt
                }
            })),

            metadata: this.metadata,
            citation: this.citation,

            // Preservation note
            note: 'This export includes full provenance. Do not strip metadata.'
        }
    }
}

/**
 * Provenance UI Helper (Story 286)
 */
export class ProvenanceUI {
    /**
     * Get provenance display (Story 286: One click away)
     */
    static getProvenanceDisplay(fact, source) {
        return {
            // Story 286: Expose provenance accessibly
            summary: `From ${source.name} (${fact.capturedAt.split('T')[0]})`,

            details: {
                source: {
                    name: source.name,
                    type: source.type,
                    organization: source.organization,
                    credibility: source.currentCredibility
                },

                temporal: {
                    capturedAt: fact.capturedAt,
                    validFrom: fact.validFrom,
                    validTo: fact.validTo,
                    version: fact.version
                },

                status: {
                    current: fact.status,
                    inferred: fact.inferred,
                    override: fact.isOverride
                }
            },

            // Story 287: No single "final truth"
            note: fact.status === 'active'
                ? 'This is one current view. Other sources may differ.'
                : 'This fact has been superseded or deprecated.'
        }
    }
}

/**
 * Epistemic Finality Rejection (Story 287)
 */
export class EpistemicFinalityRejection {
    /**
     * Present fact without absolutism (Story 287)
     */
    static presentFact(fact, confidence) {
        // Story 287: System never declares absolutes
        return {
            value: fact.value,
            confidence: confidence.overall,

            // Reject finality
            presentation: {
                prefix: 'According to',
                source: fact.sourceId,
                qualifier: confidence.overall > 80 ? 'high confidence' :
                    confidence.overall > 60 ? 'moderate confidence' :
                        'low confidence',
                caveat: 'Other sources may report different values'
            },

            // Story 287: Never absolute
            isAbsolute: false,
            allowsDisagreement: true
        }
    }
}

export default {
    AuditLogEntry,
    ImmutableAuditLog,
    DatasetSnapshot,
    ProvenanceUI,
    EpistemicFinalityRejection
}
