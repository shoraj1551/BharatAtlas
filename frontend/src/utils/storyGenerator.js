/**
 * Data Story Generator
 * 
 * Creates narrative visualizations from data
 */

/**
 * Generate story for a place
 */
export function generateStory(place, allPlaces = []) {
    // Determine story type based on data
    if (hasGrowthData(place)) {
        return generateGrowthStory(place)
    } else if (allPlaces.length > 0) {
        return generateComparisonStory(place, allPlaces)
    } else {
        return generateOverviewStory(place)
    }
}

/**
 * Check if place has growth data
 */
function hasGrowthData(place) {
    // For now, we don't have historical data
    // This would check for multiple years of data
    return false
}

/**
 * Generate growth story
 */
function generateGrowthStory(place) {
    return {
        title: `The Rise of ${place.canonical_name}`,
        type: 'growth',
        steps: [
            {
                title: 'Introduction',
                content: `${place.canonical_name} has experienced significant transformation over the years.`,
                visual: 'intro'
            },
            {
                title: 'Population Growth',
                content: `The population has grown to ${(place.population?.value / 1000000).toFixed(1)} million people.`,
                visual: 'population-chart'
            },
            {
                title: 'Economic Development',
                content: `Major industries include ${place.major_industries?.slice(0, 3).join(', ')}.`,
                visual: 'industry-icons'
            },
            {
                title: 'Looking Ahead',
                content: `${place.canonical_name} continues to evolve and grow.`,
                visual: 'conclusion'
            }
        ]
    }
}

/**
 * Generate comparison story
 */
function generateComparisonStory(place, allPlaces) {
    const similar = allPlaces
        .filter(p => p.place_type === place.place_type && p.place_id !== place.place_id)
        .slice(0, 1)[0]

    if (!similar) return generateOverviewStory(place)

    return {
        title: `Tale of Two ${place.place_type}s`,
        type: 'comparison',
        steps: [
            {
                title: 'Two Different Paths',
                content: `Comparing ${place.canonical_name} and ${similar.canonical_name}.`,
                visual: 'intro'
            },
            {
                title: 'Population',
                content: `${place.canonical_name} has ${(place.population?.value / 1000000).toFixed(1)}M people, while ${similar.canonical_name} has ${(similar.population?.value / 1000000).toFixed(1)}M.`,
                visual: 'population-comparison'
            },
            {
                title: 'Education',
                content: `Literacy rates: ${place.literacy_rate?.value}% vs ${similar.literacy_rate?.value}%.`,
                visual: 'literacy-comparison'
            },
            {
                title: 'Conclusion',
                content: `Both places have unique strengths and characteristics.`,
                visual: 'conclusion'
            }
        ]
    }
}

/**
 * Generate overview story
 */
function generateOverviewStory(place) {
    return {
        title: `Discovering ${place.canonical_name}`,
        type: 'overview',
        steps: [
            {
                title: 'Welcome',
                content: `Let's explore ${place.canonical_name}, a ${place.place_type} in India.`,
                visual: 'intro'
            },
            {
                title: 'The People',
                content: `Home to ${(place.population?.value / 1000000).toFixed(1)} million people with a literacy rate of ${place.literacy_rate?.value}%.`,
                visual: 'demographics'
            },
            {
                title: 'The Land',
                content: `Spanning ${place.area_sq_km?.toLocaleString()} km² with a density of ${place.population_density?.toLocaleString()} people per km².`,
                visual: 'geography'
            },
            {
                title: 'The Economy',
                content: place.major_industries?.length > 0
                    ? `Major industries: ${place.major_industries.slice(0, 3).join(', ')}.`
                    : 'A diverse economic landscape.',
                visual: 'economy'
            }
        ]
    }
}

/**
 * Get story templates
 */
export const STORY_TEMPLATES = {
    growth: {
        icon: '📈',
        name: 'Growth Story',
        description: 'Show how a place has evolved over time'
    },
    comparison: {
        icon: '⚖️',
        name: 'Comparison Story',
        description: 'Compare two places side by side'
    },
    overview: {
        icon: '🗺️',
        name: 'Overview Story',
        description: 'Comprehensive look at a place'
    }
}
