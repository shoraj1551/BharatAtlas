/**
 * Selection Store - Central State Management
 * 
 * Manages map selection state without prop drilling
 * Tracks: selected admin level, selected feature, and provides actions
 */

import { create } from 'zustand'

export const useSelectionStore = create((set) => ({
    // Current selection state
    selectedLevel: 'country', // country | state | district | tehsil | village
    selectedFeature: null,    // GeoJSON feature properties

    // Actions
    selectFeature: (level, feature) => {
        console.log(`Selected ${level}:`, feature)
        set({
            selectedLevel: level,
            selectedFeature: feature
        })
    },

    clearSelection: () => {
        console.log('Clearing selection')
        set({
            selectedLevel: 'country',
            selectedFeature: null
        })
    }
}))
