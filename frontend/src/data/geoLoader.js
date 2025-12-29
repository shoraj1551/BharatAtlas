/**
 * GeoJSON Loader - Reusable Data Pipeline
 * 
 * Loads GeoJSON files from public/data directory
 * Later this becomes API-based with no frontend changes
 */

export async function loadGeoJSON(path) {
    console.log(`Loading GeoJSON from: ${path}`)

    const res = await fetch(path)

    if (!res.ok) {
        throw new Error(`Failed to load ${path}: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    console.log(`✓ Loaded ${data.features?.length || 0} features from ${path}`)

    return data
}

/**
 * Load India states GeoJSON
 */
export async function loadStatesGeoJSON() {
    return loadGeoJSON('/data/india_states.geojson')
}

/**
 * Load India districts GeoJSON
 */
export async function loadDistrictsGeoJSON() {
    return loadGeoJSON('/data/india_districts.geojson')
}

/**
 * Filter districts by state name
 * @param {Object} districtsData - Full districts GeoJSON
 * @param {string} stateName - State name to filter by (ST_NM property)
 * @returns {Object} Filtered GeoJSON with only districts from specified state
 */
export function filterDistrictsByState(districtsData, stateName) {
    if (!districtsData || !districtsData.features) {
        return { type: 'FeatureCollection', features: [] }
    }

    const filtered = {
        ...districtsData,
        features: districtsData.features.filter(
            d => d.properties.ST_NM === stateName || d.properties.st_nm === stateName
        )
    }

    console.log(`Filtered ${filtered.features.length} districts for state: ${stateName}`)

    return filtered
}
