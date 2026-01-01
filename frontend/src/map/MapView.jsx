/**
 * Enhanced MapView Component with Place Zoom
 * 
 * Features:
 * - URL parameter support (?place=place_id)
 * - Auto-zoom to selected place
 * - State and district boundary rendering
 */

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import * as turf from '@turf/turf'

import { MAP_CONFIG } from './mapConfig'
import { loadStatesGeoJSON } from '../data/geoLoader'
import { addBoundaryLayer, addFillLayer } from './mapLayers'
import { ADMIN_STYLES } from './mapStyles'
import { zoomToFeature, zoomToCoordinates } from './mapUtils'
import placeService from '../services/placeService'
import MapLoadingOverlay from '../components/MapLoadingOverlay'
import './MapView.css'

export default function MapView() {
    const mapRef = useRef(null)
    const mapContainer = useRef(null)
    const [isLoading, setIsLoading] = useState(true)
    const [loadingMessage, setLoadingMessage] = useState('Initializing map...')
    const [searchParams] = useSearchParams()
    const placeIdParam = searchParams.get('place')

    useEffect(() => {
        if (mapRef.current) return // Initialize only once

        // Create map instance
        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: MAP_CONFIG.style,
            center: MAP_CONFIG.center,
            zoom: MAP_CONFIG.zoom,
            minZoom: MAP_CONFIG.minZoom,
            maxZoom: MAP_CONFIG.maxZoom,
            maxBounds: MAP_CONFIG.maxBounds,
            maxBoundsViscosity: MAP_CONFIG.maxBoundsViscosity
        })

        mapRef.current = map

        map.on('load', async () => {
            try {
                setLoadingMessage('Loading state boundaries...')

                // Load and add state boundaries
                const statesGeoJSON = await loadStatesGeoJSON()

                map.addSource('states', {
                    type: 'geojson',
                    data: statesGeoJSON
                })

                // Add state fill layer
                addFillLayer(map, 'states-fill', 'states', ADMIN_STYLES.state.fill)

                // Add state boundary layer
                addBoundaryLayer(map, 'states-boundary', 'states', ADMIN_STYLES.state.line)

                setIsLoading(false)
                setLoadingMessage('')

                // If place parameter exists, zoom to it
                if (placeIdParam) {
                    await zoomToPlace(map, placeIdParam, statesGeoJSON)
                }

            } catch (error) {
                console.error('Error loading map:', error)
                setIsLoading(false)
                setLoadingMessage('Error loading map data')
            }
        })

        // Cleanup
        return () => {
            if (mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null
            }
        }
    }, [])

    // Handle place parameter changes
    useEffect(() => {
        if (mapRef.current && placeIdParam && !isLoading) {
            loadStatesGeoJSON().then(statesGeoJSON => {
                zoomToPlace(mapRef.current, placeIdParam, statesGeoJSON)
            })
        }
    }, [placeIdParam, isLoading])

    /**
     * Zoom map to a specific place
     */
    async function zoomToPlace(map, placeId, statesGeoJSON) {
        try {
            setLoadingMessage(`Zooming to place...`)

            // Get place data
            const place = await placeService.getPlaceById(placeId)

            if (!place) {
                console.error('Place not found:', placeId)
                return
            }

            // Find matching feature in GeoJSON
            const feature = statesGeoJSON.features.find(f =>
                f.properties.place_id === placeId ||
                f.properties.name === place.canonical_name ||
                f.properties.ST_NM === place.canonical_name
            )

            if (feature) {
                // Zoom to feature boundary
                zoomToFeature(map, feature, {
                    padding: 50,
                    duration: 1500,
                    maxZoom: place.place_type === 'state' ? 7 : 10
                })

                // Highlight the feature
                highlightFeature(map, feature)
            } else if (place.latitude && place.longitude) {
                // Fallback: zoom to coordinates
                zoomToCoordinates(map, [place.longitude, place.latitude],
                    place.place_type === 'state' ? 7 : 10
                )
            }

            setLoadingMessage('')
        } catch (error) {
            console.error('Error zooming to place:', error)
            setLoadingMessage('')
        }
    }

    /**
     * Highlight a feature on the map
     */
    function highlightFeature(map, feature) {
        // Remove existing highlight
        if (map.getLayer('highlight-fill')) {
            map.removeLayer('highlight-fill')
        }
        if (map.getLayer('highlight-boundary')) {
            map.removeLayer('highlight-boundary')
        }
        if (map.getSource('highlight')) {
            map.removeSource('highlight')
        }

        // Add highlight source
        map.addSource('highlight', {
            type: 'geojson',
            data: feature
        })

        // Add highlight fill
        map.addLayer({
            id: 'highlight-fill',
            type: 'fill',
            source: 'highlight',
            paint: {
                'fill-color': '#fbbf24',
                'fill-opacity': 0.2
            }
        })

        // Add highlight boundary
        map.addLayer({
            id: 'highlight-boundary',
            type: 'line',
            source: 'highlight',
            paint: {
                'line-color': '#fbbf24',
                'line-width': 3,
                'line-opacity': 1
            }
        })
    }

    return (
        <div className="map-view">
            {isLoading && <MapLoadingOverlay message={loadingMessage} />}
            <div ref={mapContainer} className="map-container" />
        </div>
    )
}
