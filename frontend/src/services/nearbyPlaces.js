/**
 * Nearby Places Service
 * 
 * Provides geospatial proximity queries and recommendations
 */

/**
 * Calculate distance between two coordinates (Haversine formula)
 * Returns distance in kilometers
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371 // Earth's radius in km
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    return distance
}

function toRad(degrees) {
    return degrees * (Math.PI / 180)
}

/**
 * Find nearby places within a radius
 */
export async function findNearbyPlaces(centerPlace, allPlaces, radiusKm = 100) {
    if (!centerPlace.latitude || !centerPlace.longitude) {
        return {
            nearby: [],
            error: 'Center place coordinates not available'
        }
    }

    const nearby = allPlaces
        .filter(place => place.place_id !== centerPlace.place_id)
        .filter(place => place.latitude && place.longitude)
        .map(place => ({
            ...place,
            distance: calculateDistance(
                centerPlace.latitude,
                centerPlace.longitude,
                place.latitude,
                place.longitude
            )
        }))
        .filter(place => place.distance <= radiusKm)
        .sort((a, b) => a.distance - b.distance)

    return {
        nearby,
        count: nearby.length,
        radius: radiusKm
    }
}

/**
 * Find similar places based on characteristics
 */
export function findSimilarPlaces(targetPlace, allPlaces, limit = 5) {
    if (!targetPlace) {
        return []
    }

    const scored = allPlaces
        .filter(place => place.place_id !== targetPlace.place_id)
        .map(place => ({
            place,
            similarity: calculateSimilarity(targetPlace, place)
        }))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit)

    return scored.map(item => ({
        ...item.place,
        similarityScore: item.similarity
    }))
}

/**
 * Calculate similarity score between two places
 */
function calculateSimilarity(place1, place2) {
    let score = 0
    let factors = 0

    // Same place type
    if (place1.place_type === place2.place_type) {
        score += 30
    }
    factors++

    // Similar population (within 20%)
    if (place1.population?.value && place2.population?.value) {
        const ratio = Math.min(
            place1.population.value / place2.population.value,
            place2.population.value / place1.population.value
        )
        score += ratio * 25
        factors++
    }

    // Similar area (within 20%)
    if (place1.area_sq_km && place2.area_sq_km) {
        const ratio = Math.min(
            place1.area_sq_km / place2.area_sq_km,
            place2.area_sq_km / place1.area_sq_km
        )
        score += ratio * 20
        factors++
    }

    // Similar literacy rate (within 10%)
    if (place1.literacy_rate?.value && place2.literacy_rate?.value) {
        const diff = Math.abs(place1.literacy_rate.value - place2.literacy_rate.value)
        score += Math.max(0, (10 - diff)) * 2.5
        factors++
    }

    // Common industries
    if (place1.major_industries && place2.major_industries) {
        const common = place1.major_industries.filter(ind =>
            place2.major_industries.includes(ind)
        )
        score += (common.length / Math.max(place1.major_industries.length, 1)) * 25
        factors++
    }

    return factors > 0 ? score / factors : 0
}

/**
 * Get place recommendations
 */
export function getPlaceRecommendations(currentPlace, allPlaces, userPreferences = {}) {
    const recommendations = []

    // Similar places
    const similar = findSimilarPlaces(currentPlace, allPlaces, 3)
    recommendations.push({
        category: 'Similar Places',
        places: similar,
        reason: 'Based on characteristics like population, area, and industries'
    })

    // Higher opportunity score
    const higherOpportunity = allPlaces
        .filter(p => p.place_id !== currentPlace.place_id)
        .filter(p => p.place_type === currentPlace.place_type)
        .slice(0, 3)

    if (higherOpportunity.length > 0) {
        recommendations.push({
            category: 'Better Opportunities',
            places: higherOpportunity,
            reason: 'Similar type with potentially better opportunities'
        })
    }

    return recommendations
}

export default {
    calculateDistance,
    findNearbyPlaces,
    findSimilarPlaces,
    getPlaceRecommendations
}
