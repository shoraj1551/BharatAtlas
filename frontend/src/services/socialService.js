/**
 * Social Service
 * 
 * Frontend API client for reviews and discussions
 */

const API_BASE = '/api/v1/community'

const getHeaders = () => {
    const store = JSON.parse(localStorage.getItem('auth-storage') || '{}')
    const token = store.state?.token

    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
}

// --- Reviews ---

export async function getReviews(placeId, page = 1, sort = 'newest') {
    const params = new URLSearchParams({ page, sort })
    const response = await fetch(`${API_BASE}/reviews/${placeId}?${params}`)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch reviews')
    }

    return data
}

export async function createReview(reviewData) {
    const response = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(reviewData)
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Failed to create review')
    }

    return data
}

export async function toggleHelpful(reviewId) {
    const response = await fetch(`${API_BASE}/reviews/${reviewId}/helpful`, {
        method: 'PUT',
        headers: getHeaders()
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to toggle helpful')
    }

    return data
}

export async function deleteReview(reviewId) {
    const response = await fetch(`${API_BASE}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: getHeaders()
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to delete review')
    }

    return data
}

// --- Discussions ---

export async function getDiscussions(placeId, page = 1) {
    const params = new URLSearchParams({ page })
    const response = await fetch(`${API_BASE}/discussions/${placeId}?${params}`)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch discussions')
    }

    return data
}

export async function createDiscussion(discussionData) {
    const response = await fetch(`${API_BASE}/discussions`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(discussionData)
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Failed to create discussion')
    }

    return data
}

export async function replyToDiscussion(discussionId, content) {
    const response = await fetch(`${API_BASE}/discussions/${discussionId}/reply`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ content })
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to reply to discussion')
    }

    return data
}

export async function deleteDiscussion(discussionId) {
    const response = await fetch(`${API_BASE}/discussions/${discussionId}`, {
        method: 'DELETE',
        headers: getHeaders()
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to delete discussion')
    }

    return data
}
