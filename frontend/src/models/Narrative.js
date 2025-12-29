// Narrative Data Model
// Strict schema for place narratives to ensure trustworthiness and policy compliance
// Reference: docs/narrative-engine.md

/**
 * Narrative Section Types
 * Fixed sections that structure all place narratives
 */
export const NarrativeSectionType = {
    GEOGRAPHIC_CONTEXT: 'geographic_context',
    DEMOGRAPHIC_OVERVIEW: 'demographic_overview',
    ECONOMIC_PROFILE: 'economic_profile',
    INFRASTRUCTURE: 'infrastructure',
    GOVERNANCE: 'governance',
    HISTORICAL_NOTE: 'historical_note'
}

/**
 * Confidence Levels
 * Explicit markers for narrative reliability
 */
export const ConfidenceLevel = {
    VERIFIED: 'verified',           // From official sources (Census, Survey of India)
    HIGH: 'high',                    // Multiple corroborating sources
    MEDIUM: 'medium',                // Single reliable source
    LOW: 'low',                      // Inferred or estimated
    UNVERIFIED: 'unverified'         // No source available
}

/**
 * Narrative Tone
 * Enforces neutral, factual communication
 */
export const NarrativeTone = {
    NEUTRAL: 'neutral',              // Default: No praise, no blame
    FACTUAL: 'factual',              // Data-driven statements only
    DESCRIPTIVE: 'descriptive'       // Observable characteristics
}

/**
 * Source Type
 * Tracks provenance of narrative content
 */
export const SourceType = {
    CENSUS: 'census',
    SURVEY_OF_INDIA: 'survey_of_india',
    GOVERNMENT_REPORT: 'government_report',
    VERIFIED_DATABASE: 'verified_database',
    AI_GENERATED: 'ai_generated',
    USER_CONTRIBUTED: 'user_contributed'
}

/**
 * Narrative Section Schema
 * Each section follows this structure
 */
export const NarrativeSectionSchema = {
    section_type: 'NarrativeSectionType',
    content: 'string',
    confidence: 'ConfidenceLevel',
    tone: 'NarrativeTone',
    source: 'SourceType',
    source_detail: 'string|null',
    generated_at: 'ISO8601 timestamp',
    human_verified: 'boolean',
    verification_date: 'ISO8601 timestamp|null',
    word_count: 'integer',
    contains_numbers: 'boolean',
    contains_claims: 'boolean'
}

/**
 * Complete Narrative Model
 * Full structure for a place narrative
 */
export const NarrativeModel = {
    place_id: 'string',
    narrative_version: 'integer',
    created_at: 'ISO8601 timestamp',
    last_updated: 'ISO8601 timestamp',

    // Fixed sections (all optional but structured)
    sections: {
        geographic_context: 'NarrativeSectionSchema|null',
        demographic_overview: 'NarrativeSectionSchema|null',
        economic_profile: 'NarrativeSectionSchema|null',
        infrastructure: 'NarrativeSectionSchema|null',
        governance: 'NarrativeSectionSchema|null',
        historical_note: 'NarrativeSectionSchema|null'
    },

    // Overall narrative metadata
    overall_confidence: 'ConfidenceLevel',
    human_reviewed: 'boolean',
    review_date: 'ISO8601 timestamp|null',
    reviewer_id: 'string|null',

    // Policy compliance
    contains_sensitive_content: 'boolean',
    policy_flags: 'array<string>',
    approved_for_public: 'boolean'
}

/**
 * Narrative Validation Rules
 */
export const NarrativeRules = {
    // Content rules
    MAX_SECTION_WORDS: 150,
    MIN_SECTION_WORDS: 20,

    // Tone rules
    FORBIDDEN_WORDS: [
        'best', 'worst', 'amazing', 'terrible', 'perfect', 'horrible',
        'beautiful', 'ugly', 'great', 'poor', 'excellent', 'bad'
    ],

    // Required elements
    REQUIRED_SECTIONS: ['geographic_context', 'demographic_overview'],

    // Confidence thresholds
    MIN_CONFIDENCE_FOR_PUBLIC: 'medium',
    REQUIRES_HUMAN_REVIEW: ['low', 'unverified']
}

/**
 * Helper: Create empty narrative section
 */
export const createNarrativeSection = (type, content, options = {}) => {
    return {
        section_type: type,
        content: content,
        confidence: options.confidence || ConfidenceLevel.UNVERIFIED,
        tone: options.tone || NarrativeTone.NEUTRAL,
        source: options.source || SourceType.AI_GENERATED,
        source_detail: options.source_detail || null,
        generated_at: new Date().toISOString(),
        human_verified: options.human_verified || false,
        verification_date: options.verification_date || null,
        word_count: content.split(/\s+/).length,
        contains_numbers: /\d/.test(content),
        contains_claims: options.contains_claims || false
    }
}

/**
 * Helper: Validate narrative section
 */
export const validateNarrativeSection = (section) => {
    const errors = []

    // Check word count
    if (section.word_count > NarrativeRules.MAX_SECTION_WORDS) {
        errors.push(`Section exceeds maximum word count (${NarrativeRules.MAX_SECTION_WORDS})`)
    }

    if (section.word_count < NarrativeRules.MIN_SECTION_WORDS) {
        errors.push(`Section below minimum word count (${NarrativeRules.MIN_SECTION_WORDS})`)
    }

    // Check for forbidden words (tone enforcement)
    const lowerContent = section.content.toLowerCase()
    const foundForbidden = NarrativeRules.FORBIDDEN_WORDS.filter(word =>
        lowerContent.includes(word)
    )

    if (foundForbidden.length > 0) {
        errors.push(`Contains forbidden words: ${foundForbidden.join(', ')}`)
    }

    return {
        valid: errors.length === 0,
        errors
    }
}

export default {
    NarrativeSectionType,
    ConfidenceLevel,
    NarrativeTone,
    SourceType,
    NarrativeSectionSchema,
    NarrativeModel,
    NarrativeRules,
    createNarrativeSection,
    validateNarrativeSection
}
