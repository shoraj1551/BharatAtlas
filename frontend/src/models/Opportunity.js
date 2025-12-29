// Opportunity Data Model
// Structured, comparable, and explainable opportunities
// Prevents hype and enforces reasoning

/**
 * Opportunity Categories
 * Fixed categories for classification and comparison
 */
export const OpportunityCategory = {
    INFRASTRUCTURE: 'infrastructure',
    AGRICULTURE: 'agriculture',
    MANUFACTURING: 'manufacturing',
    SERVICES: 'services',
    TECHNOLOGY: 'technology',
    TOURISM: 'tourism',
    EDUCATION: 'education',
    HEALTHCARE: 'healthcare',
    RENEWABLE_ENERGY: 'renewable_energy',
    REAL_ESTATE: 'real_estate'
}

/**
 * Confidence Levels
 * Explicit markers for opportunity reliability
 */
export const OpportunityConfidence = {
    HIGH: 'high',       // Strong data support, multiple indicators
    MEDIUM: 'medium',   // Some data support, reasonable inference
    LOW: 'low'          // Limited data, speculative
}

/**
 * Opportunity Status
 */
export const OpportunityStatus = {
    ACTIVE: 'active',
    EXPIRED: 'expired',
    UNDER_REVIEW: 'under_review',
    ARCHIVED: 'archived'
}

/**
 * Reasoning Type
 * Categorizes the type of reasoning behind the opportunity
 */
export const ReasoningType = {
    DATA_DRIVEN: 'data_driven',           // Based on statistical data
    TREND_ANALYSIS: 'trend_analysis',     // Based on observed trends
    GAP_ANALYSIS: 'gap_analysis',         // Based on identified gaps
    POLICY_DRIVEN: 'policy_driven',       // Based on government policy
    INFRASTRUCTURE_DRIVEN: 'infrastructure_driven' // Based on infrastructure development
}

/**
 * Opportunity Schema
 * Complete structure for an opportunity
 */
export const OpportunitySchema = {
    // Identity
    id: 'string',
    place_id: 'string',

    // Core content
    title: 'string',
    category: 'OpportunityCategory',
    description: 'string',

    // Mandatory reasoning
    reasoning: {
        type: 'ReasoningType',
        explanation: 'string',
        data_points: 'array<string>',
        sources: 'array<string>'
    },

    // Confidence and validation
    confidence: 'OpportunityConfidence',
    human_verified: 'boolean',
    verification_date: 'ISO8601 timestamp|null',

    // Temporal
    created_at: 'ISO8601 timestamp',
    expires_at: 'ISO8601 timestamp|null',
    status: 'OpportunityStatus',

    // Metadata
    estimated_investment: 'number|null',
    estimated_timeline: 'string|null',
    target_sectors: 'array<string>',

    // Policy compliance
    contains_claims: 'boolean',
    claim_verification: 'array<string>',
    approved_for_public: 'boolean'
}

/**
 * Validation Rules
 */
export const OpportunityRules = {
    // Scope guardrails
    MAX_OPPORTUNITIES_PER_PLACE: 3, // Hard limit to protect user trust

    // Content rules
    MIN_TITLE_LENGTH: 10,
    MAX_TITLE_LENGTH: 100,
    MIN_DESCRIPTION_LENGTH: 50,
    MAX_DESCRIPTION_LENGTH: 500,
    MIN_REASONING_LENGTH: 100,

    // Forbidden hype words
    FORBIDDEN_WORDS: [
        'revolutionary', 'game-changing', 'unprecedented', 'explosive',
        'guaranteed', 'unlimited', 'massive', 'incredible', 'amazing',
        'perfect', 'best', 'greatest', 'ultimate', 'phenomenal'
    ],

    // Required fields
    REQUIRED_FIELDS: ['id', 'place_id', 'title', 'category', 'description', 'reasoning', 'confidence'],

    // Reasoning requirements
    MIN_DATA_POINTS: 2,
    MIN_SOURCES: 1
}

/**
 * Create opportunity with validation
 * @param {Object} params - Opportunity parameters
 * @returns {Object} Validated opportunity object
 */
export function createOpportunity({
    id,
    place_id,
    title,
    category,
    description,
    reasoning,
    confidence = OpportunityConfidence.LOW,
    expires_at = null,
    estimated_investment = null,
    estimated_timeline = null,
    target_sectors = [],
    human_verified = false
}) {
    // Validate required fields
    if (!id || !place_id || !title || !category || !description || !reasoning) {
        throw new Error('Missing required fields')
    }

    // Validate category
    if (!Object.values(OpportunityCategory).includes(category)) {
        throw new Error(`Invalid category: ${category}`)
    }

    // Validate confidence
    if (!Object.values(OpportunityConfidence).includes(confidence)) {
        throw new Error(`Invalid confidence: ${confidence}`)
    }

    // Validate reasoning structure
    if (!reasoning.type || !reasoning.explanation || !reasoning.data_points || !reasoning.sources) {
        throw new Error('Reasoning must include type, explanation, data_points, and sources')
    }

    return {
        id,
        place_id,
        title,
        category,
        description,
        reasoning: {
            type: reasoning.type,
            explanation: reasoning.explanation,
            data_points: reasoning.data_points || [],
            sources: reasoning.sources || []
        },
        confidence,
        human_verified,
        verification_date: human_verified ? new Date().toISOString() : null,
        created_at: new Date().toISOString(),
        expires_at,
        status: OpportunityStatus.ACTIVE,
        estimated_investment,
        estimated_timeline,
        target_sectors,
        contains_claims: true, // Opportunities inherently contain claims
        claim_verification: reasoning.sources || [],
        approved_for_public: human_verified
    }
}

/**
 * Validate opportunity content
 * @param {Object} opportunity - Opportunity object
 * @returns {Object} Validation result
 */
export function validateOpportunity(opportunity) {
    const errors = []

    // Check title length
    if (opportunity.title.length < OpportunityRules.MIN_TITLE_LENGTH) {
        errors.push(`Title too short (min ${OpportunityRules.MIN_TITLE_LENGTH} chars)`)
    }
    if (opportunity.title.length > OpportunityRules.MAX_TITLE_LENGTH) {
        errors.push(`Title too long (max ${OpportunityRules.MAX_TITLE_LENGTH} chars)`)
    }

    // Check description length
    if (opportunity.description.length < OpportunityRules.MIN_DESCRIPTION_LENGTH) {
        errors.push(`Description too short (min ${OpportunityRules.MIN_DESCRIPTION_LENGTH} chars)`)
    }
    if (opportunity.description.length > OpportunityRules.MAX_DESCRIPTION_LENGTH) {
        errors.push(`Description too long (max ${OpportunityRules.MAX_DESCRIPTION_LENGTH} chars)`)
    }

    // Check reasoning length
    if (opportunity.reasoning.explanation.length < OpportunityRules.MIN_REASONING_LENGTH) {
        errors.push(`Reasoning too short (min ${OpportunityRules.MIN_REASONING_LENGTH} chars)`)
    }

    // Check for forbidden hype words
    const content = `${opportunity.title} ${opportunity.description} ${opportunity.reasoning.explanation}`.toLowerCase()
    const foundForbidden = OpportunityRules.FORBIDDEN_WORDS.filter(word =>
        content.includes(word)
    )

    if (foundForbidden.length > 0) {
        errors.push(`Contains forbidden hype words: ${foundForbidden.join(', ')}`)
    }

    // Check data points
    if (opportunity.reasoning.data_points.length < OpportunityRules.MIN_DATA_POINTS) {
        errors.push(`Insufficient data points (min ${OpportunityRules.MIN_DATA_POINTS})`)
    }

    // Check sources
    if (opportunity.reasoning.sources.length < OpportunityRules.MIN_SOURCES) {
        errors.push(`Insufficient sources (min ${OpportunityRules.MIN_SOURCES})`)
    }

    return {
        valid: errors.length === 0,
        errors
    }
}

export default {
    OpportunityCategory,
    OpportunityConfidence,
    OpportunityStatus,
    ReasoningType,
    OpportunitySchema,
    OpportunityRules,
    createOpportunity,
    validateOpportunity
}
