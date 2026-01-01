/**
 * Map Utilities
 * 
 * Helper functions for map operations like zooming to bounds
 */

import * as turf from '@turf/turf'

/**
 * Zoom map to fit a GeoJSON feature
 * @param {maplibregl.Map} map - MapLibre map instance
 * @param {Object} feature - GeoJSON feature
 * @param {Object} options - Zoom options
 */
export function zoomToFeature(map, feature, options = {}) {
    const {
        padding = 50,
        duration = 1000,
        maxZoom = 10
    } = options

    try {
        // Calculate bounding box
        const bbox = turf.bbox(feature)

        // Fit map to bounds
        map.fitBounds(
            [[bbox[0], bbox[1]], [bbox[2], bbox[3]]],
            {
                padding,
                duration,
                maxZoom
            }
        )
    } catch (error) {
        console.error('Error zooming to feature:', error)
    }
}

/**
 * Zoom map to coordinates
 * @param {maplibregl.Map} map - MapLibre map instance
 * @param {Array} coordinates - [longitude, latitude]
 * @param {number} zoom - Zoom level
 */
export function zoomToCoordinates(map, coordinates, zoom = 8) {
    map.flyTo({
        center: coordinates,
        zoom,
        duration: 1000
    })
}

/**
 * Get feature from map layer by property
 * @param {maplibregl.Map} map - MapLibre map instance
 * @param {string} layerId - Layer ID
 * @param {string} property - Property name
 * @param {any} value - Property value
 * @returns {Object|null} Feature or null
 */
export function getFeatureByProperty(map, layerId, property, value) {
    const features = map.querySourceFeatures(layerId)
    return features.find(f => f.properties[property] === value) || null
}

export default {
    zoomToFeature,
    zoomToCoordinates,
    getFeatureByProperty
}
