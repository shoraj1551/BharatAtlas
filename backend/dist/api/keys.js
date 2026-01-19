/**
 * API Key Management Routes
 */
import express from 'express';
import { createApiKey, listApiKeys, revokeApiKey } from '../services/apiKeyService.js';
import { createLogger } from '../utils/logger.js';
const router = express.Router();
const logger = createLogger('KeysAPI');
/**
 * @swagger
 * /api/v1/keys:
 *   get:
 *     summary: List API keys
 *     tags: [API Management]
 *     responses:
 *       200:
 *         description: List of active API keys
 */
router.get('/', async (req, res, next) => {
    try {
        const keys = await listApiKeys();
        res.json({ success: true, data: keys });
    }
    catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/keys/generate:
 *   post:
 *     summary: Generate a new API key
 *     tags: [API Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Created API key
 */
router.post('/generate', async (req, res, next) => {
    try {
        const { name, permissions } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Key name is required' });
        }
        const apiKey = await createApiKey(name, permissions);
        logger.info(`Generated API key: ${name}`);
        res.json({ success: true, data: apiKey });
    }
    catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/keys/{id}:
 *   delete:
 *     summary: Revoke an API key
 *     tags: [API Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Key revoked successfully
 */
router.delete('/:id', async (req, res, next) => {
    try {
        await revokeApiKey(req.params.id);
        logger.info(`Revoked API key: ${req.params.id}`);
        res.json({ success: true, message: 'Key revoked' });
    }
    catch (error) {
        next(error);
    }
});
export default router;
//# sourceMappingURL=keys.js.map