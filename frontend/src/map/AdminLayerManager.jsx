/**
 * AdminLayerManager Component
 * 
 * Logic-only component that manages layer rendering based on URL state
 * Implements progressive loading: only load one level deeper than current selection
 */

import { useEffect, useCallback, useRef } from 'react'
import { useParams } from 'react-router-dom'
import * as turf from '@turf/turf'
import { useMapLayers } from '../hooks/useMapLayers'
import { useURLSync } from '../hooks/useURLSync'
import { useStates, useDistricts, useTehsils } from '../hooks/useGeoData'
import { ADMIN_STYLES, ZOOM_THRESHOLDS } from './mapStyles'
import { useSelectionStore } from '../store/selectionStore'
import HighlightManager from './highlightManager'

export default function AdminLayerManager({ map }) {
    const { state, district, tehsil } = useParams()
    console.log('AdminLayerManager Params:', { state, district, tehsil })

    // Early return if map is not ready
    if (!map) {
        console.warn('AdminLayerManager: Map not ready yet')
        return null
    }

    const { addLayer, removeLayer, clearAllLayers, addClickHandler } = useMapLayers(map)
    const { navigateToState, navigateToDistrict, navigateToTehsil } = useURLSync()
    const { selectFeature } = useSelectionStore()

    // Track current zoom for village loading
    const currentZoomRef = useRef(map.getZoom())

    // Highlight manager
    const highlightManagerRef = useRef(null)

    // Initialize highlight manager
    useEffect(() => {
        if (!map || highlightManagerRef.current) return
        highlightManagerRef.current = new HighlightManager(map)
        return () => {
            if (highlightManagerRef.current) {
                highlightManagerRef.current.destroy()
                highlightManagerRef.current = null
            }
        }
    }, [map])

    // Fetch data based on current level
    const { data: statesData } = useStates()
    const { data: districtsData } = useDistricts(state)
    const { data: tehsilsData } = useTehsils(district)

    // Load states layer (always visible)
    useEffect(() => {
        if (!statesData) return

        console.log('📍 Rendering states layer')
        addLayer('states', statesData, ADMIN_STYLES.state, 'polygon')

        // Add click handler for states
        addClickHandler('states', (e) => {
            if (!e.features || e.features.length === 0) return

            const feature = e.features[0]
            const stateName = feature.properties.name || feature.properties.ST_NM

            console.log(`🎯 State clicked: ${stateName}`)

            // Update selection store
            selectFeature('state', feature.properties, stateName)

            // Highlight boundary
            if (highlightManagerRef.current) {
                highlightManagerRef.current.highlightFeature(feature, 'state')
            }

            navigateToState(stateName)

            // Zoom to state bounds
            try {
                const bbox = turf.bbox(feature)
                map.fitBounds(bbox, { padding: 40, duration: 1000 })
            } catch (err) {
                console.error('Error calculating bounds:', err)
            }
        })
    }, [statesData, addLayer, addClickHandler, navigateToState, map])

    // Load districts layer (when state is selected)
    useEffect(() => {
        if (!state) {
            removeLayer('districts')
            return
        }

        if (!districtsData) return

        console.log(`📌 Rendering districts layer for ${state}`)
        addLayer('districts', districtsData, ADMIN_STYLES.district, 'polygon')

        // Add click handler for districts
        addClickHandler('districts', (e) => {
            if (!e.features || e.features.length === 0) return

            const feature = e.features[0]
            const districtName = feature.properties.name || feature.properties.DIST_NM

            console.log(`🎯 District clicked: ${districtName}`)

            // Update selection store
            selectFeature('district', feature.properties, districtName)

            // Highlight boundary
            if (highlightManagerRef.current) {
                highlightManagerRef.current.highlightFeature(feature, 'district')
            }

            navigateToDistrict(state, districtName)

            // Zoom to district bounds
            try {
                const bbox = turf.bbox(feature)
                map.fitBounds(bbox, { padding: 40, duration: 1000 })
            } catch (err) {
                console.error('Error calculating bounds:', err)
            }
        })
    }, [state, districtsData, addLayer, addClickHandler, removeLayer, navigateToDistrict, map])

    // Load tehsils layer (when district is selected)
    useEffect(() => {
        if (!district) {
            removeLayer('tehsils')
            return
        }

        if (!tehsilsData) return

        console.log(`🏘️  Rendering tehsils layer for ${district}`)
        addLayer('tehsils', tehsilsData, ADMIN_STYLES.tehsil, 'polygon')

        // Add click handler for tehsils
        addClickHandler('tehsils', (e) => {
            if (!e.features || e.features.length === 0) return

            const feature = e.features[0]
            const tehsilName = feature.properties.name || feature.properties.tehsil_name

            console.log(`🎯 Tehsil clicked: ${tehsilName}`)

            // Update selection store
            selectFeature('tehsil', feature.properties, tehsilName)

            // Highlight boundary
            if (highlightManagerRef.current) {
                highlightManagerRef.current.highlightFeature(feature, 'tehsil')
            }

            navigateToTehsil(state, district, tehsilName)

            // Zoom to tehsil bounds
            try {
                const bbox = turf.bbox(feature)
                map.fitBounds(bbox, { padding: 40, duration: 1000 })
            } catch (err) {
                console.error('Error calculating bounds:', err)
            }
        })
    }, [district, tehsilsData, addLayer, addClickHandler, removeLayer, navigateToTehsil, state, map])

    // Cleanup layers when navigating up
    useEffect(() => {
        // Remove layers that shouldn't be visible at current level
        if (!state) {
            removeLayer('districts')
            removeLayer('tehsils')
            removeLayer('villages')
        } else if (!district) {
            removeLayer('tehsils')
            removeLayer('villages')
        } else if (!tehsil) {
            removeLayer('villages')
        }
    }, [state, district, tehsil, removeLayer])

    // Zoom-based village loading (TODO: implement when village data available)
    useEffect(() => {
        if (!map) return

        const handleZoom = () => {
            const zoom = map.getZoom()
            currentZoomRef.current = zoom

            if (zoom >= ZOOM_THRESHOLDS.VILLAGE && district) {
                // TODO: Load villages in viewport
                console.log('Zoom ≥ 12: Ready to load villages')
            } else {
                removeLayer('villages')
            }
        }

        map.on('zoom', handleZoom)
        return () => map.off('zoom', handleZoom)
    }, [map, district, removeLayer])

    return null // This is a logic-only component
}
