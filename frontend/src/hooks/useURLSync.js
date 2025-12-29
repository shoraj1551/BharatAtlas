/**
 * useURLSync Hook - URL Routing Synchronization
 * 
 * Manages URL-based navigation for hierarchical admin levels
 */

import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'

export function useURLSync() {
    const navigate = useNavigate()
    const params = useParams()
    const [searchParams] = useSearchParams()

    const navigateToState = useCallback((stateName) => {
        navigate(`/map/state/${encodeURIComponent(stateName)}`)
    }, [navigate])

    const navigateToDistrict = useCallback((stateName, districtName) => {
        navigate(`/map/state/${encodeURIComponent(stateName)}/district/${encodeURIComponent(districtName)}`)
    }, [navigate])

    const navigateToTehsil = useCallback((stateName, districtName, tehsilName) => {
        navigate(`/map/state/${encodeURIComponent(stateName)}/district/${encodeURIComponent(districtName)}/tehsil/${encodeURIComponent(tehsilName)}`)
    }, [navigate])

    const navigateToVillage = useCallback((stateName, districtName, villageName) => {
        navigate(`/map/state/${encodeURIComponent(stateName)}/district/${encodeURIComponent(districtName)}?village=${encodeURIComponent(villageName)}`)
    }, [navigate])

    const navigateUp = useCallback(() => {
        const { state, district, tehsil } = params
        const village = searchParams.get('village')

        if (village) {
            // Remove village query param
            navigate(`/map/state/${state}/district/${district}`)
        } else if (tehsil) {
            navigateToDistrict(state, district)
        } else if (district) {
            navigateToState(state)
        } else if (state) {
            navigate('/map')
        }
    }, [params, searchParams, navigate])

    const getCurrentLevel = useCallback(() => {
        const { state, district, tehsil } = params
        const village = searchParams.get('village')

        if (village) return 'village'
        if (tehsil) return 'tehsil'
        if (district) return 'district'
        if (state) return 'state'
        return 'country'
    }, [params, searchParams])

    return {
        navigateToState,
        navigateToDistrict,
        navigateToTehsil,
        navigateToVillage,
        navigateUp,
        getCurrentLevel,
        currentParams: {
            ...params,
            village: searchParams.get('village')
        }
    }
}
