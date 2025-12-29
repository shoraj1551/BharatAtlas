// Curator Disclosure System
// Conflict of interest transparency (Story 184)

/**
 * Curator Profile (Story 184)
 */
export class CuratorProfile {
    constructor({ curatorId, name, email }) {
        this.curatorId = curatorId
        this.name = name
        this.email = email
        this.createdAt = new Date().toISOString()

        // Story 184: Disclose affiliations
        this.affiliations = []
        this.expertise = []
        this.geographicFocus = []
    }

    /**
     * Add affiliation (Story 184: Expose bias)
     */
    addAffiliation(affiliation) {
        this.affiliations.push({
            organization: affiliation.organization,
            role: affiliation.role,
            type: affiliation.type, // 'employer', 'ngo', 'government', 'academic', 'other'
            startDate: affiliation.startDate,
            endDate: affiliation.endDate || null,
            addedAt: new Date().toISOString()
        })
    }

    /**
     * Check for conflict of interest
     */
    hasConflictOfInterest(placeId, metric) {
        // Check if curator has affiliations that could bias their judgment
        const relevantAffiliations = this.affiliations.filter(a => {
            // Check if affiliation is related to the place
            return a.geographicScope?.includes(placeId) ||
                a.topicAreas?.includes(metric)
        })

        return {
            hasConflict: relevantAffiliations.length > 0,
            affiliations: relevantAffiliations
        }
    }

    /**
     * Get disclosure statement
     */
    getDisclosureStatement() {
        if (this.affiliations.length === 0) {
            return 'No affiliations disclosed'
        }

        const active = this.affiliations.filter(a => !a.endDate)
        return `Affiliated with: ${active.map(a => a.organization).join(', ')}`
    }
}

/**
 * Conflict of Interest Check (Story 184)
 */
export function checkConflictOfInterest(curator, proposal) {
    const conflict = curator.hasConflictOfInterest(proposal.placeId, proposal.metric)

    if (conflict.hasConflict) {
        return {
            allowed: false,
            reason: 'Curator has potential conflict of interest',
            affiliations: conflict.affiliations,
            recommendation: 'Assign to different curator'
        }
    }

    return { allowed: true }
}

export default {
    CuratorProfile,
    checkConflictOfInterest
}
