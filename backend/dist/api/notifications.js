/**
 * Notification API Routes
 */
import express from 'express';
import { getUserNotifications, markAsRead, markAllAsRead, deleteNotification, getUnreadCount } from '../services/notificationService.js';
import { protect } from '../middleware/authMiddleware.js';
import { createLogger } from '../utils/logger.js';
const router = express.Router();
const logger = createLogger('NotificationAPI');
/**
 * @swagger
 * /api/v1/notifications:
 *   get:
 *     summary: Get user notifications
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: unreadOnly
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of notifications
 */
router.get('/', protect, async (req, res, next) => {
    try {
        const unreadOnly = req.query.unreadOnly === 'true';
        const limit = parseInt(req.query.limit) || 50;
        const notifications = await getUserNotifications(req.user._id, unreadOnly, limit);
        res.json({ success: true, data: notifications });
    }
    catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/notifications/unread-count:
 *   get:
 *     summary: Get unread notification count
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Unread count
 */
router.get('/unread-count', protect, async (req, res, next) => {
    try {
        const count = await getUnreadCount(req.user._id);
        res.json({ success: true, count });
    }
    catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/notifications/{id}/read:
 *   put:
 *     summary: Mark notification as read
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Notification marked as read
 */
router.put('/:id/read', protect, async (req, res, next) => {
    try {
        const notification = await markAsRead(req.params.id, req.user._id);
        res.json({ success: true, data: notification });
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/notifications/read-all:
 *   put:
 *     summary: Mark all notifications as read
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
 */
router.put('/read-all', protect, async (req, res, next) => {
    try {
        const result = await markAllAsRead(req.user._id);
        res.json({ success: true, modified: result.modifiedCount });
    }
    catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/notifications/{id}:
 *   delete:
 *     summary: Delete notification
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Notification deleted
 */
router.delete('/:id', protect, async (req, res, next) => {
    try {
        await deleteNotification(req.params.id, req.user._id);
        res.json({ success: true, message: 'Notification deleted' });
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
export default router;
//# sourceMappingURL=notifications.js.map