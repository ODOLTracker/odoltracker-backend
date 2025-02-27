import db from '@/database';

/*
* POST /notifications
* Create a new notification
* Unprotected route on purpose
*/
export const createNotification = async (req, res) => {};

/*
* GET /notifications
* Get all notifications
* Admin only
*/
export const getNotifications = async (req, res) => {};

/*
* GET /notifications/:id
* Get a notification by id
* Admin only
*/
export const getNotification = async (req, res) => {};

/*
* PUT /notifications/:id
* Update a notification
* Admin only
*/
export const updateNotification = async (req, res) => {};

/*
* DELETE /notifications/:id
* Delete a notification
* Admin only
*/
export const deleteNotification = async (req, res) => {};

/*
* GET /notifications/user/:userId
* Get all notifications of a user
* All users
*/
export const getUserNotifications = async (req, res) => {};

/*
* PUT /notifications/:id/mark-as-read
* Mark a notification as read
* Admin only
*/
export const markNotificationAsRead = async (req, res) => {};

/*
* GET /notifications/user/:userId/unread
* Get all unread notifications of a user
* All users
*/
export const getUnreadUserNotifications = async (req, res) => {};


/*
* PUT /notifications/user/:userId/mark-all-as-read
* Mark all notifications of a user as read
* All users
*/
export const markAllNotificationsAsRead = async (req, res) => {};

/*
* DELETE /notifications/user/:userId
* Delete all notifications of a user
* All users
*/
export const deleteAllUserNotifications = async (req, res) => {};

/*
* GET /notifications/user/:userId/unread/count
* Get the count of unread notifications of a user
* All users
*/
export const getUnreadUserNotificationsCount = async (req, res) => {};