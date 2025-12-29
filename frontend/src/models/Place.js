// Place data model type definitions
// Reference: docs/data-model-place.md

export const PlaceType = {
    COUNTRY: 'country',
    STATE: 'state',
    DISTRICT: 'district',
    TEHSIL: 'tehsil',
    VILLAGE: 'village',
    TOWN: 'town'
}

export const VerificationStatus = {
    VERIFIED: 'verified',
    INFERRED: 'inferred',
    UNVERIFIED: 'unverified',
    DISPUTED: 'disputed'
}

export const DataSource = {
    CENSUS: 'census',
    SURVEY_OF_INDIA: 'survey_of_india',
    OSM: 'osm',
    INFERRED: 'inferred',
    USER_CONTRIBUTED: 'user_contributed'
}

// Place model structure (for reference and validation)
export const PlaceModel = {
    // Core Identity (Immutable)
    place_id: 'string',
    canonical_name: 'string',
    canonical_name_local: 'string',
    place_type: 'PlaceType',
    parent_place_id: 'string|null',
    created_at: 'ISO8601 timestamp',
    official_code: 'string|null',

    // Geographic Essentials
    geometry_type: 'point|polygon',
    centroid: { lat: 'float', lon: 'float' },
    boundary: 'GeoJSON|null',
    area_sq_km: 'float|null',

    // Administrative Context
    state_id: 'string',
    district_id: 'string|null',
    tehsil_id: 'string|null',
    administrative_path: 'array<string>',

    // Data Provenance
    data_quality_score: 'float (0.0-1.0)',
    primary_source: 'DataSource',
    last_verified_at: 'ISO8601 timestamp|null',
    verification_status: 'VerificationStatus',

    // Temporal Tracking
    valid_from: 'date',
    valid_to: 'date|null',
    version: 'integer',
    is_current: 'boolean'
}

export default PlaceModel
