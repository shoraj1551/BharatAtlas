#!/bin/bash

# Data Import Script for BharatAtlas
# Imports GeoJSON files into PostgreSQL using ogr2ogr

set -e

# Configuration
DB_NAME="bharatatlas"
DB_USER="postgres"
DB_HOST="localhost"
DB_PORT="5432"
DATA_DIR="data"

echo "📥 BharatAtlas Data Import"
echo "=========================="

# Check if ogr2ogr is installed
if ! command -v ogr2ogr &> /dev/null; then
    echo "❌ ogr2ogr is not installed"
    echo "Install GDAL from: https://gdal.org/download.html"
    exit 1
fi

echo "✓ ogr2ogr found"

# Import States
if [ -f "$DATA_DIR/india_states.geojson" ]; then
    echo ""
    echo "📍 Importing states..."
    ogr2ogr -f "PostgreSQL" \
        PG:"dbname=$DB_NAME user=$DB_USER host=$DB_HOST port=$DB_PORT" \
        "$DATA_DIR/india_states.geojson" \
        -nln states \
        -lco GEOMETRY_NAME=geometry \
        -lco FID=id \
        -overwrite \
        -progress
    
    echo "✓ States imported"
else
    echo "⚠️  States file not found: $DATA_DIR/india_states.geojson"
fi

# Import Districts
if [ -f "$DATA_DIR/india_districts.geojson" ]; then
    echo ""
    echo "📍 Importing districts..."
    ogr2ogr -f "PostgreSQL" \
        PG:"dbname=$DB_NAME user=$DB_USER host=$DB_HOST port=$DB_PORT" \
        "$DATA_DIR/india_districts.geojson" \
        -nln districts \
        -lco GEOMETRY_NAME=geometry \
        -lco FID=id \
        -overwrite \
        -progress
    
    echo "✓ Districts imported"
else
    echo "⚠️  Districts file not found: $DATA_DIR/india_districts.geojson"
fi

# Import Tehsils (if available)
if [ -f "$DATA_DIR/india_tehsils.geojson" ]; then
    echo ""
    echo "📍 Importing tehsils..."
    ogr2ogr -f "PostgreSQL" \
        PG:"dbname=$DB_NAME user=$DB_USER host=$DB_HOST port=$DB_PORT" \
        "$DATA_DIR/india_tehsils.geojson" \
        -nln tehsils \
        -lco GEOMETRY_NAME=geometry \
        -lco FID=id \
        -overwrite \
        -progress
    
    echo "✓ Tehsils imported"
else
    echo "ℹ️  Tehsils file not found (optional): $DATA_DIR/india_tehsils.geojson"
fi

# Import Villages (if available)
if [ -f "$DATA_DIR/india_villages.geojson" ]; then
    echo ""
    echo "📍 Importing villages (this may take a while for 600k+ features)..."
    ogr2ogr -f "PostgreSQL" \
        PG:"dbname=$DB_NAME user=$DB_USER host=$DB_HOST port=$DB_PORT" \
        "$DATA_DIR/india_villages.geojson" \
        -nln villages \
        -lco GEOMETRY_NAME=centroid \
        -lco FID=id \
        -overwrite \
        -progress
    
    echo "✓ Villages imported"
else
    echo "ℹ️  Villages file not found (optional): $DATA_DIR/india_villages.geojson"
fi

echo ""
echo "✅ Data import complete!"
echo ""
echo "📊 Verify data:"
echo "   psql -U $DB_USER -d $DB_NAME -c 'SELECT COUNT(*) FROM states;'"
echo "   psql -U $DB_USER -d $DB_NAME -c 'SELECT COUNT(*) FROM districts;'"
