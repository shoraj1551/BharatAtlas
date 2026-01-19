/**
 * Analytics API Routes
 */

import express from 'express'
import { getTrends, getComparisons, getInsights, getTopPlaces } from '../services/analyticsService.js'
import { protect } from '../middleware/authMiddleware.js'
import { createLogger } from '../utils/logger.js'

const router = express.Router()
const logger = createLogger('AnalyticsAPI')

/**
 * @swagger
 * /api/v1/analytics/trends:
 *   get:
 *     summary: Get trend data for a metric
 *     tags: [Analytics]
 *     parameters:
 *       - in: query
 *         name: metric
 *         schema:
 *           type: string
 *       - in: query
 *         name: timeRange
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trend data
 */
router.get('/trends', async (req, res, next) => {
    try {
        const { metric = 'population', timeRange = '1y', ...filters } = req.query
        const trends = await getTrends(metric, timeRange, filters)
        res.json({ success: true, data: trends })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/v1/analytics/comparisons:
 *   get:
 *     summary: Compare multiple places
 *     tags: [Analytics]
 *     parameters:
 *       - in: query
 *         name: placeIds
 *         schema:
 *           type: string
 *       - in: query
 *         name: metrics
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comparison data
 */
router.get('/comparisons', async (req, res, next) => {
    try {
        const placeIds = req.query.placeIds ? req.query.placeIds.split(',') : []
        const metrics = req.query.metrics ? req.query.metrics.split(',') : undefined

        const comparison = await getComparisons(placeIds, metrics)
        res.json({ success: true, data: comparison })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/v1/analytics/insights/{placeId}:
 *   get:
 *     summary: Get AI-generated insights for a place
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *     responses:
 *       200:
 *         description: Insights data
 */
router.get('/insights/:placeId', async (req, res, next) => {
    try {
        const insights = await getInsights(req.params.placeId)
        res.json({ success: true, data: insights })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/v1/analytics/top-places:
 *   get:
 *     summary: Get top places by metric
 *     tags: [Analytics]
 *     parameters:
 *       - in: query
 *         name: metric
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Top places
 */
router.get('/top-places', async (req, res, next) => {
    try {
        const { metric = 'population', limit = 10, ...filters } = req.query
        const places = await getTopPlaces(metric, parseInt(limit), filters)
        res.json({ success: true, data: places })
    } catch (error) {
        next(error)
    }
})

export default router
