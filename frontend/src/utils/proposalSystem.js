// Contribution & Proposal System
// Proposal-based contributions with evidence (Stories 174-177)

/**
 * Proposal Status (Story 174)
 */
export const ProposalStatus = {
    PENDING_REVIEW: 'pending_review',
    UNDER_REVIEW: 'under_review',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    NEEDS_MORE_EVIDENCE: 'needs_more_evidence'
}

/**
 * Source Credibility Levels (Story 176)
 */
export const SourceCredibility = {
    OFFICIAL_GOVERNMENT: { weight: 1.0, label: 'Official Government' },
    ACADEMIC_PEER_REVIEWED: { weight: 0.9, label: 'Academic (Peer-Reviewed)' },
    REPUTABLE_NGO: { weight: 0.8, label: 'Reputable NGO' },
    NEWS_VERIFIED: { weight: 0.7, label: 'Verified News Source' },
    COMMUNITY_REPORT: { weight: 0.6, label: 'Community Report' },
    UNVERIFIED: { weight: 0.3, label: 'Unverified' }
}

/**
 * Data Proposal (Story 174: Contribution is proposal, not truth)
 */
export class DataProposal {
    constructor({ placeId, metric, proposedValue, proposedBy, evidence }) {
        this.id = `proposal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        this.placeId = placeId
        this.metric = metric
        this.proposedValue = proposedValue
        this.currentValue = null // Will be set from existing data

        // Story 174: Never accept raw edits
        this.status = ProposalStatus.PENDING_REVIEW

        this.proposedBy = proposedBy
        this.proposedAt = new Date().toISOString()

        // Story 175: Mandatory evidence attachment
        if (!evidence || evidence.length === 0) {
            throw new Error('Evidence is mandatory for all proposals')
        }
        this.evidence = evidence

        // Story 176: Source credibility weighting
        this.credibilityScore = this.calculateCredibility()

        // Review tracking
        this.reviews = []
        this.approvals = 0
        this.rejections = 0
    }

    /**
     * Calculate credibility score (Story 176)
     */
    calculateCredibility() {
        if (this.evidence.length === 0) return 0

        const weights = this.evidence.map(e => {
            const credibility = SourceCredibility[e.type] || SourceCredibility.UNVERIFIED
            return credibility.weight
        })

        return weights.reduce((sum, w) => sum + w, 0) / weights.length
    }

    /**
     * Add review (Story 177: Multi-curator review)
     */
    addReview(curatorId, decision, notes) {
        this.reviews.push({
            curatorId,
            decision, // 'approve' or 'reject'
            notes,
            reviewedAt: new Date().toISOString()
        })

        if (decision === 'approve') {
            this.approvals++
        } else if (decision === 'reject') {
            this.rejections++
        }

        // Update status based on reviews
        this.updateStatus()
    }

    /**
     * Update proposal status (Story 177)
     */
    updateStatus() {
        // Story 177: Sensitive data needs consensus (2+ approvals)
        const isSensitive = this.isSensitiveData()
        const requiredApprovals = isSensitive ? 2 : 1

        if (this.approvals >= requiredApprovals) {
            this.status = ProposalStatus.APPROVED
        } else if (this.rejections >= 2) {
            this.status = ProposalStatus.REJECTED
        } else if (this.reviews.length > 0) {
            this.status = ProposalStatus.UNDER_REVIEW
        }
    }

    /**
     * Check if data is sensitive
     */
    isSensitiveData() {
        const sensitiveMetrics = [
            'crime_rate',
            'communal_incidents',
            'poverty_rate',
            'caste_demographics',
            'religious_demographics'
        ]
        return sensitiveMetrics.includes(this.metric)
    }

    /**
     * Validate proposal (Story 177)
     */
    canApprove() {
        const isSensitive = this.isSensitiveData()
        const requiredApprovals = isSensitive ? 2 : 1

        // Story 177: Require multiple approvals for sensitive data
        if (this.approvals < requiredApprovals) {
            return {
                allowed: false,
                reason: `Requires ${requiredApprovals} approval${requiredApprovals > 1 ? 's' : ''}, currently has ${this.approvals}`
            }
        }

        return { allowed: true }
    }
}

/**
 * Evidence Attachment (Story 175)
 */
export class Evidence {
    constructor({ type, url, description, uploadedBy }) {
        this.id = `evidence_${Date.now()}`
        this.type = type // Maps to SourceCredibility
        this.url = url
        this.description = description
        this.uploadedBy = uploadedBy
        this.uploadedAt = new Date().toISOString()

        // Story 176: Weight sources transparently
        const credibility = SourceCredibility[type] || SourceCredibility.UNVERIFIED
        this.weight = credibility.weight
        this.credibilityLabel = credibility.label
    }
}

export default {
    ProposalStatus,
    SourceCredibility,
    DataProposal,
    Evidence
}
