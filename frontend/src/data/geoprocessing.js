/**
 * GeoJSON Processing Utilities
 * 
 * Functions to process and transform GeoJSON data
 */

import * as turf from '@turf/turf'

/**
 * Aggregate districts into states
 * Takes district-level GeoJSON and creates state-level boundaries
 * @param {Object} districtsGeoJSON - Districts FeatureCollection
 * @returns {Object} States FeatureCollection
 */
export function aggregateDistrictsToStates(districtsGeoJSON) {
    if (!districtsGeoJSON || !districtsGeoJSON.features) {
        return { type: 'FeatureCollection', features: [] }
    }

    // Group districts by state
    const stateGroups = {}

    districtsGeoJSON.features.forEach(feature => {
        const stateName = feature.properties.st_nm || feature.properties.ST_NM
        const stateCode = feature.properties.st_code || feature.properties.ST_CODE

        if (!stateName) return

        if (!stateGroups[stateName]) {
            stateGroups[stateName] = {
                name: stateName,
                code: stateCode,
                districts: []
            }
        }

        stateGroups[stateName].districts.push(feature)
    })

    // Create state features by dissolving district boundaries
    const stateFeatures = Object.values(stateGroups).map(stateGroup => {
        try {
            // Combine all district geometries for this state
            const combined = turf.union(...stateGroup.districts.map(d => d.geometry))

            return {
                type: 'Feature',
                properties: {
                    ST_NM: stateGroup.name,
                    ST_CODE: stateGroup.code,
                    district_count: stateGroup.districts.length
                },
                geometry: combined.geometry
            }
        } catch (error) {
            console.warn(`Failed to aggregate state ${stateGroup.name}:`, error)
            // Fallback: use first district's geometry
            return {
                type: 'Feature',
                properties: {
                    ST_NM: stateGroup.name,
                    ST_CODE: stateGroup.code,
                    district_count: stateGroup.districts.length
                },
                geometry: stateGroup.districts[0].geometry
            }
        }
    })

    return {
        type: 'FeatureCollection',
        features: stateFeatures
    }
}

/**
 * Filter districts by state
 * @param {Object} districtsGeoJSON - Districts FeatureCollection
 * @param {string} stateName - State name to filter by
 * @returns {Object} Filtered districts FeatureCollection
 */
export function filterDistrictsByState(districtsGeoJSON, stateName) {
    if (!districtsGeoJSON || !districtsGeoJSON.features) {
        return { type: 'FeatureCollection', features: [] }
    }

    const filteredFeatures = districtsGeoJSON.features.filter(feature => {
        const featureStateName = feature.properties.st_nm || feature.properties.ST_NM
        return featureStateName === stateName
    })

    return {
        type: 'FeatureCollection',
        features: filteredFeatures
    }
}
