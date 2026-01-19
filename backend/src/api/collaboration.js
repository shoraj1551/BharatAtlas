/**
 * Collaboration Routes
 * 
 * API endpoints for workspace sharing and collaboration
 */

import express from 'express'
import {
    shareWorkspace,
    removeCollaborator,
    updatePermissions,
    getSharedWorkspaces,
    generateShareLink,
    logActivity
} from '../services/collaborationService.js'
import { protect } from '../middleware/authMiddleware.js'
import { createLogger } from '../utils/logger.js'
import Workspace from '../../models/Workspace.js'

const router = express.Router()
const logger = createLogger('CollaborationAPI')

/**
 * @swagger
 * /api/v1/workspaces/{id}/share:
 *   post:
 *     summary: Share workspace with a user
 *     tags: [Collaboration]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [viewer, editor]
 *     responses:
 *       200:
 *         description: Workspace shared successfully
 */
router.post('/workspaces/:id/share', protect, async (req, res, next) => {
    try {
        const { email, role } = req.body
        const workspace = await shareWorkspace(req.params.id, email, role, req.user._id)
        res.json({ success: true, data: workspace })
    } catch (error) {
        res.status(400)
        next(error)
    }
})

/**
 * @swagger
 * /api/v1/workspaces/{id}/collaborators/{userId}:
 *   delete:
 *     summary: Remove collaborator from workspace
 *     tags: [Collaboration]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *       - in: path
 *         name: userId
 *         required: true
 *     responses:
 *       200:
 *         description: Collaborator removed
 */
router.delete('/workspaces/:id/collaborators/:userId', protect, async (req, res, next) => {
    try {
        const workspace = await removeCollaborator(req.params.id, req.params.userId, req.user._id)
        res.json({ success: true, data: workspace })
    } catch (error) {
        res.status(400)
        next(error)
    }
})

/**
 * @swagger
 * /api/v1/workspaces/{id}/permissions:
 *   put:
 *     summary: Update collaborator permissions
 *     tags: [Collaboration]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Permissions updated
 */
router.put('/workspaces/:id/permissions', protect, async (req, res, next) => {
    try {
        const { userId, role } = req.body
        const workspace = await updatePermissions(req.params.id, userId, role, req.user._id)
        res.json({ success: true, data: workspace })
    } catch (error) {
        res.status(400)
        next(error)
    }
})

/**
 * @swagger
 * /api/v1/workspaces/shared-with-me:
 *   get:
 *     summary: Get workspaces shared with current user
 *     tags: [Collaboration]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of shared workspaces
 */
router.get('/workspaces/shared-with-me', protect, async (req, res, next) => {
    try {
        const workspaces = await getSharedWorkspaces(req.user._id)
        res.json({ success: true, data: workspaces })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/v1/workspaces/{id}/share-link:
 *   post:
 *     summary: Generate shareable link
 *     tags: [Collaboration]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Share link generated
 */
router.post('/workspaces/:id/share-link', protect, async (req, res, next) => {
    try {
        const linkToken = await generateShareLink(req.params.id, req.user._id)
        res.json({ success: true, link: linkToken })
    } catch (error) {
        res.status(400)
        next(error)
    }
})

/**
 * @swagger
 * /api/v1/workspaces/{id}/activity:
 *   get:
 *     summary: Get workspace activity log
 *     tags: [Collaboration]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Activity log
 */
router.get('/workspaces/:id/activity', protect, async (req, res, next) => {
    try {
        const workspace = await Workspace.findOne({ workspace_id: req.params.id })
            .populate('activity_log.user_id', 'name email')

        if (!workspace) {
            return res.status(404).json({ error: 'Workspace not found' })
        }

        res.json({ success: true, data: workspace.activity_log })
    } catch (error) {
        next(error)
    }
})

export default router
