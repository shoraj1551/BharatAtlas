// Comparison Export & Audit
// Snapshot export and audit trail for comparisons

/**
 * Export comparison snapshot (Story 144)
 * @param {Object} comparisonSession - Comparison session
 * @returns {Object} Exportable snapshot
 */
export function exportComparisonSnapshot(comparisonSession) {
    const snapshot = {
        id: comparisonSession.id,
        version: '1.0',
        exportedAt: new Date().toISOString(),

        // Core comparison data
        places: comparisonSession.places.map(p => ({
            place_id: p.place_id,
            canonical_name: p.canonical_name
        })),
        metrics: comparisonSession.metrics,
        scope: comparisonSession.scope,

        // Metadata
        confidence: comparisonSession.confidence,
        eligibility: comparisonSession.eligibility,
        biasWarnings: comparisonSession.biasWarnings,

        // Story 149: Audit trail
        audit: {
            comparedBy: comparisonSession.createdBy,
            time: comparisonSession.createdAt,
            metrics: comparisonSession.metrics
        }
    }

    return snapshot
}

/**
 * Log comparison to audit trail (Story 149)
 * @param {Object} comparisonSession - Comparison session
 */
export function logComparisonAudit(comparisonSession) {
    const auditEntry = {
        id: `audit_${Date.now()}`,
        action: 'comparison_created',
        comparisonId: comparisonSession.id,
        userId: comparisonSession.createdBy,
        timestamp: new Date().toISOString(),
        metadata: {
            placeCount: comparisonSession.places.length,
            metricCount: comparisonSession.metrics.length,
            scope: comparisonSession.scope.description
        }
    }

    // Log to console in development
    if (import.meta.env.DEV) {
        console.log('[COMPARISON AUDIT]', auditEntry)
    }

    return auditEntry
}

/**
 * Import comparison snapshot
 * @param {Object} snapshot - Exported snapshot
 * @returns {Object} Restored comparison session
 */
export function importComparisonSnapshot(snapshot) {
    if (!snapshot || snapshot.version !== '1.0') {
        throw new Error('Invalid or unsupported snapshot version')
    }

    return {
        ...snapshot,
        importedAt: new Date().toISOString(),
        isImported: true
    }
}

export default {
    exportComparisonSnapshot,
    logComparisonAudit,
    importComparisonSnapshot
}
