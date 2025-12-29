/**
 * Zoom Level Configuration for Hierarchical Boundary Display
 * 
 * Defines zoom thresholds for each administrative level
 * As users zoom in, more detailed boundaries appear
 */

export const ZOOM_LEVELS = {
    COUNTRY: { min: 0, max: 5.5, label: 'Country' },
    STATE: { min: 5.5, max: 8, label: 'State' },
    DISTRICT: { min: 8, max: 11, label: 'District' },
    TEHSIL: { min: 11, max: 14, label: 'Tehsil' },
    THANA: { min: 14, max: 16, label: 'Thana' },
    VILLAGE: { min: 16, max: 18, label: 'Village' }
}

/**
 * Determine which administrative level should be displayed based on zoom
 * @param {number} zoom - Current map zoom level
 * @returns {string} Administrative level name
 */
export function getAdminLevelForZoom(zoom) {
    if (zoom < ZOOM_LEVELS.STATE.min) return 'COUNTRY'
    if (zoom < ZOOM_LEVELS.DISTRICT.min) return 'STATE'
    if (zoom < ZOOM_LEVELS.TEHSIL.min) return 'DISTRICT'
    if (zoom < ZOOM_LEVELS.THANA.min) return 'TEHSIL'
    if (zoom < ZOOM_LEVELS.VILLAGE.min) return 'THANA'
    return 'VILLAGE'
}

/**
 * Get human-readable label for current zoom level
 * @param {number} zoom - Current map zoom level
 * @returns {string} Human-readable label
 */
export function getZoomLevelLabel(zoom) {
    const level = getAdminLevelForZoom(zoom)
    return ZOOM_LEVELS[level].label
}

/**
 * Determine which layers should be visible at current zoom
 * @param {number} zoom - Current map zoom level
 * @returns {Object} Layer visibility configuration
 */
export function getLayerVisibility(zoom) {
    const adminLevel = getAdminLevelForZoom(zoom)

    return {
        'states-boundary': adminLevel === 'STATE' || adminLevel === 'COUNTRY',
        'states-fill': adminLevel === 'STATE' || adminLevel === 'COUNTRY',
        'districts-boundary': adminLevel === 'DISTRICT',
        'districts-fill': adminLevel === 'DISTRICT',
        'tehsils-boundary': adminLevel === 'TEHSIL',
        'tehsils-fill': adminLevel === 'TEHSIL',
        'thanas-boundary': adminLevel === 'THANA',
        'thanas-fill': adminLevel === 'THANA',
        'villages-boundary': adminLevel === 'VILLAGE',
        'villages-fill': adminLevel === 'VILLAGE'
    }
}
