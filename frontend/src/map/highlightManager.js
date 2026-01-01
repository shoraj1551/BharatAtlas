/**
 * Highlight Manager
 * 
 * Manages boundary highlighting for selected features
 * - Highlights selected boundaries with thick borders
 * - Different colors for different levels
 * - Smooth transitions
 * - Hover effects
 */

export class HighlightManager {
    constructor(map) {
        this.map = map
        this.currentHighlight = null
        this.init()
    }

    init() {
        // Add source for highlighted feature
        if (!this.map.getSource('highlighted-feature')) {
            this.map.addSource('highlighted-feature', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                }
            })
        }

        // Add highlight layer (thick border)
        if (!this.map.getLayer('highlight-border')) {
            this.map.addLayer({
                id: 'highlight-border',
                type: 'line',
                source: 'highlighted-feature',
                paint: {
                    'line-color': '#FF6B35',
                    'line-width': 4,
                    'line-opacity': 1
                }
            })
        }

        // Add highlight fill (semi-transparent)
        if (!this.map.getLayer('highlight-fill')) {
            this.map.addLayer({
                id: 'highlight-fill',
                type: 'fill',
                source: 'highlighted-feature',
                paint: {
                    'fill-color': '#FF6B35',
                    'fill-opacity': 0.1
                }
            }, 'highlight-border') // Place below border
        }
    }

    /**
     * Highlight a feature
     */
    highlightFeature(feature, level) {
        if (!feature || !feature.geometry) {
            this.clearHighlight()
            return
        }

        const color = this.getColorForLevel(level)

        // Update source
        this.map.getSource('highlighted-feature').setData({
            type: 'FeatureCollection',
            features: [feature]
        })

        // Update colors
        this.map.setPaintProperty('highlight-border', 'line-color', color)
        this.map.setPaintProperty('highlight-fill', 'fill-color', color)

        this.currentHighlight = { feature, level }

        console.log(`✨ Highlighted ${level} boundary`)
    }

    /**
     * Clear highlight
     */
    clearHighlight() {
        if (this.map.getSource('highlighted-feature')) {
            this.map.getSource('highlighted-feature').setData({
                type: 'FeatureCollection',
                features: []
            })
        }
        this.currentHighlight = null
    }

    /**
     * Get color for administrative level
     */
    getColorForLevel(level) {
        const colors = {
            state: '#FF6B35',      // Orange-red
            district: '#4ECDC4',   // Teal
            tehsil: '#95E1D3',     // Light teal
            thana: '#F38181',      // Pink
            village: '#AA96DA'     // Purple
        }
        return colors[level] || '#FF6B35'
    }

    /**
     * Add hover effect to a layer
     */
    addHoverEffect(layerId) {
        let hoveredFeatureId = null

        // Mouse enter
        this.map.on('mouseenter', layerId, (e) => {
            this.map.getCanvas().style.cursor = 'pointer'

            if (e.features.length > 0) {
                if (hoveredFeatureId !== null) {
                    this.map.setFeatureState(
                        { source: layerId, id: hoveredFeatureId },
                        { hover: false }
                    )
                }
                hoveredFeatureId = e.features[0].id
                this.map.setFeatureState(
                    { source: layerId, id: hoveredFeatureId },
                    { hover: true }
                )
            }
        })

        // Mouse leave
        this.map.on('mouseleave', layerId, () => {
            this.map.getCanvas().style.cursor = ''

            if (hoveredFeatureId !== null) {
                this.map.setFeatureState(
                    { source: layerId, id: hoveredFeatureId },
                    { hover: false }
                )
            }
            hoveredFeatureId = null
        })
    }

    /**
     * Cleanup
     */
    destroy() {
        this.clearHighlight()
        if (this.map.getLayer('highlight-border')) {
            this.map.removeLayer('highlight-border')
        }
        if (this.map.getLayer('highlight-fill')) {
            this.map.removeLayer('highlight-fill')
        }
        if (this.map.getSource('highlighted-feature')) {
            this.map.removeSource('highlighted-feature')
        }
    }
}

export default HighlightManager
