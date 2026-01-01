/**
 * City Markers Layer for Map
 * 
 * Adds markers for major cities
 */

/**
 * Add city markers to map
 */
export async function addCityMarkers(map) {
    console.log('Adding city markers...')

    try {
        // Fetch top 50 cities
        const response = await fetch('/api/places/cities?limit=50')
        if (!response.ok) {
            throw new Error('Failed to fetch cities')
        }
        const cities = await response.json()
        console.log(`Loaded ${cities.length} cities`)

        // Create GeoJSON from cities
        const citiesGeoJSON = {
            type: 'FeatureCollection',
            features: cities.map(city => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: city.coordinates
                },
                properties: {
                    name: city.canonical_name,
                    population: city.population?.value || 0,
                    place_id: city.place_id
                }
            }))
        }

        // Add source
        if (!map.getSource('cities')) {
            map.addSource('cities', {
                type: 'geojson',
                data: citiesGeoJSON
            })
        }

        // Add circle markers
        if (!map.getLayer('city-markers')) {
            map.addLayer({
                id: 'city-markers',
                type: 'circle',
                source: 'cities',
                paint: {
                    'circle-radius': [
                        'interpolate',
                        ['linear'],
                        ['get', 'population'],
                        100000, 4,      // Small cities
                        1000000, 6,     // Medium cities
                        5000000, 10,    // Large cities
                        10000000, 14    // Mega cities
                    ],
                    'circle-color': '#ff6b6b',
                    'circle-opacity': 0.7,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#fff'
                }
            })
        }

        // Add labels (visible at zoom > 6)
        if (!map.getLayer('city-labels')) {
            map.addLayer({
                id: 'city-labels',
                type: 'symbol',
                source: 'cities',
                minzoom: 6,
                layout: {
                    'text-field': ['get', 'name'],
                    'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                    'text-size': 12,
                    'text-offset': [0, 1.5],
                    'text-anchor': 'top'
                },
                paint: {
                    'text-color': '#333',
                    'text-halo-color': '#fff',
                    'text-halo-width': 2
                }
            })
        }

        console.log('✓ City markers added')
    } catch (error) {
        console.error('Error adding city markers:', error)
    }
}

/**
 * Remove city markers
 */
export function removeCityMarkers(map) {
    if (map.getLayer('city-labels')) {
        map.removeLayer('city-labels')
    }
    if (map.getLayer('city-markers')) {
        map.removeLayer('city-markers')
    }
    if (map.getSource('cities')) {
        map.removeSource('cities')
    }
    console.log('✓ City markers removed')
}
