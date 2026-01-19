/**
 * API Key Service
 * 
 * Manage API keys for developer access
 */

const API_BASE = '/api/v1/keys'

export async function listApiKeys() {
    const response = await fetch(API_BASE)
    if (!response.ok) throw new Error('Failed to list API keys')
    return response.json()
}

export async function generateApiKey(name, permissions = ['read:places']) {
    const response = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, permissions })
    })
    if (!response.ok) throw new Error('Failed to generate API key')
    return response.json()
}

export async function revokeApiKey(id) {
    const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to revoke API key')
    return response.json()
}
