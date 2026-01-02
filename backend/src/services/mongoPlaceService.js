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

    // Readiness Score Calculation (Qualitative)
    const readiness = calculateReadinessScore(place)
    place.readiness = readiness

    return place
}

/**
 * Calculates a qualitative Opportunity Readiness Score (0-100)
 * DOES NOT predict revenue. Measures structural fitness.
 */
function calculateReadinessScore(place) {
    let scores = {
        workforce: 0, // 25%
        infrastructure: 0, // 20%
        governance: 0, // 20%
        social_fit: 0, // 15%
        data_reliability: 0 // 20%
    }

    // 1. Workforce (25 pts)
    const literacy = place.literacy_rate?.value || 0
    scores.workforce += (literacy / 100) * 15 // Max 15 based on literacy
    if (place.population_density > 500) scores.workforce += 10 // Dense talent pool
    else if (place.population_density > 200) scores.workforce += 5

    // 2. Infrastructure (20 pts)
    const industries = place.major_industries?.length || 0
    scores.infrastructure += Math.min(industries * 4, 15) // Max 15 from industries
    if (place.place_type === 'city') scores.infrastructure += 5 // Urban bonus

    // 3. Governance (20 pts)
    const adminType = place.governance?.administration?.type || place.governance?.administrative_head || ''
    if (adminType.toLowerCase().includes('corporation')) scores.governance += 15
    else if (adminType.toLowerCase().includes('municipality')) scores.governance += 10
    else scores.governance += 5

    if (place.governance?.government_schemes?.length > 0) scores.governance += 5

    // 4. Social Fit (15 pts) - Risk reduction
    if (place.culture_society) {
        scores.social_fit += 5 // Base for data presence
        if (place.culture_society.market_adaptation_tips?.length > 0) scores.social_fit += 5
        if (place.culture_society.social_norms) scores.social_fit += 5
    }

    // 5. Data Reliability (20 pts)
    const quality = place.data_quality_score || (place.data_quality === 'official' ? 1.0 : 0.5)
    scores.data_reliability = quality * 20

    // Total Calculation
    const total = Math.round(
        scores.workforce +
        scores.infrastructure +
        scores.governance +
        scores.social_fit +
        scores.data_reliability
    )

    // Labeling
    let label = 'Developing'
    if (total > 80) label = 'Ready for Business'
    else if (total > 60) label = 'Scaling Up'
    else if (total > 40) label = 'Emerging'

    return {
        total_score: total,
        label,
        breakdown: scores
    }
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
                $or: [
                    { canonical_name: { $regex: new RegExp(query, 'i') } },
                    { 'local_names.hi': { $regex: new RegExp(query, 'i') } },
                    { 'local_names.ta': { $regex: new RegExp(query, 'i') } },
                    { 'local_names.bn': { $regex: new RegExp(query, 'i') } }
                ]
            })
            .skip(skip)
            .limit(limit)
            .toArray(),
        db.collection('places')
            .countDocuments({
                $or: [
                    { canonical_name: { $regex: new RegExp(query, 'i') } },
                    { 'local_names.hi': { $regex: new RegExp(query, 'i') } },
                    { 'local_names.ta': { $regex: new RegExp(query, 'i') } },
                    { 'local_names.bn': { $regex: new RegExp(query, 'i') } }
                ]
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
