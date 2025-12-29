# PostgreSQL + PostGIS Database Setup

Complete guide for setting up the production-grade database for BharatAtlas.

## Prerequisites

1. **PostgreSQL 14+**
   - Download: https://www.postgresql.org/download/
   - Windows: Use installer from EnterpriseDB
   - Verify: `psql --version`

2. **PostGIS 3.3+**
   - Included in PostgreSQL installer (check "PostGIS" during installation)
   - Verify: `psql -U postgres -c "SELECT PostGIS_Version();"`

3. **GDAL/OGR (for data import)**
   - Download: https://gdal.org/download.html
   - Windows: Use OSGeo4W installer
   - Verify: `ogr2ogr --version`

## Quick Start

### 1. Update Environment Variables

Copy `.env.example` to `.env` and update database credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bharatatlas
DB_USER=postgres
DB_PASSWORD=your_password_here
```

### 2. Create Database

**Option A: Using setup script (Linux/Mac)**
```bash
chmod +x database/setup.sh
./database/setup.sh
```

**Option B: Manual setup (Windows/All)**
```powershell
# Create database
psql -U postgres -c "CREATE DATABASE bharatatlas;"

# Enable PostGIS
psql -U postgres -d bharatatlas -c "CREATE EXTENSION postgis;"
psql -U postgres -d bharatatlas -c "CREATE EXTENSION postgis_topology;"

# Run schema
psql -U postgres -d bharatatlas -f database/schema.sql
```

### 3. Import Data

Place GeoJSON files in `data/` directory:
- `india_states.geojson` (required)
- `india_districts.geojson` (required)
- `india_tehsils.geojson` (optional)
- `india_villages.geojson` (optional)

**Option A: Using import script (Linux/Mac)**
```bash
chmod +x database/import_data.sh
./database/import_data.sh
```

**Option B: Manual import (Windows/All)**
```powershell
# Import states
ogr2ogr -f "PostgreSQL" `
  "PG:dbname=bharatatlas user=postgres" `
  "data/india_states.geojson" `
  -nln states `
  -lco GEOMETRY_NAME=geometry `
  -lco FID=id `
  -overwrite

# Import districts
ogr2ogr -f "PostgreSQL" `
  "PG:dbname=bharatatlas user=postgres" `
  "data/india_districts.geojson" `
  -nln districts `
  -lco GEOMETRY_NAME=geometry `
  -lco FID=id `
  -overwrite
```

### 4. Verify Data

```sql
-- Check row counts
psql -U postgres -d bharatatlas -c "
  SELECT 
    (SELECT COUNT(*) FROM states) AS states,
    (SELECT COUNT(*) FROM districts) AS districts,
    (SELECT COUNT(*) FROM tehsils) AS tehsils,
    (SELECT COUNT(*) FROM villages) AS villages;
"

-- Check spatial indexes
psql -U postgres -d bharatatlas -c "
  SELECT tablename, indexname 
  FROM pg_indexes 
  WHERE schemaname = 'public' 
  AND indexname LIKE 'idx_%';
"
```

### 5. Start Backend

```bash
npm run dev
```

Server will connect to PostgreSQL and serve data via API.

## Database Schema

### Tables

| Table | Rows | Geometry Type | Purpose |
|-------|------|---------------|---------|
| `states` | 36 | MULTIPOLYGON | State boundaries |
| `districts` | ~750 | MULTIPOLYGON | District boundaries |
| `tehsils` | ~5,000 | MULTIPOLYGON | Tehsil boundaries |
| `thanas` | ~15,000 | POINT | Police station locations |
| `villages` | ~600,000 | POINT | Village centroids |

### Indexes

- **GIST indexes**: Fast spatial queries (bounding box, intersection)
- **BRIN indexes**: Efficient for large sequential data (villages)
- **Foreign key indexes**: Fast parent-child lookups

## Performance Optimization

### Query Performance

Expected query times:
- Load states: < 50ms
- Load districts (1 state): < 100ms
- Load villages (bbox): < 200ms

### Index Maintenance

```sql
-- Analyze tables after data import
ANALYZE states;
ANALYZE districts;
ANALYZE villages;

-- Vacuum to reclaim space
VACUUM ANALYZE;
```

### Connection Pooling

Backend uses connection pooling (max 20 connections):
- Idle timeout: 30 seconds
- Connection timeout: 2 seconds

## Troubleshooting

### Connection Failed

```
❌ Database connection failed: ECONNREFUSED
```

**Solution**: Ensure PostgreSQL is running
```bash
# Windows
net start postgresql-x64-14

# Linux/Mac
sudo systemctl start postgresql
```

### PostGIS Not Found

```
❌ ERROR: extension "postgis" does not exist
```

**Solution**: Install PostGIS extension
```bash
# Ubuntu/Debian
sudo apt-get install postgresql-14-postgis-3

# Windows: Reinstall PostgreSQL with PostGIS checked
```

### Import Failed

```
❌ ERROR: Unable to open datasource
```

**Solution**: Check file paths and GDAL installation
```bash
# Verify GDAL
ogr2ogr --version

# Check file exists
ls -la data/india_states.geojson
```

## Data Sources

### Recommended Sources

1. **DataMeet** (Open Source)
   - Repository: https://github.com/datameet/maps
   - License: CC-BY-4.0
   - Coverage: States, Districts

2. **Survey of India** (Official)
   - Website: https://www.surveyofindia.gov.in/
   - License: Requires permission
   - Coverage: All admin levels

3. **OpenStreetMap** (Community)
   - Website: https://www.openstreetmap.org/
   - License: ODbL
   - Coverage: Variable quality

### Data Preparation

For villages (600k+ features):
```bash
# Extract centroids from polygons
ogr2ogr -f GeoJSON \
  india_villages_centroids.geojson \
  india_villages_polygons.geojson \
  -sql "SELECT *, ST_Centroid(geometry) as centroid FROM villages"
```

## Production Deployment

### Database Hosting

Recommended providers:
- **Supabase** (PostgreSQL + PostGIS, free tier)
- **AWS RDS** (managed PostgreSQL)
- **DigitalOcean Managed Databases**
- **Google Cloud SQL**

### Security

1. **Change default password**
   ```sql
   ALTER USER postgres WITH PASSWORD 'strong_password_here';
   ```

2. **Create application user**
   ```sql
   CREATE USER bharatatlas_app WITH PASSWORD 'app_password';
   GRANT SELECT ON ALL TABLES IN SCHEMA public TO bharatatlas_app;
   ```

3. **Enable SSL**
   ```
   DB_SSL=true
   DB_SSL_REJECT_UNAUTHORIZED=false
   ```

### Backup

```bash
# Backup database
pg_dump -U postgres bharatatlas > backup.sql

# Backup with compression
pg_dump -U postgres bharatatlas | gzip > backup.sql.gz

# Restore
psql -U postgres bharatatlas < backup.sql
```

## Next Steps

1. ✅ Database setup complete
2. ✅ Data imported
3. ⏳ Update backend to use PostgreSQL (see `src/services/geoService.js`)
4. ⏳ Test API endpoints
5. ⏳ Deploy to production

## Support

For issues:
1. Check logs: `tail -f /var/log/postgresql/postgresql-14-main.log`
2. Test connection: `psql -U postgres -d bharatatlas`
3. Review queries: `database/queries.sql`
