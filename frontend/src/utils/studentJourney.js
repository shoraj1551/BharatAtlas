// Student Journey
// Narrative-first educational entry point (Story 158)

/**
 * Generate educational narrative (Story 158)
 * @param {Object} place - Place object
 * @returns {Object} Student-friendly narrative
 */
export function generateEducationalNarrative(place) {
    return {
        // Story 158: Stories, not tables
        story: {
            title: `Understanding ${place.canonical_name}`,
            introduction: generateIntroduction(place),
            sections: [
                generateGeographyStory(place),
                generatePeopleStory(place),
                generateEconomyStory(place),
                generateCultureStory(place)
            ]
        },

        // Interactive elements
        interactiveElements: [
            {
                type: 'map',
                title: 'Where is it?',
                description: `Explore ${place.canonical_name} on the map`
            },
            {
                type: 'timeline',
                title: 'How has it changed?',
                description: 'See population and development over time'
            },
            {
                type: 'comparison',
                title: 'How does it compare?',
                description: 'Compare with similar places'
            }
        ],

        // Learning questions
        thinkingQuestions: generateThinkingQuestions(place),

        // Data comes last, after narrative
        dataReference: {
            note: 'Want to see the numbers? Click to view detailed statistics',
            metrics: extractKeyMetrics(place)
        }
    }
}

/**
 * Generate introduction story
 */
function generateIntroduction(place) {
    const population = place.population ? `home to ${formatNumber(place.population)} people` : 'a place'
    const area = place.area_sq_km ? `spanning ${formatNumber(place.area_sq_km)} square kilometers` : ''

    return `${place.canonical_name} is ${population}${area ? ', ' + area : ''}. Let's explore what makes this place unique.`
}

/**
 * Generate geography story
 */
function generateGeographyStory(place) {
    return {
        title: 'The Land',
        narrative: `${place.canonical_name} ${place.terrain_type ? `features ${place.terrain_type} terrain` : 'has diverse geography'}. ${place.major_rivers ? `The ${place.major_rivers.join(', ')} river${place.major_rivers.length > 1 ? 's' : ''} flow${place.major_rivers.length === 1 ? 's' : ''} through this region.` : ''}`,
        visualSuggestion: 'Show terrain map'
    }
}

/**
 * Generate people story
 */
function generatePeopleStory(place) {
    const literacy = place.literacy_rate ? `${place.literacy_rate}% of people can read and write` : 'literacy data is being collected'
    const languages = place.major_languages ? `People here speak ${place.major_languages.join(', ')}` : ''

    return {
        title: 'The People',
        narrative: `${literacy}. ${languages}. ${place.cultural_heritage ? `The region is known for its ${place.cultural_heritage}.` : ''}`,
        visualSuggestion: 'Show population distribution'
    }
}

/**
 * Generate economy story
 */
function generateEconomyStory(place) {
    const mainActivity = place.primary_economic_activity || 'various economic activities'

    return {
        title: 'How People Live',
        narrative: `Most people in ${place.canonical_name} work in ${mainActivity}. ${place.major_industries ? `Key industries include ${place.major_industries.join(', ')}.` : ''}`,
        visualSuggestion: 'Show economic sectors'
    }
}

/**
 * Generate culture story
 */
function generateCultureStory(place) {
    return {
        title: 'Culture and Heritage',
        narrative: `${place.cultural_sites ? `${place.canonical_name} has ${place.cultural_sites.length} cultural site${place.cultural_sites.length > 1 ? 's' : ''}.` : ''} ${place.festivals ? `People celebrate ${place.festivals.join(', ')}.` : ''}`,
        visualSuggestion: 'Show cultural landmarks'
    }
}

/**
 * Generate thinking questions
 */
function generateThinkingQuestions(place) {
    return [
        `Why do you think ${formatNumber(place.population)} people live in ${place.canonical_name}?`,
        'What challenges might people face living here?',
        'How is this place similar to or different from where you live?',
        'What would you want to learn more about?'
    ]
}

/**
 * Extract key metrics for reference
 */
function extractKeyMetrics(place) {
    return {
        population: place.population,
        area: place.area_sq_km,
        literacy: place.literacy_rate,
        note: 'These are the basic numbers. The story above helps you understand what they mean.'
    }
}

/**
 * Format number for readability
 */
function formatNumber(num) {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)} crore`
    if (num >= 100000) return `${(num / 100000).toFixed(1)} lakh`
    if (num >= 1000) return `${(num / 1000).toFixed(1)} thousand`
    return num.toString()
}

export default {
    generateEducationalNarrative
}
