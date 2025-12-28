# BharatAtlas Frontend

Minimal React + Vite application.

## Setup

1. **Get Mapbox Access Token**
   - Go to https://account.mapbox.com/access-tokens/
   - Create a free account if needed
   - Copy your default public token

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your token:
   ```
   VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91ci11c2VybmFtZSI...
   ```

## Development

```bash
npm run dev
```

Runs on `http://localhost:5173/`

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```
