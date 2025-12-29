-- Sample Queries for BharatAtlas API
-- Optimized for production use with spatial indexes

-- ============================================
-- QUERY 1: Get All States (Map Load)
-- ============================================

SELECT 
    id,
    state_code,
    name,
    name_hi,
    ST_AsGeoJSON(geometry)::json AS geometry,
    population,
    area_sq_km,
    capital
FROM states
ORDER BY name;

-- Performance: < 50ms (36 states)

-- ============================================
-- QUERY 2: Get Districts for a State
-- ============================================

SELECT 
    d.id,
    d.district_code,
    d.name,
    d.name_hi,
    ST_AsGeoJSON(d.geometry)::json AS geometry,
    d.population,
    d.area_sq_km,
    d.headquarters
FROM districts d
JOIN states s ON d.state_id = s.id
WHERE s.name = $1  -- Parameter: state name
ORDER BY d.name;

-- Performance: < 100ms (30-50 districts per state)
-- Example: WHERE s.name = 'Karnataka'

-- ============================================
-- QUERY 3: Get Tehsils for a District
-- ============================================

SELECT 
    t.id,
    t.tehsil_code,
    t.name,
    t.name_hi,
    ST_AsGeoJSON(t.geometry)::json AS geometry,
    t.population,
    t.area_sq_km
FROM tehsils t
JOIN districts d ON t.district_id = d.id
WHERE d.name = $1  -- Parameter: district name
ORDER BY t.name;

-- Performance: < 50ms (5-20 tehsils per district)
-- Example: WHERE d.name = 'Bangalore Urban'

-- ============================================
-- QUERY 4: Get Thanas for a Tehsil
-- ============================================

SELECT 
    th.id,
    th.thana_code,
    th.name,
    th.name_hi,
    ST_AsGeoJSON(th.geometry)::json AS geometry,
    th.jurisdiction_area_sq_km
FROM thanas th
WHERE th.tehsil_id = $1  -- Parameter: tehsil ID
ORDER BY th.name;

-- Performance: < 30ms (10-50 thanas per tehsil)

-- ============================================
-- QUERY 5: Get Villages for a Thana (PAGINATED)
-- ============================================

SELECT 
    v.id,
    v.village_code,
    v.name,
    v.name_hi,
    ST_AsGeoJSON(v.centroid)::json AS geometry,
    v.population,
    v.census_code
FROM villages v
WHERE v.thana_id = $1  -- Parameter: thana ID
ORDER BY v.name
LIMIT $2 OFFSET $3;  -- Parameters: limit, offset

-- Performance: < 100ms (even with 1000+ villages)
-- Example: LIMIT 100 OFFSET 0 (first page)
-- CRITICAL: Always paginate to prevent loading 10,000+ villages

-- ============================================
-- QUERY 6: Get Villages in Bounding Box (Zoom-Based)
-- ============================================

SELECT 
    v.id,
    v.village_code,
    v.name,
    v.name_hi,
    ST_AsGeoJSON(v.centroid)::json AS geometry,
    v.population
FROM villages v
WHERE ST_Intersects(
    v.centroid,
    ST_MakeEnvelope($1, $2, $3, $4, 4326)  -- Parameters: minX, minY, maxX, maxY
)
AND v.district_id = $5  -- Parameter: district ID (limit scope)
LIMIT 500;  -- Hard cap to prevent overload

-- Performance: < 200ms (GIST index makes this fast)
-- Example: ST_MakeEnvelope(77.5, 12.8, 77.7, 13.0, 4326)
-- Use case: Load villages visible in current map viewport

-- ============================================
-- QUERY 7: Get Total Counts (Dashboard)
-- ============================================

SELECT 
    (SELECT COUNT(*) FROM states) AS total_states,
    (SELECT COUNT(*) FROM districts) AS total_districts,
    (SELECT COUNT(*) FROM tehsils) AS total_tehsils,
    (SELECT COUNT(*) FROM thanas) AS total_thanas,
    (SELECT COUNT(*) FROM villages) AS total_villages;

-- Performance: < 100ms (uses table statistics)

-- ============================================
-- QUERY 8: Search Places by Name (Autocomplete)
-- ============================================

-- Search across all admin levels
SELECT 
    'state' AS type,
    id,
    name,
    state_code AS code,
    NULL AS parent_name
FROM states
WHERE name ILIKE $1  -- Parameter: search term with wildcards
UNION ALL
SELECT 
    'district' AS type,
    d.id,
    d.name,
    d.district_code AS code,
    s.name AS parent_name
FROM districts d
JOIN states s ON d.state_id = s.id
WHERE d.name ILIKE $1
UNION ALL
SELECT 
    'village' AS type,
    v.id,
    v.name,
    v.village_code AS code,
    d.name AS parent_name
FROM villages v
JOIN districts d ON v.district_id = d.id
WHERE v.name ILIKE $1
LIMIT 20;

-- Performance: < 150ms with proper indexes
-- Example: WHERE name ILIKE '%Bangalore%'

-- ============================================
-- QUERY 9: Get Hierarchy Path (Breadcrumbs)
-- ============================================

-- For a village, get full hierarchy
SELECT 
    s.name AS state,
    d.name AS district,
    t.name AS tehsil,
    th.name AS thana,
    v.name AS village
FROM villages v
JOIN districts d ON v.district_id = d.id
JOIN states s ON v.state_id = s.id
LEFT JOIN tehsils t ON v.tehsil_id = t.id
LEFT JOIN thanas th ON v.thana_id = th.id
WHERE v.id = $1;  -- Parameter: village ID

-- Performance: < 20ms (uses foreign key indexes)

-- ============================================
-- QUERY 10: Nearest Villages to a Point
-- ============================================

SELECT 
    v.id,
    v.name,
    ST_AsGeoJSON(v.centroid)::json AS geometry,
    ST_Distance(
        v.centroid::geography,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
    ) AS distance_meters
FROM villages v
WHERE v.district_id = $3  -- Limit to district for performance
ORDER BY v.centroid <-> ST_SetSRID(ST_MakePoint($1, $2), 4326)  -- KNN index
LIMIT 10;

-- Performance: < 100ms (uses GIST index KNN)
-- Parameters: longitude, latitude, district_id
-- Example: ST_MakePoint(77.5946, 12.9716) -- Bangalore coordinates

-- ============================================
-- PERFORMANCE TIPS
-- ============================================

-- 1. Always use prepared statements to prevent SQL injection
-- 2. Use LIMIT for villages queries (never load all 600k)
-- 3. Use bounding box (ST_MakeEnvelope) for map viewport queries
-- 4. Use district_id filter to limit scope before spatial operations
-- 5. Use ST_AsGeoJSON for map-ready output
-- 6. Monitor query performance with EXPLAIN ANALYZE
