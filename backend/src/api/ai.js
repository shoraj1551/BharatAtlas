import express from 'express'
import aiService from '../services/aiService.js'

const router = express.Router()

/**
 * POST /api/ai/ask
 * Ask a question to the AI assistant
 */
router.post('/ask', async (req, res, next) => {
    try {
        const { question } = req.body

        if (!question || typeof question !== 'string') {
            return res.status(400).json({
                error: 'Question is required and must be a string'
            })
        }

        if (question.length > 500) {
            return res.status(400).json({
                error: 'Question is too long (max 500 characters)'
            })
        }

        // Get AI response
        const response = await aiService.ask(question)

        // Get suggested actions
        const actions = await aiService.suggestActions(question)

        res.json({
            ...response,
            actions,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        // Send user-friendly error
        res.status(503).json({
            error: error.message,
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * GET /api/ai/health
 * Check if AI service is available
 */
router.get('/health', async (req, res) => {
    try {
        const health = await aiService.checkHealth()

        if (health.available) {
            res.json({
                status: 'ok',
                model: health.model,
                available: true
            })
        } else {
            res.status(503).json({
                status: 'unavailable',
                available: false,
                error: health.error
            })
        }
    } catch (error) {
        res.status(503).json({
            status: 'error',
            available: false,
            error: error.message
        })
    }
})

export default router
