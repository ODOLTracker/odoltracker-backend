import {body, param, query} from 'express-validator';

export const createNotification = [
    body('userID').exists().withMessage('userID is required'),
    body('message').exists().withMessage('message is required'),
];

export const getNotifications = [
    query('page').optional().isInt().withMessage('page must be an integer'),
    query('limit').optional().isInt().withMessage('limit must be an integer'),
];

export const getNotification = [
    param('id').exists().withMessage('notification ID is required'),
];

export const updateNotification = [
    param('id').exists().withMessage('notification ID is required'),
    body('message').exists().withMessage('message is required'),
    body('status').exists().isIn(['Read', 'Unread']).withMessage('status must be either Read or Unread'),
];

export const deleteNotification = [
    param('id').exists().withMessage('notification ID is required'),
];

export const getUserNotifications = [
    param('userID').exists().withMessage('userID is required'),
    query('page').optional().isInt().withMessage('page must be an integer'),
    query('limit').optional().isInt().withMessage('limit must be an integer'),
];

// export const markNotificationAsRead = [
//     query('id').exists().withMessage('notification ID is required'),
// ];

export const getUnreadUserNotifications = [
    param('userID').exists().withMessage('userID is required'),
];

export const markAllNotificationsAsRead = [
    param('userID').exists().withMessage('userID is required'),
];

export const readNotification = [
    param('userID').exists().withMessage('userID is required'),
    param('notificationID').exists().withMessage('notificationID is required'),
];

export const deleteUserNotification = [
    param('userID').exists().withMessage('userID is required'),
    param('notificationID').exists().withMessage('notificationID is required'),
];

export const getUnreadUserNotificationsCount = [
    param('userID').exists().withMessage('userID is required'),
];