/**
 * MapContainer Component with Place Zoom Support
 * 
 * Main map wrapper with URL parameter support for zooming to places
 */

import { useRef, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import * as turf from '@turf/turf'
import AdminLayerManager from './AdminLayerManager'
import { MAP_CONFIG, MAP_STYLES } from './mapConfig'
import { zoomToFeature, zoomToCoordinates } from './mapUtils'
import placeService from '../services/placeService'
import { loadStatesGeoJSON } from '../data/geoLoader'
import MapStyleSwitcher from './MapStyleSwitcher'
import MapLegend from '../components/MapLegend'
import MapVisualizationToggle from '../components/MapVisualizationToggle'
import LevelIndicator from '../components/LevelIndicator'
import { POPULATION_DENSITY_SCALE, LITERACY_RATE_SCALE, createChoroplethExpression } from './colorScales'
import './MapView.css'

export default function MapContainer() {
    const mapRef = useRef(null)
    const containerRef = useRef(null)
    const [mapReady, setMapReady] = useState(false)
    const [searchParams] = useSearchParams()
    const placeIdParam = searchParams.get('place')
    const statesDataRef = useRef(null)
    const [currentStyle, setCurrentStyle] = useState('basic')
    const [vizMode, setVizMode] = useState('none')

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
        map.on('load', async () => {
            console.log('✓ Map loaded')

            // Load and enrich states data
            try {
                const rawStatesData = await loadStatesGeoJSON()
                console.log('Loaded raw states GeoJSON')

                // Enrich with population density and literacy data
                const { enrichGeoJSONWithData } = await import('./visualizationUtils')
                const enrichedData = await enrichGeoJSONWithData(rawStatesData)

                statesDataRef.current = enrichedData
                console.log('States data enriched and cached')

                // Add city markers
                const { addCityMarkers } = await import('./cityMarkers')
                await addCityMarkers(map)

                // Add tooltips
                const { addMapTooltip } = await import('./mapTooltip')
                addMapTooltip(map)

                // Add industry markers (hidden by default)
                const { addIndustryMarkers } = await import('./industryMarkers')
                await addIndustryMarkers(map)
            } catch (error) {
                console.error('Error loading states data:', error)
            }

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

    // Handle place parameter changes - zoom to place
    useEffect(() => {
        if (mapRef.current && mapReady && placeIdParam && statesDataRef.current) {
            zoomToPlace(mapRef.current, placeIdParam, statesDataRef.current)
        }
    }, [placeIdParam, mapReady])

    /**
     * Zoom map to a specific place
     */
    async function zoomToPlace(map, placeId, statesGeoJSON) {
        try {
            console.log('🔍 Zooming to place:', placeId)

            // Get place data
            const place = await placeService.getPlaceById(placeId)

            if (!place) {
                console.error('Place not found:', placeId)
                return
            }

            // Determine zoom level based on place type
            const zoomLevel = place.place_type === 'district' ? 10 :
                (place.place_type === 'state' || place.place_type === 'union_territory') ? 7 : 8

            // For districts, use coordinates directly (no GeoJSON boundaries yet)
            if (place.place_type === 'district') {
                if (place.latitude && place.longitude) {
                    console.log('📍 Zooming to district coordinates:', place.canonical_name)
                    zoomToCoordinates(map, [place.longitude, place.latitude], zoomLevel)

                    // Add a marker for the district
                    addDistrictMarker(map, place)
                } else {
                    console.error('District has no coordinates:', place.canonical_name)
                }
                return
            }

            // For states/UTs, try to find GeoJSON boundary
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
                    maxZoom: zoomLevel
                })

                // Highlight the feature
                highlightFeature(map, feature)
            } else if (place.latitude && place.longitude) {
                // Fallback: zoom to coordinates
                console.log('📍 Using coordinates fallback for:', place.canonical_name)
                zoomToCoordinates(map, [place.longitude, place.latitude], zoomLevel)
            }

        } catch (error) {
            console.error('Error zooming to place:', error)
        }
    }

    /**
     * Add a marker for district location
     */
    function addDistrictMarker(map, place) {
        // Remove existing marker
        if (map.getLayer('district-marker')) {
            map.removeLayer('district-marker')
        }
        if (map.getSource('district-marker')) {
            map.removeSource('district-marker')
        }

        // Create marker GeoJSON
        const markerGeoJSON = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [place.longitude, place.latitude]
            },
            properties: {
                name: place.canonical_name
            }
        }

        // Add marker source
        map.addSource('district-marker', {
            type: 'geojson',
            data: markerGeoJSON
        })

        // Add marker circle layer
        map.addLayer({
            id: 'district-marker',
            type: 'circle',
            source: 'district-marker',
            paint: {
                'circle-radius': 12,
                'circle-color': '#fbbf24',
                'circle-stroke-width': 3,
                'circle-stroke-color': '#ffffff',
                'circle-opacity': 0.8
            }
        })
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

    /**
     * Handle map style change
     */
    function handleStyleChange(style) {
        if (!mapRef.current) return

        setCurrentStyle(style)
        const newStyle = style === 'satellite' ? MAP_STYLES.SATELLITE : MAP_STYLES.BASIC
        mapRef.current.setStyle(newStyle)

        // Re-add layers after style change
        mapRef.current.once('styledata', () => {
            setMapReady(true)
        })
    }

    /**
     * Handle visualization mode change
     */
    async function handleVizModeChange(mode) {
        console.log(`Switching to visualization mode: ${mode}`)
        setVizMode(mode)

        if (!mapRef.current) return

        const { removeVisualizationLayers, addPopulationDensityLayer, addLiteracyRateLayer } = await import('./visualizationUtils')

        // Remove existing viz layers
        removeVisualizationLayers(mapRef.current)

        // Add new viz layer (data is already enriched from initial load)
        if (mode === 'density') {
            addPopulationDensityLayer(mapRef.current)
        } else if (mode === 'literacy') {
            addLiteracyRateLayer(mapRef.current)
        }
    }

    return (
        <div className="map-container">
            <div ref={containerRef} className="map" style={{ height: '100vh', width: '100%' }} />

            {/* Map Style Switcher */}
            <MapStyleSwitcher onStyleChange={handleStyleChange} />

            {/* Visualization Toggle */}
            <MapVisualizationToggle mode={vizMode} onModeChange={handleVizModeChange} />

            {/* Legend */}
            {vizMode === 'density' && (
                <MapLegend scale={POPULATION_DENSITY_SCALE} title="Population Density" />
            )}
            {vizMode === 'literacy' && (
                <MapLegend scale={LITERACY_RATE_SCALE} title="Literacy Rate" />
            )}

            {/* Level Indicator */}
            <LevelIndicator />

            {/* Only render layer manager when map is ready */}
            {mapReady && mapRef.current && (
                <AdminLayerManager map={mapRef.current} />
            )}
        </div>
    )
}
