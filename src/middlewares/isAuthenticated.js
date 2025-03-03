import jwt from 'jsonwebtoken';
import createError from 'http-errors';

export default function isAuthenticated(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(createError(401, 'Not authenticated!'));
        }

        const token = authHeader.split(' ')[1]; // Ambil token setelah 'Bearer '
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifikasi token

        req.user = decoded; // Tambahkan user yang sudah diverifikasi ke request
        next();
    } catch (error) {
        console.error(error);
        next(createError(401, 'Invalid or expired token!'));
    }
}
