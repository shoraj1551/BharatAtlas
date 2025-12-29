/**
 * GeoJSON Data Loaders
 * 
 * Utilities for loading geospatial data from static files
 * Future: Will be replaced with API calls to PostGIS backend
 */

/**
 * Generic GeoJSON loader with error handling
 * @param {string} filename - Name of the GeoJSON file
 * @returns {Promise<Object>} GeoJSON FeatureCollection
 */
export async function loadGeoJSON(filename) {
    try {
        const response = await fetch(`/data/${filename}`)
        if (!response.ok) {
            throw new Error(`Failed to load ${filename}: ${response.statusText}`)
        }
        const data = await response.json()
        console.log(`✓ Loaded ${filename}:`, {
            features: data.features?.length || 0,
            type: data.type
        })
        return data
    } catch (error) {
        console.error(`✗ Error loading ${filename}:`, error)
        throw error
    }
}

/**
 * Load Indian states GeoJSON
 * @returns {Promise<Object>} States FeatureCollection
 */
export async function loadStates() {
    return loadGeoJSON('india_states.geojson')
}

/**
 * Load Indian districts GeoJSON
 * @returns {Promise<Object>} Districts FeatureCollection
 */
export async function loadDistricts() {
    return loadGeoJSON('india_districts.geojson')
}

/**
 * Load tehsils GeoJSON (lazy loaded)
 * @returns {Promise<Object>} Tehsils FeatureCollection
 */
export async function loadTehsils() {
    return loadGeoJSON('india_tehsils.geojson')
}

/**
 * Load villages GeoJSON (lazy loaded, very large file)
 * @returns {Promise<Object>} Villages FeatureCollection
 */
export async function loadVillages() {
    return loadGeoJSON('india_villages.geojson')
}
