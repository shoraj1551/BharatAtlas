/**
 * Search Results Highlighting
 * 
 * Highlights searched places on map and zooms to them
 */

let highlightLayerId = null
let highlightSourceId = null

/**
 * Highlight a place on the map
 */
export function highlightSearchResult(map, place) {
    console.log('Highlighting search result:', place.canonical_name)

    // Remove previous highlight
    clearSearchHighlight(map)

    if (!place.coordinates) {
        console.warn('Place has no coordinates')
        return
    }

    // Create highlight source
    highlightSourceId = 'search-highlight-source'
    highlightLayerId = 'search-highlight-layer'

    const highlightGeoJSON = {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: place.coordinates
            },
            properties: {
                name: place.canonical_name
            }
        }]
    }

    // Add source
    if (!map.getSource(highlightSourceId)) {
        map.addSource(highlightSourceId, {
            type: 'geojson',
            data: highlightGeoJSON
        })
    } else {
        map.getSource(highlightSourceId).setData(highlightGeoJSON)
    }

    // Add pulsing circle layer
    if (!map.getLayer(highlightLayerId)) {
        map.addLayer({
            id: highlightLayerId,
            type: 'circle',
            source: highlightSourceId,
            paint: {
                'circle-radius': 20,
                'circle-color': '#fbbf24',
                'circle-opacity': 0.6,
                'circle-stroke-width': 3,
                'circle-stroke-color': '#f59e0b'
            }
        })
    }

    // Zoom to place
    map.flyTo({
        center: place.coordinates,
        zoom: place.place_type === 'state' ? 6 : 9,
        duration: 1500
    })

    console.log('✓ Search result highlighted')
}

/**
 * Clear search highlight
 */
export function clearSearchHighlight(map) {
    if (highlightLayerId && map.getLayer(highlightLayerId)) {
        map.removeLayer(highlightLayerId)
    }
    if (highlightSourceId && map.getSource(highlightSourceId)) {
        map.removeSource(highlightSourceId)
    }
    highlightLayerId = null
    highlightSourceId = null
}

/**
 * Highlight multiple search results
 */
export function highlightMultipleResults(map, places) {
    clearSearchHighlight(map)

    if (places.length === 0) return

    const features = places.map(place => ({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: place.coordinates
        },
        properties: {
            name: place.canonical_name
        }
    }))

    highlightSourceId = 'search-highlight-source'
    highlightLayerId = 'search-highlight-layer'

    const highlightGeoJSON = {
        type: 'FeatureCollection',
        features
    }

    if (!map.getSource(highlightSourceId)) {
        map.addSource(highlightSourceId, {
            type: 'geojson',
            data: highlightGeoJSON
        })
    } else {
        map.getSource(highlightSourceId).setData(highlightGeoJSON)
    }

    if (!map.getLayer(highlightLayerId)) {
        map.addLayer({
            id: highlightLayerId,
            type: 'circle',
            source: highlightSourceId,
            paint: {
                'circle-radius': 15,
                'circle-color': '#fbbf24',
                'circle-opacity': 0.5,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#f59e0b'
            }
        })
    }

    // Fit bounds to show all results
    const coordinates = places.map(p => p.coordinates)
    const bounds = coordinates.reduce((bounds, coord) => {
        return bounds.extend(coord)
    }, new maplibregl.LngLatBounds(coordinates[0], coordinates[0]))

    map.fitBounds(bounds, {
        padding: 50,
        duration: 1500
    })
}
