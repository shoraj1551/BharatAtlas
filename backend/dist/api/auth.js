/**
 * Auth Routes
 */
import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../services/authService.js';
import { protect } from '../middleware/authMiddleware.js';
import { createLogger } from '../utils/logger.js';
const router = express.Router();
const logger = createLogger('AuthAPI');
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await registerUser(name, email, password);
        res.json(user);
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Auth user & get token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser(email, password);
        res.json(user);
    }
    catch (error) {
        res.status(401);
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */
router.get('/profile', protect, async (req, res, next) => {
    try {
        const user = await getUserProfile(req.user._id);
        res.json(user);
    }
    catch (error) {
        res.status(404);
        next(error);
    }
});
/**
 * @swagger
 * /api/v1/auth/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 */
router.put('/profile', protect, async (req, res, next) => {
    try {
        const user = await updateUserProfile(req.user._id, req.body);
        res.json(user);
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
export default router;
//# sourceMappingURL=auth.js.map