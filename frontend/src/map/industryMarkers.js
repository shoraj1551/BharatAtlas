/**
 * Industry Icons Layer
 * 
 * Shows major industries by location
 */

const INDUSTRY_ICONS = {
    'IT': '💻',
    'Manufacturing': '🏭',
    'Agriculture': '🌾',
    'Textiles': '👔',
    'Automotive': '🚗',
    'Tourism': '🏖️',
    'Pharmaceuticals': '💊',
    'Finance': '💰',
    'Mining': '⛏️',
    'Energy': '⚡'
}

const INDUSTRY_COLORS = {
    'IT': '#3b82f6',
    'Manufacturing': '#ef4444',
    'Agriculture': '#22c55e',
    'Textiles': '#a855f7',
    'Automotive': '#f59e0b',
    'Tourism': '#06b6d4',
    'Pharmaceuticals': '#ec4899',
    'Finance': '#10b981',
    'Mining': '#78716c',
    'Energy': '#eab308'
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

/**
 * Add industry markers to map
 */
export async function addIndustryMarkers(map) {
    console.log('Adding industry markers...')

    try {
        // Fetch places with industry data
        const response = await fetch(`${API_BASE}/places/states`)
        if (!response.ok) throw new Error('Failed to fetch places')

        const places = await response.json()

        // Create markers for each industry
        const industryFeatures = []

        places.forEach(place => {
            if (place.major_industries && place.coordinates) {
                place.major_industries.forEach(industry => {
                    industryFeatures.push({
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: place.coordinates
                        },
                        properties: {
                            industry,
                            place_name: place.canonical_name,
                            icon: INDUSTRY_ICONS[industry] || '🏢',
                            color: INDUSTRY_COLORS[industry] || '#6b7280'
                        }
                    })
                })
            }
        })

        const industryGeoJSON = {
            type: 'FeatureCollection',
            features: industryFeatures
        }

        // Add source
        if (!map.getSource('industries')) {
            map.addSource('industries', {
                type: 'geojson',
                data: industryGeoJSON
            })
        }

        // Add circle markers
        if (!map.getLayer('industry-markers')) {
            map.addLayer({
                id: 'industry-markers',
                type: 'circle',
                source: 'industries',
                paint: {
                    'circle-radius': 8,
                    'circle-color': ['get', 'color'],
                    'circle-opacity': 0.8,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#fff'
                },
                layout: {
                    'visibility': 'none' // Hidden by default
                }
            })
        }

        console.log(`✓ Industry markers added (${industryFeatures.length} markers)`)
    } catch (error) {
        console.error('Error adding industry markers:', error)
    }
}

/**
 * Toggle industry markers visibility
 */
export function toggleIndustryMarkers(map, visible) {
    if (map.getLayer('industry-markers')) {
        map.setLayoutProperty('industry-markers', 'visibility', visible ? 'visible' : 'none')
    }
}

/**
 * Filter industries by type
 */
export function filterIndustries(map, industryTypes) {
    if (!map.getLayer('industry-markers')) return

    if (industryTypes.length === 0) {
        map.setFilter('industry-markers', null)
    } else {
        map.setFilter('industry-markers', ['in', ['get', 'industry'], ['literal', industryTypes]])
    }
}
