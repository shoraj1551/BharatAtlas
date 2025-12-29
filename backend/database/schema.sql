-- BharatAtlas Database Schema
-- PostgreSQL 14+ with PostGIS 3.3+
-- Production-grade schema for India-scale geospatial data

-- ============================================
-- EXTENSIONS
-- ============================================

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

-- ============================================
-- TABLE: states
-- ============================================

CREATE TABLE states (
    id SERIAL PRIMARY KEY,
    state_code VARCHAR(2) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    name_hi VARCHAR(100),
    geometry GEOMETRY(MULTIPOLYGON, 4326) NOT NULL,
    
    -- Metadata
    population BIGINT,
    area_sq_km NUMERIC(10, 2),
    capital VARCHAR(100),
    
    -- Audit
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT enforce_srid_geometry CHECK (ST_SRID(geometry) = 4326)
);

-- Indexes
CREATE INDEX idx_states_geometry ON states USING GIST (geometry);
CREATE INDEX idx_states_code ON states (state_code);
CREATE INDEX idx_states_name ON states (name);

-- Comments
COMMENT ON TABLE states IS 'Indian states and union territories';
COMMENT ON COLUMN states.geometry IS 'State boundary as MULTIPOLYGON (handles islands/exclaves)';

-- ============================================
-- TABLE: districts
-- ============================================

CREATE TABLE districts (
    id SERIAL PRIMARY KEY,
    district_code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    name_hi VARCHAR(100),
    state_id INTEGER NOT NULL REFERENCES states(id) ON DELETE CASCADE,
    geometry GEOMETRY(MULTIPOLYGON, 4326) NOT NULL,
    
    -- Metadata
    population BIGINT,
    area_sq_km NUMERIC(10, 2),
    headquarters VARCHAR(100),
    
    -- Audit
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT enforce_srid_geometry CHECK (ST_SRID(geometry) = 4326)
);

-- Indexes
CREATE INDEX idx_districts_geometry ON districts USING GIST (geometry);
CREATE INDEX idx_districts_state_id ON districts (state_id);
CREATE INDEX idx_districts_code ON districts (district_code);
CREATE INDEX idx_districts_name ON districts (name);

-- Comments
COMMENT ON TABLE districts IS 'Districts within states (~750 total)';
COMMENT ON COLUMN districts.state_id IS 'Parent state reference';

-- ============================================
-- TABLE: tehsils
-- ============================================

CREATE TABLE tehsils (
    id SERIAL PRIMARY KEY,
    tehsil_code VARCHAR(15) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    name_hi VARCHAR(100),
    district_id INTEGER NOT NULL REFERENCES districts(id) ON DELETE CASCADE,
    geometry GEOMETRY(MULTIPOLYGON, 4326) NOT NULL,
    
    -- Metadata
    population BIGINT,
    area_sq_km NUMERIC(10, 2),
    
    -- Audit
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT enforce_srid_geometry CHECK (ST_SRID(geometry) = 4326)
);

-- Indexes
CREATE INDEX idx_tehsils_geometry ON tehsils USING GIST (geometry);
CREATE INDEX idx_tehsils_district_id ON tehsils (district_id);
CREATE INDEX idx_tehsils_code ON tehsils (tehsil_code);
CREATE INDEX idx_tehsils_name ON tehsils (name);

-- Comments
COMMENT ON TABLE tehsils IS 'Tehsils/Taluks within districts (availability varies by state)';

-- ============================================
-- TABLE: thanas
-- ============================================

CREATE TABLE thanas (
    id SERIAL PRIMARY KEY,
    thana_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    name_hi VARCHAR(100),
    tehsil_id INTEGER REFERENCES tehsils(id) ON DELETE CASCADE,
    district_id INTEGER REFERENCES districts(id) ON DELETE CASCADE,
    
    -- POINT geometry for thana location (not full boundary)
    geometry GEOMETRY(POINT, 4326) NOT NULL,
    
    -- Metadata
    jurisdiction_area_sq_km NUMERIC(10, 2),
    
    -- Audit
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT enforce_srid_geometry CHECK (ST_SRID(geometry) = 4326),
    CONSTRAINT thana_parent_check CHECK (tehsil_id IS NOT NULL OR district_id IS NOT NULL)
);

-- Indexes
CREATE INDEX idx_thanas_geometry ON thanas USING GIST (geometry);
CREATE INDEX idx_thanas_tehsil_id ON thanas (tehsil_id) WHERE tehsil_id IS NOT NULL;
CREATE INDEX idx_thanas_district_id ON thanas (district_id) WHERE district_id IS NOT NULL;
CREATE INDEX idx_thanas_code ON thanas (thana_code);

-- Comments
COMMENT ON TABLE thanas IS 'Police stations / sub-districts (POINT geometry only)';
COMMENT ON COLUMN thanas.geometry IS 'Thana location as POINT (not polygon)';

-- ============================================
-- TABLE: villages (CRITICAL FOR SCALE)
-- ============================================

CREATE TABLE villages (
    id SERIAL PRIMARY KEY,
    village_code VARCHAR(25) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    name_hi VARCHAR(100),
    thana_id INTEGER REFERENCES thanas(id) ON DELETE CASCADE,
    tehsil_id INTEGER REFERENCES tehsils(id) ON DELETE CASCADE,
    district_id INTEGER NOT NULL REFERENCES districts(id) ON DELETE CASCADE,
    state_id INTEGER NOT NULL REFERENCES states(id) ON DELETE CASCADE,
    
    -- CRITICAL: POINT ONLY - Never use POLYGON for villages
    centroid GEOMETRY(POINT, 4326) NOT NULL,
    
    -- Metadata
    population INTEGER,
    census_code VARCHAR(20),
    
    -- Audit
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT enforce_srid_centroid CHECK (ST_SRID(centroid) = 4326)
);

-- Indexes (optimized for 600,000+ rows)
CREATE INDEX idx_villages_centroid ON villages USING GIST (centroid);

-- BRIN indexes (much smaller than B-tree for large sequential data)
CREATE INDEX idx_villages_district_brin ON villages USING BRIN (district_id);
CREATE INDEX idx_villages_state_brin ON villages USING BRIN (state_id);

-- Regular indexes
CREATE INDEX idx_villages_code ON villages (village_code);
CREATE INDEX idx_villages_thana_id ON villages (thana_id) WHERE thana_id IS NOT NULL;
CREATE INDEX idx_villages_tehsil_id ON villages (tehsil_id) WHERE tehsil_id IS NOT NULL;

-- Comments
COMMENT ON TABLE villages IS 'Villages (~600,000 total) - POINT geometry only for performance';
COMMENT ON COLUMN villages.centroid IS 'Village centroid as POINT (never polygon to prevent browser crashes)';
COMMENT ON INDEX idx_villages_district_brin IS 'BRIN index: 100x smaller than B-tree for large tables';

-- ============================================
-- FUNCTIONS
-- ============================================

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_states_updated_at BEFORE UPDATE ON states
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_districts_updated_at BEFORE UPDATE ON districts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tehsils_updated_at BEFORE UPDATE ON tehsils
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_thanas_updated_at BEFORE UPDATE ON thanas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_villages_updated_at BEFORE UPDATE ON villages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VIEWS (for common queries)
-- ============================================

-- View: States with feature count
CREATE VIEW states_summary AS
SELECT 
    s.id,
    s.state_code,
    s.name,
    s.population,
    s.area_sq_km,
    COUNT(DISTINCT d.id) AS district_count,
    COUNT(DISTINCT v.id) AS village_count
FROM states s
LEFT JOIN districts d ON s.id = d.state_id
LEFT JOIN villages v ON s.id = v.state_id
GROUP BY s.id, s.state_code, s.name, s.population, s.area_sq_km;

COMMENT ON VIEW states_summary IS 'States with district and village counts';

-- ============================================
-- GRANTS (adjust as needed)
-- ============================================

-- Grant read access to application user
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO bharatatlas_app;
-- GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO bharatatlas_app;
