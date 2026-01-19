/**
 * Historical Data API Routes
 */

import express from 'express'
import {
    getHistoricalData,
    getAllHistoricalData,
    getAvailableYears,
    getAvailableMetrics
} from '../services/historicalDataService.js'
import { createLogger } from '../utils/logger.js'

const router = express.Router()
const logger = createLogger('HistoricalAPI')

/**
 * @swagger
 * /api/v1/historical/{placeId}:
 *   get:
 *     summary: Get all historical data for a place
 *     tags: [Historical]
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *     responses:
 *       200:
 *         description: Historical data grouped by metric
 */
router.get('/:placeId', async (req, res, next) => {
    try {
        const data = await getAllHistoricalData(req.params.placeId)
        res.json({ success: true, data })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/v1/historical/{placeId}/{metric}:
 *   get:
 *     summary: Get historical data for a specific metric
 *     tags: [Historical]
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *       - in: path
 *         name: metric
 *         required: true
 *     responses:
 *       200:
 *         description: Time series data for metric
 */
router.get('/:placeId/:metric', async (req, res, next) => {
    try {
        const data = await getHistoricalData(req.params.placeId, req.params.metric)
        res.json({ success: true, data })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/v1/historical/{placeId}/years:
 *   get:
 *     summary: Get available years for a place
 *     tags: [Historical]
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *     responses:
 *       200:
 *         description: List of available years
 */
router.get('/:placeId/meta/years', async (req, res, next) => {
    try {
        const years = await getAvailableYears(req.params.placeId)
        res.json({ success: true, data: years })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/v1/historical/{placeId}/metrics:
 *   get:
 *     summary: Get available metrics for a place
 *     tags: [Historical]
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *     responses:
 *       200:
 *         description: List of available metrics
 */
router.get('/:placeId/meta/metrics', async (req, res, next) => {
    try {
        const metrics = await getAvailableMetrics(req.params.placeId)
        res.json({ success: true, data: metrics })
    } catch (error) {
        next(error)
    }
})

export default router
