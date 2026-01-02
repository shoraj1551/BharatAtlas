/**
 * Community API Routes
 * 
 * Handles submission and retrieval of user-generated local knowledge.
 */

import express from 'express'
import Contributor from '../../models/Contributor.js'
import Contribution from '../../models/Contribution.js'

const router = express.Router()

/**
 * GET /api/community/:placeId
 * Fetch APPROVED contributions for a specific place
 */
router.get('/:placeId', async (req, res, next) => {
    try {
        const { placeId } = req.params
        const { type } = req.query

        const query = {
            place_id: placeId,
            status: 'approved' // STRICT SEPARATION: Only valid data
        }

        if (type) query.type = type

        const contributions = await Contribution.find(query)
            .populate('contributor_id', 'username level badges reputation_score')
            .sort({ created_at: -1 })
            .limit(50)

        res.json({
            success: true,
            data: contributions
        })

    } catch (error) {
        next(error)
    }
})

/**
 * POST /api/community/submit
 * Submit a new contribution (defaults to PENDING)
 */
router.post('/submit', async (req, res, next) => {
    try {
        const { place_id, username, email, type, data } = req.body

        if (!place_id || !email || !type || !data) {
            return res.status(400).json({ success: false, error: "Missing required fields." })
        }

        // 1. Find or Create Contributor
        let contributor = await Contributor.findOne({ email })
        if (!contributor) {
            contributor = await Contributor.create({
                username: username || email.split('@')[0],
                email,
                level: 'Novice'
            })
        }

        // 2. Create Contribution
        const contribution = await Contribution.create({
            place_id,
            contributor_id: contributor._id,
            type,
            data,
            status: 'pending' // STRICT MODERATION
        })

        // 3. Update Contributor Stats
        await Contributor.findByIdAndUpdate(contributor._id, {
            $inc: { total_contributions: 1 }
        })

        res.status(201).json({
            success: true,
            message: "Contribution submitted for review.",
            data: contribution
        })

    } catch (error) {
        next(error)
    }
})

/**
 * POST /api/community/moderate/:id
 * (Internal Tool) Approve or Reject a contribution
 */
router.post('/moderate/:id', async (req, res, next) => {
    try {
        const { status, reason } = req.body
        const { id } = req.params

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ error: "Invalid status" })
        }

        const contribution = await Contribution.findByIdAndUpdate(
            id,
            {
                status,
                moderation_details: {
                    moderated_by: 'System Admin',
                    message: reason || 'Auto-moderation',
                    moderated_at: new Date()
                }
            },
            { new: true }
        ).populate('contributor_id')

        // Reward Reputation on Approval
        if (status === 'approved' && contribution) {
            await Contributor.findByIdAndUpdate(contribution.contributor_id._id, {
                $inc: { reputation_score: 10 }
            })
        }

        res.json({ success: true, data: contribution })

    } catch (error) {
        next(error)
    }
})

export default router
