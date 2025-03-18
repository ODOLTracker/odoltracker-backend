import db from '@/database';
import createError from 'http-errors';

/*
* POST /notifications
* Create a new notification
* Unprotected route on purpose
*/
export const createNotification = async (req, res) => {
    try {
        const { userID, message } = req.body;
        
        const notification = await db.models.Notifications.create({
            userID,
            message,
            status: 'Unread',
            timestamp: new Date(),
        });
        
        return res.status(201).json({
            message: 'Notification created successfully',
            notification,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /notifications
* Get all notifications
* Admin only
*/
export const getNotifications = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const notifications = await db.models.Notifications.findAndCountAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        if (!notifications) {
            return next(createError(404, 'No notifications found'));
        }

        const totalPages = Math.ceil(notifications.count / limit);
        const totalNotifications = notifications.count;

        res.status(200).json(
            {
                message: 'Notifications fetched successfully',
                notifications: notifications.rows,
                totalNotifications,
                totalPages,
                currentPage: page,
            }
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /notifications/:id
* Get a notification by id
* Admin only
*/
export const getNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await db.models.Notifications.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });

        if (!notification) {
            return next(createError(404, 'No notifications found'));
        }

        res.status(200).json({
            message: 'Notification fetched successfully',
            notification,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* PUT /notifications/:id
* Update a notification
* Admin only
*/
export const updateNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const { message, status } = req.body;

        const notification = await db.models.Notifications.findByPk(id);

        if (!notification) {
            return next(createError(404, 'No notifications found'));
        }

        notification.message = message;
        notification.status = status;
        notification.timestamp = new Date();
        
        await notification.save();

        res.status(200).json({
            message: 'Notification updated successfully',
            notification,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* DELETE /notifications/:id
* Delete a notification
* Admin only
*/
export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await db.models.Notifications.findByPk(id);

        if (!notification) {
            return next(createError(404, 'No notifications found'));
        }

        await notification.destroy();

        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /notifications/user/:userID
* Get all notifications of a user
* All users
*/
export const getUserNotifications = async (req, res) => {
    try {
        const { userID } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const notifications = await db.models.Notifications.findAndCountAll({
            where: { userID },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        if (!notifications) {
            return next(createError(404, 'No notifications found'));
        }

        const totalPages = Math.ceil(notifications.count / limit);
        const totalNotifications = notifications.count;

        res.status(200).json(
            {
                message: 'Notifications fetched successfully',
                notifications: notifications.rows,
                totalNotifications,
                totalPages,
                currentPage: page,
            }
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /notifications/user/:userID/unread
* Get all unread notifications of a user
* All users
*/
export const getUnreadUserNotifications = async (req, res) => {
    try {
        const { userID } = req.params;
        const notifications = await db.models.Notifications.findAll({
            where: { userID, status: 'Unread' },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });

        if (!notifications) {
            return next(createError(404, 'No notifications found'));
        }

        res.status(200).json({
            message: 'Unread notifications fetched successfully',
            notifications,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};


/*
* PUT /notifications/user/:userID/mark-all-as-read
* Mark all notifications of a user as read
* All users
*/
export const markAllNotificationsAsRead = async (req, res) => {
    try {
        const { userID } = req.params;

        const notifications = await db.models.Notifications.update(
            { status: 'Read' },
            { where: { userID, status: 'Unread' } }
        );

        res.status(200).json({
            message: 'All notifications marked as read successfully',
            notifications,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* PUT /notifications/user/:userID/read/:notificationID
* Mark a notification of a user as read
* All users
*/
export const readNotification = async (req, res) => {
    try {
        const { userID, notificationID } = req.params;

        const notification = await db.models.Notifications.findOne({
            where: { userID, id: notificationID, status: 'Unread' },
        });

        if (!notification) {
            return next(createError(404, 'No notifications found'));
        }

        notification.status = 'Read';
        await notification.save();

        res.status(200).json({
            message: 'Notification marked as read successfully',
            notification,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* DELETE /notifications/user/:userID/delete/:notificationID
* Delete a notification of a user
* All users
*/
export const deleteUserNotification = async (req, res) => {
    try {
        const { userID, notificationID } = req.params;

        const notification = await db.models.Notifications.findOne({
            where: { userID, id: notificationID },
        });

        if (!notification) {
            return next(createError(404, 'No notifications found'));
        }

        await notification.destroy();

        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /notifications/user/:userID/unread/count
* Get the count of unread notifications of a user
* All users
*/
export const getUnreadUserNotificationsCount = async (req, res) => {
    try {
        const { userID } = req.params;

        const count = await db.models.Notifications.count({ where: { userID, status: 'Unread' } });

        res.status(200).json({
            message: 'Unread notifications count fetched successfully',
            count,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};