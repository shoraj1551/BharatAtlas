/**
 * Notification Service
 * 
 * Manages user notifications for data updates and alerts
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useNotificationStore = create(
    persist(
        (set, get) => ({
            // State
            notifications: [],
            unreadCount: 0,
            preferences: {
                dataUpdates: true,
                bookmarkUpdates: true,
                comparisonAlerts: false
            },

            // Actions
            addNotification: (notification) => {
                const newNotification = {
                    id: `notif_${Date.now()}`,
                    timestamp: new Date().toISOString(),
                    read: false,
                    ...notification
                }

                set(state => ({
                    notifications: [newNotification, ...state.notifications].slice(0, 50), // Keep last 50
                    unreadCount: state.unreadCount + 1
                }))
            },

            markAsRead: (notificationId) => {
                set(state => ({
                    notifications: state.notifications.map(n =>
                        n.id === notificationId ? { ...n, read: true } : n
                    ),
                    unreadCount: Math.max(0, state.unreadCount - 1)
                }))
            },

            markAllAsRead: () => {
                set(state => ({
                    notifications: state.notifications.map(n => ({ ...n, read: true })),
                    unreadCount: 0
                }))
            },

            deleteNotification: (notificationId) => {
                set(state => {
                    const notification = state.notifications.find(n => n.id === notificationId)
                    return {
                        notifications: state.notifications.filter(n => n.id !== notificationId),
                        unreadCount: notification && !notification.read
                            ? Math.max(0, state.unreadCount - 1)
                            : state.unreadCount
                    }
                })
            },

            clearAll: () => {
                set({ notifications: [], unreadCount: 0 })
            },

            updatePreferences: (newPreferences) => {
                set(state => ({
                    preferences: { ...state.preferences, ...newPreferences }
                }))
            }
        }),
        {
            name: 'bharatatlas-notifications'
        }
    )
)

/**
 * Notification types
 */
export const NotificationType = {
    DATA_UPDATE: 'data_update',
    BOOKMARK_UPDATE: 'bookmark_update',
    COMPARISON_ALERT: 'comparison_alert',
    SYSTEM: 'system',
    INFO: 'info'
}

/**
 * Create notification helpers
 */
export function notifyDataUpdate(placeName) {
    const { addNotification, preferences } = useNotificationStore.getState()

    if (preferences.dataUpdates) {
        addNotification({
            type: NotificationType.DATA_UPDATE,
            title: 'Data Updated',
            message: `New data available for ${placeName}`,
            icon: '📊'
        })
    }
}

export function notifyBookmarkUpdate(placeName) {
    const { addNotification, preferences } = useNotificationStore.getState()

    if (preferences.bookmarkUpdates) {
        addNotification({
            type: NotificationType.BOOKMARK_UPDATE,
            title: 'Bookmark Updated',
            message: `${placeName} has been updated`,
            icon: '⭐'
        })
    }
}

export function notifyInfo(title, message) {
    const { addNotification } = useNotificationStore.getState()

    addNotification({
        type: NotificationType.INFO,
        title,
        message,
        icon: 'ℹ️'
    })
}

export default {
    useNotificationStore,
    NotificationType,
    notifyDataUpdate,
    notifyBookmarkUpdate,
    notifyInfo
}
