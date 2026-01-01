/**
 * Service Worker Registration
 */

export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('✓ Service Worker registered:', registration.scope)

                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New version available
                                showUpdateNotification()
                            }
                        })
                    })
                })
                .catch(error => {
                    console.error('✗ Service Worker registration failed:', error)
                })
        })
    }
}

function showUpdateNotification() {
    if (confirm('New version available! Reload to update?')) {
        window.location.reload()
    }
}

/**
 * Check if app is installed
 */
export function isAppInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true
}

/**
 * Show install prompt
 */
let deferredPrompt = null

export function setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        deferredPrompt = e

        // Show custom install button
        const installBtn = document.getElementById('install-btn')
        if (installBtn) {
            installBtn.style.display = 'block'
            installBtn.addEventListener('click', showInstallPrompt)
        }
    })

    window.addEventListener('appinstalled', () => {
        console.log('✓ App installed')
        deferredPrompt = null
    })
}

export async function showInstallPrompt() {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    console.log(`Install prompt: ${outcome}`)
    deferredPrompt = null
}
