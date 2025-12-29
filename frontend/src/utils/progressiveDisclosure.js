// Progressive Disclosure System
// Gradual complexity reveal for students (Story 159)

/**
 * Complexity Levels
 */
export const ComplexityLevel = {
    BASIC: 'basic',           // Simple narrative
    INTERMEDIATE: 'intermediate', // Add context
    ADVANCED: 'advanced',     // Full details
    EXPERT: 'expert'          // Raw data + methodology
}

/**
 * Create progressive disclosure layers (Story 159)
 * @param {Object} place - Place object
 * @param {string} topic - Topic to explore
 * @returns {Object} Layered content
 */
export function createProgressiveLayers(place, topic) {
    return {
        topic,

        // Layer 1: Basic (Story 159: Start simple)
        basic: {
            title: `What is ${topic}?`,
            content: getBasicExplanation(place, topic),
            visualType: 'simple_chart',
            nextPrompt: 'Want to know more?'
        },

        // Layer 2: Intermediate (Add context)
        intermediate: {
            title: `Why does ${topic} matter?`,
            content: getContextualExplanation(place, topic),
            visualType: 'comparison_chart',
            nextPrompt: 'See the details?'
        },

        // Layer 3: Advanced (Full details)
        advanced: {
            title: `How is ${topic} measured?`,
            content: getDetailedExplanation(place, topic),
            visualType: 'detailed_breakdown',
            nextPrompt: 'View raw data?'
        },

        // Layer 4: Expert (Raw data)
        expert: {
            title: `${topic} - Complete Data`,
            content: getRawData(place, topic),
            visualType: 'data_table',
            nextPrompt: null
        }
    }
}

/**
 * Get basic explanation
 */
function getBasicExplanation(place, topic) {
    const explanations = {
        population: `${place.canonical_name} has ${formatNumber(place.population)} people living here.`,
        literacy: `${place.literacy_rate}% of people can read and write.`,
        economy: `Most people work in ${place.primary_economic_activity || 'various jobs'}.`
    }

    return explanations[topic] || `${topic} information for ${place.canonical_name}.`
}

/**
 * Get contextual explanation
 */
function getContextualExplanation(place, topic) {
    const contexts = {
        population: `This makes ${place.canonical_name} ${place.population > 1000000 ? 'a large' : 'a medium-sized'} place. More people means more schools, hospitals, and jobs are needed.`,
        literacy: `Literacy helps people get better jobs, understand their rights, and participate in society. ${place.literacy_rate > 75 ? 'This is a good rate.' : 'There is room for improvement.'}`,
        economy: `The main economic activity shapes what kind of jobs are available and what skills people need.`
    }

    return contexts[topic] || `Understanding ${topic} helps us see how ${place.canonical_name} works.`
}

/**
 * Get detailed explanation
 */
function getDetailedExplanation(place, topic) {
    return {
        definition: `Detailed definition of ${topic}`,
        measurement: `How ${topic} is measured`,
        factors: `What affects ${topic}`,
        implications: `What ${topic} means for daily life`
    }
}

/**
 * Get raw data
 */
function getRawData(place, topic) {
    return {
        value: place[topic],
        unit: 'varies',
        source: 'Census/Survey',
        year: place.data_year || 'Latest available',
        methodology: 'Standard statistical methods'
    }
}

/**
 * Format number for students
 */
function formatNumber(num) {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)} crore`
    if (num >= 100000) return `${(num / 100000).toFixed(1)} lakh`
    if (num >= 1000) return `${(num / 1000).toFixed(1)} thousand`
    return num.toString()
}

export default {
    ComplexityLevel,
    createProgressiveLayers
}
