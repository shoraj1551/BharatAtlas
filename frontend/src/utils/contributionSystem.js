// Scoped Contribution System
// Place-specific, categorized contributions (Stories 251-257)

import CONTRIBUTION_CHARTER from './contributionCharter'

/**
 * Contribution Types (Story 253)
 */
export const ContributionType = {
    FACT: 'fact',
    CORRECTION: 'correction',
    SOURCE: 'source',
    LOCAL_INSIGHT: 'local_insight'
}

/**
 * Source Types (Story 256)
 */
export const SourceType = {
    DOCUMENTED: 'documented',
    ORAL_TRADITION: 'oral',
    OBSERVED: 'observed',
    DERIVED: 'derived'
}

/**
 * Contribution Status (Story 257)
 */
export const ContributionStatus = {
    PENDING_REVIEW: 'pending_review',
    UNDER_REVIEW: 'under_review',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    NEEDS_MORE_EVIDENCE: 'needs_more_evidence'
}

/**
 * Scoped Contribution (Story 251)
 */
export class ScopedContribution {
    constructor({ placeId, category, type, content, contributedBy, source, language }) {
        // Story 251: Contribution is scoped, not free-form
        if (!placeId) {
            throw new Error('Place must be selected first')
        }

        if (!category) {
            throw new Error('Category is required')
        }

        // Story 253: Contribution types are finite
        if (!Object.values(ContributionType).includes(type)) {
            throw new Error(`Invalid contribution type. Allowed: ${Object.values(ContributionType).join(', ')}`)
        }

        this.id = `contrib_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        this.placeId = placeId
        this.category = category
        this.type = type
        this.content = content
        this.contributedBy = contributedBy
        this.contributedAt = new Date().toISOString()

        // Story 255: Source attachment mandatory (when possible)
        this.source = source || null
        if (!source && type !== ContributionType.LOCAL_INSIGHT) {
            console.warn('Source recommended for this contribution type')
        }

        // Story 256: Oral knowledge is first-class
        this.sourceType = this.determineSourceType(source)

        // Story 266: Local language contributions
        this.language = language || 'en'
        this.originalText = content
        this.translations = []

        // Story 257: No immediate public visibility
        this.status = ContributionStatus.PENDING_REVIEW
        this.isPublic = false

        // Story 252: Anonymous mass contribution prevented
        this.isAnonymous = !contributedBy || contributedBy === 'anonymous'
        if (this.isAnonymous) {
            this.status = 'suggestion_only'
            this.note = 'Anonymous users can suggest, not publish'
        }

        // Review tracking
        this.reviews = []
        this.approvedAt = null
        this.approvedBy = null
    }

    /**
     * Determine source type (Story 256)
     */
    determineSourceType(source) {
        if (!source) return null

        if (source.url) return SourceType.DOCUMENTED
        if (source.type === 'oral_tradition') return SourceType.ORAL_TRADITION
        if (source.type === 'observed') return SourceType.OBSERVED
        if (source.type === 'derived') return SourceType.DERIVED

        return SourceType.DOCUMENTED
    }

    /**
     * Add translation (Story 267: Additive, not replacing)
     */
    addTranslation(language, translatedText, translatedBy) {
        // Story 267: Original text always preserved
        this.translations.push({
            language,
            text: translatedText,
            translatedBy,
            translatedAt: new Date().toISOString()
        })
    }

    /**
     * Get text in language
     */
    getText(language) {
        if (language === this.language) {
            return this.originalText
        }

        const translation = this.translations.find(t => t.language === language)
        return translation ? translation.text : this.originalText
    }
}

/**
 * Contribution Validator (Story 254)
 */
export class ContributionValidator {
    /**
     * Validate local insight (Story 254: Insight ≠ Opinion)
     */
    static validateLocalInsight(content) {
        const opinionIndicators = [
            'should',
            'must',
            'better',
            'worse',
            'i think',
            'i believe',
            'in my opinion'
        ]

        const lowerContent = content.toLowerCase()
        const hasOpinion = opinionIndicators.some(indicator => lowerContent.includes(indicator))

        if (hasOpinion) {
            return {
                valid: false,
                reason: 'Local insight must describe reality, not belief',
                guidance: 'Describe what happens here, not what you think should happen'
            }
        }

        return { valid: true }
    }

    /**
     * Validate contribution
     */
    static validate(contribution) {
        const errors = []

        // Check scope
        if (!contribution.placeId) {
            errors.push('Place ID required')
        }

        if (!contribution.category) {
            errors.push('Category required')
        }

        // Check local insight
        if (contribution.type === ContributionType.LOCAL_INSIGHT) {
            const insightValidation = this.validateLocalInsight(contribution.content)
            if (!insightValidation.valid) {
                errors.push(insightValidation.reason)
            }
        }

        return {
            valid: errors.length === 0,
            errors
        }
    }
}

/**
 * Contribution Review (Story 259)
 */
export class ContributionReview {
    /**
     * Review contribution (Story 259: Evidence-based, not vote-based)
     */
    static review(contribution, reviewedBy, decision, reason, evidence = null) {
        // Story 259: Approvals require reasons
        if (!reason) {
            throw new Error('Review reason is mandatory')
        }

        const review = {
            reviewedBy,
            decision, // 'approve' or 'reject'
            reason, // e.g., "matches census 2011"
            evidence,
            reviewedAt: new Date().toISOString()
        }

        contribution.reviews.push(review)

        if (decision === 'approve') {
            contribution.status = ContributionStatus.APPROVED
            contribution.isPublic = true
            contribution.approvedAt = new Date().toISOString()
            contribution.approvedBy = reviewedBy
        } else if (decision === 'reject') {
            contribution.status = ContributionStatus.REJECTED
        }

        return review
    }
}

export default {
    ContributionType,
    SourceType,
    ContributionStatus,
    ScopedContribution,
    ContributionValidator,
    ContributionReview
}
