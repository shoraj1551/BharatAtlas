/**
 * Comparison Store - Zustand State Management
 * 
 * Manages state for place comparison feature
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useComparisonStore = create(
    persist(
        (set, get) => ({
            // State
            selectedPlaces: [], // Array of place objects (max 4)
            comparisonMode: false,

            // Actions
            addPlace: (place) => {
                const { selectedPlaces } = get()

                // Prevent duplicates
                if (selectedPlaces.find(p => p.place_id === place.place_id)) {
                    return
                }

                // Limit to 4 places
                if (selectedPlaces.length >= 4) {
                    console.warn('Maximum 4 places can be compared')
                    return
                }

                set({
                    selectedPlaces: [...selectedPlaces, place],
                    comparisonMode: true
                })
            },

            removePlace: (placeId) => {
                const { selectedPlaces } = get()
                const updated = selectedPlaces.filter(p => p.place_id !== placeId)

                set({
                    selectedPlaces: updated,
                    comparisonMode: updated.length > 0
                })
            },

            clearComparison: () => {
                set({
                    selectedPlaces: [],
                    comparisonMode: false
                })
            },

            togglePlace: (place) => {
                const { selectedPlaces } = get()
                const exists = selectedPlaces.find(p => p.place_id === place.place_id)

                if (exists) {
                    get().removePlace(place.place_id)
                } else {
                    get().addPlace(place)
                }
            },

            isPlaceSelected: (placeId) => {
                const { selectedPlaces } = get()
                return selectedPlaces.some(p => p.place_id === placeId)
            },

            canAddMore: () => {
                const { selectedPlaces } = get()
                return selectedPlaces.length < 4
            }
        }),
        {
            name: 'bharatatlas-comparison', // LocalStorage key
            partialize: (state) => ({
                selectedPlaces: state.selectedPlaces,
                comparisonMode: state.comparisonMode
            })
        }
    )
)
