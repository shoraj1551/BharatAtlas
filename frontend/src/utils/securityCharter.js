// Security Charter
// Principled defense (Story 350)

/**
 * BHARATATLAS SECURITY CHARTER
 * 
 * We defend the system without becoming what we fear.
 * 
 * Version: 1.0
 * Last Updated: 2025-12-29
 */

export const SECURITY_CHARTER = {
    version: '1.0',
    lastUpdated: '2025-12-29',

    /**
     * Core Philosophy (Story 350)
     */
    corePhilosophy: [
        'We defend the system without becoming what we fear',
        'Security must be quiet, boring, and principled',
        'Recovery beats prevention',
        'Transparency over embarrassment',
        'Shutdown is safer than capture'
    ],

    /**
     * Threat Model (Story 331)
     */
    threatClasses: {
        political: {
            actors: 'Political parties, governments, advocacy groups',
            motives: 'Narrative control, data manipulation, censorship',
            vectors: 'Coordinated edits, admin pressure, legal threats'
        },

        economic: {
            actors: 'Businesses, real estate, tourism operators',
            motives: 'Inflate metrics, hide negatives, boost rankings',
            vectors: 'Paid contributions, fake sources, review manipulation'
        },

        attention: {
            actors: 'Media, influencers, viral campaigns',
            motives: 'Traffic, engagement, controversy',
            vectors: 'Sensationalism, misinformation, clickbait data'
        },

        insiders: {
            actors: 'Admins, curators, developers',
            motives: 'Personal bias, corruption, ideology',
            vectors: 'Silent edits, data deletion, access abuse'
        }
    },

    /**
     * Defense Principles (Stories 332-333)
     */
    defensePrinciples: {
        minimalSurface: 'Few mutation paths by design',
        frictionNotFear: 'Effort > identity checks',
        adaptiveThrottling: 'Behavior-based rate limits',
        patternDetection: 'Monitor semantic drift',
        contextualScrutiny: 'High-risk topics flagged, not blocked'
    },

    /**
     * Accountability (Stories 337-339, 345)
     */
    accountability: {
        adminTraceability: 'All admin actions dual-traced',
        insiderAssumption: 'Trust but verify',
        noNarrativeControl: 'No single point of history rewrite',
        noShadowBans: 'All actions visible to affected users'
    },

    /**
     * Integrity (Stories 341-342, 346)
     */
    integrity: {
        cryptographic: 'Snapshots are signed',
        publicVerification: 'Anyone can verify',
        externalAudits: 'Third-party audits possible',
        tamperDetection: 'Integrity violations logged'
    },

    /**
     * Transparency (Stories 343-344, 347)
     */
    transparency: {
        structuredReporting: 'Abuse reports are structured',
        evidenceDriven: 'Moderation requires justification',
        publicIncidents: 'Security incidents publicly logged',
        noOpaquePunishment: 'Reject shadow bans'
    },

    /**
     * Resilience (Stories 340, 348-349)
     */
    resilience: {
        recoveryFirst: 'Fast rollback > perfect defense',
        jurisdictionAgnostic: 'No assumption of friendly law',
        captureFailure: 'Read-only mode if captured',
        gracefulShutdown: 'Better dormant than corrupted'
    }
}

export default SECURITY_CHARTER
