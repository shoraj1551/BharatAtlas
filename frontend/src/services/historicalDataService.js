/**
 * Historical Data Service
 * 
 * Frontend API client for historical census data
 */

const API_BASE = '/api/v1/historical'

const getHeaders = () => {
    const store = JSON.parse(localStorage.getItem('auth-storage') || '{}')
    const token = store.state?.token

    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
}

export async function getHistoricalData(placeId) {
    const response = await fetch(`${API_BASE}/${placeId}`)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch historical data')
    }

    return data
}

export async function getMetricHistory(placeId, metric) {
    const response = await fetch(`${API_BASE}/${placeId}/${metric}`)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch metric history')
    }

    return data
}

export async function getAvailableYears(placeId) {
    const response = await fetch(`${API_BASE}/${placeId}/meta/years`)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch available years')
    }

    return data
}

export async function getAvailableMetrics(placeId) {
    const response = await fetch(`${API_BASE}/${placeId}/meta/metrics`)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch available metrics')
    }

    return data
}
