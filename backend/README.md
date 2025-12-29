# BharatAtlas Backend API

Production-grade backend API for hierarchical geo data and image services.

## Tech Stack

- **Node.js** + **Express** - Fast, lightweight server
- **node-cache** - In-memory caching (1 hour TTL for geo, 24 hours for images)
- **Wikimedia Commons API** - Free, legal image source

## API Endpoints

### Geo Data

```
GET /api/geo/states
Returns all Indian states

GET /api/geo/districts?state=Karnataka
Returns districts for specified state

GET /api/geo/tehsils?district=Bangalore
Returns tehsils for specified district (TODO: data needed)

GET /api/geo/thanas?tehsil=Anekal
Returns thanas for specified tehsil (TODO: data needed)

GET /api/geo/villages?thana=Jigani&limit=100
Returns village centroids (paginated, TODO: data needed)
```

### Images

```
GET /api/images?place=Jaipur&type=district&limit=5
Returns Wikimedia Commons images for place
```

### Health Check

```
GET /health
Returns server status
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env`
   - Update `FRONTEND_URL` if needed

3. **Add data files:**
   - Place GeoJSON files in `data/` directory:
     - `india_states.geojson` ✅
     - `india_districts.geojson` (needed)
     - `india_tehsils.geojson` (needed)
     - `india_villages.geojson` (needed - centroids only)

## Running

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on `http://localhost:3001`

## Data Requirements

### States ✅
- File: `india_states.geojson`
- Properties: `ST_NM`, `ST_CODE`

### Districts ⏳
- File: `india_districts.geojson`
- Properties: `ST_NM`, `DIST_NM`, `dt_code`

### Tehsils ⏳
- File: `india_tehsils.geojson`
- Properties: `DIST_NM`, `TEHSIL_NM`

### Villages ⏳
- File: `india_villages.geojson`
- **IMPORTANT**: Use centroids (points) only, not polygons
- Properties: `village_id`, `name`, `thana`

## Caching Strategy

- **Geo Data**: 1 hour TTL (3600s)
- **Images**: 24 hours TTL (86400s)
- **Cache Key Format**: `{type}:{identifier}`

## Performance

- Response compression enabled
- CORS configured for frontend
- In-memory caching for fast responses
- Lazy loading for hierarchical data

## Deployment

**Recommended platforms:**
- Railway (easiest)
- Render (free tier available)
- Vercel (serverless functions)

**Environment variables needed:**
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - CORS origin
- `CACHE_TTL` - Cache duration in seconds

## Future Enhancements

- [ ] Redis for distributed caching
- [ ] PostgreSQL + PostGIS for spatial queries
- [ ] Vector tiles for villages
- [ ] Rate limiting
- [ ] API authentication
- [ ] Monitoring and analytics
