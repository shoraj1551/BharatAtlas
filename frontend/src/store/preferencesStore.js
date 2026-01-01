/**
 * User Preferences Store
 * 
 * Zustand store for user preferences and customization
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const usePreferencesStore = create(
    persist(
        (set, get) => ({
            // Theme
            theme: 'light',
            setTheme: (theme) => set({ theme }),
            toggleTheme: () => set((state) => ({
                theme: state.theme === 'light' ? 'dark' : 'light'
            })),

            // Favorites
            favorites: [],
            addFavorite: (place) => set((state) => ({
                favorites: [...state.favorites, place]
            })),
            removeFavorite: (placeId) => set((state) => ({
                favorites: state.favorites.filter(p => p.place_id !== placeId)
            })),
            isFavorite: (placeId) => {
                return get().favorites.some(p => p.place_id === placeId)
            },

            // Custom Metrics
            visibleMetrics: [
                'population',
                'literacy_rate',
                'area',
                'density'
            ],
            toggleMetric: (metric) => set((state) => {
                const isVisible = state.visibleMetrics.includes(metric)
                return {
                    visibleMetrics: isVisible
                        ? state.visibleMetrics.filter(m => m !== metric)
                        : [...state.visibleMetrics, metric]
                }
            }),

            // Saved Views
            savedViews: [],
            saveView: (view) => set((state) => ({
                savedViews: [...state.savedViews, {
                    ...view,
                    id: Date.now(),
                    createdAt: new Date().toISOString()
                }]
            })),
            deleteView: (viewId) => set((state) => ({
                savedViews: state.savedViews.filter(v => v.id !== viewId)
            })),

            // Map Preferences
            mapStyle: 'basic',
            setMapStyle: (style) => set({ mapStyle: style }),

            defaultZoom: 5,
            setDefaultZoom: (zoom) => set({ defaultZoom: zoom }),

            // Units
            units: 'metric',
            setUnits: (units) => set({ units }),

            // Language
            language: 'en',
            setLanguage: (language) => set({ language }),

            // Reset all preferences
            reset: () => set({
                theme: 'light',
                favorites: [],
                visibleMetrics: ['population', 'literacy_rate', 'area', 'density'],
                savedViews: [],
                mapStyle: 'basic',
                defaultZoom: 5,
                units: 'metric',
                language: 'en'
            })
        }),
        {
            name: 'bharatatlas-preferences',
            version: 1
        }
    )
)
