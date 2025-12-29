// Trust Reminders & Coverage Audit
// Journey-level trust and persona coverage tracking (Stories 169-170)

/**
 * Get journey-specific trust reminder (Story 169)
 * @param {string} persona - Persona type
 * @returns {Object} Trust reminder
 */
export function getJourneyTrustReminder(persona) {
    // Story 169: Each journey reinforces epistemic limits

    const reminders = {
        researcher: {
            title: 'Data Limitations',
            points: [
                'All data has collection biases',
                'Methodology affects interpretation',
                'Temporal gaps exist in coverage',
                'Cross-verify with multiple sources'
            ],
            footer: 'Research requires critical evaluation of all sources, including this one.'
        },

        policymaker: {
            title: 'Context Matters',
            points: [
                'Data shows patterns, not causes',
                'Local context is irreplaceable',
                'Peer comparisons have limits',
                'Ground truth verification essential'
            ],
            footer: 'Policy decisions require local knowledge beyond what data can show.'
        },

        investor: {
            title: 'Due Diligence Required',
            points: [
                'Signals are not guarantees',
                'Market dynamics change rapidly',
                'Local validation is mandatory',
                'Risks may not be fully captured'
            ],
            footer: 'Investment decisions require comprehensive due diligence beyond this analysis.'
        },

        citizen: {
            title: 'Your Experience Matters',
            points: [
                'Data represents averages, not individuals',
                'Your local experience is valid',
                'Numbers don\'t capture everything',
                'Community knowledge is valuable'
            ],
            footer: 'Data informs but doesn\'t replace lived experience.'
        },

        student: {
            title: 'Keep Learning',
            points: [
                'This is an introduction, not the full story',
                'Real places are more complex',
                'Ask questions and explore more',
                'Multiple perspectives matter'
            ],
            footer: 'Learning is a journey. Keep exploring and asking questions.'
        }
    }

    return reminders[persona] || {
        title: 'Data Has Limits',
        points: ['All information has limitations', 'Context matters', 'Verify independently'],
        footer: 'Use this information as one input among many.'
    }
}

/**
 * Persona coverage audit (Story 170)
 * @param {Object} contentInventory - Available content
 * @returns {Object} Coverage analysis
 */
export function auditPersonaCoverage(contentInventory) {
    // Story 170: Track which personas are underserved

    const personas = ['researcher', 'policymaker', 'investor', 'citizen', 'student']
    const coverage = {}

    personas.forEach(persona => {
        coverage[persona] = {
            hasJourney: !!contentInventory[`${persona}_journey`],
            hasDefaults: !!contentInventory[`${persona}_defaults`],
            hasExamples: !!contentInventory[`${persona}_examples`],
            hasTrustReminder: !!contentInventory[`${persona}_trust`],
            hasExitGuidance: !!contentInventory[`${persona}_exit`],

            // Calculate coverage score
            score: 0
        }

        // Calculate score
        const checks = [
            coverage[persona].hasJourney,
            coverage[persona].hasDefaults,
            coverage[persona].hasExamples,
            coverage[persona].hasTrustReminder,
            coverage[persona].hasExitGuidance
        ]

        coverage[persona].score = (checks.filter(Boolean).length / checks.length) * 100
    })

    // Identify underserved personas
    const underserved = Object.entries(coverage)
        .filter(([_, data]) => data.score < 80)
        .map(([persona, data]) => ({
            persona,
            score: data.score,
            missing: getMissingElements(data)
        }))

    return {
        coverage,
        underserved,
        overallScore: Math.round(
            Object.values(coverage).reduce((sum, p) => sum + p.score, 0) / personas.length
        ),
        recommendation: underserved.length > 0
            ? `Improve coverage for: ${underserved.map(u => u.persona).join(', ')}`
            : 'All personas adequately served'
    }
}

/**
 * Get missing elements for persona
 */
function getMissingElements(personaData) {
    const missing = []

    if (!personaData.hasJourney) missing.push('journey')
    if (!personaData.hasDefaults) missing.push('defaults')
    if (!personaData.hasExamples) missing.push('examples')
    if (!personaData.hasTrustReminder) missing.push('trust_reminder')
    if (!personaData.hasExitGuidance) missing.push('exit_guidance')

    return missing
}

/**
 * Generate coverage report
 * @param {Object} audit - Audit result
 * @returns {string} Formatted report
 */
export function generateCoverageReport(audit) {
    let report = `# Persona Coverage Audit\n\n`
    report += `Overall Score: ${audit.overallScore}%\n\n`

    if (audit.underserved.length > 0) {
        report += `## Underserved Personas\n\n`
        audit.underserved.forEach(u => {
            report += `- **${u.persona}** (${u.score}%): Missing ${u.missing.join(', ')}\n`
        })
    } else {
        report += `✅ All personas adequately served\n`
    }

    report += `\n## Detailed Coverage\n\n`
    Object.entries(audit.coverage).forEach(([persona, data]) => {
        report += `### ${persona} (${data.score}%)\n`
        report += `- Journey: ${data.hasJourney ? '✅' : '❌'}\n`
        report += `- Defaults: ${data.hasDefaults ? '✅' : '❌'}\n`
        report += `- Examples: ${data.hasExamples ? '✅' : '❌'}\n`
        report += `- Trust Reminder: ${data.hasTrustReminder ? '✅' : '❌'}\n`
        report += `- Exit Guidance: ${data.hasExitGuidance ? '✅' : '❌'}\n\n`
    })

    return report
}

export default {
    getJourneyTrustReminder,
    auditPersonaCoverage,
    generateCoverageReport
}
