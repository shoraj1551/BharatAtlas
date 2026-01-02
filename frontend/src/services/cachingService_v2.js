const CACHE_KEY_PREFIX = 'bharat_atlas_place_';
const RECENT_PLACES_KEY = 'bharat_atlas_recent_places';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
const MAX_RECENT_PLACES = 10;

export const cachingService = {
    // Save place data to local storage
    cachePlaceData: (placeId, data) => {
        try {
            const cacheItem = {
                data,
                timestamp: Date.now()
            };
            localStorage.setItem(`${CACHE_KEY_PREFIX}${placeId}`, JSON.stringify(cacheItem));
            // Also update recent places
            cachingService.addToRecentPlaces(placeId, data.name || data.placeName, data.state);
        } catch (error) {
            console.warn('Failed to cache place data:', error);
            // Handle quota exceeded errors silently
        }
    },

    // Retrieve place data from local storage
    getCachedPlace: (placeId) => {
        try {
            const cached = localStorage.getItem(`${CACHE_KEY_PREFIX}${placeId}`);
            if (!cached) return null;

            const { data, timestamp } = JSON.parse(cached);

            // Check expiry
            if (Date.now() - timestamp > CACHE_EXPIRY) {
                localStorage.removeItem(`${CACHE_KEY_PREFIX}${placeId}`);
                return null;
            }

            return data;
        } catch (error) {
            console.warn('Failed to retrieve cached place:', error);
            return null;
        }
    },

    // Add to recent places list
    addToRecentPlaces: (id, name, state) => {
        try {
            let recent = cachingService.getRecentPlaces();
            // Remove if already exists
            recent = recent.filter(p => p.id !== id);
            // Add to front
            recent.unshift({ id, name, state, timestamp: Date.now() });
            // Limit size
            if (recent.length > MAX_RECENT_PLACES) {
                recent = recent.slice(0, MAX_RECENT_PLACES);
            }
            localStorage.setItem(RECENT_PLACES_KEY, JSON.stringify(recent));
        } catch (error) {
            console.warn('Failed to update recent places:', error);
        }
    },

    // Get list of recent places
    getRecentPlaces: () => {
        try {
            const stored = localStorage.getItem(RECENT_PLACES_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            return [];
        }
    },

    // Helper to check connection status
    isOnline: () => {
        return navigator.onLine;
    }
};
