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
 * Get all states with pagination and field projection
 */
export async function getAllStates(page = 1, limit = 50, fields = []) {
    const db = getMongoDb()
    const skip = (page - 1) * limit

    // Build projection object
    const projection = {}
    if (fields && fields.length > 0) {
        // Always include essential fields
        projection.place_id = 1
        projection.canonical_name = 1
        projection.place_type = 1

        // Add requested fields
        fields.forEach(field => {
            projection[field] = 1
        })
    }

    // Execute query with pagination
    const [data, total] = await Promise.all([
        db.collection('places')
            .find({ place_type: 'state' }, projection.place_id ? { projection } : {})
            .sort({ canonical_name: 1 })
            .skip(skip)
            .limit(limit)
            .toArray(),
        db.collection('places')
            .countDocuments({ place_type: 'state' })
    ])

    return {
        data: data.map(enrichPlaceData),
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasMore: page < Math.ceil(total / limit)
        }
    }
}

/**
 * Get place by ID with optional field projection
 */
export async function getPlaceById(placeId, fields = []) {
    const db = getMongoDb()

    // Build projection object
    const projection = {}
    if (fields && fields.length > 0) {
        // Always include essential fields
        projection.place_id = 1
        projection.canonical_name = 1
        projection.place_type = 1

        // Add requested fields
        fields.forEach(field => {
            projection[field] = 1
        })
    }

    const place = await db.collection('places')
        .findOne(
            { place_id: placeId },
            projection.place_id ? { projection } : {}
        )

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
 * Search places with pagination
 */
export async function searchPlaces(query, page = 1, limit = 10) {
    const db = getMongoDb()
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
        db.collection('places')
            .find({
                canonical_name: { $regex: new RegExp(query, 'i') }
            })
            .skip(skip)
            .limit(limit)
            .toArray(),
        db.collection('places')
            .countDocuments({
                canonical_name: { $regex: new RegExp(query, 'i') }
            })
    ])

    return {
        data: data.map(enrichPlaceData),
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasMore: page < Math.ceil(total / limit)
        }
    }
}

/**
 * Get places by type with pagination
 */
export async function getPlacesByType(placeType, page = 1, limit = 50) {
    const db = getMongoDb()
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
        db.collection('places')
            .find({ place_type: placeType })
            .sort({ canonical_name: 1 })
            .skip(skip)
            .limit(limit)
            .toArray(),
        db.collection('places')
            .countDocuments({ place_type: placeType })
    ])

    return {
        data: data.map(enrichPlaceData),
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasMore: page < Math.ceil(total / limit)
        }
    }
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
