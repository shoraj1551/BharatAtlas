# Districts GeoJSON Download Instructions

The `india_districts.geojson` file needs to be downloaded manually.

## Option 1: DataMeet Repository (Recommended)
Visit: https://github.com/datameet/maps
Download the districts shapefile and convert to GeoJSON

## Option 2: guneetnarula Repository
Visit: https://github.com/guneetnarula/indian-district-boundaries
Download: `india_district.geojson`
Rename to: `india_districts.geojson`
Place in: `frontend/public/data/india_districts.geojson`

## Option 3: Use Browser
1. Open: https://raw.githubusercontent.com/guneetnarula/indian-district-boundaries/master/india_district.geojson
2. Right-click → Save As
3. Save to: `frontend/public/data/india_districts.geojson`

## Verify Properties
After downloading, verify the GeoJSON has these properties:
- `ST_NM` or `st_nm` - State name
- `DIST_NM` or `district` - District name

The application will work with states only until districts are downloaded.
