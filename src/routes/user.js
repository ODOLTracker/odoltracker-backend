import { Router } from "express";

import * as userController from "@/controllers/user";
import * as userValidation from "@/routes/validations/user";
import { validate, isAdmin } from '@/middlewares';

const router = Router();

// base route is /profile

router.route('/')
    .get(validate(userValidation.getProfile), userController.getProfile)
    .put(validate(userValidation.updateProfile) ,userController.updateProfile)
    .delete(validate(userValidation.deleteProfile), userController.deleteProfile);

router.post('/change-email', validate(userValidation.changeEmail),userController.changeEmail);
router.post('/change-password', validate(userValidation.changePassword), userController.changePassword);

router.route('/profile-picture')
    .post(validate(userValidation.changeProfilePicture), userController.changeProfilePicture)
    .delete(validate(userValidation.changeProfilePicture), userController.removeProfilePicture);

// router.get('/managed-tollgates', isAuthenticated, validate(userValidation.getManagedTollGates), userController.getManagedTollGates);
// router.get('/notifications', isAuthenticated, validate(userValidation.getNotifications), userController.getNotifications);

// For admin only

router.route('/users')
    .get(isAdmin, validate(userValidation.getUsers), userController.getUsers)
    .post(isAdmin, validate(userValidation.createUser), userController.createUser);

router.route('/users/:id')
    .get(isAdmin, validate(userValidation.getUser), userController.getUser)
    .put(isAdmin, validate(userValidation.createUser), userController.updateUser)
    .delete(isAdmin, validate(userValidation.deleteUser), userController.deleteUser);

// router.post('/users/:id/change-role', isAuthenticated, isAdmin, validate(userValidation.changeRole), userController.changeRole);
// router.post('/users/:id/assign-tollgate/:tollgateId', isAuthenticated, isAdmin, validate(userValidation.assignTollGate), userController.assignTollGate);
// router.delete('/users/:id/remove-tollgate/:tollgateId', isAuthenticated, isAdmin, validate(userValidation.removeAssignedTollGate), userController.removeAssignedTollGate);

export default router;