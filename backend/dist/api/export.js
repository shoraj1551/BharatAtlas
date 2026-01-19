/**
 * Data Export Routes
 */
import express from 'express';
import { exportPlaces } from '../services/exportService.js';
import { apiKeyAuth } from '../middleware/apiKeyAuth.js';
import { createLogger } from '../utils/logger.js';
const router = express.Router();
const logger = createLogger('ExportAPI');
/**
 * @swagger
 * /api/v1/export/places:
 *   post:
 *     summary: Export place data
 *     tags: [Export]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               place_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *               format:
 *                 type: string
 *                 enum: [json, csv]
 *     responses:
 *       200:
 *         description: File download
 */
router.post('/places', apiKeyAuth, async (req, res, next) => {
    try {
        const { place_ids, format } = req.body;
        logger.info(`Export request: ${format || 'json'} for ${place_ids?.length || 0} places`);
        const result = await exportPlaces(place_ids, format);
        res.setHeader('Content-Type', result.contentType);
        res.setHeader('Content-Disposition', `attachment; filename="places_export.${result.extension}"`);
        res.send(result.data);
    }
    catch (error) {
        next(error);
    }
});
export default router;
//# sourceMappingURL=export.js.map