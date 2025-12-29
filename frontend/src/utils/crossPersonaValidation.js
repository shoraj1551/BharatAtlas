// Cross-Persona Validation
// Ensure different views don't contradict facts (Story 161)

/**
 * Validate cross-persona consistency (Story 161)
 * @param {Object} place - Place object
 * @param {Object} personaViews - Views for different personas
 * @returns {Object} Validation result
 */
export function validateCrossPersonaConsistency(place, personaViews) {
    const contradictions = []
    const warnings = []

    // Extract facts from each persona view
    const facts = {
        policymaker: extractFacts(personaViews.policymaker),
        entrepreneur: extractFacts(personaViews.entrepreneur),
        researcher: extractFacts(personaViews.researcher),
        student: extractFacts(personaViews.student),
        citizen: extractFacts(personaViews.citizen)
    }

    // Story 161: Different lenses, same truth
    // Check for contradictions
    const allFacts = Object.values(facts).flat()
    const factsByMetric = groupFactsByMetric(allFacts)

    Object.entries(factsByMetric).forEach(([metric, metricFacts]) => {
        const uniqueValues = [...new Set(metricFacts.map(f => f.value))]

        if (uniqueValues.length > 1) {
            contradictions.push({
                metric,
                issue: 'Different values across personas',
                values: uniqueValues,
                severity: 'critical'
            })
        }
    })

    // Check for interpretation conflicts
    const interpretations = extractInterpretations(personaViews)
    const conflicts = detectInterpretationConflicts(interpretations)

    conflicts.forEach(conflict => {
        warnings.push({
            issue: conflict.description,
            personas: conflict.personas,
            severity: 'warning'
        })
    })

    return {
        valid: contradictions.length === 0,
        contradictions,
        warnings,
        recommendation: contradictions.length > 0
            ? 'Fix data inconsistencies before publishing'
            : 'All persona views are consistent'
    }
}

/**
 * Extract facts from persona view
 */
function extractFacts(personaView) {
    const facts = []

    if (!personaView) return facts

    // Extract numeric facts
    Object.entries(personaView).forEach(([key, value]) => {
        if (typeof value === 'number') {
            facts.push({ metric: key, value, type: 'numeric' })
        } else if (value && typeof value === 'object' && value.value !== undefined) {
            facts.push({ metric: key, value: value.value, type: 'numeric' })
        }
    })

    return facts
}

/**
 * Group facts by metric
 */
function groupFactsByMetric(facts) {
    return facts.reduce((groups, fact) => {
        if (!groups[fact.metric]) {
            groups[fact.metric] = []
        }
        groups[fact.metric].push(fact)
        return groups
    }, {})
}

/**
 * Extract interpretations
 */
function extractInterpretations(personaViews) {
    return {
        policymaker: personaViews.policymaker?.summary || null,
        entrepreneur: personaViews.entrepreneur?.summary || null,
        researcher: personaViews.researcher?.summary || null,
        student: personaViews.student?.story || null,
        citizen: personaViews.citizen?.identity || null
    }
}

/**
 * Detect interpretation conflicts
 */
function detectInterpretationConflicts(interpretations) {
    const conflicts = []

    // Check for tone conflicts (e.g., one positive, one negative about same thing)
    // This is a simplified check - in production, use NLP

    const tones = Object.entries(interpretations).map(([persona, text]) => ({
        persona,
        tone: analyzeTone(text)
    }))

    // If tones are drastically different, flag as potential conflict
    const positiveTones = tones.filter(t => t.tone === 'positive').length
    const negativeTones = tones.filter(t => t.tone === 'negative').length

    if (positiveTones > 0 && negativeTones > 0) {
        conflicts.push({
            description: 'Mixed sentiment across personas - verify consistency',
            personas: tones.map(t => t.persona)
        })
    }

    return conflicts
}

/**
 * Analyze tone (simplified)
 */
function analyzeTone(text) {
    if (!text) return 'neutral'

    const positiveWords = ['good', 'strong', 'high', 'excellent', 'opportunity']
    const negativeWords = ['poor', 'low', 'weak', 'limited', 'constraint']

    const textLower = text.toLowerCase()
    const hasPositive = positiveWords.some(word => textLower.includes(word))
    const hasNegative = negativeWords.some(word => textLower.includes(word))

    if (hasPositive && !hasNegative) return 'positive'
    if (hasNegative && !hasPositive) return 'negative'
    return 'neutral'
}

export default {
    validateCrossPersonaConsistency
}
