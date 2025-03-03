import { body, query } from 'express-validator';

export const registerRules = [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('name').isString(),
];

export const verifyEmailRules = [
  query('token').isString(),
];

export const resendVerificationEmailRules = [
    body('email').isEmail(),
];

export const loginRules = [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
];

export const logoutRules = [];

export const forgotPasswordRules = [
    body('email').isEmail(),
];

export const resetPasswordRules = [
    query('token').isString(),
    body('newPassword').isLength({ min: 6 }),
];