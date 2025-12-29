/**
 * Map Styles - Visual Hierarchy for Admin Levels
 * 
 * Defines distinct visual styles for each administrative level
 */

export const ADMIN_STYLES = {
    state: {
        line: {
            color: '#1e40af',
            width: 2,
            dashArray: [4, 2],  // Dotted
            opacity: 0.8
        },
        fill: {
            color: '#1e40af',
            opacity: 0.05
        }
    },

    stateSelected: {
        line: {
            color: '#fbbf24',  // Gold highlight
            width: 4,
            dashArray: [1, 0],  // Solid
            opacity: 1
        },
        fill: {
            color: '#fbbf24',
            opacity: 0.1
        }
    },

    district: {
        line: {
            color: '#15803d',
            width: 1.5,
            dashArray: [3, 2],
            opacity: 0.7
        },
        fill: {
            color: '#15803d',
            opacity: 0.05
        }
    },

    districtSelected: {
        line: {
            color: '#fbbf24',
            width: 3,
            dashArray: [1, 0],
            opacity: 1
        },
        fill: {
            color: '#fbbf24',
            opacity: 0.1
        }
    },

    tehsil: {
        line: {
            color: '#ea580c',
            width: 1,
            dashArray: [2, 1],
            opacity: 0.6
        },
        fill: {
            color: '#ea580c',
            opacity: 0.05
        }
    },

    thana: {
        circle: {
            radius: 6,
            color: '#9333ea',
            strokeColor: '#fff',
            strokeWidth: 1,
            opacity: 0.7
        }
    },

    village: {
        circle: {
            radius: 4,
            color: '#dc2626',
            strokeColor: '#fff',
            strokeWidth: 1,
            opacity: 0.8
        }
    }
}

/**
 * Zoom thresholds for each admin level
 */
export const ZOOM_THRESHOLDS = {
    STATE: 5.5,
    DISTRICT: 8,
    TEHSIL: 11,
    THANA: 13,
    VILLAGE: 12  // Villages appear at zoom 12+
}

/**
 * Get style for admin level
 */
export function getStyleForLevel(level, selected = false) {
    if (selected && level === 'state') return ADMIN_STYLES.stateSelected
    if (selected && level === 'district') return ADMIN_STYLES.districtSelected

    return ADMIN_STYLES[level] || ADMIN_STYLES.state
}
