/**
 * Recommendation Engine
 * 
 * Suggests similar places and interesting comparisons
 */

/**
 * Find similar places using cosine similarity
 */
export function findSimilarPlaces(targetPlace, allPlaces, limit = 5) {
    const similarities = allPlaces
        .filter(p => p.place_id !== targetPlace.place_id)
        .map(place => ({
            place,
            similarity: calculateSimilarity(targetPlace, place)
        }))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit)

    return similarities.map(s => ({
        ...s.place,
        similarityScore: s.similarity,
        reason: getSimilarityReason(targetPlace, s.place)
    }))
}

/**
 * Calculate similarity between two places
 */
function calculateSimilarity(place1, place2) {
    const features1 = extractFeatures(place1)
    const features2 = extractFeatures(place2)

    // Cosine similarity
    let dotProduct = 0
    let magnitude1 = 0
    let magnitude2 = 0

    for (let key in features1) {
        if (features2[key] !== undefined) {
            dotProduct += features1[key] * features2[key]
            magnitude1 += features1[key] * features1[key]
            magnitude2 += features2[key] * features2[key]
        }
    }

    magnitude1 = Math.sqrt(magnitude1)
    magnitude2 = Math.sqrt(magnitude2)

    if (magnitude1 === 0 || magnitude2 === 0) return 0

    return dotProduct / (magnitude1 * magnitude2)
}

/**
 * Extract normalized features from place
 */
function extractFeatures(place) {
    return {
        population: normalize(place.population?.value || 0, 0, 50000000),
        literacy: normalize(place.literacy_rate?.value || 0, 0, 100),
        density: normalize(place.population_density || 0, 0, 10000),
        area: normalize(place.area_sq_km || 0, 0, 500000)
    }
}

/**
 * Normalize value to 0-1 range
 */
function normalize(value, min, max) {
    return (value - min) / (max - min)
}

/**
 * Get reason for similarity
 */
function getSimilarityReason(place1, place2) {
    const reasons = []

    // Population similarity
    const popDiff = Math.abs((place1.population?.value || 0) - (place2.population?.value || 0))
    if (popDiff < 1000000) {
        reasons.push('similar population')
    }

    // Literacy similarity
    const litDiff = Math.abs((place1.literacy_rate?.value || 0) - (place2.literacy_rate?.value || 0))
    if (litDiff < 5) {
        reasons.push('similar literacy rate')
    }

    // Same type
    if (place1.place_type === place2.place_type) {
        reasons.push(`both ${place1.place_type}s`)
    }

    return reasons.length > 0 ? reasons.join(', ') : 'similar characteristics'
}

/**
 * Generate comparison suggestions
 */
export function suggestComparisons(place, allPlaces) {
    const suggestions = []

    // Suggest opposite characteristics
    const opposites = findOpposites(place, allPlaces)
    if (opposites.length > 0) {
        suggestions.push({
            type: 'contrast',
            title: 'Compare Contrasts',
            places: opposites.slice(0, 2),
            reason: 'See how different places compare'
        })
    }

    // Suggest same type
    const sameType = allPlaces
        .filter(p => p.place_type === place.place_type && p.place_id !== place.place_id)
        .slice(0, 2)

    if (sameType.length > 0) {
        suggestions.push({
            type: 'peers',
            title: `Compare ${place.place_type}s`,
            places: sameType,
            reason: `See how ${place.canonical_name} compares to similar places`
        })
    }

    return suggestions
}

/**
 * Find places with opposite characteristics
 */
function findOpposites(targetPlace, allPlaces) {
    return allPlaces
        .filter(p => p.place_id !== targetPlace.place_id)
        .map(place => ({
            place,
            difference: calculateDifference(targetPlace, place)
        }))
        .sort((a, b) => b.difference - a.difference)
        .slice(0, 5)
        .map(d => d.place)
}

/**
 * Calculate difference score
 */
function calculateDifference(place1, place2) {
    const features1 = extractFeatures(place1)
    const features2 = extractFeatures(place2)

    let totalDiff = 0
    for (let key in features1) {
        if (features2[key] !== undefined) {
            totalDiff += Math.abs(features1[key] - features2[key])
        }
    }

    return totalDiff
}

/**
 * Generate interesting facts
 */
export function generateInterestingFacts(place) {
    const facts = []

    // Superlatives
    if (place.population?.value > 20000000) {
        facts.push({
            icon: '🌟',
            fact: 'One of the most populous places in India'
        })
    }

    if (place.literacy_rate?.value > 95) {
        facts.push({
            icon: '🎓',
            fact: 'Among the most literate regions in the country'
        })
    }

    if (place.area_sq_km > 100000) {
        facts.push({
            icon: '📏',
            fact: 'Larger than many countries'
        })
    }

    return facts
}
