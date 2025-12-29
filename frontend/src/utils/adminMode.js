// Admin Mode Configuration
// Environment-based admin flag for early-stage governance
// Default OFF - must be explicitly enabled

/**
 * Check if admin mode is enabled
 * @returns {boolean} Admin mode status
 */
export function isAdminMode() {
    return import.meta.env.VITE_ADMIN_MODE === 'true'
}

/**
 * Check if development mode
 * @returns {boolean} Development mode status
 */
export function isDevelopment() {
    return import.meta.env.DEV
}

/**
 * Admin mode configuration
 */
export const AdminConfig = {
    enabled: isAdminMode(),

    // Admin features available
    features: {
        editNarrative: isAdminMode(),
        editOpportunity: isAdminMode(),
        editPlace: isAdminMode(),
        viewAuditLog: isAdminMode(),
        manualVerification: isAdminMode(),
        sourceManagement: isAdminMode()
    },

    // Debug info
    mode: isAdminMode() ? 'ADMIN' : 'PUBLIC',
    environment: isDevelopment() ? 'development' : 'production'
}

/**
 * Admin mode guard
 * Throws error if admin mode is not enabled
 */
export function requireAdminMode() {
    if (!isAdminMode()) {
        throw new Error('Admin mode required for this operation')
    }
}

/**
 * Get admin status for debugging
 */
export function getAdminStatus() {
    return {
        adminMode: isAdminMode(),
        development: isDevelopment(),
        timestamp: new Date().toISOString(),
        features: AdminConfig.features
    }
}

export default {
    isAdminMode,
    isDevelopment,
    AdminConfig,
    requireAdminMode,
    getAdminStatus
}
