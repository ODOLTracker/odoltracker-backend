import createError from 'http-errors';
import db from '@/database';

export default async function isAdmin(req, res, next) {
    try {
        if (!req.user) {
            return next(createError(401, 'Unauthorized: No user data'));
        }
        
        const user = await db.User.findByPk(req.user.id);
        
        if (!user) {
            return next(createError(404, 'User not found'));
        }

        if (user.role !== 'Admin') {
            return next(createError(403, 'Forbidden: Only Admins can access this resource'));
        }

        next();
    } catch (error) {
        next(createError(500, 'Internal Server Error'));
    }
};