// Change Log Service
// Minimal audit log for admin interventions
// Records actions with timestamps for traceability

/**
 * Action Types
 */
export const ActionType = {
    NARRATIVE_OVERRIDE: 'narrative_override',
    NARRATIVE_VERIFY: 'narrative_verify',
    OPPORTUNITY_APPROVE: 'opportunity_approve',
    OPPORTUNITY_REJECT: 'opportunity_reject',
    PLACE_EDIT: 'place_edit',
    SOURCE_ADD: 'source_add',
    SOURCE_EDIT: 'source_edit'
}

/**
 * Change Log Entry Schema
 */
export const ChangeLogEntrySchema = {
    id: 'string',
    action_type: 'ActionType',
    entity_type: 'string',        // 'narrative' | 'opportunity' | 'place' | 'source'
    entity_id: 'string',
    admin_id: 'string|null',       // Future: admin user ID
    timestamp: 'ISO8601 timestamp',
    changes: 'object',             // What changed
    reason: 'string|null'          // Optional reason for change
}

class ChangeLogService {
    constructor() {
        this.logs = [] // In-memory storage (future: database)
    }

    /**
     * Log an admin action
     * @param {Object} params - Log entry parameters
     */
    logAction({
        action_type,
        entity_type,
        entity_id,
        admin_id = 'admin',
        changes = {},
        reason = null
    }) {
        const entry = {
            id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            action_type,
            entity_type,
            entity_id,
            admin_id,
            timestamp: new Date().toISOString(),
            changes,
            reason
        }

        this.logs.push(entry)

        // Also log to console in development
        if (import.meta.env.DEV) {
            console.log('[CHANGE LOG]', entry)
        }

        return entry
    }

    /**
     * Get all logs
     * @returns {Array} All log entries
     */
    getAllLogs() {
        return [...this.logs].reverse() // Most recent first
    }

    /**
     * Get logs for specific entity
     * @param {string} entityType - Entity type
     * @param {string} entityId - Entity ID
     * @returns {Array} Filtered log entries
     */
    getLogsForEntity(entityType, entityId) {
        return this.logs
            .filter(log => log.entity_type === entityType && log.entity_id === entityId)
            .reverse()
    }

    /**
     * Get logs by action type
     * @param {string} actionType - Action type
     * @returns {Array} Filtered log entries
     */
    getLogsByAction(actionType) {
        return this.logs
            .filter(log => log.action_type === actionType)
            .reverse()
    }

    /**
     * Get recent logs
     * @param {number} limit - Number of logs to return
     * @returns {Array} Recent log entries
     */
    getRecentLogs(limit = 50) {
        return [...this.logs]
            .reverse()
            .slice(0, limit)
    }

    /**
     * Clear all logs (admin only)
     */
    clearLogs() {
        this.logs = []
    }

    /**
     * Export logs as JSON
     * @returns {string} JSON string of all logs
     */
    exportLogs() {
        return JSON.stringify(this.logs, null, 2)
    }
}

export default new ChangeLogService()
