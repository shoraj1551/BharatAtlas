/**
 * Filter Service
 * 
 * Applies filters to place data
 */

export function applyFilters(places, filters) {
    if (!places || places.length === 0) {
        return []
    }

    let filtered = [...places]

    // Filter by place type
    if (filters.placeType) {
        filtered = filtered.filter(place =>
            place.place_type === filters.placeType
        )
    }

    // Filter by population range
    if (filters.populationMin) {
        const min = parseInt(filters.populationMin, 10)
        filtered = filtered.filter(place =>
            (place.population?.value || 0) >= min
        )
    }
    if (filters.populationMax) {
        const max = parseInt(filters.populationMax, 10)
        filtered = filtered.filter(place =>
            (place.population?.value || 0) <= max
        )
    }

    // Filter by area range
    if (filters.areaMin) {
        const min = parseFloat(filters.areaMin)
        filtered = filtered.filter(place =>
            (place.area_sq_km || 0) >= min
        )
    }
    if (filters.areaMax) {
        const max = parseFloat(filters.areaMax)
        filtered = filtered.filter(place =>
            (place.area_sq_km || 0) <= max
        )
    }

    // Filter by literacy rate range
    if (filters.literacyMin) {
        const min = parseFloat(filters.literacyMin)
        filtered = filtered.filter(place =>
            (place.literacy_rate?.value || 0) >= min
        )
    }
    if (filters.literacyMax) {
        const max = parseFloat(filters.literacyMax)
        filtered = filtered.filter(place =>
            (place.literacy_rate?.value || 0) <= max
        )
    }

    // Sort results
    filtered = sortPlaces(filtered, filters.sortBy, filters.sortOrder)

    return filtered
}

function sortPlaces(places, sortBy = 'name', sortOrder = 'asc') {
    const sorted = [...places]

    sorted.sort((a, b) => {
        let aValue, bValue

        switch (sortBy) {
            case 'name':
                aValue = a.canonical_name.toLowerCase()
                bValue = b.canonical_name.toLowerCase()
                break
            case 'population':
                aValue = a.population?.value || 0
                bValue = b.population?.value || 0
                break
            case 'area':
                aValue = a.area_sq_km || 0
                bValue = b.area_sq_km || 0
                break
            case 'literacy':
                aValue = a.literacy_rate?.value || 0
                bValue = b.literacy_rate?.value || 0
                break
            default:
                aValue = a.canonical_name.toLowerCase()
                bValue = b.canonical_name.toLowerCase()
        }

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
        return 0
    })

    return sorted
}

export default {
    applyFilters,
    sortPlaces
}
