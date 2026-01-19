/**
 * Dashboard API Routes
 */
import express from 'express';
import Dashboard from '../../models/Dashboard.js';
import { protect } from '../middleware/authMiddleware.js';
import { createLogger } from '../utils/logger.js';
const router = express.Router();
const logger = createLogger('DashboardAPI');
/**
 * @swagger
 * /api/v1/dashboards:
 *   get:
 *     summary: Get user's dashboards
 *     tags: [Dashboards]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of dashboards
 */
router.get('/', protect, async (req, res, next) => {
    try {
        const dashboards = await Dashboard.find({ user_id: req.user._id })
            .sort({ updated_at: -1 });
        res.json({ success: true, data: dashboards });
    }
    catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/dashboards/{id}:
 *   get:
 *     summary: Get dashboard by ID
 *     tags: [Dashboards]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Dashboard data
 */
router.get('/:id', protect, async (req, res, next) => {
    try {
        const dashboard = await Dashboard.findById(req.params.id);
        if (!dashboard) {
            return res.status(404).json({ error: 'Dashboard not found' });
        }
        // Check ownership or public
        if (dashboard.user_id.toString() !== req.user._id.toString() && !dashboard.is_public) {
            return res.status(403).json({ error: 'Access denied' });
        }
        res.json({ success: true, data: dashboard });
    }
    catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/dashboards:
 *   post:
 *     summary: Create new dashboard
 *     tags: [Dashboards]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               layout:
 *                 type: array
 *     responses:
 *       201:
 *         description: Dashboard created
 */
router.post('/', protect, async (req, res, next) => {
    try {
        const { name, description, layout = [] } = req.body;
        const dashboard = await Dashboard.create({
            user_id: req.user._id,
            name,
            description,
            layout
        });
        logger.info(`Dashboard created: ${dashboard._id}`);
        res.status(201).json({ success: true, data: dashboard });
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/dashboards/{id}:
 *   put:
 *     summary: Update dashboard
 *     tags: [Dashboards]
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
 *     responses:
 *       200:
 *         description: Dashboard updated
 */
router.put('/:id', protect, async (req, res, next) => {
    try {
        const dashboard = await Dashboard.findById(req.params.id);
        if (!dashboard) {
            return res.status(404).json({ error: 'Dashboard not found' });
        }
        // Check ownership
        if (dashboard.user_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const { name, description, layout, is_public } = req.body;
        if (name)
            dashboard.name = name;
        if (description !== undefined)
            dashboard.description = description;
        if (layout)
            dashboard.layout = layout;
        if (is_public !== undefined)
            dashboard.is_public = is_public;
        await dashboard.save();
        res.json({ success: true, data: dashboard });
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/dashboards/{id}:
 *   delete:
 *     summary: Delete dashboard
 *     tags: [Dashboards]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Dashboard deleted
 */
router.delete('/:id', protect, async (req, res, next) => {
    try {
        const dashboard = await Dashboard.findById(req.params.id);
        if (!dashboard) {
            return res.status(404).json({ error: 'Dashboard not found' });
        }
        // Check ownership
        if (dashboard.user_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Access denied' });
        }
        await dashboard.deleteOne();
        res.json({ success: true, message: 'Dashboard deleted' });
    }
    catch (error) {
        next(error);
    }
});
export default router;
//# sourceMappingURL=dashboards.js.map