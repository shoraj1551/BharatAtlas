// Knowledge Type System
// Explicit epistemic classification for all data points
// Forces declaration of what kind of knowledge each piece of information represents

/**
 * Knowledge Types (non-negotiable)
 * Every data point MUST declare one of these types
 */
export const KnowledgeType = {
    VERIFIED_FACT: 'verified_fact',           // Human-verified, cross-referenced fact
    OFFICIAL_STATISTIC: 'official_statistic', // Government/census official data
    LOCAL_REPORT: 'local_report',             // Ground reports, surveys, local sources
    AI_INFERENCE: 'ai_inference',             // AI-generated insight or inference
    UNKNOWN: 'unknown'                         // Epistemic type not determined
}

/**
 * Knowledge Type Metadata
 */
export const KnowledgeTypeMetadata = {
    [KnowledgeType.VERIFIED_FACT]: {
        label: 'Verified Fact',
        description: 'Human-verified, cross-referenced factual information',
        trustLevel: 'highest',
        color: '#2e7d32',
        icon: '✓',
        requiresSource: true,
        requiresVerification: true
    },
    [KnowledgeType.OFFICIAL_STATISTIC]: {
        label: 'Official Statistic',
        description: 'Government or census official statistical data',
        trustLevel: 'high',
        color: '#1976d2',
        icon: '📊',
        requiresSource: true,
        requiresVerification: false
    },
    [KnowledgeType.LOCAL_REPORT]: {
        label: 'Local Report',
        description: 'Ground reports, surveys, or local source information',
        trustLevel: 'medium',
        color: '#f57c00',
        icon: '📍',
        requiresSource: true,
        requiresVerification: false
    },
    [KnowledgeType.AI_INFERENCE]: {
        label: 'AI Inference',
        description: 'AI-generated insight or inference from available data',
        trustLevel: 'low',
        color: '#7b1fa2',
        icon: '🤖',
        requiresSource: false,
        requiresVerification: false
    },
    [KnowledgeType.UNKNOWN]: {
        label: 'Unknown',
        description: 'Epistemic type not determined',
        trustLevel: 'none',
        color: '#616161',
        icon: '?',
        requiresSource: false,
        requiresVerification: false
    }
}

/**
 * Knowledge Declaration Schema
 * Wrapper for any data point with epistemic metadata
 */
export const KnowledgeDeclarationSchema = {
    knowledge_type: 'KnowledgeType',          // REQUIRED: Epistemic type
    value: 'any',                              // The actual data
    source_ids: 'array<string>',              // Source references
    verified: 'boolean',                       // Human verification status
    verified_by: 'string|null',               // Verifier ID
    verified_date: 'ISO8601 timestamp|null',  // Verification timestamp
    confidence: 'number',                      // 0-100 confidence score
    last_updated: 'ISO8601 timestamp',        // Last update timestamp
    notes: 'string|null'                       // Additional context
}

/**
 * Create knowledge declaration
 * @param {Object} params - Declaration parameters
 * @returns {Object} Knowledge declaration
 */
export function createKnowledgeDeclaration({
    knowledge_type,
    value,
    source_ids = [],
    verified = false,
    verified_by = null,
    verified_date = null,
    confidence = 50,
    notes = null
}) {
    // CRITICAL: knowledge_type is REQUIRED
    if (!knowledge_type || !Object.values(KnowledgeType).includes(knowledge_type)) {
        throw new Error(`Invalid or missing knowledge_type. Must be one of: ${Object.values(KnowledgeType).join(', ')}`)
    }

    const metadata = KnowledgeTypeMetadata[knowledge_type]

    // Validate requirements
    if (metadata.requiresSource && source_ids.length === 0) {
        console.warn(`Knowledge type "${knowledge_type}" requires sources but none provided`)
    }

    if (metadata.requiresVerification && !verified) {
        console.warn(`Knowledge type "${knowledge_type}" requires verification but not verified`)
    }

    return {
        knowledge_type,
        value,
        source_ids,
        verified,
        verified_by,
        verified_date,
        confidence,
        last_updated: new Date().toISOString(),
        notes
    }
}

/**
 * Validate knowledge declaration
 * @param {Object} declaration - Knowledge declaration
 * @returns {Object} Validation result
 */
export function validateKnowledgeDeclaration(declaration) {
    const errors = []

    // Check required field
    if (!declaration.knowledge_type) {
        errors.push('Missing required field: knowledge_type')
    } else if (!Object.values(KnowledgeType).includes(declaration.knowledge_type)) {
        errors.push(`Invalid knowledge_type: ${declaration.knowledge_type}`)
    }

    if (declaration.value === undefined || declaration.value === null) {
        errors.push('Missing required field: value')
    }

    // Check metadata requirements
    if (declaration.knowledge_type) {
        const metadata = KnowledgeTypeMetadata[declaration.knowledge_type]

        if (metadata.requiresSource && (!declaration.source_ids || declaration.source_ids.length === 0)) {
            errors.push(`Knowledge type "${declaration.knowledge_type}" requires sources`)
        }

        if (metadata.requiresVerification && !declaration.verified) {
            errors.push(`Knowledge type "${declaration.knowledge_type}" requires verification`)
        }
    }

    return {
        valid: errors.length === 0,
        errors
    }
}

/**
 * Get knowledge type label
 * @param {string} knowledgeType - Knowledge type
 * @returns {string} Human-readable label
 */
export function getKnowledgeTypeLabel(knowledgeType) {
    return KnowledgeTypeMetadata[knowledgeType]?.label || 'Unknown'
}

/**
 * Get knowledge type color
 * @param {string} knowledgeType - Knowledge type
 * @returns {string} Color code
 */
export function getKnowledgeTypeColor(knowledgeType) {
    return KnowledgeTypeMetadata[knowledgeType]?.color || '#616161'
}

export default {
    KnowledgeType,
    KnowledgeTypeMetadata,
    KnowledgeDeclarationSchema,
    createKnowledgeDeclaration,
    validateKnowledgeDeclaration,
    getKnowledgeTypeLabel,
    getKnowledgeTypeColor
}
