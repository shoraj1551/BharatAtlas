/**
 * Workspace API Routes
 * 
 * Handles personal research data: Bookmarks, Insights, Comparisons.
 */

import express from 'express'
import Workspace from '../../models/Workspace.js'
import Place from '../../models/Place.js'

const router = express.Router()

// Middleware to ensure workspace exists
const ensureWorkspace = async (req, res, next) => {
    const { workspaceId } = req.params
    if (!workspaceId) return res.status(400).json({ error: 'Workspace ID required' })

    try {
        let ws = await Workspace.findOne({ workspace_id: workspaceId })
        if (!ws) {
            ws = await Workspace.create({ workspace_id: workspaceId })
        }
        req.workspace = ws
        next()
    } catch (err) {
        console.error("Workspace Middleware Error:", err)
        res.status(500).json({ error: 'Database error' })
    }
}

// GET /api/workspace/:workspaceId
// Fetch full workspace data
router.get('/:workspaceId', ensureWorkspace, async (req, res) => {
    try {
        res.json({ success: true, data: req.workspace })
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
})

// POST /api/workspace/:workspaceId/bookmark
// Add a place bookmark
router.post('/:workspaceId/bookmark', ensureWorkspace, async (req, res) => {
    try {
        const { placeId, notes } = req.body
        const ws = req.workspace

        // Check if already bookmarked
        const exists = ws.bookmarks.find(b => b.place_id === placeId)
        if (exists) {
            // Update notes if exists
            if (notes) exists.notes = notes
        } else {
            // Fetch name for cache
            const place = await Place.findOne({ place_id: placeId }, { canonical_name: 1 })
            const placeName = place ? place.canonical_name : placeId

            ws.bookmarks.push({
                place_id: placeId,
                place_name: placeName,
                notes: notes || ''
            })
        }

        ws.last_active = new Date()
        await ws.save()

        res.json({ success: true, data: ws.bookmarks })
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
})

// DELETE /api/workspace/:workspaceId/bookmark/:placeId
// Remove a bookmark
router.delete('/:workspaceId/bookmark/:placeId', ensureWorkspace, async (req, res) => {
    try {
        const { placeId } = req.params
        const ws = req.workspace

        ws.bookmarks = ws.bookmarks.filter(b => b.place_id !== placeId)
        ws.last_active = new Date()
        await ws.save()

        res.json({ success: true, data: ws.bookmarks })
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
})

// POST /api/workspace/:workspaceId/insight
// Save an AI answer or observation
router.post('/:workspaceId/insight', ensureWorkspace, async (req, res) => {
    try {
        const { type, title, content, sourcePlaceId } = req.body
        const ws = req.workspace

        ws.saved_insights.push({
            type,
            title,
            content,
            source_place_id: sourcePlaceId
        })

        ws.last_active = new Date()
        await ws.save()

        res.json({ success: true, data: ws.saved_insights })

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
})

// POST /api/workspace/:workspaceId/comparison
// Save a comparison
router.post('/:workspaceId/comparison', ensureWorkspace, async (req, res) => {
    try {
        const { title, placeIds } = req.body
        const ws = req.workspace

        ws.saved_comparisons.push({
            title,
            place_ids: placeIds
        })

        ws.last_active = new Date()
        await ws.save()

        res.json({ success: true, data: ws.saved_comparisons })

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
})

export default router
