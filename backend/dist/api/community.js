/**
 * Community API Routes (Reviews & Discussions)
 */
import express from 'express';
import { createReview, getReviews, toggleHelpful, deleteReview } from '../services/reviewService.js';
import { createDiscussion, getDiscussions, addReply, deleteDiscussion } from '../services/discussionService.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
// --- Review Routes ---
/**
 * @swagger
 * /api/v1/community/reviews/{placeId}:
 *   get:
 *     summary: Get reviews for a place
 */
router.get('/reviews/:placeId', async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || 'newest';
        const result = await getReviews(req.params.placeId, page, limit, sort);
        res.json({ success: true, data: result });
    }
    catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/community/reviews:
 *   post:
 *     summary: Create a review
 */
router.post('/reviews', protect, async (req, res, next) => {
    try {
        const review = await createReview(req.user._id, req.body);
        res.status(201).json({ success: true, data: review });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'You have already reviewed this place' });
        }
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/community/reviews/{id}/helpful:
 *   put:
 *     summary: Toggle helpful status
 */
router.put('/reviews/:id/helpful', protect, async (req, res, next) => {
    try {
        const result = await toggleHelpful(req.params.id, req.user._id);
        res.json({ success: true, data: result });
    }
    catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/community/reviews/{id}:
 *   delete:
 *     summary: Delete review
 */
router.delete('/reviews/:id', protect, async (req, res, next) => {
    try {
        await deleteReview(req.params.id, req.user._id);
        res.json({ success: true, message: 'Review deleted' });
    }
    catch (error) {
        next(error);
    }
});
// --- Discussion Routes ---
/**
 * @swagger
 * /api/v1/community/discussions/{placeId}:
 *   get:
 *     summary: Get discussions for a place
 */
router.get('/discussions/:placeId', async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await getDiscussions(req.params.placeId, page, limit);
        res.json({ success: true, data: result });
    }
    catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/community/discussions:
 *   post:
 *     summary: Create a discussion
 */
router.post('/discussions', protect, async (req, res, next) => {
    try {
        const discussion = await createDiscussion(req.user._id, req.body);
        res.status(201).json({ success: true, data: discussion });
    }
    catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/community/discussions/{id}/reply:
 *   post:
 *     summary: Reply to a discussion
 */
router.post('/discussions/:id/reply', protect, async (req, res, next) => {
    try {
        const discussion = await addReply(req.params.id, req.user._id, req.body.content);
        res.json({ success: true, data: discussion });
    }
    catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/community/discussions/{id}:
 *   delete:
 *     summary: Delete discussion
 */
router.delete('/discussions/:id', protect, async (req, res, next) => {
    try {
        await deleteDiscussion(req.params.id, req.user._id);
        res.json({ success: true, message: 'Discussion deleted' });
    }
    catch (error) {
        next(error);
    }
});
export default router;
//# sourceMappingURL=community.js.map