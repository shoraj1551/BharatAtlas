// Confidence Scoring Rules
// Deterministic, rule-based confidence calculation
// No AI guesses - purely based on observable criteria

import { SourceType, SourceAuthority } from '../models/Source'

/**
 * Confidence Score Levels
 */
export const ConfidenceScore = {
    VERIFIED: 100,      // Human-verified, primary source
    HIGH: 80,           // Primary source, recent data
    MEDIUM: 60,         // Secondary source or aging data
    LOW: 40,            // Tertiary source or stale data
    UNVERIFIED: 20      // No source or unknown origin
}

/**
 * Data Freshness Thresholds (in days)
 */
const FRESHNESS_THRESHOLDS = {
    FRESH: 90,          // < 3 months
    RECENT: 365,        // < 1 year
    AGING: 730,         // < 2 years
    STALE: Infinity     // > 2 years
}

/**
 * Calculate data age category
 * @param {string} dateString - ISO date string
 * @returns {string} Age category
 */
function getDataAge(dateString) {
    if (!dateString) return 'UNKNOWN'

    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

    if (diffDays < FRESHNESS_THRESHOLDS.FRESH) return 'FRESH'
    if (diffDays < FRESHNESS_THRESHOLDS.RECENT) return 'RECENT'
    if (diffDays < FRESHNESS_THRESHOLDS.AGING) return 'AGING'
    return 'STALE'
}

/**
 * Calculate confidence score based on deterministic rules
 * @param {Object} params - Scoring parameters
 * @returns {number} Confidence score (0-100)
 */
export function calculateConfidenceScore({
    humanVerified = false,
    sourceType = null,
    sourceAuthority = null,
    dataAge = null,
    hasMultipleSources = false,
    sourceCount = 0
}) {
    // Rule 1: Human verification = VERIFIED (100)
    if (humanVerified) {
        return ConfidenceScore.VERIFIED
    }

    // Rule 2: No source = UNVERIFIED (20)
    if (!sourceType || sourceCount === 0) {
        return ConfidenceScore.UNVERIFIED
    }

    // Base score from source type and authority
    let score = 0

    // Source type scoring
    if (sourceType === SourceType.GOVERNMENT || sourceType === SourceType.CENSUS) {
        score += 40
    } else if (sourceType === SourceType.ACADEMIC) {
        score += 35
    } else if (sourceType === SourceType.OPEN_DATA || sourceType === SourceType.DATABASE) {
        score += 30
    } else {
        score += 20
    }

    // Authority level scoring
    if (sourceAuthority === SourceAuthority.PRIMARY) {
        score += 30
    } else if (sourceAuthority === SourceAuthority.SECONDARY) {
        score += 20
    } else {
        score += 10
    }

    // Data freshness modifier
    const age = getDataAge(dataAge)
    if (age === 'FRESH') {
        score += 10
    } else if (age === 'RECENT') {
        score += 5
    } else if (age === 'AGING') {
        score += 0
    } else if (age === 'STALE') {
        score -= 10
    } else {
        score -= 5 // Unknown age
    }

    // Multiple sources bonus
    if (hasMultipleSources || sourceCount > 1) {
        score += 10
    }

    // Clamp to 0-100
    score = Math.max(0, Math.min(100, score))

    // Map to confidence levels
    if (score >= 80) return ConfidenceScore.HIGH
    if (score >= 60) return ConfidenceScore.MEDIUM
    if (score >= 40) return ConfidenceScore.LOW
    return ConfidenceScore.UNVERIFIED
}

/**
 * Get confidence level label
 * @param {number} score - Confidence score
 * @returns {string} Confidence label
 */
export function getConfidenceLabel(score) {
    if (score >= 100) return 'VERIFIED'
    if (score >= 80) return 'HIGH'
    if (score >= 60) return 'MEDIUM'
    if (score >= 40) return 'LOW'
    return 'UNVERIFIED'
}

/**
 * Confidence Scoring Rules Documentation
 */
export const ConfidenceScoringRules = {
    description: 'Deterministic confidence scoring based on observable criteria',

    rules: [
        {
            rule: 'Human Verification',
            condition: 'humanVerified === true',
            score: 100,
            label: 'VERIFIED'
        },
        {
            rule: 'No Source',
            condition: 'sourceCount === 0',
            score: 20,
            label: 'UNVERIFIED'
        },
        {
            rule: 'Government/Census + Primary + Fresh',
            condition: 'sourceType=GOVERNMENT/CENSUS + authority=PRIMARY + age<90days',
            score: '80-100',
            label: 'HIGH'
        },
        {
            rule: 'Academic + Primary + Recent',
            condition: 'sourceType=ACADEMIC + authority=PRIMARY + age<365days',
            score: '70-85',
            label: 'HIGH'
        },
        {
            rule: 'Secondary Source + Recent',
            condition: 'authority=SECONDARY + age<365days',
            score: '60-75',
            label: 'MEDIUM'
        },
        {
            rule: 'Tertiary Source or Aging Data',
            condition: 'authority=TERTIARY or age>730days',
            score: '40-55',
            label: 'LOW'
        },
        {
            rule: 'Multiple Sources Bonus',
            condition: 'sourceCount > 1',
            modifier: '+10',
            label: 'Increases confidence'
        }
    ],

    factors: {
        sourceType: {
            GOVERNMENT: 40,
            CENSUS: 40,
            ACADEMIC: 35,
            OPEN_DATA: 30,
            DATABASE: 30,
            OTHER: 20
        },
        sourceAuthority: {
            PRIMARY: 30,
            SECONDARY: 20,
            TERTIARY: 10
        },
        dataFreshness: {
            FRESH: '+10 (< 3 months)',
            RECENT: '+5 (< 1 year)',
            AGING: '0 (< 2 years)',
            STALE: '-10 (> 2 years)',
            UNKNOWN: '-5'
        },
        multipleSources: '+10'
    }
}

export default {
    ConfidenceScore,
    calculateConfidenceScore,
    getConfidenceLabel,
    ConfidenceScoringRules
}
