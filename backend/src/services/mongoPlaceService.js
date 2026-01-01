/**
 * MongoDB Place Service
 * 
 * Handles all place-related database operations using MongoDB Atlas
 */

import { getMongoDb } from './mongoService.js'
import Place from '../../models/Place.js'

/**
 * Enrich place data with calculated fields
 */
function enrichPlaceData(place) {
    if (!place) return place

    // Calculate population density
    if (place.population?.value && place.area_sq_km) {
        place.population_density = Math.round(
            place.population.value / place.area_sq_km
        )
    }

    return place
}

/**
 * Get all states
 */
export async function getAllStates() {
    const db = getMongoDb()
    const states = await db.collection('places')
        .find({ place_type: 'state' })
        .sort({ canonical_name: 1 })
        .toArray()

    return states.map(enrichPlaceData)
}

/**
 * Get place by ID
 */
export async function getPlaceById(placeId) {
    const db = getMongoDb()
    const place = await db.collection('places')
        .findOne({ place_id: placeId })

    return enrichPlaceData(place)
}

/**
 * Get place by name
 */
export async function getPlaceByName(name) {
    const db = getMongoDb()
    const place = await db.collection('places')
        .findOne({
            canonical_name: { $regex: new RegExp(`^${name}$`, 'i') }
        })

    return enrichPlaceData(place)
}

/**
 * Search places
 */
export async function searchPlaces(query, limit = 10) {
    const db = getMongoDb()
    const places = await db.collection('places')
        .find({
            canonical_name: { $regex: new RegExp(query, 'i') }
        })
        .limit(limit)
        .toArray()

    return places.map(enrichPlaceData)
}

/**
 * Get places by type
 */
export async function getPlacesByType(placeType) {
    const db = getMongoDb()
    const places = await db.collection('places')
        .find({ place_type: placeType })
        .sort({ canonical_name: 1 })
        .toArray()

    return places.map(enrichPlaceData)
}

/**
 * Get children of a place
 */
export async function getChildren(placeId, options = {}) {
    const { limit = 100, offset = 0 } = options

    const db = getMongoDb()
    const children = await db.collection('places')
        .find({ parent_place_id: placeId })
        .skip(offset)
        .limit(limit)
        .toArray()

    const total = await db.collection('places')
        .countDocuments({ parent_place_id: placeId })

    return {
        data: children.map(enrichPlaceData),
        total,
        limit,
        offset
    }
}

export default {
    getAllStates,
    getPlaceById,
    getPlaceByName,
    searchPlaces,
    getPlacesByType,
    getChildren
}
