// Recent Places Service
// Session-only memory for quick revisit (max 5 places)

const STORAGE_KEY = 'bharatatlas_recent_places'
const MAX_RECENT = 5

class RecentPlacesService {
    /**
     * Add a place to recent history
     * @param {Object} place - Place object
     */
    addPlace(place) {
        const recent = this.getRecentPlaces()

        // Remove if already exists (to move to front)
        const filtered = recent.filter(p => p.place_id !== place.place_id)

        // Add to front
        filtered.unshift({
            place_id: place.place_id,
            canonical_name: place.canonical_name,
            place_type: place.place_type,
            visited_at: new Date().toISOString()
        })

        // Keep only max 5
        const limited = filtered.slice(0, MAX_RECENT)

        // Save to sessionStorage
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(limited))
        } catch (error) {
            console.warn('Failed to save recent places:', error)
        }
    }

    /**
     * Get recent places
     * @returns {Array} Recent places (max 5)
     */
    getRecentPlaces() {
        try {
            const stored = sessionStorage.getItem(STORAGE_KEY)
            return stored ? JSON.parse(stored) : []
        } catch (error) {
            console.warn('Failed to load recent places:', error)
            return []
        }
    }

    /**
     * Clear recent places
     */
    clearRecentPlaces() {
        try {
            sessionStorage.removeItem(STORAGE_KEY)
        } catch (error) {
            console.warn('Failed to clear recent places:', error)
        }
    }
}

export default new RecentPlacesService()
