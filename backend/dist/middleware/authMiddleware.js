import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_key_change_in_prod');
            req.user = await User.findById(decoded.id).select('-password_hash');
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        res.status(401).json({ error: 'Not authorized, no token' });
    }
};
export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(401).json({ error: 'Not authorized as an admin' });
    }
};
//# sourceMappingURL=authMiddleware.js.map