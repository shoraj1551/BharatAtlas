import Place from '../../models/Place.js'
import { createLogger } from '../utils/logger.js'

const logger = createLogger('AnalyticsService')

/**
 * Get trend data for a specific metric
 */
export async function getTrends(metric, timeRange = '1y', filters = {}) {
    try {
        // For now, we'll aggregate current data by place_type
        // In a real implementation, this would use historical data
        const aggregation = await Place.aggregate([
            { $match: filters },
            {
                $group: {
                    _id: '$place_type',
                    avgValue: { $avg: `$${metric}.value` },
                    count: { $sum: 1 }
                }
            },
            { $sort: { avgValue: -1 } }
        ])

        return aggregation
    } catch (error) {
        logger.error('Error getting trends:', error)
        throw error
    }
}

/**
 * Get comparison data for multiple places
 */
export async function getComparisons(placeIds, metrics = ['population', 'literacy_rate', 'readiness.total_score']) {
    try {
        const places = await Place.find({ place_id: { $in: placeIds } }).lean()

        const comparison = places.map(place => {
            const data = { place_id: place.place_id, name: place.canonical_name }

            metrics.forEach(metric => {
                const keys = metric.split('.')
                let value = place
                for (const key of keys) {
                    value = value?.[key]
                }
                data[metric] = typeof value === 'object' ? value?.value : value
            })

            return data
        })

        return comparison
    } catch (error) {
        logger.error('Error getting comparisons:', error)
        throw error
    }
}

/**
 * Generate insights for a place
 */
export async function getInsights(placeId) {
    try {
        const place = await Place.findOne({ place_id: placeId }).lean()

        if (!place) {
            throw new Error('Place not found')
        }

        const insights = []

        // Population insight
        if (place.population?.value) {
            const popCategory = place.population.value > 10000000 ? 'mega' :
                place.population.value > 1000000 ? 'large' : 'medium'
            insights.push({
                type: 'population',
                title: 'Population Category',
                message: `${place.canonical_name} is a ${popCategory} population center with ${place.population.value.toLocaleString()} people.`,
                icon: '👥'
            })
        }

        // Literacy insight
        if (place.literacy_rate?.value) {
            const literacyLevel = place.literacy_rate.value > 80 ? 'high' :
                place.literacy_rate.value > 60 ? 'moderate' : 'developing'
            insights.push({
                type: 'literacy',
                title: 'Education Level',
                message: `Literacy rate of ${place.literacy_rate.value}% indicates ${literacyLevel} educational attainment.`,
                icon: '📚'
            })
        }

        // Readiness insight
        if (place.readiness?.total_score) {
            insights.push({
                type: 'readiness',
                title: 'Investment Readiness',
                message: `Overall readiness score: ${place.readiness.total_score}/100 (${place.readiness.label})`,
                icon: '📊'
            })
        }

        return insights
    } catch (error) {
        logger.error('Error generating insights:', error)
        throw error
    }
}

/**
 * Get top places by metric
 */
export async function getTopPlaces(metric, limit = 10, filters = {}) {
    try {
        const sortField = `${metric}.value`
        const places = await Place.find(filters)
            .sort({ [sortField]: -1 })
            .limit(limit)
            .select('place_id canonical_name place_type population literacy_rate readiness')
            .lean()

        return places
    } catch (error) {
        logger.error('Error getting top places:', error)
        throw error
    }
}

/**
 * Aggregate data by custom query
 */
export async function aggregateData(pipeline) {
    try {
        const result = await Place.aggregate(pipeline)
        return result
    } catch (error) {
        logger.error('Error aggregating data:', error)
        throw error
    }
}
