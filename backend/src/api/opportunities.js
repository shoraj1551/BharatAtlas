/**
 * Opportunity API Routes
 * 
 * Routes for AI-driven opportunity analysis system
 */

import express from 'express'
import aiService from '../services/aiService.js'
import Opportunity from '../models/Opportunity.js'
import mongoPlaceService from '../services/mongoPlaceService.js'

const router = express.Router({ mergeParams: true }) // Allow access to :placeId from parent router

/**
 * GET /api/places/:placeId/opportunities
 * Fetch generated opportunities for a place
 */
router.get('/', async (req, res, next) => {
    try {
        const { placeId } = req.params
        const opportunities = await Opportunity.find({ place_id: placeId })
            .sort({ created_at: -1 })
            .limit(20)

        res.json({
            success: true,
            data: opportunities
        })
    } catch (error) {
        next(error)
    }
})

/**
 * POST /api/places/:placeId/opportunities/analyze
 * Trigger AI analysis of raw signals
 */
router.post('/analyze', async (req, res, next) => {
    try {
        const { placeId } = req.params
        const { signals } = req.body // Array of text strings

        if (!signals || !Array.isArray(signals) || signals.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Valid array of "signals" (text inputs) is required.'
            })
        }

        // Get place name for context
        const place = await mongoPlaceService.getPlaceById(placeId)
        if (!place) {
            return res.status(404).json({ success: false, error: 'Place not found' })
        }

        // 1. Run AI Analysis
        // Note: Using a timeout race could be added here for resilience, 
        // but for now we await the AI service directly.
        const findings = await aiService.analyzeLocalSignals(place.canonical_name, signals)

        if (!findings || findings.length === 0) {
            return res.json({
                success: true,
                message: 'No distinct opportunities found in signals.',
                data: []
            })
        }

        // 2. Persist Opportunities
        const opportunitiesToSave = findings.map(f => ({
            place_id: placeId,
            sector: f.sector,
            signal: f.signal,
            evidence: f.evidence,
            recommended_business_models: f.recommended_business_models
        }))

        // Insert new ones
        const savedOps = await Opportunity.insertMany(opportunitiesToSave)

        res.json({
            success: true,
            count: savedOps.length,
            data: savedOps
        })

    } catch (error) {
        console.error("Opportunity Analysis Failed:", error)
        next(error)
    }
})

export default router
