import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'

// Mapbox access token - using public token for development
// For production, move to environment variable
mapboxgl.accessToken = 'pk.eyJ1IjoiYmhhcmF0YXRsYXMiLCJhIjoiY20zNXNxZWZkMDJuMTJrcHp5bGJjdHRyZiJ9.placeholder'

function Map() {
    const mapContainer = useRef(null)
    const map = useRef(null)

    useEffect(() => {
        if (map.current) return // Initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v11', // Neutral, minimal style
            center: [78.9629, 20.5937], // Geographic center of India
            zoom: 4, // Show entire country
            pitch: 0, // Flat view, no 3D tilt
            bearing: 0, // North-up orientation
            attributionControl: true,
            logoPosition: 'bottom-right'
        })

        // Disable rotation for stability
        map.current.dragRotate.disable()
        map.current.touchZoomRotate.disableRotation()

        // Clean up on unmount
        return () => {
            if (map.current) {
                map.current.remove()
            }
        }
    }, [])

    return (
        <div className="map-container">
            <div ref={mapContainer} className="map" />
        </div>
    )
}

export default Map
