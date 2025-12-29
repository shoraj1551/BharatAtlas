// API Ethics Guard & Research Access
// Prevent harmful correlations and manage research access (Stories 228-229)

/**
 * API Ethics Guard (Story 229)
 */
export class ApiEthicsGuard {
    /**
     * Check if request violates ethics (Story 229)
     */
    static checkRequest(request) {
        const violations = []

        // Story 229: Some combinations of data are blocked

        // Check for harmful correlations
        if (this.isHarmfulCorrelation(request)) {
            violations.push({
                type: 'harmful_correlation',
                reason: 'Requested data combination could enable discrimination'
            })
        }

        // Check for surveillance potential
        if (this.hasSurveillancePotential(request)) {
            violations.push({
                type: 'surveillance_risk',
                reason: 'Request pattern suggests surveillance use case'
            })
        }

        // Check for profiling risk
        if (this.hasProfilingRisk(request)) {
            violations.push({
                type: 'profiling_risk',
                reason: 'Data combination could enable discriminatory profiling'
            })
        }

        return {
            ethical: violations.length === 0,
            violations
        }
    }

    /**
     * Check for harmful correlations
     */
    static isHarmfulCorrelation(request) {
        const sensitiveMetrics = ['caste', 'religion', 'ethnicity']
        const targetMetrics = ['crime_rate', 'poverty_rate', 'employment_rate']

        const requestedMetrics = request.metrics || []

        const hasSensitive = sensitiveMetrics.some(m => requestedMetrics.includes(m))
        const hasTarget = targetMetrics.some(m => requestedMetrics.includes(m))

        // Block requests that combine sensitive demographics with outcome metrics
        return hasSensitive && hasTarget
    }

    /**
     * Check for surveillance potential
     */
    static hasSurveillancePotential(request) {
        // Check for fine-grained location tracking
        if (request.granularity === 'village' && request.includesMovement) {
            return true
        }

        // Check for individual-level queries
        if (request.aggregationLevel === 'individual') {
            return true
        }

        return false
    }

    /**
     * Check for profiling risk
     */
    static hasProfilingRisk(request) {
        const profilingIndicators = [
            'religion',
            'caste',
            'ethnicity',
            'political_affiliation'
        ]

        const requestedMetrics = request.metrics || []
        const profilingCount = profilingIndicators.filter(i => requestedMetrics.includes(i)).length

        // Block if requesting 2+ profiling indicators
        return profilingCount >= 2
    }
}

/**
 * Research Access Manager (Story 228)
 */
export class ResearchAccessManager {
    constructor() {
        this.applications = new Map()
        this.approvedResearchers = new Set()
    }

    /**
     * Apply for research access (Story 228)
     */
    applyForAccess(application) {
        const appId = `research_${Date.now()}`

        // Story 228: Higher access requires review
        const app = {
            id: appId,
            applicant: application.applicant,
            institution: application.institution,
            purpose: application.purpose,
            requestedAccess: application.requestedAccess,
            dataUsePlan: application.dataUsePlan,
            ethicsApproval: application.ethicsApproval || null,

            status: 'pending_review',
            appliedAt: new Date().toISOString(),
            reviewedAt: null,
            reviewedBy: null
        }

        this.applications.set(appId, app)

        return {
            applicationId: appId,
            status: 'pending_review',
            message: 'Application submitted for review. You will be notified within 7 business days.'
        }
    }

    /**
     * Review application
     */
    reviewApplication(appId, decision, reviewedBy, notes) {
        const app = this.applications.get(appId)

        if (!app) {
            throw new Error('Application not found')
        }

        app.status = decision // 'approved' or 'rejected'
        app.reviewedAt = new Date().toISOString()
        app.reviewedBy = reviewedBy
        app.reviewNotes = notes

        if (decision === 'approved') {
            this.approvedResearchers.add(app.applicant.email)
        }

        return app
    }

    /**
     * Check if researcher is approved
     */
    isApproved(email) {
        return this.approvedResearchers.has(email)
    }

    /**
     * Get application status
     */
    getApplicationStatus(appId) {
        const app = this.applications.get(appId)

        if (!app) {
            return { found: false }
        }

        return {
            found: true,
            status: app.status,
            appliedAt: app.appliedAt,
            reviewedAt: app.reviewedAt
        }
    }
}

export default {
    ApiEthicsGuard,
    ResearchAccessManager
}
