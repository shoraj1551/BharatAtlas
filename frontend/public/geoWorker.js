/**
 * Web Worker for GeoJSON Processing
 * 
 * Offloads heavy GeoJSON operations to background thread
 */

self.addEventListener('message', async (event) => {
    const { type, data } = event.data

    try {
        switch (type) {
            case 'AGGREGATE_STATES':
                const result = await aggregateStates(data)
                self.postMessage({ type: 'SUCCESS', result })
                break

            case 'ENRICH_GEOJSON':
                const enriched = await enrichGeoJSON(data)
                self.postMessage({ type: 'SUCCESS', result: enriched })
                break

            case 'PROCESS_FEATURES':
                const processed = processFeatures(data)
                self.postMessage({ type: 'SUCCESS', result: processed })
                break

            default:
                throw new Error(`Unknown task type: ${type}`)
        }
    } catch (error) {
        self.postMessage({
            type: 'ERROR',
            error: error.message
        })
    }
})

/**
 * Aggregate district features into states
 */
async function aggregateStates(districtData) {
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

        if (feature.geometry.type === 'Polygon') {
            stateGroups[stateName].geometry.coordinates.push(feature.geometry.coordinates)
        } else if (feature.geometry.type === 'MultiPolygon') {
            stateGroups[stateName].geometry.coordinates.push(...feature.geometry.coordinates)
        }
    })

    return {
        type: 'FeatureCollection',
        features: Object.values(stateGroups)
    }
}

/**
 * Enrich GeoJSON with place data
 */
async function enrichGeoJSON({ geoJSON, placeData }) {
    const stateMap = new Map(
        placeData.map(place => [
            place.canonical_name.toLowerCase(),
            place
        ])
    )

    const enrichedFeatures = geoJSON.features.map(feature => {
        const stateName = (
            feature.properties.st_nm ||
            feature.properties.ST_NM ||
            feature.properties.name ||
            ''
        ).toLowerCase()

        const placeData = stateMap.get(stateName)

        if (placeData) {
            feature.properties.population_density = placeData.population_density || 0
            feature.properties.literacy_rate = placeData.literacy_rate?.value || 0
            feature.properties.population = placeData.population?.value || 0
            feature.properties.area_sq_km = placeData.area_sq_km || 0
            feature.properties.place_id = placeData.place_id
        }

        return feature
    })

    return {
        ...geoJSON,
        features: enrichedFeatures
    }
}

/**
 * Process features (simplify, filter, etc.)
 */
function processFeatures({ features, options = {} }) {
    let processed = features

    // Filter by bounds
    if (options.bounds) {
        processed = processed.filter(f =>
            isWithinBounds(f.geometry, options.bounds)
        )
    }

    // Simplify geometry
    if (options.simplify) {
        processed = processed.map(f => ({
            ...f,
            geometry: simplifyGeometry(f.geometry, options.tolerance || 0.01)
        }))
    }

    return processed
}

function isWithinBounds(geometry, bounds) {
    // Simple bounds check
    return true // Implement actual bounds checking
}

function simplifyGeometry(geometry, tolerance) {
    // Implement geometry simplification
    return geometry
}
