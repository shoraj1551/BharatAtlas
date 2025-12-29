#!/bin/bash

# BharatAtlas Database Setup Script
# Initializes PostgreSQL database with PostGIS

set -e  # Exit on error

# Configuration
DB_NAME="bharatatlas"
DB_USER="postgres"
DB_PASSWORD="postgres"  # Change in production!
DB_HOST="localhost"
DB_PORT="5432"

echo "🚀 BharatAtlas Database Setup"
echo "=============================="

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed"
    echo "Install PostgreSQL 14+ from: https://www.postgresql.org/download/"
    exit 1
fi

echo "✓ PostgreSQL found"

# Check if PostGIS is available
POSTGIS_VERSION=$(psql -U $DB_USER -h $DB_HOST -p $DB_PORT -t -c "SELECT PostGIS_Version();" postgres 2>/dev/null || echo "")

if [ -z "$POSTGIS_VERSION" ]; then
    echo "⚠️  PostGIS not found"
    echo "Install PostGIS 3.3+ from: https://postgis.net/install/"
    exit 1
fi

echo "✓ PostGIS found: $POSTGIS_VERSION"

# Create database
echo ""
echo "📦 Creating database: $DB_NAME"
psql -U $DB_USER -h $DB_HOST -p $DB_PORT -c "CREATE DATABASE $DB_NAME;" postgres 2>/dev/null || echo "Database already exists"

# Enable PostGIS extension
echo "🗺️  Enabling PostGIS extension"
psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -c "CREATE EXTENSION IF NOT EXISTS postgis;"
psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -c "CREATE EXTENSION IF NOT EXISTS postgis_topology;"

# Run schema
echo "📋 Creating tables and indexes"
psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -f database/schema.sql

echo ""
echo "✅ Database setup complete!"
echo ""
echo "📊 Database Info:"
echo "   Name: $DB_NAME"
echo "   Host: $DB_HOST:$DB_PORT"
echo "   User: $DB_USER"
echo ""
echo "🔗 Connection String:"
echo "   postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"
echo ""
echo "📝 Next Steps:"
echo "   1. Import data: ./database/import_data.sh"
echo "   2. Update .env with connection string"
echo "   3. Start backend: npm run dev"
