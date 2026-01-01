/**
 * Service Worker for PWA
 * 
 * Handles caching and offline functionality
 */

const CACHE_NAME = 'bharatatlas-v1'
const STATIC_CACHE = 'bharatatlas-static-v1'
const API_CACHE = 'bharatatlas-api-v1'

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png'
]

// Install event
self.addEventListener('install', (event) => {
    console.log('[SW] Installing...')

    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('[SW] Caching static assets')
                return cache.addAll(STATIC_ASSETS)
            })
            .then(() => self.skipWaiting())
    )
})

// Activate event
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating...')

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(name => name !== CACHE_NAME && name !== STATIC_CACHE && name !== API_CACHE)
                        .map(name => caches.delete(name))
                )
            })
            .then(() => self.clients.claim())
    )
})

// Fetch event
self.addEventListener('fetch', (event) => {
    const { request } = event
    const url = new URL(request.url)

    // API requests - Network first, cache fallback
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const clonedResponse = response.clone()
                    caches.open(API_CACHE)
                        .then(cache => cache.put(request, clonedResponse))
                    return response
                })
                .catch(() => caches.match(request))
        )
        return
    }

    // Static assets - Cache first, network fallback
    event.respondWith(
        caches.match(request)
            .then(cached => {
                if (cached) {
                    return cached
                }

                return fetch(request)
                    .then(response => {
                        // Cache successful responses
                        if (response.status === 200) {
                            const clonedResponse = response.clone()
                            caches.open(CACHE_NAME)
                                .then(cache => cache.put(request, clonedResponse))
                        }
                        return response
                    })
            })
            .catch(() => {
                // Offline fallback
                if (request.destination === 'document') {
                    return caches.match('/index.html')
                }
            })
    )
})

// Background sync
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData())
    }
})

async function syncData() {
    console.log('[SW] Syncing data...')
    // Implement data sync logic
}
