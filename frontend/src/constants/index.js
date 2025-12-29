// Mapbox configuration
export const MAPBOX_CONFIG = {
    STYLE: 'mapbox://styles/mapbox/light-v11',
    CENTER: [78.9629, 20.5937], // Geographic center of India
    ZOOM: 4,
    PITCH: 0,
    BEARING: 0
}

// UI Constants
export const UI = {
    MAP_WIDTH_PERCENT: 70,
    PANEL_WIDTH_PERCENT: 30,
    HEADER_HEIGHT: 'auto'
}

// Data Quality Thresholds
export const DATA_QUALITY = {
    HIGH: 0.8,
    MEDIUM: 0.5,
    LOW: 0.3
}

export default {
    MAPBOX_CONFIG,
    UI,
    DATA_QUALITY
}
