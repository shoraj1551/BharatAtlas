// Hardcoded Place object following the Place data model
// Reference: docs/data-model-place.md

export const karnataka = {
    // Core Identity (Immutable)
    place_id: "place_ka_001",
    canonical_name: "Karnataka",
    canonical_name_local: "ಕರ್ನಾಟಕ",
    place_type: "state",
    parent_place_id: "place_india_001",
    created_at: "2025-01-15T00:00:00Z",
    official_code: "KA",

    // Geographic Essentials
    geometry_type: "polygon",
    centroid: {
        lat: 15.3173,
        lon: 75.7139
    },
    boundary: null, // Will be loaded from GeoJSON
    area_sq_km: 191791,

    // Administrative Context
    state_id: "place_ka_001",
    district_id: null,
    tehsil_id: null,
    administrative_path: ["place_india_001", "place_ka_001"],

    // Data Provenance
    data_quality_score: 1.0,
    primary_source: "census",
    last_verified_at: "2021-03-01T00:00:00Z",
    verification_status: "verified",

    // Temporal Tracking
    valid_from: "1956-11-01",
    valid_to: null,
    version: 1,
    is_current: true,

    // State-level Data
    population: {
        value: 61095297,
        confidence: 1.0,
        source: "verified",
        source_detail: "Census 2011",
        as_of_date: "2011-03-01"
    },

    area_classification: "mixed",

    literacy_rate: {
        value: 75.6,
        confidence: 1.0,
        source: "verified",
        source_detail: "Census 2011"
    },

    num_districts: {
        value: 31,
        confidence: 1.0,
        source: "verified",
        source_detail: "Government of Karnataka"
    },

    primary_language: "Kannada",
    climate_zone: "tropical",

    major_industries: [
        "Information Technology",
        "Biotechnology",
        "Aerospace",
        "Agriculture",
        "Textiles"
    ],

    // AI-Generated Content
    ai_generated_summary: {
        text: "Karnataka is a state in southwestern India known for its technology industry, cultural heritage, and diverse geography. Bangalore, the state capital, is India's technology hub. The state has a mix of urban and rural areas with significant contributions to agriculture and manufacturing.",
        generated_at: "2025-01-15T00:00:00Z",
        model_version: "gpt-4",
        confidence: 0.85,
        human_verified: false
    },

    opportunity_score: {
        overall: 0.78,
        business: 0.82,
        infrastructure: 0.75,
        social: 0.76,
        last_computed_at: "2025-01-15T00:00:00Z"
    }
}

export default karnataka
