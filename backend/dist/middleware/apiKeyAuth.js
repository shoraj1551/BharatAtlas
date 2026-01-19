import { validateApiKey } from '../services/apiKeyService.js';
export const apiKeyAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const queryKey = req.query.api_key;
    let key = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        key = authHeader.split(' ')[1];
    }
    else if (queryKey) {
        key = queryKey;
    }
    if (!key) {
        // For specific protected routes, key is required
        return res.status(401).json({ error: 'API key required' });
    }
    const apiKey = await validateApiKey(key);
    if (!apiKey) {
        return res.status(403).json({ error: 'Invalid or expired API key' });
    }
    req.apiKey = apiKey;
    next();
};
//# sourceMappingURL=apiKeyAuth.js.map