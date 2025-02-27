import db from '@/database';
import createError from 'http-errors';
import { sendMail } from '@/helpers/mail';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import exp from 'constants';

/*
 * GET /profile
 * Get user profile
 */
export const getProfile = async (req, res, next) => {};

/*
 * PUT /profile
 * Update user profile
 */
export const updateProfile = async (req, res, next) => {};

/*
* DELETE /profile
* Delete user profile / account
! Warning: This action is irreversible
*/
export const deleteProfile = async (req, res, next) => {};

/*
 * POST /profile/change-email
 * Change user email
 */
export const changeEmail = async (req, res, next) => {};

/*
* POST /profile/change-password
* Change user password
*/
export const changePassword = async (req, res, next) => {};

/*
* POST /profile/profile-picture
* Change user profile picture
*/
export const changeProfilePicture = async (req, res, next) => {};

/*
* DELETE /profile/profile-picture
* Remove user profile picture
*/
export const removeProfilePicture = async (req, res, next) => {};

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
* GET /profile/users
* Get all users
*/
export const getUsers = async (req, res, next) => {};

/*
* GET /profile/users/:id
* Get user by id
*/
export const getUser = async (req, res, next) => {};

/*
* POST /profile/users
* Create a new user
*/
export const createUser = async (req, res, next) => {};

/*
* PUT /profile/users/:id
* Update user details
*/
export const updateUser = async (req, res, next) => {};

/*
* DELETE /profile/users/:id
* Delete user
*/
export const deleteUser = async (req, res, next) => {};

/*
* POST /profile/users/:id/change-role
* Change user role
*/
export const changeRole = async (req, res, next) => {};

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