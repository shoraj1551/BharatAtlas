/**
 * Auth Service
 * 
 * API calls for authentication
 */

const API_BASE = '/api/v1/auth'

const getHeaders = () => {
    const store = JSON.parse(localStorage.getItem('auth-storage') || '{}')
    const token = store.state?.token

    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
}

export async function login(email, password) {
    const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Login failed')
    }

    return data
}

export async function register(name, email, password) {
    const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
    }

    return data
}

export async function getProfile() {
    const response = await fetch(`${API_BASE}/profile`, {
        headers: getHeaders()
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch profile')
    }

    return data
}

export async function updateProfile(userData) {
    const response = await fetch(`${API_BASE}/profile`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(userData)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
    }

    return data
}
