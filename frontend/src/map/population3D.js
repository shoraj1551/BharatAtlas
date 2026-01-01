/**
 * 3D Population Visualization
 * 
 * Adds 3D extrusion bars based on population
 */

/**
 * Add 3D population layer
 */
export function add3DPopulationLayer(map, places) {
    console.log('Adding 3D population layer...')

    // Create GeoJSON from places
    const geoJSON = {
        type: 'FeatureCollection',
        features: places.map(place => ({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: place.coordinates
            },
            properties: {
                name: place.canonical_name,
                population: place.population?.value || 0,
                // Height = population / 10000 (scale for visibility)
                height: (place.population?.value || 0) / 10000
            }
        }))
    }

    // Add source
    if (!map.getSource('population-3d')) {
        map.addSource('population-3d', {
            type: 'geojson',
            data: geoJSON
        })
    }

    // Add 3D extrusion layer
    if (!map.getLayer('population-3d-layer')) {
        map.addLayer({
            id: 'population-3d-layer',
            type: 'fill-extrusion',
            source: 'population-3d',
            paint: {
                'fill-extrusion-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'population'],
                    0, '#fef3c7',
                    1000000, '#fbbf24',
                    5000000, '#f59e0b',
                    10000000, '#dc2626'
                ],
                'fill-extrusion-height': ['get', 'height'],
                'fill-extrusion-base': 0,
                'fill-extrusion-opacity': 0.8
            }
        })
    }

    // Add lighting
    if (!map.getLight()) {
        map.setLight({
            anchor: 'viewport',
            color: 'white',
            intensity: 0.4
        })
    }

    // Adjust pitch for 3D view
    map.easeTo({
        pitch: 60,
        bearing: -20,
        duration: 1500
    })

    console.log('✓ 3D population layer added')
}

/**
 * Remove 3D layer and reset view
 */
export function remove3DPopulationLayer(map) {
    if (map.getLayer('population-3d-layer')) {
        map.removeLayer('population-3d-layer')
    }
    if (map.getSource('population-3d')) {
        map.removeSource('population-3d')
    }

    // Reset to 2D view
    map.easeTo({
        pitch: 0,
        bearing: 0,
        duration: 1500
    })

    console.log('✓ 3D layer removed')
}

/**
 * Toggle between 2D and 3D view
 */
export async function toggle3DView(map, enabled) {
    if (enabled) {
        // Fetch places for 3D visualization
        const response = await fetch('/api/places/cities?limit=100')
        if (!response.ok) throw new Error('Failed to fetch cities')

        const places = await response.json()
        add3DPopulationLayer(map, places)
    } else {
        remove3DPopulationLayer(map)
    }
}
