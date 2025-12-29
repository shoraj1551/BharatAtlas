/**
 * MapLibre GL Configuration for BharatAtlas
 * 
 * This file contains all map-related configuration including:
 * - Initial map view settings (center, zoom)
 * - Boundary styling for hierarchical administrative levels
 * - Layer visibility rules
 * - India boundary restrictions
 */

// India bounding box - restricts map interaction to India only
// Southwest: [longitude, latitude] - covers southernmost and westernmost points
// Northeast: [longitude, latitude] - covers northernmost and easternmost points
export const INDIA_BOUNDS = [
    [68.1766, 6.7559],   // Southwest (near Kanyakumari, west of Gujarat)
    [97.4025, 35.5087]   // Northeast (Arunachal Pradesh, Kashmir)
]

export const MAP_CONFIG = {
    center: [78.9629, 20.5937], // India center coordinates
    zoom: 4.5,
    minZoom: 4,  // Prevent zooming out beyond India view
    maxZoom: 18,
    maxBounds: INDIA_BOUNDS,  // Restrict panning to India
    maxBoundsViscosity: 1.0,  // Make bounds completely rigid (1.0 = no movement outside)
    style: 'https://demotiles.maplibre.org/style.json' // Open-source base map
}

/**
 * Hierarchical boundary styling
 * Each administrative level has distinct visual styling to teach hierarchy
 */
export const BOUNDARY_STYLES = {
    state: {
        'line-color': '#1e40af', // Blue
        'line-width': 2,
        'line-dasharray': [2, 2] // Dotted
    },
    stateHover: {
        'line-color': '#3b82f6',
        'line-width': 3
    },
    stateSelected: {
        'line-color': '#fbbf24', // Yellow highlight
        'line-width': 4
    },
    district: {
        'line-color': '#059669', // Green
        'line-width': 1.5
    },
    districtHover: {
        'line-color': '#10b981',
        'line-width': 2.5
    },
    districtSelected: {
        'line-color': '#fbbf24',
        'line-width': 3.5
    },
    tehsil: {
        'line-color': '#ea580c', // Orange
        'line-width': 1
    },
    village: {
        'line-color': '#dc2626', // Red
        'line-width': 0.5,
        'fill-color': '#dc2626',
        'fill-opacity': 0.2
    }
}

/**
 * Animation settings for smooth transitions
 */
export const ANIMATION_CONFIG = {
    zoomDuration: 1000,
    padding: 40
}
