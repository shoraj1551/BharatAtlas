// Trust Charter
// Explicit philosophy of truth (Story 290)

/**
 * BHARATATLAS TRUST CHARTER
 * 
 * We preserve how knowledge changes, not just what it says.
 * 
 * Version: 1.0
 * Last Updated: 2025-12-29
 */

export const TRUST_CHARTER = {
    version: '1.0',
    lastUpdated: '2025-12-29',

    /**
     * Core Philosophy (Story 290)
     */
    corePhilosophy: [
        'We preserve how knowledge changes, not just what it says',
        'Every fact has an origin',
        'Updates create versions, not overwrites',
        'Time is inseparable from truth',
        'Disagreement is data, not noise',
        'Trust decays without refresh'
    ],

    /**
     * Provenance Principles (Stories 271-272)
     */
    provenancePrinciples: {
        noAnonymousFacts: 'Every data point has a source',
        structuredSources: 'Sources are first-class entities',
        traceableChanges: 'All edits logged immutably',
        humanOverridesExplained: 'Admin changes require reasons'
    },

    /**
     * Versioning Principles (Stories 273-276)
     */
    versioningPrinciples: {
        appendOnly: 'Facts are versioned, never overwritten',
        timeIndexed: 'Facts are valid as of specific dates',
        historicalAccess: 'Past states are queryable',
        conflictsPreserved: 'Multiple truths coexist'
    },

    /**
     * Trust Computation (Stories 277-278, 285, 288)
     */
    trustComputation: {
        computed: 'Confidence derives from evidence, not declaration',
        temporal: 'Trust decays over time without refresh',
        dynamic: 'Source credibility evolves',
        localized: 'Trust differs by region'
    },

    /**
     * Preservation Principles (Stories 279-280, 284, 289)
     */
    preservationPrinciples: {
        noErasure: 'Bad data is deprecated, not deleted',
        immutableAudit: 'All changes logged forever',
        citableSnapshots: 'Researchers can cite versions',
        provenanceInExports: 'Exports preserve context'
    },

    /**
     * Epistemic Humility (Stories 283, 287)
     */
    epistemicHumility: {
        labeledInference: 'AI-derived data is clearly marked',
        noAbsolutes: 'System never declares final truth',
        transparentUncertainty: 'Confidence is visible',
        preservedDisagreement: 'Conflicts are data'
    },

    /**
     * Accessibility (Stories 281, 286)
     */
    accessibility: {
        publicTrust: 'Trust signals are public by default',
        easyProvenance: 'Sources are one click away',
        transparentComputation: 'Confidence calculation is visible',
        userEmpowerment: 'Users can inspect everything'
    }
}

export default TRUST_CHARTER
