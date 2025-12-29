// Researcher Journey
// Raw data first, methodology transparency (Stories 156-157)

/**
 * Data Presentation Modes
 */
export const DataMode = {
    RAW: 'raw',                    // Raw data tables
    INTERPRETED: 'interpreted',     // Analysis and insights
    BOTH: 'both'                   // Side by side
}

/**
 * Format raw data for researchers (Story 156)
 * @param {Object} place - Place object
 * @param {string} metric - Metric name
 * @returns {Object} Raw data with metadata
 */
export function formatRawData(place, metric) {
    const rawValue = place[metric]

    return {
        metric,
        value: rawValue?.value || rawValue,
        unit: rawValue?.unit || 'unknown',

        // Story 156: Raw before interpreted
        dataType: rawValue?.knowledge_type || 'unknown',
        collectionDate: rawValue?.collection_date || 'unknown',
        collectionMethod: rawValue?.collection_method || 'unknown',
        sampleSize: rawValue?.sample_size || null,

        // Metadata
        source: rawValue?.source_id || null,
        confidence: rawValue?.confidence || null,
        lastUpdated: rawValue?.last_updated || null,

        // Story 157: Methodology
        methodology: getMethodology(metric, rawValue)
    }
}

/**
 * Get methodology for metric (Story 157)
 * @param {string} metric - Metric name
 * @param {Object} rawValue - Raw value object
 * @returns {Object} Methodology details
 */
function getMethodology(metric, rawValue) {
    // Default methodology templates
    const methodologies = {
        population: {
            method: 'Census enumeration',
            formula: 'Direct count of individuals',
            assumptions: ['Complete coverage', 'Accurate reporting'],
            limitations: ['Undercounting possible', 'Homeless population may be missed']
        },
        literacy_rate: {
            method: 'Census survey',
            formula: '(Literate population / Total population aged 7+) × 100',
            assumptions: ['Self-reported literacy', 'Age 7+ threshold'],
            limitations: ['Functional literacy not measured', 'Quality of education not captured']
        },
        gdp: {
            method: 'Economic survey and estimation',
            formula: 'Sum of value added across sectors',
            assumptions: ['Formal economy captured', 'Sectoral estimates accurate'],
            limitations: ['Informal economy underestimated', 'Black money not included']
        }
    }

    const template = methodologies[metric] || {
        method: rawValue?.collection_method || 'Unknown',
        formula: 'Not disclosed',
        assumptions: ['Standard statistical methods'],
        limitations: ['Methodology details not available']
    }

    return {
        ...template,
        // Story 157: Expose how conclusions were formed
        derivedFrom: rawValue?.derived_from || null,
        calculationSteps: rawValue?.calculation_steps || null,
        qualityChecks: rawValue?.quality_checks || []
    }
}

/**
 * Generate researcher view (Story 156)
 * @param {Object} place - Place object
 * @param {Array} metrics - Metrics to display
 * @returns {Object} Researcher-optimized view
 */
export function generateResearcherView(place, metrics) {
    return {
        place_id: place.place_id,
        canonical_name: place.canonical_name,

        // Story 156: Raw data first
        rawData: metrics.map(m => formatRawData(place, m)),

        // Interpretations come second
        interpretations: {
            summary: place.overview || null,
            insights: place.insights || []
        },

        // Full metadata access
        metadata: {
            dataSnapshot: place.data_snapshot_id || null,
            lastUpdated: place.last_updated || null,
            completeness: calculateDataCompleteness(place, metrics)
        }
    }
}

/**
 * Calculate data completeness
 * @param {Object} place - Place object
 * @param {Array} metrics - Metrics to check
 * @returns {Object} Completeness assessment
 */
function calculateDataCompleteness(place, metrics) {
    const available = metrics.filter(m => place[m] !== undefined && place[m] !== null).length
    const percentage = Math.round((available / metrics.length) * 100)

    return {
        available,
        total: metrics.length,
        percentage,
        missing: metrics.filter(m => place[m] === undefined || place[m] === null)
    }
}

/**
 * Export methodology documentation (Story 157)
 * @param {string} metric - Metric name
 * @returns {string} Formatted methodology
 */
export function exportMethodology(metric, rawValue) {
    const methodology = getMethodology(metric, rawValue)

    return `
# Methodology: ${metric}

## Collection Method
${methodology.method}

## Formula
${methodology.formula}

## Assumptions
${methodology.assumptions.map((a, i) => `${i + 1}. ${a}`).join('\n')}

## Limitations
${methodology.limitations.map((l, i) => `${i + 1}. ${l}`).join('\n')}

${methodology.derivedFrom ? `\n## Derived From\n${methodology.derivedFrom}` : ''}
${methodology.calculationSteps ? `\n## Calculation Steps\n${methodology.calculationSteps}` : ''}
  `.trim()
}

export default {
    DataMode,
    formatRawData,
    generateResearcherView,
    exportMethodology
}
