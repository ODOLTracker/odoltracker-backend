import createError from 'http-errors';
import crypto from 'crypto';
import db from '@/database';
import { sendMail } from '@/helpers/mail';
import { generateToken } from '@/helpers/token';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
            return next(createError(409, 'Email is already taken!'));
        }

        const user = await db.models.Users.create({
            name: name,
            isVerified: false,
            email: email,
            password: await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS)),
            verificationToken: crypto.randomBytes(parseInt(process.env.CRYPTO_RANDOM_BYTES_SIZE)).toString('hex'),
            role: 'Operator',
            profilePicture: "",
        },
            { fields: ['name', 'isVerified', 'verificationToken', 'email', 'password', 'role', 'profilePicture'] }
        );

        const verificationLink = `${process.env.NODE_ENV === 'production' ? process.env.SERVER_URL : 'http://localhost:3000'}/v1/auth/verify-email?token=${user.verificationToken}`;

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

        await user.save();

        res.status(200).json({
            message: 'Email verified successfully. You can now login.',
        });
    } catch (err) {
        next(err);
    }
};

/*
* GET /auth/resend-verification-email
* Resend verification email to the user
*/
export const resendVerificationEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await db.models.Users.findOne({ where: { email } });

        if (!user) {
            return next(createError(404, 'User not found!'));
        }

        if (user.isVerified) {
            return next(createError(400, 'User is already verified!'));
        }


        user.verificationToken = crypto.randomBytes(parseInt(process.env.CRYPTO_RANDOM_BYTES_SIZE).toString('hex'));
        await user.save();
        const verificationLink = `${process.env.NODE_ENV === 'development' ? process.env.SERVER_URL : 'http://localhost:3000'}/v1/auth/verify-email?token=${user.verificationToken}`;

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

        res.status(200).json({ message: 'Verification email sent successfully!' });
    } catch (err) {
        next(err);
    }
};

/*
* POST /auth/login
* Request body: { email, password }
*/
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await db.models.Users.findOne({ where: { email } });
        if (!user) {
            return next(createError(404, 'User not found!'));
        }

        if (!user.isVerified) {
            return next(createError(403, 'Please verify your email first!'));
        }

        const isPasswordMatch = await user.validatePassword(password);
        if (!isPasswordMatch) {
            return next(createError(401, 'Invalid email or password!'));
        }

        const token = generateToken({ id: user.id }, '2h');

        res.status(200).json({ message: 'Login successful!', token: token });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /auth/logout
* Request body: { email, password }
* This logout function is not really necessary for JWT tokens since they are stateless. Logout can be implemented on the client side by deleting the token from the local storage.
*/
export const logout = async (req, res, next) => {
    try {
        res.status(200).json({ message: 'Logout successful!' });
    } catch (error) {
        next(error);
    }
};

/*
* POST /auth/forgot-password
* Request body: { email }
*/
export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await db.models.Users.findOne({ where: { email } });
        if (!user) {
            return next(createError(404, 'User not found!'));
        }

        user.passwordResetToken = crypto.randomBytes(parseInt(process.env.CRYPTO_RANDOM_BYTES_SIZE)).toString('hex');
        user.passwordResetTokenExpires = Date.now() + parseInt(process.env.PASSWORD_RESET_TOKEN_EXPIRES_IN) * 60 * 1000;

        await user.save();

        const appResetLink = `${process.env.NODE_ENV === 'production' ? process.env.SERVER_URL : 'http://localhost:3000'}/v1/auth/reset-password?token=${user.passwordResetToken}`;

        const mailOptions = {
            to: user.email,
            subject: 'Reset Your Password',
            html: `
              <h1>Reset Password</h1>
              <p>Please reset your password by clicking on the link below:</p>
              <a href="${appResetLink}">${appResetLink}</a>
            `,
        };

        await sendMail(mailOptions);

        res.status(200).json({ message: 'Reset password email sent successfully!'});
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* POST /auth/reset-password
* Request body: { newPassword }
* Request query: { token }
*/
export const resetPassword = async (req, res, next) => {
    try {
        const { newPassword } = req.body;
        const { token } = req.query;

        const user = await db.models.Users.findOne({ where: { passwordResetToken: token } });
        if (!user) {
            return next(createError(404, 'User not found!'));
        }

        if (Date.now() > user.passwordResetTokenExpires) {
            return next(createError(400, 'Token expired!'));
        }

        user.password = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_SALT_ROUNDS));
        user.passwordResetToken = "";
        user.passwordResetTokenExpires = null;
        await user.save();

        res.status(200).json({ message: 'Password reset successful!' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};