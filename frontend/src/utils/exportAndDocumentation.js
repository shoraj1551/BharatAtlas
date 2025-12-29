// Export Formats & API Documentation
// Boring formats and transparent documentation (Stories 303-309)

/**
 * Export Formats (Story 305)
 */
export class ExportFormats {
    /**
     * Export to format (Story 305: Boring on purpose)
     */
    static export(data, format) {
        // Story 305: CSV, JSON, Parquet only - optimized for longevity
        const supportedFormats = ['csv', 'json', 'parquet']

        if (!supportedFormats.includes(format)) {
            throw new Error(`Unsupported format. Use: ${supportedFormats.join(', ')}`)
        }

        switch (format) {
            case 'csv':
                return this.exportCSV(data)
            case 'json':
                return this.exportJSON(data)
            case 'parquet':
                return this.exportParquet(data)
            default:
                throw new Error('Unsupported format')
        }
    }

    /**
     * Export to CSV
     */
    static exportCSV(data) {
        // Simplified CSV export
        const headers = Object.keys(data[0] || {})
        const rows = data.map(row =>
            headers.map(h => row[h]).join(',')
        )

        return [headers.join(','), ...rows].join('\n')
    }

    /**
     * Export to JSON
     */
    static exportJSON(data) {
        return JSON.stringify(data, null, 2)
    }

    /**
     * Export to Parquet (placeholder)
     */
    static exportParquet(data) {
        // In production, use proper Parquet library
        return { format: 'parquet', data }
    }
}

/**
 * Machine-Readable Licenses (Story 304)
 */
export const MACHINE_READABLE_LICENSE = {
    // Story 304: Usage terms are explicit
    license: {
        name: 'CC-BY-NC-4.0',
        url: 'https://creativecommons.org/licenses/by-nc/4.0/',

        permissions: ['read', 'download', 'analyze', 'cite'],

        conditions: [
            'attribution_required',
            'non_commercial',
            'share_alike_encouraged'
        ],

        limitations: [
            'no_warranty',
            'no_liability',
            'commercial_use_requires_separate_license'
        ]
    },

    attribution: {
        required: true,
        format: 'Data from BharatAtlas (bharatatlas.in)',
        citation_required_for: ['academic', 'publication', 'commercial']
    },

    machineReadable: true,
    version: '1.0'
}

/**
 * API Documentation (Story 306)
 */
export const API_DOCUMENTATION = {
    // Story 306: No dark APIs - if it exists, it's documented

    principle: 'Every endpoint is documented. No hidden APIs.',

    endpoints: [
        {
            path: '/api/v1/place/:id',
            method: 'GET',
            description: 'Retrieve place data',
            documented: true,
            public: true
        },
        {
            path: '/api/v1/snapshot/:id',
            method: 'GET',
            description: 'Retrieve data snapshot',
            documented: true,
            public: true
        }
    ],

    // Story 306: Prevent power asymmetry
    note: 'All APIs are equally documented. No privileged knowledge.'
}

/**
 * API Change Log (Story 307)
 */
export class APIChangeLog {
    constructor() {
        this.changes = []
    }

    /**
     * Log API change (Story 307: Public change logs)
     */
    logChange(change) {
        const entry = {
            version: change.version,
            date: change.date,
            type: change.type, // 'breaking', 'feature', 'fix', 'deprecation'
            description: change.description,
            migration_guide: change.migration_guide || null,

            // Story 307: Build trust with developers
            public: true,
            announced_at: new Date().toISOString()
        }

        this.changes.push(entry)

        return entry
    }

    /**
     * Get breaking changes
     */
    getBreakingChanges() {
        return this.changes.filter(c => c.type === 'breaking')
    }

    /**
     * Get change log
     */
    getChangeLog() {
        return this.changes.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
}

/**
 * Offline-First Support (Story 308)
 */
export class OfflineFirstSupport {
    /**
     * Generate offline package (Story 308: Low-connectivity users matter)
     */
    static generateOfflinePackage(placeIds) {
        return {
            package_id: `offline_${Date.now()}`,
            places: placeIds,

            // Story 308: Support disconnected India
            format: 'json', // Simple, widely supported
            size_mb: 5,

            includes: [
                'place_data',
                'narratives',
                'opportunities',
                'sources'
            ],

            usage: {
                download: 'Download once, use offline',
                updates: 'Sync when connected',
                expiry: '30 days (then refresh recommended)'
            },

            note: 'Optimized for low-bandwidth environments'
        }
    }
}

/**
 * Government Access (Story 303)
 */
export const GOVERNMENT_ACCESS_POLICY = {
    // Story 303: Government access ≠ admin access
    principle: 'State users consume like everyone else',

    policy: {
        no_privileged_pipelines: true,
        same_rate_limits: true,
        same_api_endpoints: true,

        // Government can request higher quotas, but publicly
        quota_increase_process: 'public_request',

        note: 'No backdoors. No special access. Equal treatment.'
    }
}

/**
 * API Ethics Statement (Story 309)
 */
export const API_ETHICS_STATEMENT = {
    // Story 309: Explicit constraints on misuse

    statement: 'BharatAtlas APIs exist to inform and empower, not exploit.',

    prohibited_uses: [
        'Surveillance of individuals or communities',
        'Discriminatory profiling based on demographics',
        'Misinformation or propaganda campaigns',
        'Commercial exploitation without proper licensing',
        'Data resale without attribution',
        'Manipulation of public opinion',
        'Targeting vulnerable populations'
    ],

    encouraged_uses: [
        'Academic research and education',
        'Government planning and policy',
        'Civic engagement tools',
        'Journalism and transparency',
        'Local community empowerment',
        'Evidence-based advocacy'
    ],

    enforcement: {
        violation_reporting: 'api-abuse@bharatatlas.in',
        investigation_process: 'public',
        sanctions: ['quota_reduction', 'access_suspension', 'legal_action']
    },

    note: 'We reserve the right to revoke access for ethical violations.'
}

export default {
    ExportFormats,
    MACHINE_READABLE_LICENSE,
    API_DOCUMENTATION,
    APIChangeLog,
    OfflineFirstSupport,
    GOVERNMENT_ACCESS_POLICY,
    API_ETHICS_STATEMENT
}
