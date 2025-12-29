// Citizen Journey
// Identity and context, not rankings (Story 160)

/**
 * Generate citizen-focused narrative (Story 160)
 * @param {Object} place - Place object
 * @returns {Object} Identity-focused view
 */
export function generateCitizenNarrative(place) {
    return {
        // Story 160: Identity, not rankings
        identity: {
            title: `About ${place.canonical_name}`,
            description: generateIdentityDescription(place),
            uniqueFeatures: identifyUniqueFeatures(place),
            culturalContext: getCulturalContext(place)
        },

        // What matters to citizens
        dailyLife: {
            title: 'Living Here',
            essentials: {
                healthcare: getHealthcareAccess(place),
                education: getEducationAccess(place),
                connectivity: getConnectivityInfo(place),
                safety: getSafetyInfo(place)
            }
        },

        // Local context
        community: {
            title: 'Community',
            demographics: getCommunityProfile(place),
            languages: place.major_languages || [],
            festivals: place.festivals || []
        },

        // NO rankings, just context
        context: {
            title: 'In Context',
            neighboringPlaces: place.neighbors || [],
            regionalRole: getRegionalRole(place),
            note: 'Every place has its own story. Rankings don\'t capture what makes a place special.'
        }
    }
}

/**
 * Generate identity description (Story 160: Respect local identity)
 */
function generateIdentityDescription(place) {
    const parts = []

    if (place.known_for) {
        parts.push(`Known for ${place.known_for}`)
    }

    if (place.historical_significance) {
        parts.push(`Has a rich history of ${place.historical_significance}`)
    }

    if (place.natural_features) {
        parts.push(`Features ${place.natural_features}`)
    }

    return parts.length > 0
        ? parts.join('. ') + '.'
        : `${place.canonical_name} is a unique place with its own character and community.`
}

/**
 * Identify unique features
 */
function identifyUniqueFeatures(place) {
    const features = []

    if (place.unesco_sites && place.unesco_sites.length > 0) {
        features.push({
            type: 'heritage',
            description: `UNESCO World Heritage Site${place.unesco_sites.length > 1 ? 's' : ''}: ${place.unesco_sites.join(', ')}`
        })
    }

    if (place.biodiversity_hotspot) {
        features.push({
            type: 'nature',
            description: 'Biodiversity hotspot with unique flora and fauna'
        })
    }

    if (place.traditional_crafts && place.traditional_crafts.length > 0) {
        features.push({
            type: 'culture',
            description: `Traditional crafts: ${place.traditional_crafts.join(', ')}`
        })
    }

    return features
}

/**
 * Get cultural context
 */
function getCulturalContext(place) {
    return {
        languages: place.major_languages || ['Information not available'],
        cuisines: place.local_cuisines || [],
        festivals: place.festivals || [],
        traditions: place.cultural_traditions || []
    }
}

/**
 * Get healthcare access info
 */
function getHealthcareAccess(place) {
    return {
        hospitals: place.hospitals_per_lakh || 'Data not available',
        primaryHealthCenters: place.primary_health_centers || 'Data not available',
        note: 'Healthcare facilities available in the area'
    }
}

/**
 * Get education access info
 */
function getEducationAccess(place) {
    return {
        schools: place.schools_per_thousand || 'Data not available',
        colleges: place.colleges || 'Data not available',
        literacyRate: place.literacy_rate ? `${place.literacy_rate}%` : 'Data not available'
    }
}

/**
 * Get connectivity info
 */
function getConnectivityInfo(place) {
    return {
        roadAccess: place.road_connectivity || 'Information not available',
        railAccess: place.rail_connectivity || 'Information not available',
        airportDistance: place.nearest_airport_km ? `${place.nearest_airport_km} km` : 'Information not available',
        internetPenetration: place.internet_penetration ? `${place.internet_penetration}%` : 'Data not available'
    }
}

/**
 * Get safety info
 */
function getSafetyInfo(place) {
    return {
        crimeRate: place.crime_rate || 'Data not available',
        policeStations: place.police_stations || 'Data not available',
        note: 'Safety data based on reported incidents'
    }
}

/**
 * Get community profile
 */
function getCommunityProfile(place) {
    return {
        population: place.population,
        density: place.population_density,
        urbanRural: place.urban_rural_split || 'Mixed',
        ageDistribution: place.age_distribution || 'Data not available'
    }
}

/**
 * Get regional role
 */
function getRegionalRole(place) {
    if (place.is_district_headquarters) {
        return 'District headquarters - administrative center'
    }
    if (place.is_industrial_hub) {
        return 'Industrial hub - economic center'
    }
    if (place.is_educational_center) {
        return 'Educational center - known for institutions'
    }
    return 'Part of the regional community'
}

export default {
    generateCitizenNarrative
}
