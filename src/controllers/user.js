import db from '@/database';
import createError from 'http-errors';
import { sendMail } from '@/helpers/mail';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import 'dotenv/config';

/*
 * GET /profile
 * Get user profile
 */
export const getProfile = async (req, res, next) => {
    try {
        const id = req.user.id;

        const user = await db.models.Users.findOne(
            { 
                where: { id },
                attributes: {
                    exclude: ['password', 'updatedAt', 'verificationToken', 'passwordResetToken', 'passwordResetExpires']
                }, 
            }
        );

        if (!user) {
            return next(createError(404, 'User not found!'));
        }

        res.status(200).json({ message: 'User profile fetched successfully!', user });
    } catch (error) {
        console.error(error);
        next();
    }
};

/*
 * PUT /profile
 * Update user profile
 */
export const updateProfile = async (req, res, next) => {
    try {
        const id = req.user.id;
        const { name } = req.body;

        const user = await db.models.Users.findOne(
            { 
                where: { id },
                attributes: {
                    exclude: ['password', 'updatedAt', 'verificationToken', 'passwordResetToken', 'passwordResetExpires']
                }, 
            }
        );

        if (!user) {
            return next(createError(404, 'User not found!'));
        }

        user.name = name;

        await user.save();

        res.status(200).json({ message: 'User profile updated successfully!', user });
    } catch (error) {
        console.error(error);
        next();
    }
};

/*
* DELETE /profile
* Delete user profile / account
! Warning: This action is irreversible
*/
export const deleteProfile = async (req, res, next) => {
    try {
        const id = req.user.id;

        const user = await db.models.Users.findOne(
            { 
                where: { id },
                attributes: {
                    exclude: ['password', 'updatedAt', 'verificationToken', 'passwordResetToken', 'passwordResetExpires']
                }, 
            }
        );

        if (!user) {
            return next(createError(404, 'User not found!'));
        }

        await user.destroy();

        res.status(200).json({ message: 'User profile deleted successfully!' });
    } catch (error) {
        console.error(error);
        next();
    }
};

/*
 * POST /profile/change-email
 * Change user email
 */
export const changeEmail = async (req, res, next) => {
    try {
        const id = req.user.id;

        const user = await db.models.Users.findOne(
            { 
                where: { id },
                attributes: {
                    exclude: ['password', 'updatedAt', 'verificationToken', 'passwordResetToken', 'passwordResetExpires']
                }, 
            }
        );

        if (!user) {
            return next(createError(404, 'User not found!'));
        }

        const { email } = req.body;

        user.email = email;
        user.isVerified = false;
        user.verificationToken = crypto.randomBytes(parseInt(process.env.CRYPTO_RANDOM_BYTES_SIZE)).toString('hex');

        await user.save();

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

        res.status(200).json({ message: 'Email changed successfully, please check your email for verification link!' });
    } catch (error) {
        console.error(error);
        next();
    }
};

/*
* POST /profile/change-password
* Change user password
*/
export const changePassword = async (req, res, next) => {
    try {
        const id = req.user.id;
        const { oldPassword, newPassword } = req.body;

        const user = await db.models.Users.findOne(
            { 
                where: { id },
                attributes: {
                    exclude: ['password', 'updatedAt', 'verificationToken', 'passwordResetToken', 'passwordResetExpires']
                }, 
            }
        );

        if (!user) {
            return next(createError(404, 'User not found!'));
        }

        const isPasswordMatch = await user.validatePassword(oldPassword);

        if (!isPasswordMatch) {
            return next(createError(401, 'Invalid password!'));
        }

        user.password = newPassword;

        await user.save();

        res.status(200).json({ message: 'Password changed successfully!' });
    } catch (error) {
        console.error(error);
        next();
    }
};

/*
* POST /profile/profile-picture
* Change user profile picture
*/
export const changeProfilePicture = async (req, res, next) => {
    try {
        const id = req.user.id;

        const user = await db.models.Users.findOne(
            { 
                where: { id },
                attributes: {
                    exclude: ['password', 'updatedAt', 'verificationToken', 'passwordResetToken', 'passwordResetExpires']
                }, 
            }
        );

        if (!user) {
            return next(createError(404, 'User not found!'));
        }

        const { profilePicture } = req.body;

        user.profilePicture = profilePicture;

        await user.save();

        res.status(200).json({ message: 'Profile picture changed successfully!', user });
    } catch (error) {
        console.error(error);
        next();
    }
};

/*
* DELETE /profile/profile-picture
* Remove user profile picture
*/
export const removeProfilePicture = async (req, res, next) => {
    try {
        const id = req.user.id;

        const user = await db.models.Users.findOne(
            { 
                where: { id },
                attributes: {
                    exclude: ['password', 'updatedAt', 'verificationToken', 'passwordResetToken', 'passwordResetExpires']
                }, 
            }
        );

        if (!user) {
            return next(createError(404, 'User not found!'));
        }

        user.profilePicture = null;

        await user.save();

        res.status(200).json({ message: 'Profile picture removed successfully!', user });
    } catch (error) {
        console.error(error);
        next();
    }
};

// /* 
// * GET /profile/managed-tollgates
// * Get tollgates managed by user 
// */
// export const getManagedTollGates = async (req, res, next) => {};

// /* 
// * get /profile/notifications
// * Get user notifications
// */
// export const getNotifications = async (req, res, next) => {};

// For admin only

/*
* GET /profile/users?page=1&limit=10
* Get all users
*/
export const getUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const users = await db.models.Users.findAndCountAll({ 
            attributes: {
                exclude: ['password', 'updatedAt', 'verificationToken', 'passwordResetToken', 'passwordResetExpires']
            },
            limit: parseInt(limit, 10),
            offset: offset
        });

        if (!users) {
            return next(createError(404, 'No users found!'));
        }

        const totalPages = Math.ceil(users.count / limit);
        const totalUsers = users.count;

        res.status(200).json(
            { 
                message: 'Users fetched successfully!', 
                users: users.rows,
                currentPage: parseInt(page),
                totalPages: totalPages,
                totalUsers: totalUsers 
            }
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /profile/users/:id
* Get user by id
*/
export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await db.models.Users.findOne(
            { 
                where: { id },
                attributes: {
                    exclude: ['password', 'updatedAt', 'verificationToken', 'passwordResetToken', 'passwordResetExpires']
                },
            }
        );

        if (!user) {
            return next(createError(404, 'User not found!'));
        }

        res.status(200).json({ message: 'User fetched successfully!', user });
    } catch (error) {
        console.error(error);
        next();
    }
};

/*
* POST /profile/users
* Create a new user
*/
export const createUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const encryptedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));

        const user = await db.models.Users.create(
            { 
                name, 
                email, 
                password: encryptedPassword, 
                role 
            }
        );

        if (!user) {
            return next(createError(500, 'Failed to create user!'));
        }

        res.status(201).json({ message: 'User created successfully!', user });
    } catch (error) {
        console.error(error);
        next();
    }
};

/*
* PUT /profile/users/:id
* Update user details
*/
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, role, isVerified } = req.body;

        const user = await db.models.Users.findOne(
            { 
                where: { id },
                attributes: {
                    exclude: ['password', 'updatedAt', 'verificationToken', 'passwordResetToken', 'passwordResetExpires']
                }, 
            }
        );

        if (!user) {
            return next(createError(404, 'User not found!'));
        }

        user.name = name;
        user.email = email;
        user.role = role;
        user.isVerified = isVerified;

        await user.save();

        res.status(200).json({ message: 'User updated successfully!', user });
    } catch (error) {
        console.error(error);
        next();
    }
};

/*
* DELETE /profile/users/:id
* Delete user
*/
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await db.models.Users.findOne(
            { 
                where: { id },
                attributes: {
                    exclude: ['password', 'updatedAt', 'verificationToken', 'passwordResetToken', 'passwordResetExpires']
                }, 
            }
        );

        if (!user) {
            return next(createError(404, 'User not found!'));
        }

        await user.destroy();

        res.status(200).json({ message: 'User deleted successfully!' });
    } catch (error) {
        console.error(error);
        next();
    }
};

// /*
// * POST /profile/users/:id/change-role
// * Change user role
// */
// export const changeRole = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const { role } = req.body;

//         const user = await db.models.Users.findOne({ where: { id } });

//         if (!user) {
//             return next(createError(404, 'User not found!'));
//         }

//         user.role = role;

//         await user.save();

//         res.status(200).json({ message: 'User role changed successfully!', user });
//     } catch (error) {
//         console.error(error);
//         next();
//     }
// };

// /*
// * POST /profile/users/:id/assign-tollgate/:tollgateId
// * Assign user to a tollgate
// */
// export const assignTollGate = async (req, res, next) => {};

// /*
// * DELETE /profile/users/:id/remove-tollgate/:tollgateId
// * Remove user from assigned tollgate
// */
// export const removeAssignedTollGate = async (req, res, next) => {};