/**
 * AI API Routes
 * 
 * Routes for AI-driven features (Consultant, Chat, etc.)
 */

import express from 'express'
import aiService from '../services/aiService.js'

const router = express.Router()

/**
 * POST /api/ai/ask
 * Standard RAG Chat (Legacy)
 */
router.post('/ask', async (req, res, next) => {
    try {
        const { question } = req.body
        const answer = await aiService.ask(question)
        res.json({ success: true, data: answer })
    } catch (error) {
        next(error)
    }
})

/**
 * POST /api/ai/consult
 * New Decision Support Agent
 * Accepts: { placeId, question }
 * Returns : { answer, confidence, citation_layers }
 */
router.post('/consult', async (req, res, next) => {
    try {
        const { placeId, question } = req.body

        if (!placeId || !question) {
            return res.status(400).json({ success: false, error: "placeId and question are required." })
        }

        const result = await aiService.askConsultant(placeId, question)

        res.json({
            success: true,
            data: result
        })

    } catch (error) {
        next(error)
    }
})

/**
 * POST /api/ai/suggest-actions
 * Suggest follow-up actions
 */
router.post('/suggest-actions', async (req, res, next) => {
    try {
        const { question } = req.body
        const actions = await aiService.suggestActions(question)
        res.json({ success: true, data: actions })
    } catch (error) {
        next(error)
    }
})

// Generate Place Intelligence Summary
router.post('/summary', async (req, res) => {
    try {
        const { placeId } = req.body
        if (!placeId) {
            return res.status(400).json({ error: 'Place ID is required' })
        }

        const summary = await aiService.generateIntelligenceSummary(placeId)
        res.json(summary)
    } catch (error) {
        console.error('Summary Generation API Error:', error)
        res.status(500).json({ error: 'Failed to generate summary' })
    }
})

export default router
