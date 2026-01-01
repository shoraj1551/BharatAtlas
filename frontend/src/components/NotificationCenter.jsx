import { useState } from 'react'
import { useNotificationStore } from '../services/notificationService'
import './NotificationCenter.css'

/**
 * Notification Center Component
 * 
 * Displays user notifications
 */
function NotificationCenter() {
    const [isOpen, setIsOpen] = useState(false)
    const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotificationStore()

    const handleNotificationClick = (notification) => {
        if (!notification.read) {
            markAsRead(notification.id)
        }
    }

    const getNotificationIcon = (type) => {
        const icons = {
            data_update: '📊',
            bookmark_update: '⭐',
            comparison_alert: '⚖️',
            system: '⚙️',
            info: 'ℹ️'
        }
        return icons[type] || 'ℹ️'
    }

    const formatTime = (timestamp) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diff = now - date

        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        if (minutes < 1) return 'Just now'
        if (minutes < 60) return `${minutes}m ago`
        if (hours < 24) return `${hours}h ago`
        if (days < 7) return `${days}d ago`
        return date.toLocaleDateString()
    }

    return (
        <div className="notification-center">
            <button
                className="notification-bell"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Notifications"
            >
                🔔
                {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                )}
            </button>

            {isOpen && (
                <div className="notification-dropdown">
                    <div className="notification-header">
                        <h3>Notifications</h3>
                        {notifications.length > 0 && (
                            <div className="notification-actions">
                                <button onClick={markAllAsRead} className="action-btn">
                                    Mark all read
                                </button>
                                <button onClick={clearAll} className="action-btn">
                                    Clear all
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="notification-list">
                        {notifications.length === 0 ? (
                            <div className="notification-empty">
                                <p>No notifications</p>
                            </div>
                        ) : (
                            notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                                    onClick={() => handleNotificationClick(notification)}
                                >
                                    <div className="notification-icon">
                                        {notification.icon || getNotificationIcon(notification.type)}
                                    </div>
                                    <div className="notification-content">
                                        <div className="notification-title">{notification.title}</div>
                                        <div className="notification-message">{notification.message}</div>
                                        <div className="notification-time">{formatTime(notification.timestamp)}</div>
                                    </div>
                                    <button
                                        className="notification-delete"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            deleteNotification(notification.id)
                                        }}
                                        aria-label="Delete notification"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default NotificationCenter
