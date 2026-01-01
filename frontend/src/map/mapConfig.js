/**
 * Map Configuration
 * 
 * Central configuration for map settings including multiple map styles
 */

// Map styles
export const MAP_STYLES = {
    BASIC: {
        version: 8,
        sources: {
            'osm': {
                type: 'raster',
                tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution: '© OpenStreetMap contributors'
            }
        },
        layers: [{
            id: 'osm',
            type: 'raster',
            source: 'osm'
        }]
    },
    SATELLITE: {
        version: 8,
        sources: {
            'satellite': {
                type: 'raster',
                tiles: [
                    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                ],
                tileSize: 256,
                attribution: '© Esri, Maxar, Earthstar Geographics'
            }
        },
        layers: [{
            id: 'satellite',
            type: 'raster',
            source: 'satellite'
        }]
    }
}

export const MAP_CONFIG = {
    style: MAP_STYLES.BASIC,
    center: [78.9629, 20.5937], // Center of India
    zoom: 4.5,
    minZoom: 3,
    maxZoom: 18,
    maxBounds: [
        [60, 5],    // Southwest coordinates
        [100, 38]   // Northeast coordinates
    ],
    maxBoundsViscosity: 0.9
}

// Keep existing boundary styles for compatibility
export const BOUNDARY_STYLES = {
    state: {
        'line-color': '#1e40af',
        'line-width': 2,
        'line-dasharray': [2, 2]
    },
    stateHover: {
        'line-color': '#3b82f6',
        'line-width': 3
    },
    stateSelected: {
        'line-color': '#fbbf24',
        'line-width': 4
    },
    district: {
        'line-color': '#059669',
        'line-width': 1.5
    },
    districtHover: {
        'line-color': '#10b981',
        'line-width': 2.5
    },
    districtSelected: {
        'line-color': '#fbbf24',
        'line-width': 3.5
    }
}

export const ANIMATION_CONFIG = {
    zoomDuration: 1000,
    padding: 40
}
