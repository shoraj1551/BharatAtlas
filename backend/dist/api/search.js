/**
 * Search API Routes
 *
 * Advanced search with multi-dimensional filters
 */
import express from 'express';
import { advancedSearch, rebuildSearchIndex } from '../services/searchIndexService.js';
import { createLogger } from '../utils/logger.js';
const router = express.Router();
const logger = createLogger('SearchAPI');
/**
 * @swagger
 * /api/v1/search/advanced:
 *   post:
 *     summary: Advanced search with filters
 *     tags: [Search]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *                 description: Search query text
 *               filters:
 *                 type: object
 *                 properties:
 *                   population:
 *                     type: object
 *                     properties:
 *                       min:
 *                         type: number
 *                       max:
 *                         type: number
 *                   literacy:
 *                     type: object
 *                     properties:
 *                       min:
 *                         type: number
 *                       max:
 *                         type: number
 *                   industries:
 *                     type: array
 *                     items:
 *                       type: string
 *                   climate:
 *                     type: string
 *                   infrastructure_min:
 *                     type: number
 *                   place_type:
 *                     type: string
 *               sort:
 *                 type: string
 *                 enum: [relevance, population_desc, population_asc, literacy_desc, readiness_desc, name]
 *               limit:
 *                 type: number
 *               offset:
 *                 type: number
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */
router.post('/advanced', async (req, res, next) => {
    try {
        const { query, filters, sort, limit, offset } = req.body;
        logger.info('Advanced search request', {
            query,
            hasFilters: !!filters,
            sort
        });
        const results = await advancedSearch(query, filters, {
            sort,
            limit: limit || 20,
            offset: offset || 0
        });
        res.json({
            success: true,
            data: results.results,
            pagination: {
                total: results.total,
                page: results.page,
                limit: results.limit,
                hasMore: results.hasMore
            }
        });
    }
    catch (error) {
        logger.error('Advanced search failed', { error: error.message });
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/search/rebuild-index:
 *   post:
 *     summary: Rebuild search index
 *     tags: [Search]
 *     description: Rebuilds the entire search index from places collection
 *     responses:
 *       200:
 *         description: Index rebuilt successfully
 */
router.post('/rebuild-index', async (req, res, next) => {
    try {
        logger.info('Starting search index rebuild');
        const result = await rebuildSearchIndex();
        res.json({
            success: true,
            data: result
        });
    }
    catch (error) {
        logger.error('Index rebuild failed', { error: error.message });
        next(error);
    }
});
export default router;
//# sourceMappingURL=search.js.map