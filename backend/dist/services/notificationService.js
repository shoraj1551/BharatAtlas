import Notification from '../../models/Notification.js';
import { createLogger } from '../utils/logger.js';
const logger = createLogger('NotificationService');
/**
 * Create a new notification
 */
export async function createNotification(userId, type, title, message, link = null) {
    try {
        const notification = await Notification.create({
            user_id: userId,
            type,
            title,
            message,
            link
        });
        logger.info(`Notification created for user ${userId}: ${title}`);
        return notification;
    }
    catch (error) {
        logger.error('Error creating notification:', error);
        throw error;
    }
}
/**
 * Get user notifications
 */
export async function getUserNotifications(userId, unreadOnly = false, limit = 50) {
    try {
        const query = { user_id: userId };
        if (unreadOnly) {
            query.read = false;
        }
        const notifications = await Notification.find(query)
            .sort({ created_at: -1 })
            .limit(limit)
            .lean();
        return notifications;
    }
    catch (error) {
        logger.error('Error getting notifications:', error);
        throw error;
    }
}
/**
 * Mark notification as read
 */
export async function markAsRead(notificationId, userId) {
    try {
        const notification = await Notification.findOneAndUpdate({ _id: notificationId, user_id: userId }, { read: true }, { new: true });
        if (!notification) {
            throw new Error('Notification not found');
        }
        return notification;
    }
    catch (error) {
        logger.error('Error marking notification as read:', error);
        throw error;
    }
}
/**
 * Mark all notifications as read
 */
export async function markAllAsRead(userId) {
    try {
        const result = await Notification.updateMany({ user_id: userId, read: false }, { read: true });
        logger.info(`Marked ${result.modifiedCount} notifications as read for user ${userId}`);
        return result;
    }
    catch (error) {
        logger.error('Error marking all as read:', error);
        throw error;
    }
}
/**
 * Delete notification
 */
export async function deleteNotification(notificationId, userId) {
    try {
        const notification = await Notification.findOneAndDelete({
            _id: notificationId,
            user_id: userId
        });
        if (!notification) {
            throw new Error('Notification not found');
        }
        return notification;
    }
    catch (error) {
        logger.error('Error deleting notification:', error);
        throw error;
    }
}
/**
 * Get unread count
 */
export async function getUnreadCount(userId) {
    try {
        const count = await Notification.countDocuments({
            user_id: userId,
            read: false
        });
        return count;
    }
    catch (error) {
        logger.error('Error getting unread count:', error);
        throw error;
    }
}
/**
 * Notify user of workspace invite
 */
export async function notifyWorkspaceInvite(userId, workspaceName, inviterName) {
    return createNotification(userId, 'workspace_invite', 'Workspace Invitation', `${inviterName} invited you to collaborate on "${workspaceName}"`, '/workspace');
}
/**
 * Notify user of data update
 */
export async function notifyDataUpdate(userId, placeName) {
    return createNotification(userId, 'data_update', 'Data Updated', `New data available for ${placeName}`, `/place/${placeName}`);
}
//# sourceMappingURL=notificationService.js.map