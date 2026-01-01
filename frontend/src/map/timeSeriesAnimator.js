/**
 * Time Series Animation for Map
 * 
 * Animates historical data over time
 */

export class TimeSeriesAnimator {
    constructor(map, data, options = {}) {
        this.map = map
        this.data = data // Array of { year, features }
        this.currentIndex = 0
        this.isPlaying = false
        this.speed = options.speed || 1000 // ms per frame
        this.onYearChange = options.onYearChange || (() => { })
    }

    /**
     * Play animation
     */
    play() {
        if (this.isPlaying) return

        this.isPlaying = true
        this.animate()
    }

    /**
     * Pause animation
     */
    pause() {
        this.isPlaying = false
        if (this.animationFrame) {
            clearTimeout(this.animationFrame)
        }
    }

    /**
     * Go to specific year
     */
    goToYear(year) {
        const index = this.data.findIndex(d => d.year === year)
        if (index !== -1) {
            this.currentIndex = index
            this.updateMap()
        }
    }

    /**
     * Animation loop
     */
    animate() {
        if (!this.isPlaying) return

        this.updateMap()
        this.currentIndex = (this.currentIndex + 1) % this.data.length

        this.animationFrame = setTimeout(() => {
            this.animate()
        }, this.speed)
    }

    /**
     * Update map with current data
     */
    updateMap() {
        const currentData = this.data[this.currentIndex]

        if (this.map.getSource('time-series')) {
            this.map.getSource('time-series').setData(currentData.features)
        } else {
            this.map.addSource('time-series', {
                type: 'geojson',
                data: currentData.features
            })

            // Add visualization layer
            this.map.addLayer({
                id: 'time-series-layer',
                type: 'fill',
                source: 'time-series',
                paint: {
                    'fill-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'value'],
                        0, '#f0f9ff',
                        50, '#0ea5e9',
                        100, '#0c4a6e'
                    ],
                    'fill-opacity': 0.7
                }
            })
        }

        this.onYearChange(currentData.year)
    }

    /**
     * Set animation speed
     */
    setSpeed(speed) {
        this.speed = speed
    }

    /**
     * Clean up
     */
    destroy() {
        this.pause()
        if (this.map.getLayer('time-series-layer')) {
            this.map.removeLayer('time-series-layer')
        }
        if (this.map.getSource('time-series')) {
            this.map.removeSource('time-series')
        }
    }
}

/**
 * Generate sample time series data (for demo)
 */
export function generateSampleTimeSeriesData(baseFeatures, startYear, endYear) {
    const data = []

    for (let year = startYear; year <= endYear; year++) {
        const features = {
            type: 'FeatureCollection',
            features: baseFeatures.features.map(feature => ({
                ...feature,
                properties: {
                    ...feature.properties,
                    value: Math.random() * 100, // Random value for demo
                    year
                }
            }))
        }

        data.push({ year, features })
    }

    return data
}
