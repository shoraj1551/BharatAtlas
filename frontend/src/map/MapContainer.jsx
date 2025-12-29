/**
 * MapContainer Component
 * 
 * Main map wrapper - handles map initialization only
 * Delegates layer management to AdminLayerManager
 */

import { useRef, useEffect, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import AdminLayerManager from './AdminLayerManager'
import { MAP_CONFIG } from './mapConfig'
import './MapView.css'

export default function MapContainer() {
    const mapRef = useRef(null)
    const containerRef = useRef(null)
    const [mapReady, setMapReady] = useState(false)

    useEffect(() => {
        if (mapRef.current) return // Already initialized

        console.log('🗺️  Initializing map...')

        // Create map instance
        const map = new maplibregl.Map({
            container: containerRef.current,
            style: MAP_CONFIG.style,
            center: MAP_CONFIG.center,
            zoom: MAP_CONFIG.zoom,
            minZoom: MAP_CONFIG.minZoom,
            maxZoom: MAP_CONFIG.maxZoom,
            maxBounds: MAP_CONFIG.maxBounds,
            maxBoundsViscosity: MAP_CONFIG.maxBoundsViscosity
        })

        mapRef.current = map

        // Add navigation controls
        map.addControl(new maplibregl.NavigationControl(), 'top-right')

        // Wait for map to load
        map.on('load', () => {
            console.log('✓ Map loaded')
            setMapReady(true)
        })

        // Error handler
        map.on('error', (e) => {
            console.error('Map error:', e)
        })

        // Cleanup
        return () => {
            if (mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null
            }
        }
    }, [])

    return (
        <div className="map-container">
            <div ref={containerRef} className="map" style={{ height: '100vh', width: '100%' }} />

            {/* Only render layer manager when map is ready */}
            {mapReady && mapRef.current && (
                <AdminLayerManager map={mapRef.current} />
            )}
        </div>
    )
}
