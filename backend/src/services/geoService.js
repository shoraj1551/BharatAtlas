/**
 * Geo Service - Data Loading and Filtering
 * 
 * Handles loading and filtering of hierarchical geo data
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Data directory path - go up two levels from services to backend root, then into data
const DATA_DIR = path.join(__dirname, '../../data')

/**
 * Load GeoJSON file
 */
async function loadGeoJSON(filename) {
    try {
        const filePath = path.join(DATA_DIR, filename)
        const data = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(data)
    } catch (err) {
        console.error(`Error loading ${filename}:`, err.message)
        throw new Error(`Failed to load ${filename}`)
    }
}

/**
 * Get all states
 */
export async function getStates() {
    return await loadGeoJSON('india_states.geojson')
}

/**
 * Get districts for a specific state
 */
export async function getDistrictsForState(stateName) {
    const allDistricts = await loadGeoJSON('india_districts.geojson')

    // Filter districts by state name
    const filtered = {
        ...allDistricts,
        features: allDistricts.features.filter(
            d => d.properties.ST_NM === stateName ||
                d.properties.st_nm === stateName ||
                d.properties.state === stateName
        )
    }

    console.log(`Filtered ${filtered.features.length} districts for state: ${stateName}`)

    return filtered
}

/**
 * Get tehsils for a specific district
 * TODO: Implement when tehsil data is available
 */
export async function getTehsilsForDistrict(districtName) {
    // Placeholder - will load from tehsils.geojson when available
    console.warn(`Tehsil data not yet available for district: ${districtName}`)

    return {
        type: 'FeatureCollection',
        features: []
    }
}

/**
 * Get thanas for a specific tehsil
 * TODO: Implement when thana data is available
 */
export async function getThanasForTehsil(tehsilName) {
    // Placeholder - will load from thanas.geojson when available
    console.warn(`Thana data not yet available for tehsil: ${tehsilName}`)

    return {
        type: 'FeatureCollection',
        features: []
    }
}

/**
 * Get villages for a specific thana (paginated, points only)
 * TODO: Implement when village data is available
 */
export async function getVillagesForThana(thanaName, limit = 100) {
    // Placeholder - will load from villages.geojson when available
    console.warn(`Village data not yet available for thana: ${thanaName}`)

    return {
        type: 'FeatureCollection',
        features: []
    }
}
