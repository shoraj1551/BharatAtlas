/**
 * Network-Aware Loading
 * 
 * Adapts loading strategy based on connection speed
 */

class NetworkManager {
    constructor() {
        this.connection = null
        this.init()
    }

    init() {
        // Network Information API
        this.connection = navigator.connection ||
            navigator.mozConnection ||
            navigator.webkitConnection

        if (this.connection) {
            this.connection.addEventListener('change', this.handleConnectionChange.bind(this))
        }
    }

    getConnectionType() {
        if (!this.connection) return 'unknown'
        return this.connection.effectiveType || 'unknown'
    }

    getDownlinkSpeed() {
        if (!this.connection) return null
        return this.connection.downlink // Mbps
    }

    isSlow() {
        const type = this.getConnectionType()
        return type === 'slow-2g' || type === '2g'
    }

    isFast() {
        const type = this.getConnectionType()
        return type === '4g' || type === '5g'
    }

    handleConnectionChange() {
        console.log('[Network] Connection changed:', this.getConnectionType())
        this.onConnectionChange?.(this.getConnectionType())
    }

    /**
     * Get optimal image quality based on connection
     */
    getImageQuality() {
        if (this.isSlow()) return 'low'
        if (this.isFast()) return 'high'
        return 'medium'
    }

    /**
     * Should preload resources?
     */
    shouldPreload() {
        return !this.isSlow()
    }

    /**
     * Get chunk size for data loading
     */
    getChunkSize() {
        if (this.isSlow()) return 10
        if (this.isFast()) return 100
        return 50
    }

    /**
     * Adaptive fetch with retry
     */
    async adaptiveFetch(url, options = {}) {
        const maxRetries = this.isSlow() ? 1 : 3
        const timeout = this.isSlow() ? 10000 : 5000

        for (let i = 0; i < maxRetries; i++) {
            try {
                const controller = new AbortController()
                const timeoutId = setTimeout(() => controller.abort(), timeout)

                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal
                })

                clearTimeout(timeoutId)
                return response
            } catch (error) {
                if (i === maxRetries - 1) throw error
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
            }
        }
    }
}

const networkManager = new NetworkManager()

export default networkManager

export function getNetworkType() {
    return networkManager.getConnectionType()
}

export function isSlowConnection() {
    return networkManager.isSlow()
}

export function isFastConnection() {
    return networkManager.isFast()
}
