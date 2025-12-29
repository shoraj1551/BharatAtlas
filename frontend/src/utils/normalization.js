// Normalization Disclosure System
// Ensures users know when numbers are normalized

/**
 * Normalization Types
 */
export const NormalizationType = {
    NONE: 'none',                           // Raw, unnormalized data
    PER_CAPITA: 'per_capita',              // Per person
    PER_SQUARE_KM: 'per_square_km',        // Per square kilometer
    PER_THOUSAND: 'per_thousand',          // Per 1,000 people
    PER_LAKH: 'per_lakh',                  // Per 1,00,000 people
    PERCENTAGE: 'percentage',               // As percentage
    INDEX: 'index',                         // Indexed to base value
    STANDARDIZED: 'standardized'            // Z-score or similar
}

/**
 * Normalization Metadata
 */
export const NormalizationMetadata = {
    [NormalizationType.NONE]: {
        label: 'Raw Data',
        description: 'Unnormalized, original values',
        suffix: ''
    },
    [NormalizationType.PER_CAPITA]: {
        label: 'Per Capita',
        description: 'Normalized per person',
        suffix: 'per person'
    },
    [NormalizationType.PER_SQUARE_KM]: {
        label: 'Per km²',
        description: 'Normalized per square kilometer',
        suffix: 'per km²'
    },
    [NormalizationType.PER_THOUSAND]: {
        label: 'Per 1,000',
        description: 'Normalized per 1,000 people',
        suffix: 'per 1,000'
    },
    [NormalizationType.PER_LAKH]: {
        label: 'Per Lakh',
        description: 'Normalized per 1,00,000 people',
        suffix: 'per lakh'
    },
    [NormalizationType.PERCENTAGE]: {
        label: 'Percentage',
        description: 'Expressed as percentage',
        suffix: '%'
    },
    [NormalizationType.INDEX]: {
        label: 'Index',
        description: 'Indexed to base value',
        suffix: '(indexed)'
    },
    [NormalizationType.STANDARDIZED]: {
        label: 'Standardized',
        description: 'Standardized score (z-score)',
        suffix: '(std)'
    }
}

/**
 * Create normalized value with disclosure
 * @param {Object} params - Normalization parameters
 * @returns {Object} Normalized value with metadata
 */
export function createNormalizedValue({
    raw_value,
    normalized_value,
    normalization_type,
    base_value = null,
    formula = null
}) {
    if (normalization_type === NormalizationType.NONE) {
        return {
            value: raw_value,
            normalized: false,
            normalization_type: NormalizationType.NONE,
            display_value: raw_value
        }
    }

    const metadata = NormalizationMetadata[normalization_type]

    return {
        raw_value,
        normalized_value,
        normalized: true,
        normalization_type,
        base_value,
        formula,
        display_value: `${normalized_value} ${metadata.suffix}`,
        disclosure: `This value is normalized (${metadata.description}). Raw value: ${raw_value}`
    }
}

/**
 * Format normalized value for display
 * @param {Object} normalizedValue - Normalized value object
 * @returns {string} Formatted display string
 */
export function formatNormalizedValue(normalizedValue) {
    if (!normalizedValue.normalized) {
        return String(normalizedValue.value)
    }

    const metadata = NormalizationMetadata[normalizedValue.normalization_type]
    return `${normalizedValue.normalized_value} ${metadata.suffix}`
}

/**
 * Get normalization disclosure text
 * @param {Object} normalizedValue - Normalized value object
 * @returns {string} Disclosure text
 */
export function getNormalizationDisclosure(normalizedValue) {
    if (!normalizedValue.normalized) {
        return null
    }

    const metadata = NormalizationMetadata[normalizedValue.normalization_type]
    const parts = [
        `ℹ️ Normalized: ${metadata.description}`,
        `Raw value: ${normalizedValue.raw_value}`
    ]

    if (normalizedValue.base_value) {
        parts.push(`Base: ${normalizedValue.base_value}`)
    }

    if (normalizedValue.formula) {
        parts.push(`Formula: ${normalizedValue.formula}`)
    }

    return parts.join(' | ')
}

export default {
    NormalizationType,
    NormalizationMetadata,
    createNormalizedValue,
    formatNormalizedValue,
    getNormalizationDisclosure
}
