// Persona-Aware Defaults
// Adapt UI defaults based on inferred persona (Stories 162-164)

import personaEngine, { PersonaType } from './personaInference'

/**
 * Get persona-aware defaults (Story 162)
 * @returns {Object} Default settings
 */
export function getPersonaDefaults() {
    const inference = personaEngine.inferPersona()

    // Story 162: Adapt defaults without fragmentation
    const defaults = {
        [PersonaType.RESEARCHER]: {
            defaultTab: 'data',
            showRawData: true,
            showMethodology: true,
            showSources: true,
            sortBy: 'metric_name'
        },

        [PersonaType.POLICYMAKER]: {
            defaultTab: 'constraints',
            showRawData: false,
            showComparisons: true,
            showPeers: true,
            sortBy: 'severity'
        },

        [PersonaType.INVESTOR]: {
            defaultTab: 'opportunities',
            showRawData: false,
            showFriction: true,
            showFeasibility: true,
            sortBy: 'strength'
        },

        [PersonaType.CITIZEN]: {
            defaultTab: 'overview',
            showRawData: false,
            showIdentity: true,
            showCommunity: true,
            sortBy: 'relevance'
        },

        [PersonaType.JOURNALIST]: {
            defaultTab: 'narratives',
            showRawData: false,
            showComparisons: true,
            showTrends: true,
            sortBy: 'newsworthiness'
        },

        [PersonaType.UNKNOWN]: {
            defaultTab: 'overview',
            showRawData: false,
            showAll: true,
            sortBy: 'default'
        }
    }

    return defaults[inference.persona] || defaults[PersonaType.UNKNOWN]
}

/**
 * Dark pattern prevention (Story 163)
 * @param {Object} content - Content to check
 * @returns {Object} Validation result
 */
export function validateNoDarkPatterns(content) {
    const violations = []

    // Story 163: No persona is nudged toward an agenda

    // Check for manipulative language
    const manipulativePatterns = [
        'you should',
        'you must',
        'best choice',
        'only option',
        'limited time',
        'act now',
        'don\'t miss'
    ]

    const contentText = JSON.stringify(content).toLowerCase()
    manipulativePatterns.forEach(pattern => {
        if (contentText.includes(pattern)) {
            violations.push({
                type: 'manipulative_language',
                pattern,
                severity: 'high'
            })
        }
    })

    // Check for hidden costs/information
    if (content.hiddenInfo || content.obscuredData) {
        violations.push({
            type: 'hidden_information',
            severity: 'critical'
        })
    }

    // Check for forced actions
    if (content.requiresAction || content.mandatoryChoice) {
        violations.push({
            type: 'forced_action',
            severity: 'high'
        })
    }

    return {
        clean: violations.length === 0,
        violations,
        recommendation: violations.length > 0
            ? 'Remove manipulative elements'
            : 'Content is manipulation-free'
    }
}

/**
 * Session-based context saving (Story 164)
 * @param {Object} context - Context to save
 */
export function saveSessionContext(context) {
    // Story 164: Respect anonymity - session only, no accounts
    try {
        const sessionData = {
            lastVisitedPlace: context.placeId,
            inferredPersona: personaEngine.inferPersona().persona,
            preferences: context.preferences || {},
            timestamp: Date.now()
        }

        sessionStorage.setItem('bharatatlas_context', JSON.stringify(sessionData))
    } catch (error) {
        console.warn('Could not save session context:', error)
    }
}

/**
 * Load session context (Story 164)
 * @returns {Object|null} Saved context
 */
export function loadSessionContext() {
    try {
        const data = sessionStorage.getItem('bharatatlas_context')
        if (!data) return null

        const context = JSON.parse(data)

        // Expire after 24 hours
        if (Date.now() - context.timestamp > 24 * 60 * 60 * 1000) {
            sessionStorage.removeItem('bharatatlas_context')
            return null
        }

        return context
    } catch (error) {
        console.warn('Could not load session context:', error)
        return null
    }
}

export default {
    getPersonaDefaults,
    validateNoDarkPatterns,
    saveSessionContext,
    loadSessionContext
}
