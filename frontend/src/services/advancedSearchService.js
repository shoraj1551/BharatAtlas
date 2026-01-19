/**
 * Advanced Search Service
 * 
 * API calls for advanced search functionality
 */

const API_BASE = '/api/v1'  // Use Vite proxy

export async function advancedSearch(searchParams) {
    const { query, filters, sort, page = 1, limit = 20 } = searchParams

    const response = await fetch(`${API_BASE}/search/advanced`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            filters,
            sort,
            limit,
            offset: (page - 1) * limit
        })
    })

    if (!response.ok) {
        throw new Error('Search failed')
    }

    return response.json()
}

export async function rebuildSearchIndex() {
    const response = await fetch(`${API_BASE}/search/rebuild-index`, {
        method: 'POST'
    })

    if (!response.ok) {
        throw new Error('Index rebuild failed')
    }

    return response.json()
}
