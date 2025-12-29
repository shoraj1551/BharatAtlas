/**
 * useMapLayers Hook - Map Layer Management
 * 
 * Handles adding, removing, and cleaning up map layers
 */

import { useCallback } from 'react'

export function useMapLayers(map) {
    const addLayer = useCallback((id, data, style, type = 'line') => {
        if (!map || !data) return

        // Remove existing layer and source
        if (map.getLayer(id)) map.removeLayer(id)
        if (map.getLayer(`${id}-fill`)) map.removeLayer(`${id}-fill`)
        if (map.getSource(id)) map.removeSource(id)

        // Add source
        map.addSource(id, {
            type: 'geojson',
            data
        })

        // Add layers based on type
        if (type === 'line' || type === 'polygon') {
            // Add fill layer for click detection
            map.addLayer({
                id: `${id}-fill`,
                type: 'fill',
                source: id,
                paint: {
                    'fill-color': style.fill?.color || 'transparent',
                    'fill-opacity': style.fill?.opacity || 0.05
                }
            })

            // Add line layer for boundaries
            map.addLayer({
                id,
                type: 'line',
                source: id,
                paint: {
                    'line-color': style.line.color,
                    'line-width': style.line.width,
                    'line-dasharray': style.line.dashArray || [1, 0],
                    'line-opacity': style.line.opacity || 1
                }
            })
        } else if (type === 'circle') {
            // Add circle layer for points
            map.addLayer({
                id,
                type: 'circle',
                source: id,
                paint: {
                    'circle-radius': style.circle.radius,
                    'circle-color': style.circle.color,
                    'circle-stroke-color': style.circle.strokeColor,
                    'circle-stroke-width': style.circle.strokeWidth,
                    'circle-opacity': style.circle.opacity
                }
            })
        }

        console.log(`✓ Added layer: ${id} (${type})`)
    }, [map])

    const removeLayer = useCallback((id) => {
        if (!map) return

        if (map.getLayer(id)) map.removeLayer(id)
        if (map.getLayer(`${id}-fill`)) map.removeLayer(`${id}-fill`)
        if (map.getSource(id)) map.removeSource(id)

        console.log(`✓ Removed layer: ${id}`)
    }, [map])

    const clearAllLayers = useCallback(() => {
        const layerIds = [
            'states',
            'districts',
            'tehsils',
            'thanas',
            'villages'
        ]

        layerIds.forEach(removeLayer)
        console.log('✓ Cleared all layers')
    }, [removeLayer])

    const addClickHandler = useCallback((layerId, handler) => {
        if (!map) return

        const fillLayerId = `${layerId}-fill`

        // Remove existing handlers
        map.off('click', fillLayerId)
        map.off('mouseenter', fillLayerId)
        map.off('mouseleave', fillLayerId)

        // Add click handler
        map.on('click', fillLayerId, handler)

        // Add cursor pointer on hover
        map.on('mouseenter', fillLayerId, () => {
            map.getCanvas().style.cursor = 'pointer'
        })

        map.on('mouseleave', fillLayerId, () => {
            map.getCanvas().style.cursor = ''
        })
    }, [map])

    return {
        addLayer,
        removeLayer,
        clearAllLayers,
        addClickHandler
    }
}
