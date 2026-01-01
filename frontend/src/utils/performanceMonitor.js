/**
 * Performance Monitoring
 * 
 * Tracks Core Web Vitals and custom metrics
 */

import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'

class PerformanceMonitor {
    constructor() {
        this.metrics = {}
        this.init()
    }

    init() {
        // Track Core Web Vitals
        onCLS(this.handleMetric.bind(this))
        onINP(this.handleMetric.bind(this)) // Updated from onFID
        onFCP(this.handleMetric.bind(this))
        onLCP(this.handleMetric.bind(this))
        onTTFB(this.handleMetric.bind(this))

        // Track custom metrics
        this.trackCustomMetrics()
    }

    handleMetric(metric) {
        this.metrics[metric.name] = {
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta
        }

        console.log(`[Performance] ${metric.name}:`, {
            value: `${metric.value.toFixed(2)}ms`,
            rating: metric.rating
        })

        // Send to analytics (optional)
        this.sendToAnalytics(metric)
    }

    trackCustomMetrics() {
        // Map load time
        this.trackMapLoadTime()

        // Bundle size
        this.trackBundleSize()

        // API response times
        this.trackAPIPerformance()
    }

    trackMapLoadTime() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name.includes('map')) {
                    console.log(`[Performance] Map Load: ${entry.duration.toFixed(2)}ms`)
                }
            }
        })
        observer.observe({ entryTypes: ['measure'] })
    }

    trackBundleSize() {
        if ('performance' in window && 'getEntriesByType' in performance) {
            const resources = performance.getEntriesByType('resource')
            const jsResources = resources.filter(r => r.name.endsWith('.js'))

            const totalSize = jsResources.reduce((sum, r) => sum + (r.transferSize || 0), 0)
            console.log(`[Performance] Total JS: ${(totalSize / 1024).toFixed(2)}KB`)
        }
    }

    trackAPIPerformance() {
        const originalFetch = window.fetch
        window.fetch = async (...args) => {
            const start = performance.now()
            const response = await originalFetch(...args)
            const duration = performance.now() - start

            if (args[0].includes('/api/')) {
                console.log(`[Performance] API ${args[0]}: ${duration.toFixed(2)}ms`)
            }

            return response
        }
    }

    sendToAnalytics(metric) {
        // Implement analytics sending
        // Example: Google Analytics, custom endpoint
    }

    getMetrics() {
        return this.metrics
    }

    getReport() {
        return {
            vitals: this.metrics,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        }
    }
}

// Create singleton
const performanceMonitor = new PerformanceMonitor()

export default performanceMonitor

export function getPerformanceReport() {
    return performanceMonitor.getReport()
}
