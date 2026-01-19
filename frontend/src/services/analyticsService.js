/**
 * Analytics Service
 * 
 * Frontend API client for analytics and dashboards
 */

const API_BASE = '/api/v1'

const getHeaders = () => {
    const store = JSON.parse(localStorage.getItem('auth-storage') || '{}')
    const token = store.state?.token

    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
}

// Analytics endpoints
export async function getTrends(metric, timeRange = '1y', filters = {}) {
    const params = new URLSearchParams({ metric, timeRange, ...filters })
    const response = await fetch(`${API_BASE}/analytics/trends?${params}`)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch trends')
    }

    return data
}

export async function getComparisons(placeIds, metrics) {
    const params = new URLSearchParams({
        placeIds: placeIds.join(','),
        ...(metrics && { metrics: metrics.join(',') })
    })

    const response = await fetch(`${API_BASE}/analytics/comparisons?${params}`)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch comparisons')
    }

    return data
}

export async function getInsights(placeId) {
    const response = await fetch(`${API_BASE}/analytics/insights/${placeId}`)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch insights')
    }

    return data
}

export async function getTopPlaces(metric, limit = 10, filters = {}) {
    const params = new URLSearchParams({ metric, limit, ...filters })
    const response = await fetch(`${API_BASE}/analytics/top-places?${params}`)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch top places')
    }

    return data
}

// Dashboard endpoints
export async function getDashboards() {
    const response = await fetch(`${API_BASE}/dashboards`, {
        headers: getHeaders()
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch dashboards')
    }

    return data
}

export async function getDashboard(id) {
    const response = await fetch(`${API_BASE}/dashboards/${id}`, {
        headers: getHeaders()
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch dashboard')
    }

    return data
}

export async function createDashboard(dashboardData) {
    const response = await fetch(`${API_BASE}/dashboards`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(dashboardData)
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to create dashboard')
    }

    return data
}

export async function updateDashboard(id, dashboardData) {
    const response = await fetch(`${API_BASE}/dashboards/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(dashboardData)
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to update dashboard')
    }

    return data
}

export async function deleteDashboard(id) {
    const response = await fetch(`${API_BASE}/dashboards/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to delete dashboard')
    }

    return data
}
