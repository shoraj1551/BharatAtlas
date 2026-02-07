/**
 * useGeoData Hook - API Data Fetching
 * 
 * Fetches geospatial data from backend API
 * Handles loading states and errors
 */

import { useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

/**
 * Generic geo data fetching hook
 */
export function useGeoData(level, params) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!level) return

        // Defensive check: Dependent levels MUST have params
        const dependentLevels = ['districts', 'tehsils', 'thanas', 'villages']
        if (dependentLevels.includes(level) && !params) {
            console.warn(`[useGeoData] Blocking fetch for ${level} - missing params`)
            return
        }

        let cancelled = false

        async function fetchData() {
            setLoading(true)
            setError(null)

            try {
                console.log('useGeoData Hook Call:', { level, params })
                let url = `${API_BASE}/geo/${level}`

                // Add query params
                if (params) {
                    const query = new URLSearchParams(params).toString()
                    url += `?${query}`
                }

                console.log(`Fetching ${level}:`, url)
                const res = await fetch(url)

                if (!res.ok) {
                    throw new Error(`Failed to load ${level}: ${res.status}`)
                }

                const json = await res.json()

                if (!cancelled) {
                    console.log(`✓ Loaded ${json.features?.length || 0} ${level}`)
                    setData(json)
                }
            } catch (err) {
                if (!cancelled) {
                    console.error(`Error loading ${level}:`, err)
                    setError(err.message)
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        fetchData()

        return () => {
            cancelled = true
        }
    }, [level, JSON.stringify(params)])

    return { data, loading, error }
}

/**
 * Convenience hooks for each admin level
 */

export function useStates() {
    return useGeoData('states', null)
}

export function useDistricts(stateName) {
    return useGeoData(stateName ? 'districts' : null, stateName ? { state: stateName } : null)
}

export function useTehsils(districtName) {
    return useGeoData(districtName ? 'tehsils' : null, districtName ? { district: districtName } : null)
}

export function useThanas(tehsilName) {
    return useGeoData(tehsilName ? 'thanas' : null, tehsilName ? { tehsil: tehsilName } : null)
}

export function useVillages(thanaName, limit = 100) {
    return useGeoData(thanaName ? 'villages' : null, thanaName ? { thana: thanaName, limit } : null)
}

/**
 * Viewport-based village loading
 */
export function useVillagesInBounds(bounds, districtId, limit = 500) {
    const params = bounds && districtId ? {
        bbox: `${bounds.west},${bounds.south},${bounds.east},${bounds.north}`,
        district_id: districtId,
        limit
    } : null

    return useGeoData('villages', params)
}
