// Source Data Model
// Every factual statement must be traceable to a source
// Suitable for government, academic, and open datasets

/**
 * Source Types
 * Classification of data sources
 */
export const SourceType = {
    GOVERNMENT: 'government',           // Official government publications
    ACADEMIC: 'academic',               // Peer-reviewed research
    OPEN_DATA: 'open_data',            // Open data portals
    CENSUS: 'census',                   // Census data
    SURVEY: 'survey',                   // Survey data
    REPORT: 'report',                   // Official reports
    DATABASE: 'database',               // Verified databases
    API: 'api'                          // API endpoints
}

/**
 * Source Authority Level
 * Indicates reliability of source
 */
export const SourceAuthority = {
    PRIMARY: 'primary',                 // Original source (e.g., Census of India)
    SECONDARY: 'secondary',             // Derived from primary (e.g., analysis)
    TERTIARY: 'tertiary'               // Compiled from multiple sources
}

/**
 * Source Access Level
 */
export const SourceAccess = {
    PUBLIC: 'public',                   // Publicly accessible
    RESTRICTED: 'restricted',           // Requires registration
    PROPRIETARY: 'proprietary'          // Paid/licensed
}

/**
 * Source Schema
 * Complete structure for a data source
 */
export const SourceSchema = {
    // Identity
    source_id: 'string',

    // Classification
    source_type: 'SourceType',
    authority_level: 'SourceAuthority',
    access_level: 'SourceAccess',

    // Core metadata
    title: 'string',
    organization: 'string',
    authors: 'array<string>|null',
    publication_date: 'ISO8601 date|null',
    last_updated: 'ISO8601 date|null',

    // Access information
    url: 'string|null',
    doi: 'string|null',                 // Digital Object Identifier
    isbn: 'string|null',                // For books
    api_endpoint: 'string|null',        // For API sources

    // Citation
    citation_text: 'string',            // Pre-formatted citation
    citation_format: 'string',          // 'APA' | 'MLA' | 'Chicago' | 'custom'

    // Verification
    verified: 'boolean',
    verified_by: 'string|null',
    verified_date: 'ISO8601 timestamp|null',

    // Temporal validity
    data_collection_period: {
        start_date: 'ISO8601 date|null',
        end_date: 'ISO8601 date|null'
    },

    // Geographic scope
    geographic_scope: 'string',         // 'national' | 'state' | 'district' | etc.

    // Quality indicators
    methodology: 'string|null',
    sample_size: 'number|null',
    confidence_interval: 'number|null',

    // Metadata
    notes: 'string|null',
    tags: 'array<string>',
    language: 'string'                  // ISO 639-1 code
}

/**
 * Validation Rules
 */
export const SourceRules = {
    REQUIRED_FIELDS: ['source_id', 'source_type', 'title', 'organization', 'citation_text'],

    // URL validation
    VALID_URL_PATTERNS: [
        /^https?:\/\/.+/,                 // HTTP/HTTPS
        /^ftp:\/\/.+/                     // FTP
    ],

    // DOI validation
    DOI_PATTERN: /^10\.\d{4,}\/\S+$/,

    // ISBN validation (basic)
    ISBN_PATTERN: /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/
}

/**
 * Create source object
 * @param {Object} params - Source parameters
 * @returns {Object} Source object
 */
export function createSource({
    source_id,
    source_type,
    authority_level = SourceAuthority.SECONDARY,
    access_level = SourceAccess.PUBLIC,
    title,
    organization,
    authors = null,
    publication_date = null,
    last_updated = null,
    url = null,
    doi = null,
    isbn = null,
    api_endpoint = null,
    citation_text,
    citation_format = 'custom',
    verified = false,
    verified_by = null,
    verified_date = null,
    data_collection_period = { start_date: null, end_date: null },
    geographic_scope = 'national',
    methodology = null,
    sample_size = null,
    confidence_interval = null,
    notes = null,
    tags = [],
    language = 'en'
}) {
    // Validate required fields
    if (!source_id || !source_type || !title || !organization || !citation_text) {
        throw new Error('Missing required source fields')
    }

    return {
        source_id,
        source_type,
        authority_level,
        access_level,
        title,
        organization,
        authors,
        publication_date,
        last_updated,
        url,
        doi,
        isbn,
        api_endpoint,
        citation_text,
        citation_format,
        verified,
        verified_by,
        verified_date,
        data_collection_period,
        geographic_scope,
        methodology,
        sample_size,
        confidence_interval,
        notes,
        tags,
        language
    }
}

/**
 * Validate source
 * @param {Object} source - Source object
 * @returns {Object} Validation result
 */
export function validateSource(source) {
    const errors = []

    // Check required fields
    SourceRules.REQUIRED_FIELDS.forEach(field => {
        if (!source[field]) {
            errors.push(`Missing required field: ${field}`)
        }
    })

    // Validate URL if present
    if (source.url && !SourceRules.VALID_URL_PATTERNS.some(pattern => pattern.test(source.url))) {
        errors.push('Invalid URL format')
    }

    // Validate DOI if present
    if (source.doi && !SourceRules.DOI_PATTERN.test(source.doi)) {
        errors.push('Invalid DOI format')
    }

    // Validate ISBN if present
    if (source.isbn && !SourceRules.ISBN_PATTERN.test(source.isbn)) {
        errors.push('Invalid ISBN format')
    }

    return {
        valid: errors.length === 0,
        errors
    }
}

/**
 * Format citation
 * @param {Object} source - Source object
 * @param {string} format - Citation format ('APA' | 'MLA' | 'Chicago')
 * @returns {string} Formatted citation
 */
export function formatCitation(source, format = 'APA') {
    if (source.citation_text && source.citation_format === format) {
        return source.citation_text
    }

    // Basic APA format
    if (format === 'APA') {
        const authors = source.authors ? source.authors.join(', ') : source.organization
        const year = source.publication_date ? new Date(source.publication_date).getFullYear() : 'n.d.'
        const title = source.title
        const url = source.url ? ` Retrieved from ${source.url}` : ''

        return `${authors} (${year}). ${title}. ${source.organization}.${url}`
    }

    return source.citation_text
}

export default {
    SourceType,
    SourceAuthority,
    SourceAccess,
    SourceSchema,
    SourceRules,
    createSource,
    validateSource,
    formatCitation
}
