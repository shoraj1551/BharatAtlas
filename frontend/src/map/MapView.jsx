/**
 * MapView Component - Core Map Logic
 * 
 * Handles:
 * - Map initialization with India bounds
 * - State boundary rendering
 * - State selection and zoom
 * - Lazy-loaded district boundaries (per state)
 * - Integration with Zustand selection store
 */

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import * as turf from '@turf/turf'

import { MAP_CONFIG } from './mapConfig'
import { loadStatesGeoJSON, loadDistrictsGeoJSON, filterDistrictsByState } from '../data/geoLoader'
import { addBoundaryLayer, addFillLayer, removeLayer } from './mapLayers'
import { styles } from './mapStyles'
import { useSelectionStore } from '../store/selectionStore'
import './MapView.css'

export default function MapView() {
    const mapRef = useRef(null)
    const mapContainer = useRef(null)
    const districtsDataRef = useRef(null) // Cache full districts data

    const { selectFeature, clearSelection } = useSelectionStore()

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

        // Add navigation controls
        map.addControl(new maplibregl.NavigationControl(), 'top-right')

        // Map load handler
        map.on('load', async () => {
            try {
                console.log('🗺️  Map loaded, loading state boundaries...')

                // Load states
                const statesData = await loadStatesGeoJSON()

                // Add state boundary layer
                addBoundaryLayer(map, 'states-boundary', statesData, styles.state)

                // Add invisible fill layer for click detection
                addFillLayer(map, 'states-fill', 'states-boundary')

                // Pre-load districts data (cached for lazy loading)
                console.log('📦 Pre-loading districts data...')
                districtsDataRef.current = await loadDistrictsGeoJSON()

                // Setup state click handler
                map.on('click', 'states-fill', async (e) => {
                    if (!e.features || e.features.length === 0) return

                    const stateFeature = e.features[0]
                    const stateName = stateFeature.properties.ST_NM || stateFeature.properties.st_nm

                    console.log(`🎯 State clicked: ${stateName}`)

                    // Update selection store
                    selectFeature('state', stateFeature.properties)

                    // Zoom to state bounds
                    try {
                        const bbox = turf.bbox(stateFeature)
                        map.fitBounds(bbox, {
                            padding: 40,
                            duration: 1000
                        })
                    } catch (err) {
                        console.error('Error calculating bounds:', err)
                    }

                    // Lazy load districts for this state only
                    if (districtsDataRef.current) {
                        console.log(`📍 Loading districts for ${stateName}...`)

                        const filteredDistricts = filterDistrictsByState(
                            districtsDataRef.current,
                            stateName
                        )

                        // Add district boundary layer
                        addBoundaryLayer(map, 'districts-boundary', filteredDistricts, styles.district)

                        // Add fill layer for district clicks
                        addFillLayer(map, 'districts-fill', 'districts-boundary')

                        // Setup district click handler
                        map.off('click', 'districts-fill') // Remove old handler if exists
                        map.on('click', 'districts-fill', (e) => {
                            if (!e.features || e.features.length === 0) return

                            const districtFeature = e.features[0]
                            const districtName = districtFeature.properties.DIST_NM || districtFeature.properties.district

                            console.log(`🎯 District clicked: ${districtName}`)

                            // Update selection store
                            selectFeature('district', districtFeature.properties)

                            // Zoom to district bounds
                            try {
                                const bbox = turf.bbox(districtFeature)
                                map.fitBounds(bbox, {
                                    padding: 40,
                                    duration: 1000
                                })
                            } catch (err) {
                                console.error('Error calculating bounds:', err)
                            }
                        })

                        // Cursor pointer on hover
                        map.on('mouseenter', 'districts-fill', () => {
                            map.getCanvas().style.cursor = 'pointer'
                        })
                        map.on('mouseleave', 'districts-fill', () => {
                            map.getCanvas().style.cursor = ''
                        })
                    }
                })

                // Cursor pointer on state hover
                map.on('mouseenter', 'states-fill', () => {
                    map.getCanvas().style.cursor = 'pointer'
                })
                map.on('mouseleave', 'states-fill', () => {
                    map.getCanvas().style.cursor = ''
                })

                console.log('✅ Map initialization complete')

            } catch (err) {
                console.error('❌ Error loading map data:', err)
            }
        })

        // Cleanup
        return () => {
            if (mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null
            }
        }
    }, [selectFeature])

    return (
        <div className="map-container">
            <div ref={mapContainer} className="map" style={{ height: '100vh', width: '100%' }} />
        </div>
    )
}
