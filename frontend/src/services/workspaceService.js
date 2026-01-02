/**
 * Workspace Service
 * 
 * Manages Entrepreneur Research Workspace data (Bookmarks, Insights, Comparisons).
 * Uses API backend endpoints.
 */

const API_BASE = '/api/workspace'

class WorkspaceService {

    // Get current visitor ID or create one
    getWorkspaceId() {
        let wid = localStorage.getItem('ba_workspace_id')
        if (!wid) {
            wid = 'guest_' + Math.random().toString(36).substr(2, 9)
            localStorage.setItem('ba_workspace_id', wid)
        }
        return wid
    }

    /**
     * Fetch full workspace data
     */
    async getWorkspace() {
        const id = this.getWorkspaceId()
        try {
            const res = await fetch(`${API_BASE}/${id}`)
            const data = await res.json()
            return data.success ? data.data : null
        } catch (err) {
            console.error("Workspace fetch error:", err)
            return null
        }
    }

    /**
     * Bookmark a place
     */
    async addBookmark(placeId, notes = '') {
        const id = this.getWorkspaceId()
        try {
            const res = await fetch(`${API_BASE}/${id}/bookmark`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ placeId, notes })
            })
            const data = await res.json()
            return data.success
        } catch (err) {
            console.error("Bookmark error:", err)
            return false
        }
    }

    /**
     * Remove a bookmark
     */
    async removeBookmark(placeId) {
        const id = this.getWorkspaceId()
        try {
            const res = await fetch(`${API_BASE}/${id}/bookmark/${placeId}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            return data.success
        } catch (err) {
            console.error("Remove bookmark error:", err)
            return false
        }
    }

    /**
     * Save an insight (AI Chat or Manual)
     */
    async saveInsight(type, title, content, sourcePlaceId) {
        const id = this.getWorkspaceId()
        try {
            const res = await fetch(`${API_BASE}/${id}/insight`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, title, content, sourcePlaceId })
            })
            const data = await res.json()
            return data.success
        } catch (err) {
            console.error("Save insight error:", err)
            return false
        }
    }

    /**
     * Save a comparison
     */
    async saveComparison(title, placeIds) {
        const id = this.getWorkspaceId()
        try {
            const res = await fetch(`${API_BASE}/${id}/comparison`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, placeIds })
            })
            const data = await res.json()
            return data.success
        } catch (err) {
            console.error("Save comparison error:", err)
            return false
        }
    }
}

export default new WorkspaceService()
