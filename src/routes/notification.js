import { Router } from "express";

import * as notificationController from '@/controllers/notification';
import * as notificationValidation from '@/routes/validations/notification';

import { isAdmin, validate } from '@/middlewares';

const router = Router();

router.route('/')
    .get(isAdmin, validate(notificationValidation.getNotifications), notificationController.getNotifications)
    .post(validate(notificationValidation.createNotification), notificationController.createNotification);

// router.put('/:id/mark-as-read', validate(notificationValidation.markNotificationAsRead), notificationController.markNotificationAsRead);

router.route('/:id')
    .get(isAdmin, validate(notificationValidation.getNotification), notificationController.getNotification)
    .put(isAdmin, validate(notificationValidation.updateNotification), notificationController.updateNotification)
    .delete(isAdmin, validate(notificationValidation.deleteNotification), notificationController.deleteNotification);

router.get('/user/:userID', validate(notificationValidation.getUserNotifications), notificationController.getUserNotifications);

router.get('/user/:userID/unread', validate(notificationValidation.getUnreadUserNotifications), notificationController.getUnreadUserNotifications);

router.put('/user/:userID/mark-all-as-read', validate(notificationValidation.markAllNotificationsAsRead), notificationController.markAllNotificationsAsRead);

router.put('/user/:userID/read/:notificationID', validate(notificationValidation.readNotification), notificationController.readNotification);

router.delete('/user/:userID/delete/:notificationID', validate(notificationValidation.deleteUserNotification), notificationController.deleteUserNotification);

router.get('/user/:userID/unread/count', validate(notificationValidation.getUnreadUserNotificationsCount), notificationController.getUnreadUserNotificationsCount);

export default router;