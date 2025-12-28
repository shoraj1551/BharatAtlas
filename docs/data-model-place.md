# Place: First-Class Data Object

## 1. What a Place IS and What It is NOT

### A Place IS:

**A Place is a uniquely identifiable geographic-administrative unit in India with:**
- A canonical name and official administrative classification
- Geographic boundaries (polygon or point)
- A position in the administrative hierarchy (Country → State → District → Tehsil → Village)
- A unique, immutable identifier
- Temporal versioning (what it was, what it is, what it becomes)

**Examples of Places:**
- India (country)
- Karnataka (state)
- Bangalore Urban (district)
- Bangalore North (tehsil)
- Yelahanka (village/town)

### A Place is NOT:

1. **NOT a Point of Interest (POI)** - "Vidhana Soudha" is a building, not a Place. "Bangalore" is a Place.
2. **NOT a neighborhood or informal area** - "Koramangala" is a locality within Bangalore, not an official administrative Place (unless it's a recognized ward).
3. **NOT a road or route** - "NH-44" is infrastructure, not a Place.
4. **NOT a temporary entity** - "Kumbh Mela Ground 2025" is an event location, not a Place.
5. **NOT defined by commercial boundaries** - "Bangalore Metropolitan Region" (planning construct) vs "Bangalore Urban District" (administrative Place).
6. **NOT a statistical aggregation** - "South India" is a region, not a Place. "Tamil Nadu" is a Place.

**Litmus Test:** If it doesn't appear in official Census or Survey of India administrative hierarchies, it's not a Place (with rare exceptions for newly formed administrative units).

## 2. Mandatory Attributes (Every Place, Village to State)

### Core Identity (Immutable)
```json
{
  "place_id": "uuid-v4",                    // Immutable, globally unique
  "canonical_name": "string",               // Official name in English
  "canonical_name_local": "string",         // Official name in primary local language
  "place_type": "enum",                     // country|state|district|tehsil|village|town
  "parent_place_id": "uuid-v4|null",        // Null only for country
  "created_at": "timestamp",                // When this Place was first created in our system
  "official_code": "string|null"            // Census code, LGD code, etc.
}
```

### Geographic Essentials (Mandatory)
```json
{
  "geometry_type": "enum",                  // point|polygon
  "centroid": {
    "lat": "float",                         // WGS84
    "lon": "float"
  },
  "boundary": "GeoJSON|null",               // Polygon if available, null for points
  "area_sq_km": "float|null"                // Null if geometry is point
}
```

### Administrative Context (Mandatory)
```json
{
  "state_id": "uuid-v4",                    // Always present (even for state itself)
  "district_id": "uuid-v4|null",            // Null for country/state
  "tehsil_id": "uuid-v4|null",              // Null for country/state/district
  "administrative_path": "array<uuid-v4>"   // [country_id, state_id, district_id, ...]
}
```

### Data Provenance (Mandatory)
```json
{
  "data_quality_score": "float",            // 0.0 to 1.0
  "primary_source": "enum",                 // census|survey_of_india|osm|inferred|user_contributed
  "last_verified_at": "timestamp|null",     // When data was last verified
  "verification_status": "enum"             // verified|inferred|unverified|disputed
}
```

### Temporal Tracking (Mandatory)
```json
{
  "valid_from": "date",                     // When this version became valid
  "valid_to": "date|null",                  // Null if currently valid
  "version": "integer",                     // Version number for this Place
  "is_current": "boolean"                   // True for current version only
}
```

## 3. Optional Attributes (Zoom-Level Dependent)

### Level 1: State & Above
```json
{
  "population": {
    "total": "integer|null",
    "male": "integer|null",
    "female": "integer|null",
    "confidence": "float",                  // 0.0 to 1.0
    "source": "string",
    "as_of_date": "date"
  },
  "area_classification": "enum|null",       // urban|rural|mixed
  "gdp_per_capita": "float|null",
  "literacy_rate": "float|null"
}
```

### Level 2: District
```json
{
  "population": { /* same as above */ },
  "literacy_rate": "float|null",
  "sex_ratio": "float|null",
  "density_per_sq_km": "float|null",
  "num_tehsils": "integer|null",
  "num_villages": "integer|null",
  "primary_language": "string|null",
  "climate_zone": "enum|null",              // tropical|subtropical|temperate|arid
  "major_industries": "array<string>|null"
}
```

### Level 3: Tehsil
```json
{
  "population": { /* same as above */ },
  "num_villages": "integer|null",
  "num_towns": "integer|null",
  "road_density_km_per_sq_km": "float|null",
  "electrification_rate": "float|null",
  "primary_occupation": "enum|null"         // agriculture|industry|services|mixed
}
```

### Level 4: Village/Town
```json
{
  "population": { /* same as above */ },
  "num_households": "integer|null",
  "literacy_rate": "float|null",
  "electrification_status": "enum|null",    // full|partial|none
  "road_connectivity": "enum|null",         // paved|unpaved|none
  "drinking_water_source": "enum|null",     // piped|well|tanker|river|none
  "primary_school_present": "boolean|null",
  "health_facility_present": "boolean|null",
  "bank_branch_present": "boolean|null",
  "post_office_present": "boolean|null",
  "distance_to_nearest_town_km": "float|null",
  "mobile_coverage": "enum|null",           // 4g|3g|2g|none
  "internet_penetration_pct": "float|null"
}
```

### AI-Generated Attributes (All Levels)
```json
{
  "ai_generated_summary": {
    "text": "string|null",
    "generated_at": "timestamp",
    "model_version": "string",
    "confidence": "float",
    "human_verified": "boolean"
  },
  "opportunity_score": {
    "overall": "float|null",                // 0.0 to 1.0
    "business": "float|null",
    "infrastructure": "float|null",
    "social": "float|null",
    "last_computed_at": "timestamp"
  },
  "development_gaps": "array<object>|null"  // AI-identified gaps
}
```

## 4. Representing Uncertainty, Missing Data, and Inference

### The Confidence Envelope Pattern

Every data point that can be uncertain uses this structure:

```json
{
  "attribute_name": {
    "value": "any|null",
    "confidence": "float",                  // 0.0 to 1.0
    "source": "enum",                       // verified|inferred|estimated|user_contributed
    "source_detail": "string",              // "Census 2021" or "ML Model v2.3" or "OSM"
    "inferred_from": "array<string>|null",  // ["population", "literacy_rate"] if inferred
    "last_updated": "timestamp",
    "verification_status": "enum"           // verified|pending|disputed|rejected
  }
}
```

### Confidence Levels Defined

| Confidence | Source | Meaning | Example |
|------------|--------|---------|---------|
| 1.0 | Verified | Official government data, recently updated | Census 2021 population |
| 0.9 | Verified | Official data, slightly outdated | Census 2011 + growth rate |
| 0.7-0.8 | Inferred | Strong inference from related data | Literacy inferred from school enrollment |
| 0.5-0.6 | Estimated | Statistical model, reasonable assumptions | Village GDP estimated from district average |
| 0.3-0.4 | Weak Inference | Educated guess, sparse data | Health facility presence from satellite imagery |
| 0.0-0.2 | Unknown | No data, placeholder | Completely missing attribute |

### Missing Data Representation

**Rule: `null` means "we don't know" — it's different from `0` which means "zero/none"**

```json
{
  "population": {
    "value": null,                          // We don't have data
    "confidence": 0.0,
    "source": "unknown",
    "source_detail": "No census data available for this village",
    "last_updated": null
  },
  
  "bank_branch_present": {
    "value": false,                         // We know there's NO bank
    "confidence": 0.9,
    "source": "verified",
    "source_detail": "Ground survey 2024",
    "last_updated": "2024-03-15"
  }
}
```

### Inference Transparency

When AI infers a value, we store the reasoning:

```json
{
  "literacy_rate": {
    "value": 68.5,
    "confidence": 0.65,
    "source": "inferred",
    "source_detail": "ML Model v2.3 - Random Forest Regressor",
    "inferred_from": [
      "district_literacy_rate",
      "num_schools",
      "electrification_rate",
      "distance_to_nearest_town"
    ],
    "inference_method": "regression_from_similar_villages",
    "similar_villages_used": ["uuid-1", "uuid-2", "uuid-3"],
    "last_updated": "2025-01-15",
    "human_verified": false,
    "verification_status": "pending"
  }
}
```

### Disputed Data Handling

```json
{
  "population": {
    "value": 12500,
    "confidence": 0.8,
    "source": "verified",
    "source_detail": "Census 2021",
    "last_updated": "2021-03-01",
    "verification_status": "disputed",
    "disputes": [
      {
        "disputed_by": "user_id_xyz",
        "disputed_at": "2025-02-10",
        "claimed_value": 15000,
        "reason": "Local municipal records show higher count",
        "supporting_evidence": "url_to_document",
        "status": "under_review"
      }
    ]
  }
}
```

## 5. Temporal Evolution Without Breaking History

### The Versioning Strategy: Immutable History + Current Pointer

**Core Principle:** Never update a Place in-place. Always create a new version.

### Schema Design

```sql
-- Main Places table (current versions only)
CREATE TABLE places (
  place_id UUID PRIMARY KEY,
  version INTEGER NOT NULL,
  canonical_name VARCHAR(255) NOT NULL,
  place_type VARCHAR(50) NOT NULL,
  parent_place_id UUID,
  valid_from DATE NOT NULL,
  valid_to DATE,
  is_current BOOLEAN DEFAULT TRUE,
  -- ... all other attributes
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Historical versions table
CREATE TABLE places_history (
  history_id UUID PRIMARY KEY,
  place_id UUID NOT NULL,
  version INTEGER NOT NULL,
  canonical_name VARCHAR(255) NOT NULL,
  place_type VARCHAR(50) NOT NULL,
  parent_place_id UUID,
  valid_from DATE NOT NULL,
  valid_to DATE NOT NULL,
  -- ... all other attributes (snapshot)
  archived_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (place_id) REFERENCES places(place_id)
);

-- Index for time-travel queries
CREATE INDEX idx_places_history_temporal 
ON places_history(place_id, valid_from, valid_to);
```

### Evolution Scenarios

#### Scenario 1: Name Change
**Example:** "Bangalore" → "Bengaluru" (2014)

```json
// Version 1 (historical)
{
  "place_id": "uuid-bangalore",
  "version": 1,
  "canonical_name": "Bangalore",
  "valid_from": "1947-08-15",
  "valid_to": "2014-11-01",
  "is_current": false
}

// Version 2 (current)
{
  "place_id": "uuid-bangalore",              // Same ID
  "version": 2,
  "canonical_name": "Bengaluru",
  "alternate_names": ["Bangalore"],          // Old name preserved
  "valid_from": "2014-11-01",
  "valid_to": null,
  "is_current": true,
  "name_change_history": [
    {
      "previous_name": "Bangalore",
      "changed_on": "2014-11-01",
      "reason": "Official state government notification"
    }
  ]
}
```

#### Scenario 2: Boundary Change
**Example:** District split or merger

```json
// Old district (before split)
{
  "place_id": "uuid-old-district",
  "version": 1,
  "canonical_name": "Old District",
  "boundary": "GeoJSON-polygon-1",
  "area_sq_km": 5000,
  "valid_from": "1950-01-01",
  "valid_to": "2020-06-30",
  "is_current": false,
  "split_into": ["uuid-new-district-1", "uuid-new-district-2"]
}

// New district 1 (after split)
{
  "place_id": "uuid-new-district-1",
  "version": 1,
  "canonical_name": "New District 1",
  "boundary": "GeoJSON-polygon-2",
  "area_sq_km": 3000,
  "valid_from": "2020-07-01",
  "valid_to": null,
  "is_current": true,
  "created_from_split": "uuid-old-district"
}
```

#### Scenario 3: Data Update (Population Census)
**Example:** New census data available

```json
// Version 1 (Census 2011)
{
  "place_id": "uuid-village-x",
  "version": 1,
  "population": {
    "value": 5000,
    "confidence": 1.0,
    "source": "verified",
    "source_detail": "Census 2011"
  },
  "valid_from": "2011-03-01",
  "valid_to": "2021-02-28",
  "is_current": false
}

// Version 2 (Census 2021)
{
  "place_id": "uuid-village-x",              // Same ID
  "version": 2,
  "population": {
    "value": 6200,
    "confidence": 1.0,
    "source": "verified",
    "source_detail": "Census 2021"
  },
  "valid_from": "2021-03-01",
  "valid_to": null,
  "is_current": true
}
```

### Time-Travel Queries

**Query: "What was the population of Bangalore in 2010?"**

```sql
SELECT population 
FROM places_history 
WHERE place_id = 'uuid-bangalore' 
  AND '2010-01-01' BETWEEN valid_from AND valid_to;
```

**Query: "Show me all changes to this village in the last 10 years"**

```sql
SELECT version, valid_from, valid_to, population, literacy_rate
FROM places_history
WHERE place_id = 'uuid-village-x'
  AND valid_from >= '2015-01-01'
ORDER BY version ASC;
```

### API Response Format (Time-Aware)

```json
{
  "place_id": "uuid-bangalore",
  "as_of_date": "2025-01-15",               // Query date
  "current_version": 2,
  "data": {
    "canonical_name": "Bengaluru",
    "population": { /* ... */ },
    // ... all current attributes
  },
  "metadata": {
    "is_current": true,
    "valid_from": "2014-11-01",
    "valid_to": null,
    "previous_versions": [
      {
        "version": 1,
        "valid_from": "1947-08-15",
        "valid_to": "2014-11-01",
        "major_changes": ["name_change"]
      }
    ]
  }
}
```

## Scaling to 6+ Lakh Villages

### Database Partitioning Strategy

```sql
-- Partition by state for query performance
CREATE TABLE places (
  -- ... columns
) PARTITION BY LIST (state_id);

-- Create partition for each state
CREATE TABLE places_karnataka PARTITION OF places
FOR VALUES IN ('uuid-karnataka-state');
```

### Indexing Strategy

```sql
-- Spatial index for geographic queries
CREATE INDEX idx_places_geometry ON places USING GIST(boundary);

-- Hierarchical queries
CREATE INDEX idx_places_parent ON places(parent_place_id);
CREATE INDEX idx_places_path ON places USING GIN(administrative_path);

-- Type-based queries
CREATE INDEX idx_places_type ON places(place_type, state_id);
```

### Caching Strategy

- **L1 (Redis):** Current version of top 10K most-queried places
- **L2 (Application):** State/District metadata (changes rarely)
- **L3 (CDN):** Static attributes (boundaries, names) with 24h TTL

### Data Size Estimation

- **600,000 villages** × 50 KB average = **30 GB** (current data)
- **10 years of history** × 2 versions/year = **600 GB** (historical)
- **With indexes and overhead:** ~**1.5 TB** total

**Feasible with modern PostgreSQL + PostGIS on cloud infrastructure.**

---

**Last Updated**: December 28, 2025  
**Document Owner**: Data Architecture  
**Status**: Foundational Schema - v1.0
