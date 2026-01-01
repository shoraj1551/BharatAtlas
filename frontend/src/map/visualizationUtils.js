/**
 * Map Visualization Utilities
 * 
 * Helper functions for adding/removing visualization layers
 */

import { createChoroplethExpression, POPULATION_DENSITY_SCALE, LITERACY_RATE_SCALE } from './colorScales'

/**
 * Enrich GeoJSON features with place data
 */
export async function enrichGeoJSONWithData(geoJSON) {
    console.log('Enriching GeoJSON with place data...')

    try {
        // Fetch all states from backend API
        const response = await fetch('/api/places/states')
        if (!response.ok) {
            throw new Error('Failed to fetch states')
        }
        const states = await response.json()
        console.log('Fetched states:', states.length)

        // Create lookup map by state name (case-insensitive)
        const stateMap = new Map()
        states.forEach(state => {
            const key = state.canonical_name.toLowerCase()
            stateMap.set(key, state)
        })

        const enrichedFeatures = geoJSON.features.map(feature => {
            // Try multiple property name variations (case-insensitive)
            const stateName = (
                feature.properties.st_nm ||
                feature.properties.ST_NM ||
                feature.properties.name ||
                ''
            ).toLowerCase()

            const placeData = stateMap.get(stateName)

            if (placeData) {
                // Add calculated data to feature properties
                feature.properties.population_density = placeData.population_density || 0
                feature.properties.literacy_rate = placeData.literacy_rate?.value || 0
                feature.properties.population = placeData.population?.value || 0
                feature.properties.area_sq_km = placeData.area_sq_km || 0
                feature.properties.place_id = placeData.place_id

                console.log(`✓ Enriched ${feature.properties.st_nm || feature.properties.ST_NM}: density=${placeData.population_density}, literacy=${placeData.literacy_rate?.value}`)
            } else {
                console.warn(`✗ No data found for state: ${feature.properties.st_nm || feature.properties.ST_NM || 'unknown'}`)
                // Set defaults
                feature.properties.population_density = 0
                feature.properties.literacy_rate = 0
            }

            return feature
        })

        console.log('Enrichment complete!')

        return {
            ...geoJSON,
            features: enrichedFeatures
        }
    } catch (error) {
        console.error('Error enriching GeoJSON:', error)
        return geoJSON
    }
}

/**
 * Add population density visualization layer
 */
export function addPopulationDensityLayer(map) {
    if (!map.getSource('states')) {
        console.error('States source not found')
        return
    }

    console.log('Adding population density layer...')

    // Add fill layer
    if (!map.getLayer('population-density-fill')) {
        map.addLayer({
            id: 'population-density-fill',
            type: 'fill',
            source: 'states',
            paint: {
                'fill-color': createChoroplethExpression(POPULATION_DENSITY_SCALE),
                'fill-opacity': 0.7
            }
        }, 'state-boundaries')

        console.log('✓ Population density layer added')
    }

    // Make boundaries more subtle
    if (map.getLayer('state-boundaries')) {
        map.setPaintProperty('state-boundaries', 'line-opacity', 0.5)
        map.setPaintProperty('state-boundaries', 'line-width', 1)
    }
}

/**
 * Add literacy rate visualization layer
 */
export function addLiteracyRateLayer(map) {
    if (!map.getSource('states')) {
        console.error('States source not found')
        return
    }

    console.log('Adding literacy rate layer...')

    // Add fill layer
    if (!map.getLayer('literacy-rate-fill')) {
        map.addLayer({
            id: 'literacy-rate-fill',
            type: 'fill',
            source: 'states',
            paint: {
                'fill-color': createChoroplethExpression(LITERACY_RATE_SCALE),
                'fill-opacity': 0.7
            }
        }, 'state-boundaries')

        console.log('✓ Literacy rate layer added')
    }

    // Make boundaries more subtle
    if (map.getLayer('state-boundaries')) {
        map.setPaintProperty('state-boundaries', 'line-opacity', 0.5)
        map.setPaintProperty('state-boundaries', 'line-width', 1)
    }
}

/**
 * Remove all visualization layers
 */
export function removeVisualizationLayers(map) {
    console.log('Removing visualization layers...')

    const vizLayers = [
        'population-density-fill',
        'literacy-rate-fill'
    ]

    vizLayers.forEach(layerId => {
        if (map.getLayer(layerId)) {
            map.removeLayer(layerId)
            console.log(`✓ Removed layer: ${layerId}`)
        }
    })

    // Restore boundary styles
    if (map.getLayer('state-boundaries')) {
        map.setPaintProperty('state-boundaries', 'line-opacity', 1)
        map.setPaintProperty('state-boundaries', 'line-width', 2)
    }
}
