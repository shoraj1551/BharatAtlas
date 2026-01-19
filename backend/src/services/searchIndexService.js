/**
 * Search Index Service
 * 
 * Handles indexing places and performing advanced searches
 */

import SearchIndex from '../../models/SearchIndex.js'
import Place from '../../models/Place.js'
import { createLogger } from '../utils/logger.js'

const logger = createLogger('SearchIndexService')

/**
 * Build search vector from place data
 */
function buildSearchVector(place) {
    const parts = [
        place.canonical_name,
        place.local_names?.hi,
        place.local_names?.ta,
        place.local_names?.bn,
        place.place_type,
        ...(place.major_industries || []),
        place.governance?.administrative_head
    ].filter(Boolean)

    return parts.join(' ').toLowerCase()
}

/**
 * Determine population range
 */
function getPopulationRange(value) {
    if (!value) return 'unknown'
    if (value < 100000) return '<100K'
    if (value < 500000) return '100K-500K'
    if (value < 1000000) return '500K-1M'
    if (value < 5000000) return '1M-5M'
    if (value < 10000000) return '5M-10M'
    return '>10M'
}

/**
 * Determine literacy range
 */
function getLiteracyRange(value) {
    if (!value) return 'unknown'
    if (value < 50) return '<50'
    if (value < 60) return '50-60'
    if (value < 70) return '60-70'
    if (value < 80) return '70-80'
    if (value < 90) return '80-90'
    return '90-100'
}

/**
 * Index a single place
 */
export async function indexPlace(place) {
    const searchVector = buildSearchVector(place)

    const indexData = {
        place_id: place.place_id,
        canonical_name: place.canonical_name,
        place_type: place.place_type,
        search_vector: searchVector,
        filters: {
            population: {
                value: place.population?.value || 0,
                range: getPopulationRange(place.population?.value)
            },
            literacy_rate: {
                value: place.literacy_rate?.value || 0,
                range: getLiteracyRange(place.literacy_rate?.value)
            },
            industries: place.major_industries || [],
            climate_type: place.climate_type || 'unknown',
            infrastructure_score: place.readiness?.breakdown?.infrastructure || 0,
            area_sq_km: place.area_sq_km || 0,
            population_density: place.population_density || 0
        },
        readiness_score: {
            total: place.readiness?.total_score || 0,
            label: place.readiness?.label || 'unknown'
        },
        last_indexed: new Date()
    }

    await SearchIndex.findOneAndUpdate(
        { place_id: place.place_id },
        indexData,
        { upsert: true, new: true }
    )

    logger.debug(`Indexed place: ${place.place_id}`)
}

/**
 * Rebuild entire search index
 */
export async function rebuildSearchIndex() {
    logger.info('Starting search index rebuild...')

    const places = await Place.find({})
    let indexed = 0

    for (const place of places) {
        await indexPlace(place)
        indexed++
    }

    logger.info(`Search index rebuilt: ${indexed} places indexed`)
    return { indexed, total: places.length }
}

/**
 * Advanced search with filters
 */
export async function advancedSearch(query, filters = {}, options = {}) {
    const {
        sort = 'relevance',
        limit = 20,
        offset = 0
    } = options

    // Build MongoDB query
    const mongoQuery = {}

    // Text search
    if (query && query.trim()) {
        mongoQuery.$text = { $search: query }
    }

    // Population filter
    if (filters.population) {
        if (filters.population.min !== undefined && filters.population.min !== '') {
            mongoQuery['filters.population.value'] = {
                ...mongoQuery['filters.population.value'],
                $gte: Number(filters.population.min)
            }
        }
        if (filters.population.max !== undefined && filters.population.max !== '') {
            mongoQuery['filters.population.value'] = {
                ...mongoQuery['filters.population.value'],
                $lte: Number(filters.population.max)
            }
        }
    }

    // Literacy filter
    if (filters.literacy) {
        if (filters.literacy.min !== undefined && filters.literacy.min !== '') {
            mongoQuery['filters.literacy_rate.value'] = {
                ...mongoQuery['filters.literacy_rate.value'],
                $gte: Number(filters.literacy.min)
            }
        }
        if (filters.literacy.max !== undefined && filters.literacy.max !== '') {
            mongoQuery['filters.literacy_rate.value'] = {
                ...mongoQuery['filters.literacy_rate.value'],
                $lte: Number(filters.literacy.max)
            }
        }
    }

    // Industries filter
    if (filters.industries && filters.industries.length > 0) {
        mongoQuery['filters.industries'] = { $in: filters.industries }
    }

    // Climate filter
    if (filters.climate && filters.climate !== '') {
        mongoQuery['filters.climate_type'] = filters.climate
    }

    // Infrastructure filter
    if (filters.infrastructure_min !== undefined && filters.infrastructure_min !== '') {
        mongoQuery['filters.infrastructure_score'] = { $gte: Number(filters.infrastructure_min) }
    }

    // Place type filter
    if (filters.place_type && filters.place_type !== '') {
        mongoQuery.place_type = filters.place_type
    }

    // Build sort
    let sortQuery = {}
    switch (sort) {
        case 'population_desc':
            sortQuery = { 'filters.population.value': -1 }
            break
        case 'population_asc':
            sortQuery = { 'filters.population.value': 1 }
            break
        case 'literacy_desc':
            sortQuery = { 'filters.literacy_rate.value': -1 }
            break
        case 'readiness_desc':
            sortQuery = { 'readiness_score.total': -1 }
            break
        case 'name':
            sortQuery = { canonical_name: 1 }
            break
        default: // relevance
            if (query && query.trim()) {
                sortQuery = { score: { $meta: 'textScore' } }
            } else {
                sortQuery = { 'readiness_score.total': -1 }
            }
    }

    logger.debug('Search query', { mongoQuery, sortQuery, limit, offset })

    // Execute query
    const results = await SearchIndex
        .find(mongoQuery)
        .sort(sortQuery)
        .skip(offset)
        .limit(limit)
        .lean()

    const total = await SearchIndex.countDocuments(mongoQuery)

    return {
        results,
        total,
        page: Math.floor(offset / limit) + 1,
        limit,
        hasMore: offset + limit < total
    }
}
