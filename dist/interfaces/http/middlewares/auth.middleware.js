import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../config/env.js';
export const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'No token provided' });
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    }
    catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};
