/**
 * Create state-level GeoJSON from district data
 * 
 * Aggregates district boundaries into state boundaries
 */

export async function createStateLevelGeoJSON() {
    console.log('Creating state-level GeoJSON from districts...')

    try {
        // Fetch district GeoJSON
        const response = await fetch('/data/india_states.geojson')
        if (!response.ok) throw new Error('Failed to load GeoJSON')

        const districtData = await response.json()
        console.log(`Loaded ${districtData.features.length} features`)

        // Group by state
        const stateGroups = {}

        districtData.features.forEach(feature => {
            const stateName = feature.properties.st_nm || feature.properties.ST_NM

            if (!stateName) return

            if (!stateGroups[stateName]) {
                stateGroups[stateName] = {
                    type: 'Feature',
                    properties: {
                        st_nm: stateName,
                        ST_NM: stateName,
                        name: stateName
                    },
                    geometry: {
                        type: 'MultiPolygon',
                        coordinates: []
                    }
                }
            }

            // Add geometry
            if (feature.geometry.type === 'Polygon') {
                stateGroups[stateName].geometry.coordinates.push(feature.geometry.coordinates)
            } else if (feature.geometry.type === 'MultiPolygon') {
                stateGroups[stateName].geometry.coordinates.push(...feature.geometry.coordinates)
            }
        })

        // Convert to GeoJSON
        const stateFeatures = Object.values(stateGroups)

        const stateGeoJSON = {
            type: 'FeatureCollection',
            features: stateFeatures
        }

        console.log(`✓ Created ${stateFeatures.length} state features from districts`)

        return stateGeoJSON
    } catch (error) {
        console.error('Error creating state GeoJSON:', error)
        throw error
    }
}
