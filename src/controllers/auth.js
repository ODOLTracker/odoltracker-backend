import createError from 'http-errors';
import crypto from 'crypto';
import db from '@/database';
import { sendMail } from '@/helpers/mail';
import { generateToken } from '@/helpers/token';
import bcrypt from 'bcrypt';
import 'dotenv/config';

/*
* POST /auth/register
* Request body: { email, password, name }
*/
export const register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        const isEmailTaken = await db.models.Users.findOne({ where: { email } });
        if (isEmailTaken) {
            throw createError(409, 'Email already in use');
        }

        const user = await db.models.Users.create({
            name: name,
            isVerified: false,
            email: email,
            password: await bcrypt.hash(password, process.env.BCRYPT_SALT_ROUNDS),
            verificationToken: crypto.randomBytes(process.env.CRYPTO_RANDOM_BYTES_SIZE).toString('hex'),
            role: 'Operator',
            profilePicture: "",
        },
            { fields: ['name', 'isVerified', 'verificationToken', 'email', 'password', 'role', 'profilePicture'] }
        );

        const verificationLink = `${process.env.NODE_ENV === 'production' ? process.env.SERVER_URL : 'http://localhost:3000'}/api/v1/auth/verify-email?token=${user.verification_token}`;

        const mailOptions = {
            to: user.email,
            subject: 'Verify Your Email',
            html: `
              <h1>Email Verification</h1>
              <p>Please verify your email by clicking on the link below:</p>
              <a href="${verificationLink}">${verificationLink}</a>
            `,
        };

        await sendMail(mailOptions);

        res.status(201).json({ message: "Please check your email to verify your account." });
    } catch (error) {
        console.error(error);
        next();
    }
};

/*
 * GET /auth/verify-email
 * Verify email with the token
 */
export const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.query;

        const user = await db.models.Users.findOne({ where: { verificationToken: token } });
        if (!user) {
            return next(createError(400, 'Invalid or expired token!'));
        }

        user.isVerified = true;
        user.verificationToken = null;

        const newAuthToken = generateToken({ id: user.id }, '2h');

        await user.save();

        res.status(200).json({
            message: 'Email verified successfully. You can now use the token for authentication.',
            token: newAuthToken,
        });
    } catch (err) {
        next(err);
    }
};

/*
* GET /auth/resend-verification-email
* Resend verification email to the user
*/
export const resendVerificationEmail = async (req, res, next) => {};

/*
* POST /auth/login
* Request body: { email, password }
*/
export const login = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
};

/*
* GET /auth/logout
* Request body: { email, password }
*/
export const logout = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
};

/*
* POST /auth/forgot-password
* Request body: { email }
*/
export const forgotPassword = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
};

/*
* POST /auth/reset-password
* Request body: { token, password }
*/
export const resetPassword = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
};