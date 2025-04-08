import { body, query, param  } from "express-validator";

export const getImages = [
    query('page').optional().isInt().withMessage('Page must be an integer'),
    query('limit').optional().isInt().withMessage('Limit must be an integer')
];

export const getImage = [
    param('id').isInt().withMessage('ID must be an integer')
];

export const createImage = [
    body('detectionID').isInt().withMessage('Detection ID must be an integer'),
    body('imageURL').isURL().withMessage('Image URL must be a valid URL'),
    body('cloudinaryPublicID').isString().withMessage('Cloudinary Public ID must be a string'),
    body('verificationStatus').isIn(['Verified', 'Unverified', 'Rejected']).withMessage('Verification Status must be either verified, unverified, or rejected')
];

export const updateImage = [
    param('id').isInt().withMessage('ID must be an integer'),
    body('detectionID').isInt().withMessage('Detection ID must be an integer'),
    body('imageURL').isURL().withMessage('Image URL must be a valid URL'),
    body('cloudinaryPublicID').isString().withMessage('Cloudinary Public ID must be a string'),
    body('verificationStatus').isIn(['Verified', 'Unverified', 'Rejected']).withMessage('Verification Status must be either verified, unverified, or rejected')
];

export const deleteImage = [
    param('id').isInt().withMessage('ID must be an integer')
];

export const uploadImage = [
    body('detectionID').isInt().withMessage('Detection ID must be an integer'),
];

export const verifyImage = [
    param('id').isInt().withMessage('ID must be an integer')
];

export const rejectImage = [
    param('id').isInt().withMessage('ID must be an integer')
];

export const getVerifiedImages = [
    param('detectionID').isInt().withMessage('Detection ID must be an integer'),
    query('page').optional().isInt().withMessage('Page must be an integer'),
    query('limit').optional().isInt().withMessage('Limit must be an integer')
];

export const getUnverifiedImages = [
    param('detectionID').isInt().withMessage('Detection ID must be an integer'),
    query('page').optional().isInt().withMessage('Page must be an integer'),
    query('limit').optional().isInt().withMessage('Limit must be an integer')
];

export const getRejectedImages = [
    param('detectionID').isInt().withMessage('Detection ID must be an integer'),
    query('page').optional().isInt().withMessage('Page must be an integer'),
    query('limit').optional().isInt().withMessage('Limit must be an integer')
];

export const getCurrentImageToVerify = [
    param('detectionID').isInt().withMessage('Detection ID must be an integer')
];

export const getNextImageToVerify = [
    param('detectionID').isInt().withMessage('Detection ID must be an integer')
];