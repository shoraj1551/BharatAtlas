// Performance Telemetry
// Minimal local performance monitoring for development

/**
 * Performance timer for measuring execution time
 */
class PerformanceTimer {
    constructor() {
        this.timers = new Map()
    }

    /**
     * Start a timer
     * @param {string} label - Timer label
     */
    start(label) {
        this.timers.set(label, performance.now())
    }

    /**
     * End a timer and log duration
     * @param {string} label - Timer label
     * @param {number} threshold - Warn if duration exceeds threshold (ms)
     */
    end(label, threshold = 1000) {
        const startTime = this.timers.get(label)
        if (!startTime) {
            console.warn(`[PERF] Timer "${label}" was not started`)
            return
        }

        const duration = performance.now() - startTime
        this.timers.delete(label)

        // Log in development only
        if (import.meta.env.DEV) {
            const emoji = duration > threshold ? '🐌' : '⚡'
            const level = duration > threshold ? 'warn' : 'log'
            console[level](`[PERF] ${emoji} ${label}: ${duration.toFixed(2)}ms`)
        }

        return duration
    }

    /**
     * Measure async function execution
     * @param {string} label - Timer label
     * @param {Function} fn - Async function to measure
     * @returns {Promise} Function result
     */
    async measure(label, fn) {
        this.start(label)
        try {
            const result = await fn()
            this.end(label)
            return result
        } catch (error) {
            this.end(label)
            throw error
        }
    }
}

export const perf = new PerformanceTimer()

/**
 * React hook for measuring component render time
 * @param {string} componentName - Component name
 */
export function usePerformanceLog(componentName) {
    if (import.meta.env.DEV) {
        const renderStart = performance.now()

        // Log on mount
        console.log(`[PERF] 🎨 ${componentName} rendering...`)

        // Log on unmount
        return () => {
            const renderDuration = performance.now() - renderStart
            console.log(`[PERF] ✅ ${componentName} rendered in ${renderDuration.toFixed(2)}ms`)
        }
    }

    return () => { }
}

export default perf
