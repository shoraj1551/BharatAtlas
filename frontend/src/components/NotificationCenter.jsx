import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getNotifications, getUnreadCount, markAsRead, markAllAsRead, deleteNotification } from '../services/notificationService'
import useAuthStore from '../store/authStore'
import './NotificationCenter.css'

export default function NotificationCenter() {
    const { isAuthenticated } = useAuthStore()
    const [isOpen, setIsOpen] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isAuthenticated) {
            fetchUnreadCount()
            // Poll for new notifications every 30 seconds
            const interval = setInterval(fetchUnreadCount, 30000)
            return () => clearInterval(interval)
        }
    }, [isAuthenticated])

    const fetchUnreadCount = async () => {
        try {
            const data = await getUnreadCount()
            setUnreadCount(data.count)
        } catch (error) {
            console.error('Error fetching unread count:', error)
        }
    }

    const fetchNotifications = async () => {
        setLoading(true)
        try {
            const data = await getNotifications(false, 20)
            setNotifications(data.data)
        } catch (error) {
            console.error('Error fetching notifications:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleOpen = () => {
        setIsOpen(!isOpen)
        if (!isOpen) {
            fetchNotifications()
        }
    }

    const handleMarkAsRead = async (id) => {
        try {
            await markAsRead(id)
            setNotifications(notifications.map(n =>
                n._id === id ? { ...n, read: true } : n
            ))
            setUnreadCount(Math.max(0, unreadCount - 1))
        } catch (error) {
            console.error('Error marking as read:', error)
        }
    }

    const handleMarkAllAsRead = async () => {
        try {
            await markAllAsRead()
            setNotifications(notifications.map(n => ({ ...n, read: true })))
            setUnreadCount(0)
        } catch (error) {
            console.error('Error marking all as read:', error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteNotification(id)
            setNotifications(notifications.filter(n => n._id !== id))
            fetchUnreadCount()
        } catch (error) {
            console.error('Error deleting notification:', error)
        }
    }

    if (!isAuthenticated) return null

    return (
        <div className="notification-center">
            <button className="notification-bell" onClick={handleOpen}>
                🔔
                {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
                )}
            </button>

            {isOpen && (
                <div className="notification-dropdown">
                    <div className="notification-header">
                        <h3>Notifications</h3>
                        {unreadCount > 0 && (
                            <button onClick={handleMarkAllAsRead} className="mark-all-read">
                                Mark all read
                            </button>
                        )}
                    </div>

                    <div className="notification-list">
                        {loading ? (
                            <div className="notification-loading">Loading...</div>
                        ) : notifications.length === 0 ? (
                            <div className="notification-empty">No notifications</div>
                        ) : (
                            notifications.map(notification => (
                                <NotificationItem
                                    key={notification._id}
                                    notification={notification}
                                    onMarkAsRead={handleMarkAsRead}
                                    onDelete={handleDelete}
                                />
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

function NotificationItem({ notification, onMarkAsRead, onDelete }) {
    const getIcon = (type) => {
        switch (type) {
            case 'workspace_invite': return '🤝'
            case 'data_update': return '📊'
            case 'new_feature': return '✨'
            case 'collaboration': return '👥'
            default: return '🔔'
        }
    }

    const handleClick = () => {
        if (!notification.read) {
            onMarkAsRead(notification._id)
        }
    }

    return (
        <div className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
            <div className="notification-icon">{getIcon(notification.type)}</div>
            <div className="notification-content" onClick={handleClick}>
                {notification.link ? (
                    <Link to={notification.link} className="notification-link">
                        <strong>{notification.title}</strong>
                        <p>{notification.message}</p>
                    </Link>
                ) : (
                    <>
                        <strong>{notification.title}</strong>
                        <p>{notification.message}</p>
                    </>
                )}
                <span className="notification-time">
                    {new Date(notification.created_at).toLocaleDateString()}
                </span>
            </div>
            <button
                className="notification-delete"
                onClick={() => onDelete(notification._id)}
                title="Delete"
            >
                ×
            </button>
        </div>
    )
}
