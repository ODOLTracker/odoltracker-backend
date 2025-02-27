import { Router } from "express";

import * as notificationController from '@/controllers/notification';
import * as notificationValidation from '@/routes/validations/notification';

import { isAuthenticated, isAdmin, validate } from '@/middlewares';

const router = Router();

router.route('/')
    .get(isAuthenticated, isAdmin, validate(notificationValidation.getNotifications), notificationController.getNotifications)
    .post(isAuthenticated, validate(notificationValidation.createNotification), notificationController.createNotification);

router.put('/:id/mark-as-read', isAuthenticated, isAdmin, validate(notificationValidation.markNotificationAsRead), notificationController.markNotificationAsRead);

router.route('/:id')
    .get(isAuthenticated, isAdmin, validate(notificationValidation.getNotification), notificationController.getNotification)
    .put(isAuthenticated, isAdmin, validate(notificationValidation.updateNotification), notificationController.updateNotification)
    .delete(isAuthenticated, isAdmin, validate(notificationValidation.deleteNotification), notificationController.deleteNotification);

router.get('/user/:userId', isAuthenticated, validate(notificationValidation.getUserNotifications), notificationController.getUserNotifications);

router.get('/user/:userId/unread', isAuthenticated, validate(notificationValidation.getUnreadUserNotifications), notificationController.getUnreadUserNotifications);

router.put('/user/:userId/mark-all-as-read', isAuthenticated, validate(notificationValidation.markAllNotificationsAsRead), notificationController.markAllNotificationsAsRead);

router.delete('/user/:userId', isAuthenticated, validate(notificationValidation.deleteAllUserNotifications), notificationController.deleteAllUserNotifications);

router.get('/user/:userId/unread/count', isAuthenticated, validate(notificationValidation.getUnreadUserNotificationsCount), notificationController.getUnreadUserNotificationsCount);

export default router;