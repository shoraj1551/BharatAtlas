/**
 * MapLibre GL Layer Definitions
 * 
 * This file contains layer creation functions for different administrative levels
 */

import { BOUNDARY_STYLES } from './mapConfig'

/**
 * Create state boundary layer
 */
export const createStateLayer = () => ({
    id: 'states-boundary',
    type: 'line',
    source: 'states',
    paint: BOUNDARY_STYLES.state
})

/**
 * Create state fill layer for click detection
 */
export const createStateFillLayer = () => ({
    id: 'states-fill',
    type: 'fill',
    source: 'states',
    paint: {
        'fill-color': 'transparent',
        'fill-opacity': 0
    }
})

/**
 * Create highlight layer for selected state
 */
export const createHighlightLayer = (sourceId) => ({
    id: `${sourceId}-highlight`,
    type: 'line',
    source: sourceId,
    paint: BOUNDARY_STYLES.stateSelected,
    filter: ['==', ['get', 'ST_NM'], ''] // Initially matches nothing
})

/**
 * Create district boundary layer
 */
export const createDistrictLayer = () => ({
    id: 'districts-boundary',
    type: 'line',
    source: 'districts',
    paint: BOUNDARY_STYLES.district,
    layout: {
        visibility: 'none' // Hidden by default, shown on state selection
    }
})

/**
 * Create district fill layer for click detection
 */
export const createDistrictFillLayer = () => ({
    id: 'districts-fill',
    type: 'fill',
    source: 'districts',
    paint: {
        'fill-color': 'transparent',
        'fill-opacity': 0
    },
    layout: {
        visibility: 'none'
    }
})
