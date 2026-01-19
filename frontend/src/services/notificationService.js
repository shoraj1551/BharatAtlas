/**
 * Notification Service
 * 
 * Frontend API client for notifications
 */

const API_BASE = '/api/v1/notifications'

const getHeaders = () => {
    const store = JSON.parse(localStorage.getItem('auth-storage') || '{}')
    const token = store.state?.token

    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
}

export async function getNotifications(unreadOnly = false, limit = 50) {
    const params = new URLSearchParams({ unreadOnly, limit })
    const response = await fetch(`${API_BASE}?${params}`, {
        headers: getHeaders()
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch notifications')
    }

    return data
}

export async function getUnreadCount() {
    const response = await fetch(`${API_BASE}/unread-count`, {
        headers: getHeaders()
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch unread count')
    }

    return data
}

export async function markAsRead(notificationId) {
    const response = await fetch(`${API_BASE}/${notificationId}/read`, {
        method: 'PUT',
        headers: getHeaders()
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to mark as read')
    }

    return data
}

export async function markAllAsRead() {
    const response = await fetch(`${API_BASE}/read-all`, {
        method: 'PUT',
        headers: getHeaders()
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to mark all as read')
    }

    return data
}

export async function deleteNotification(notificationId) {
    const response = await fetch(`${API_BASE}/${notificationId}`, {
        method: 'DELETE',
        headers: getHeaders()
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to delete notification')
    }

    return data
}
