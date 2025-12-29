// Journey Management
// Clean exits, error recovery, and boundaries (Stories 165-168)

/**
 * Generate journey exit message (Story 165)
 * @param {string} persona - Persona type
 * @param {Object} place - Place object
 * @returns {Object} Exit message with limits
 */
export function generateJourneyExit(persona, place) {
    // Story 165: Users must understand limits before leaving
    const exits = {
        researcher: {
            summary: `You've explored ${place.canonical_name} from a research perspective.`,
            limits: [
                'Data completeness varies by metric',
                'Methodology details may be limited for some sources',
                'Temporal coverage may have gaps'
            ],
            nextSteps: [
                'Export data for further analysis',
                'Review source documentation',
                'Check for data updates periodically'
            ]
        },

        policymaker: {
            summary: `You've reviewed constraints and peer context for ${place.canonical_name}.`,
            limits: [
                'Peer comparisons based on available data only',
                'Constraints identified from measured indicators',
                'Local context may reveal additional factors'
            ],
            nextSteps: [
                'Consult with local administrators',
                'Verify constraints through field visits',
                'Review historical trends'
            ]
        },

        investor: {
            summary: `You've assessed opportunities and friction for ${place.canonical_name}.`,
            limits: [
                'Signals based on observable data only',
                'Local market dynamics require on-ground validation',
                'Regulatory environment may change'
            ],
            nextSteps: [
                'Conduct detailed market research',
                'Consult local business community',
                'Verify infrastructure claims'
            ]
        },

        citizen: {
            summary: `You've learned about ${place.canonical_name}'s identity and community.`,
            limits: [
                'Data represents aggregates, not individual experiences',
                'Cultural nuances require local knowledge',
                'Services availability may vary within the area'
            ],
            nextSteps: [
                'Visit to experience the place firsthand',
                'Connect with local community',
                'Explore neighboring areas'
            ]
        },

        student: {
            summary: `You've explored ${place.canonical_name} through stories and data.`,
            limits: [
                'This is an introduction, not comprehensive coverage',
                'Real places are more complex than any dataset',
                'Continue learning from multiple sources'
            ],
            nextSteps: [
                'Ask questions to teachers or experts',
                'Read books about the region',
                'Explore related topics'
            ]
        }
    }

    return exits[persona] || {
        summary: `You've explored ${place.canonical_name}.`,
        limits: ['Data and analysis have inherent limitations'],
        nextSteps: ['Continue exploring']
    }
}

/**
 * Handle persona misclassification (Story 166)
 * @param {string} inferredPersona - Inferred persona
 * @param {string} actualPersona - User-corrected persona
 * @returns {Object} Recovery actions
 */
export function handleMisclassification(inferredPersona, actualPersona) {
    // Story 166: If inference is wrong, system recovers gracefully
    return {
        acknowledged: true,
        message: `Switching from ${inferredPersona} view to ${actualPersona} view.`,
        actions: [
            'Reload content with correct persona defaults',
            'Update inference engine with correction',
            'Preserve user's current context'
        ],
        apology: 'We inferred your intent incorrectly. Your preferences have been updated.'
    }
}

/**
 * Shared terminology dictionary (Story 167)
 */
export const SharedTerminology = {
    // Story 167: Terminology remains consistent across personas

    population: {
        term: 'Population',
        definition: 'Total number of people living in an area',
        studentVersion: 'How many people live here',
        researcherVersion: 'Census enumeration count',
        unit: 'persons'
    },

    literacy_rate: {
        term: 'Literacy Rate',
        definition: 'Percentage of people aged 7+ who can read and write',
        studentVersion: 'How many people can read and write',
        researcherVersion: 'Literate population / Total population aged 7+ × 100',
        unit: 'percentage'
    },

    gdp: {
        term: 'GDP',
        definition: 'Gross Domestic Product - total economic output',
        studentVersion: 'Total value of goods and services produced',
        researcherVersion: 'Sum of value added across all economic sectors',
        unit: 'currency'
    },

    infrastructure: {
        term: 'Infrastructure',
        definition: 'Basic physical systems (roads, power, water)',
        studentVersion: 'Roads, electricity, and water supply',
        researcherVersion: 'Physical capital stock supporting economic activity',
        unit: 'various'
    }
}

/**
 * Get term for persona (Story 167: Avoid jargon drift)
 * @param {string} metric - Metric name
 * @param {string} persona - Persona type
 * @returns {Object} Term information
 */
export function getTermForPersona(metric, persona) {
    const term = SharedTerminology[metric]
    if (!term) {
        return { term: metric, definition: 'Definition not available' }
    }

    const version = persona === 'student' ? term.studentVersion :
        persona === 'researcher' ? term.researcherVersion :
            term.definition

    return {
        term: term.term,
        explanation: version,
        unit: term.unit
    }
}

/**
 * Check persona boundaries (Story 168)
 * @param {string} persona - Persona type
 * @param {string} requestedView - Requested view
 * @returns {Object} Boundary check result
 */
export function checkPersonaBoundaries(persona, requestedView) {
    // Story 168: Some views are intentionally unavailable

    const boundaries = {
        student: {
            unavailable: ['raw_data_export', 'methodology_details', 'statistical_analysis'],
            reason: 'These views are designed for researchers and may be too technical'
        },

        citizen: {
            unavailable: ['investment_analysis', 'policy_constraints'],
            reason: 'These views are specialized for specific use cases'
        },

        researcher: {
            unavailable: ['simplified_narratives'],
            reason: 'Researchers need full data access, not simplified views'
        }
    }

    const personaBoundaries = boundaries[persona]
    if (!personaBoundaries) {
        return { allowed: true }
    }

    const isUnavailable = personaBoundaries.unavailable.includes(requestedView)

    return {
        allowed: !isUnavailable,
        reason: isUnavailable ? personaBoundaries.reason : null,
        alternative: isUnavailable ? suggestAlternative(persona, requestedView) : null
    }
}

/**
 * Suggest alternative view
 */
function suggestAlternative(persona, requestedView) {
    const alternatives = {
        student: {
            raw_data_export: 'Try the "Learn More" section for detailed explanations',
            methodology_details: 'Ask your teacher about data collection methods'
        },
        citizen: {
            investment_analysis: 'View the "Living Here" section for practical information',
            policy_constraints: 'See the "Community" section for local context'
        }
    }

    return alternatives[persona]?.[requestedView] || 'Explore other available sections'
}

export default {
    generateJourneyExit,
    handleMisclassification,
    SharedTerminology,
    getTermForPersona,
    checkPersonaBoundaries
}
