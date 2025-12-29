// Signal System
// Multi-factor opportunity signals with transparency and counter-signals

/**
 * Signal Types
 */
export const SignalType = {
    OPPORTUNITY: 'opportunity',
    RISK: 'risk',
    NEUTRAL: 'neutral'
}

/**
 * Create opportunity signal (Story 138: Multi-factor required)
 * @param {Object} params - Signal parameters
 * @returns {Object} Signal or null
 */
export function createOpportunitySignal({ place, inputs, category }) {
    // Story 138: At least 3 inputs required
    if (!inputs || inputs.length < 3) {
        console.warn('Signal requires at least 3 inputs - single-metric signals not allowed')
        return null
    }

    // Story 139: Signal transparency - track all inputs
    const signal = {
        id: `signal_${Date.now()}`,
        type: SignalType.OPPORTUNITY,
        category,
        place_id: place.place_id,

        // Story 139: Transparency panel - show all factors
        factors: inputs.map(input => ({
            name: input.name,
            value: input.value,
            weight: input.weight || 1,
            contribution: input.contribution
        })),

        // Story 137: Signal ≠ Recommendation
        disclaimer: 'This is a signal, not a recommendation.',

        createdAt: new Date().toISOString()
    }

    // Story 140: Counter-signals (risks) must be shown
    signal.counterSignals = detectCounterSignals(place, category)

    return signal
}

/**
 * Detect counter-signals/risks (Story 140)
 * @param {Object} place - Place object
 * @param {string} category - Opportunity category
 * @returns {Array} Counter-signals
 */
function detectCounterSignals(place, category) {
    const counterSignals = []

    // Example counter-signals based on category
    if (category === 'agriculture') {
        if (place.waterAvailability === 'low') {
            counterSignals.push({
                type: SignalType.RISK,
                message: 'Low water availability',
                severity: 'high'
            })
        }
        if (place.soilQuality === 'poor') {
            counterSignals.push({
                type: SignalType.RISK,
                message: 'Poor soil quality',
                severity: 'medium'
            })
        }
    }

    if (category === 'tourism') {
        if (place.connectivity === 'poor') {
            counterSignals.push({
                type: SignalType.RISK,
                message: 'Limited connectivity',
                severity: 'high'
            })
        }
    }

    return counterSignals
}

/**
 * Calculate weighted score (Story 143: User-selected weighting)
 * @param {Array} factors - Factors with values
 * @param {Object} weights - User-selected weights
 * @returns {number} Weighted score
 */
export function calculateWeightedScore(factors, weights = {}) {
    let totalScore = 0
    let totalWeight = 0

    factors.forEach(factor => {
        const weight = weights[factor.name] || factor.weight || 1
        totalScore += factor.value * weight
        totalWeight += weight
    })

    return totalWeight > 0 ? totalScore / totalWeight : 0
}

/**
 * Generate signal transparency panel data (Story 139)
 * @param {Object} signal - Signal object
 * @returns {Object} Transparency data
 */
export function getSignalTransparency(signal) {
    return {
        factors: signal.factors.map(f => ({
            name: f.name,
            value: f.value,
            contribution: f.contribution,
            explanation: `${f.name}: ${f.value}`
        })),
        counterSignals: signal.counterSignals || [],
        disclaimer: signal.disclaimer,
        methodology: 'Multi-factor analysis based on observable data points'
    }
}

export default {
    SignalType,
    createOpportunitySignal,
    calculateWeightedScore,
    getSignalTransparency
}
