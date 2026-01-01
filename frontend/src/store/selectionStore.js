/**
 * Enhanced Selection Store - Central State Management
 * 
 * Manages hierarchical map selection with:
 * - Full path tracking (State → District → Tehsil → Thana → Village)
 * - Navigation history
 * - localStorage persistence
 * - Back/forward navigation
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSelectionStore = create(
    persist(
        (set, get) => ({
            // Full selection path
            selectionPath: {
                state: null,
                district: null,
                tehsil: null,
                thana: null,
                village: null
            },

            // Current level
            selectedLevel: 'country', // country | state | district | tehsil | thana | village

            // Selected feature (GeoJSON properties)
            selectedFeature: null,

            // Navigation history (for back/forward)
            history: [],
            historyIndex: -1,

            /**
             * Select a feature at any level
             */
            selectFeature: (level, feature, name) => {
                const currentPath = get().selectionPath
                const newPath = { ...currentPath }

                // Update path based on level
                switch (level) {
                    case 'state':
                        newPath.state = name
                        newPath.district = null
                        newPath.tehsil = null
                        newPath.thana = null
                        newPath.village = null
                        break
                    case 'district':
                        newPath.district = name
                        newPath.tehsil = null
                        newPath.thana = null
                        newPath.village = null
                        break
                    case 'tehsil':
                        newPath.tehsil = name
                        newPath.thana = null
                        newPath.village = null
                        break
                    case 'thana':
                        newPath.thana = name
                        newPath.village = null
                        break
                    case 'village':
                        newPath.village = name
                        break
                }

                // Add to history
                const history = get().history.slice(0, get().historyIndex + 1)
                history.push({ level, path: newPath, feature, timestamp: Date.now() })

                console.log(`✅ Selected ${level}: ${name}`, newPath)

                set({
                    selectedLevel: level,
                    selectedFeature: feature,
                    selectionPath: newPath,
                    history,
                    historyIndex: history.length - 1
                })
            },

            /**
             * Navigate to a specific level (for breadcrumb clicks)
             */
            navigateToLevel: (level) => {
                const currentPath = get().selectionPath
                const newPath = { ...currentPath }

                // Clear levels below the target level
                const levels = ['state', 'district', 'tehsil', 'thana', 'village']
                const targetIndex = levels.indexOf(level)

                for (let i = targetIndex + 1; i < levels.length; i++) {
                    newPath[levels[i]] = null
                }

                console.log(`🔙 Navigating to ${level}`, newPath)

                set({
                    selectedLevel: level,
                    selectionPath: newPath,
                    selectedFeature: null
                })
            },

            /**
             * Go back in history
             */
            goBack: () => {
                const { history, historyIndex } = get()
                if (historyIndex > 0) {
                    const previousState = history[historyIndex - 1]
                    console.log('⬅️ Going back to:', previousState.level)

                    set({
                        selectedLevel: previousState.level,
                        selectedFeature: previousState.feature,
                        selectionPath: previousState.path,
                        historyIndex: historyIndex - 1
                    })
                }
            },

            /**
             * Go forward in history
             */
            goForward: () => {
                const { history, historyIndex } = get()
                if (historyIndex < history.length - 1) {
                    const nextState = history[historyIndex + 1]
                    console.log('➡️ Going forward to:', nextState.level)

                    set({
                        selectedLevel: nextState.level,
                        selectedFeature: nextState.feature,
                        selectionPath: nextState.path,
                        historyIndex: historyIndex + 1
                    })
                }
            },

            /**
             * Clear entire selection
             */
            clearSelection: () => {
                console.log('🔄 Clearing selection')
                set({
                    selectedLevel: 'country',
                    selectedFeature: null,
                    selectionPath: {
                        state: null,
                        district: null,
                        tehsil: null,
                        thana: null,
                        village: null
                    }
                })
            },

            /**
             * Get current path as array
             */
            getPathArray: () => {
                const { selectionPath } = get()
                return Object.entries(selectionPath)
                    .filter(([_, value]) => value !== null)
                    .map(([level, name]) => ({ level, name }))
            },

            /**
             * Check if can go back
             */
            canGoBack: () => get().historyIndex > 0,

            /**
             * Check if can go forward
             */
            canGoForward: () => get().historyIndex < get().history.length - 1
        }),
        {
            name: 'bharatatlas-selection', // localStorage key
            partialize: (state) => ({
                selectionPath: state.selectionPath,
                selectedLevel: state.selectedLevel,
                history: state.history.slice(-10) // Keep last 10 items
            })
        }
    )
)
