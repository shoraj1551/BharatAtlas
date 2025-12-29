/**
 * Map Layers - Clean & Scalable Layer Management
 * 
 * Utilities for adding/removing boundary layers
 * Future-proof for Tehsil/Village reuse
 */

/**
 * Add or update a boundary layer on the map
 * @param {Object} map - MapLibre map instance
 * @param {string} id - Layer ID
 * @param {Object} source - GeoJSON data
 * @param {Object} style - Style configuration {color, width, dash, opacity}
 */
export function addBoundaryLayer(map, id, source, style) {
    // Remove existing layer and source if they exist
    if (map.getLayer(id)) {
        map.removeLayer(id)
    }
    if (map.getSource(id)) {
        map.removeSource(id)
    }

    // Add new source
    map.addSource(id, {
        type: 'geojson',
        data: source
    })

    // Add new layer
    map.addLayer({
        id,
        type: 'line',
        source: id,
        paint: {
            'line-color': style.color,
            'line-width': style.width,
            'line-dasharray': style.dash,
            'line-opacity': style.opacity
        }
    })

    console.log(`✓ Added boundary layer: ${id}`)
}

/**
 * Add a fill layer for click detection (invisible)
 * @param {Object} map - MapLibre map instance
 * @param {string} id - Layer ID
 * @param {string} sourceId - Source ID to use
 */
export function addFillLayer(map, id, sourceId) {
    if (map.getLayer(id)) {
        map.removeLayer(id)
    }

    map.addLayer({
        id,
        type: 'fill',
        source: sourceId,
        paint: {
            'fill-color': 'transparent',
            'fill-opacity': 0
        }
    })

    console.log(`✓ Added fill layer for click detection: ${id}`)
}

/**
 * Remove a layer and its source
 * @param {Object} map - MapLibre map instance
 * @param {string} id - Layer ID
 */
export function removeLayer(map, id) {
    if (map.getLayer(id)) {
        map.removeLayer(id)
    }
    if (map.getSource(id)) {
        map.removeSource(id)
    }

    console.log(`✓ Removed layer: ${id}`)
}
