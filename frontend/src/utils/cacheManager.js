/**
 * Cache Manager
 * 
 * Manages caching for GeoJSON and API responses
 */

const CACHE_VERSION = 'v1'
const CACHE_NAMES = {
    GEOJSON: `geojson-${CACHE_VERSION}`,
    API: `api-${CACHE_VERSION}`,
    STATIC: `static-${CACHE_VERSION}`
}

const CACHE_EXPIRY = {
    GEOJSON: 7 * 24 * 60 * 60 * 1000, // 7 days
    API: 24 * 60 * 60 * 1000, // 1 day
    STATIC: 30 * 24 * 60 * 60 * 1000 // 30 days
}

/**
 * IndexedDB for large GeoJSON files
 */
class IndexedDBCache {
    constructor() {
        this.dbName = 'BharatAtlasCache'
        this.version = 1
        this.db = null
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version)

            request.onerror = () => reject(request.error)
            request.onsuccess = () => {
                this.db = request.result
                resolve(this.db)
            }

            request.onupgradeneeded = (event) => {
                const db = event.target.result

                if (!db.objectStoreNames.contains('geojson')) {
                    const store = db.createObjectStore('geojson', { keyPath: 'key' })
                    store.createIndex('timestamp', 'timestamp', { unique: false })
                }
            }
        })
    }

    async get(key) {
        if (!this.db) await this.init()

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['geojson'], 'readonly')
            const store = transaction.objectStore('geojson')
            const request = store.get(key)

            request.onsuccess = () => {
                const result = request.result

                if (!result) {
                    resolve(null)
                    return
                }

                // Check expiry
                const age = Date.now() - result.timestamp
                if (age > CACHE_EXPIRY.GEOJSON) {
                    this.delete(key)
                    resolve(null)
                    return
                }

                resolve(result.data)
            }
            request.onerror = () => reject(request.error)
        })
    }

    async set(key, data) {
        if (!this.db) await this.init()

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['geojson'], 'readwrite')
            const store = transaction.objectStore('geojson')
            const request = store.put({
                key,
                data,
                timestamp: Date.now()
            })

            request.onsuccess = () => resolve()
            request.onerror = () => reject(request.error)
        })
    }

    async delete(key) {
        if (!this.db) await this.init()

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['geojson'], 'readwrite')
            const store = transaction.objectStore('geojson')
            const request = store.delete(key)

            request.onsuccess = () => resolve()
            request.onerror = () => reject(request.error)
        })
    }

    async clear() {
        if (!this.db) await this.init()

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['geojson'], 'readwrite')
            const store = transaction.objectStore('geojson')
            const request = store.clear()

            request.onsuccess = () => resolve()
            request.onerror = () => reject(request.error)
        })
    }
}

const idbCache = new IndexedDBCache()

/**
 * Fetch with cache
 */
export async function fetchWithCache(url, options = {}) {
    const cacheKey = url

    // Try IndexedDB first for GeoJSON
    if (url.includes('.geojson')) {
        const cached = await idbCache.get(cacheKey)
        if (cached) {
            console.log(`✓ Cache hit (IndexedDB): ${url}`)
            return cached
        }
    }

    // Fetch from network
    console.log(`⟳ Fetching: ${url}`)
    const response = await fetch(url, options)
    const data = await response.json()

    // Cache GeoJSON in IndexedDB
    if (url.includes('.geojson')) {
        await idbCache.set(cacheKey, data)
        console.log(`✓ Cached (IndexedDB): ${url}`)
    }

    return data
}

/**
 * Clear all caches
 */
export async function clearAllCaches() {
    await idbCache.clear()

    if ('caches' in window) {
        const cacheNames = await caches.keys()
        await Promise.all(
            cacheNames.map(name => caches.delete(name))
        )
    }

    console.log('✓ All caches cleared')
}

/**
 * Get cache size
 */
export async function getCacheSize() {
    let size = 0

    if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate()
        size = estimate.usage || 0
    }

    return {
        bytes: size,
        mb: (size / (1024 * 1024)).toFixed(2)
    }
}

export default idbCache
