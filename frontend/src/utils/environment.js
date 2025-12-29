// Environment Configuration
// Centralized environment variable access

/**
 * Get current environment
 * @returns {string} Environment name
 */
export function getEnvironment() {
    return import.meta.env.VITE_ENV || import.meta.env.MODE || 'development'
}

/**
 * Check if running in production
 * @returns {boolean}
 */
export function isProduction() {
    return getEnvironment() === 'production'
}

/**
 * Check if running in staging
 * @returns {boolean}
 */
export function isStaging() {
    return getEnvironment() === 'staging'
}

/**
 * Check if running in local/development
 * @returns {boolean}
 */
export function isLocal() {
    return getEnvironment() === 'local' || import.meta.env.DEV
}

/**
 * Get API URL
 * @returns {string} API base URL
 */
export function getApiUrl() {
    return import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
}

/**
 * Get API mode
 * @returns {string} API mode (mock, staging, production)
 */
export function getApiMode() {
    return import.meta.env.VITE_API_MODE || 'mock'
}

/**
 * Get Mapbox token
 * @returns {string} Mapbox access token
 */
export function getMapboxToken() {
    const token = import.meta.env.VITE_MAPBOX_TOKEN
    if (!token && isProduction()) {
        console.error('CRITICAL: Mapbox token not configured in production')
    }
    return token || ''
}

/**
 * Check if admin mode is enabled
 * @returns {boolean}
 */
export function isAdminModeEnabled() {
    const enabled = import.meta.env.VITE_ADMIN_MODE === 'true'

    // CRITICAL: Admin mode MUST be disabled in production
    if (enabled && isProduction()) {
        console.error('CRITICAL: Admin mode is enabled in production - this is a security risk')
        return false
    }

    return enabled
}

/**
 * Get environment configuration summary
 * @returns {Object} Environment config
 */
export function getEnvironmentConfig() {
    return {
        environment: getEnvironment(),
        isProduction: isProduction(),
        isStaging: isStaging(),
        isLocal: isLocal(),
        apiUrl: getApiUrl(),
        apiMode: getApiMode(),
        adminMode: isAdminModeEnabled(),
        mapboxToken: getMapboxToken() ? '***configured***' : 'NOT CONFIGURED'
    }
}

/**
 * Log environment configuration (development only)
 */
export function logEnvironmentConfig() {
    if (isLocal()) {
        const config = getEnvironmentConfig()
        console.log('%c🌍 Environment Configuration', 'font-size: 14px; font-weight: bold; color: #2196f3')
        console.table(config)
    }
}

export default {
    getEnvironment,
    isProduction,
    isStaging,
    isLocal,
    getApiUrl,
    getApiMode,
    getMapboxToken,
    isAdminModeEnabled,
    getEnvironmentConfig,
    logEnvironmentConfig
}
