// Persona Inference System
// Silently infer user intent from behavior (Story 151)

/**
 * Persona Types (inferred, never asked)
 */
export const PersonaType = {
    RESEARCHER: 'researcher',           // Academic/policy research
    INVESTOR: 'investor',               // Business/investment
    POLICYMAKER: 'policymaker',         // Government/planning
    CITIZEN: 'citizen',                 // General public
    JOURNALIST: 'journalist',           // Media/reporting
    UNKNOWN: 'unknown'                  // Insufficient data
}

/**
 * Behavior Signals
 */
const BehaviorSignals = {
    // Researcher signals
    RESEARCHER: {
        metrics: ['literacy_rate', 'education_index', 'research_institutions'],
        actions: ['export_comparison', 'view_sources', 'check_methodology'],
        searchPatterns: ['census', 'survey', 'data']
    },

    // Investor signals
    INVESTOR: {
        metrics: ['gdp', 'business_density', 'infrastructure_index', 'connectivity'],
        actions: ['compare_places', 'view_opportunities', 'export_data'],
        searchPatterns: ['industrial', 'market', 'growth']
    },

    // Policymaker signals
    POLICYMAKER: {
        metrics: ['population', 'poverty_rate', 'healthcare_access', 'employment'],
        actions: ['compare_districts', 'view_gaps', 'scoped_ranking'],
        searchPatterns: ['district', 'development', 'scheme']
    },

    // Citizen signals
    CITIZEN: {
        metrics: ['schools', 'hospitals', 'connectivity', 'safety'],
        actions: ['search_place', 'view_overview', 'explore_nearby'],
        searchPatterns: ['near me', 'best', 'how to']
    },

    // Journalist signals
    JOURNALIST: {
        metrics: ['rankings', 'trends', 'comparisons', 'outliers'],
        actions: ['compare_places', 'view_narratives', 'export_snapshot'],
        searchPatterns: ['top', 'worst', 'story']
    }
}

/**
 * User behavior tracker
 */
class PersonaInferenceEngine {
    constructor() {
        this.behaviorLog = []
        this.sessionStart = Date.now()
    }

    /**
     * Track user action (Story 151: Silent inference)
     * @param {string} actionType - Type of action
     * @param {Object} metadata - Action metadata
     */
    trackAction(actionType, metadata = {}) {
        this.behaviorLog.push({
            action: actionType,
            metadata,
            timestamp: Date.now()
        })

        // Limit log size
        if (this.behaviorLog.length > 100) {
            this.behaviorLog.shift()
        }
    }

    /**
     * Infer persona from behavior (Story 151: Never ask "Who are you?")
     * @returns {Object} Inferred persona with confidence
     */
    inferPersona() {
        if (this.behaviorLog.length < 3) {
            return {
                persona: PersonaType.UNKNOWN,
                confidence: 0,
                reason: 'Insufficient behavior data'
            }
        }

        const scores = {
            [PersonaType.RESEARCHER]: 0,
            [PersonaType.INVESTOR]: 0,
            [PersonaType.POLICYMAKER]: 0,
            [PersonaType.CITIZEN]: 0,
            [PersonaType.JOURNALIST]: 0
        }

        // Analyze behavior patterns
        this.behaviorLog.forEach(log => {
            Object.entries(BehaviorSignals).forEach(([persona, signals]) => {
                // Check action match
                if (signals.actions.includes(log.action)) {
                    scores[PersonaType[persona]] += 2
                }

                // Check metric interest
                if (log.metadata.metric && signals.metrics.includes(log.metadata.metric)) {
                    scores[PersonaType[persona]] += 1
                }

                // Check search patterns
                if (log.metadata.searchQuery) {
                    const query = log.metadata.searchQuery.toLowerCase()
                    if (signals.searchPatterns.some(pattern => query.includes(pattern))) {
                        scores[PersonaType[persona]] += 1.5
                    }
                }
            })
        })

        // Find highest score
        const maxScore = Math.max(...Object.values(scores))
        const inferredPersona = Object.keys(scores).find(p => scores[p] === maxScore)

        const confidence = Math.min(100, (maxScore / this.behaviorLog.length) * 100)

        return {
            persona: inferredPersona || PersonaType.UNKNOWN,
            confidence: Math.round(confidence),
            scores,
            reason: confidence > 50 ? 'Behavior pattern detected' : 'Low confidence inference'
        }
    }

    /**
     * Get personalized content hints (never forced)
     * @returns {Object} Content suggestions
     */
    getContentHints() {
        const inference = this.inferPersona()

        if (inference.confidence < 30) {
            return {
                showAll: true,
                prioritize: []
            }
        }

        const hints = {
            [PersonaType.RESEARCHER]: {
                prioritize: ['sources', 'methodology', 'data_quality'],
                emphasize: ['confidence_scores', 'temporal_validity']
            },
            [PersonaType.INVESTOR]: {
                prioritize: ['opportunities', 'infrastructure', 'growth_metrics'],
                emphasize: ['business_density', 'connectivity']
            },
            [PersonaType.POLICYMAKER]: {
                prioritize: ['gaps', 'comparisons', 'development_metrics'],
                emphasize: ['scoped_rankings', 'district_level']
            },
            [PersonaType.CITIZEN]: {
                prioritize: ['overview', 'services', 'accessibility'],
                emphasize: ['schools', 'hospitals', 'safety']
            },
            [PersonaType.JOURNALIST]: {
                prioritize: ['narratives', 'comparisons', 'outliers'],
                emphasize: ['rankings', 'trends']
            }
        }

        return hints[inference.persona] || { showAll: true, prioritize: [] }
    }

    /**
     * Reset behavior log
     */
    reset() {
        this.behaviorLog = []
        this.sessionStart = Date.now()
    }
}

// Singleton instance
const personaEngine = new PersonaInferenceEngine()

export default personaEngine
export { PersonaInferenceEngine }
