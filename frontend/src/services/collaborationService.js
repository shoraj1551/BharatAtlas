/**
 * Collaboration Service
 * 
 * Frontend API client for workspace collaboration
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

export async function shareWorkspace(workspaceId, email, role = 'viewer') {
    const response = await fetch(`${API_BASE}/workspaces/${workspaceId}/share`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, role })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to share workspace')
    }

    return data
}

export async function removeCollaborator(workspaceId, userId) {
    const response = await fetch(`${API_BASE}/workspaces/${workspaceId}/collaborators/${userId}`, {
        method: 'DELETE',
        headers: getHeaders()
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to remove collaborator')
    }

    return data
}

export async function updatePermissions(workspaceId, userId, role) {
    const response = await fetch(`${API_BASE}/workspaces/${workspaceId}/permissions`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ userId, role })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to update permissions')
    }

    return data
}

export async function getSharedWorkspaces() {
    const response = await fetch(`${API_BASE}/workspaces/shared-with-me`, {
        headers: getHeaders()
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch shared workspaces')
    }

    return data
}

export async function generateShareLink(workspaceId) {
    const response = await fetch(`${API_BASE}/workspaces/${workspaceId}/share-link`, {
        method: 'POST',
        headers: getHeaders()
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to generate share link')
    }

    return data
}

export async function getActivityLog(workspaceId) {
    const response = await fetch(`${API_BASE}/workspaces/${workspaceId}/activity`, {
        headers: getHeaders()
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch activity log')
    }

    return data
}
