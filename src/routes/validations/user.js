import {body, query} from 'express-validator';

export const getProfile = [];

export const updateProfile = [
    body('name').isString().withMessage('Invalid name'),
];

export const deleteProfile = [];

export const changeEmail = [
    body('email').isEmail().withMessage('Invalid email')
];

export const changePassword = [
    body('password').isString().withMessage('Invalid password')
];

export const changeProfilePicture = [
    body('profilePicture').isString().withMessage('Invalid profile picture')
];

export const removeProfilePicture = [
    body('profilePicture').isString().withMessage('Invalid profile picture')
];

// export const getManagedTollGates = [
//     query('id').isString().withMessage('Invalid user id')
// ];

// export const getNotifications = [
//     query('id').isString().withMessage('Invalid user id')
// ];

export const getUsers = [
    query('page').optional().isInt().withMessage('Invalid page number'),
    query('limit').optional().isInt().withMessage('Invalid limit')
];

export const getUser = [
    query('id').isString().withMessage('Invalid user id')
];

export const createUser = [
    body('name').isString().withMessage('Invalid name'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isString().withMessage('Invalid password'),
    body('role').isString().isIn(['Admin', 'Operator']).withMessage('Invalid role')
];

export const updateUser = [
    body('name').isString().withMessage('Invalid name'),
    body('email').isEmail().withMessage('Invalid email'),
    body('role').isString().isIn(['Admin', 'Operator']).withMessage('Invalid role'),
    body('isVerified').isBoolean().withMessage('Invalid isVerified')
];

export const deleteUser = [];

// export const changeRole = [
//     body('role').isString().withMessage('Invalid role')
// ];

// export const assignTollGate = [
//     query('id').isString().withMessage('Invalid user id'),
//     query('tollgateId').isString().withMessage('Invalid tollgate id')
// ];

// export const removeAssignedTollGate = [
//     query('id').isString().withMessage('Invalid user id'),
//     query('tollgateId').isString().withMessage('Invalid tollgate id')
// ];

