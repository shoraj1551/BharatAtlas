# Frontend Folder Structure

## Overview
Scalable folder structure for nation-scale product supporting thousands of places and features.

## Structure

```
src/
├── components/          # Reusable UI components
│   ├── Map.jsx         # Map component with Mapbox
│   ├── Map.css
│   ├── PlacePanel.jsx  # Place information panel
│   └── PlacePanel.css
│
├── pages/              # Page-level components
│   ├── HomePage.jsx    # Main application page
│   └── HomePage.css
│
├── services/           # API and data services
│   └── placeService.js # Place data fetching
│
├── models/             # Data models and type definitions
│   └── Place.js        # Place model structure
│
├── data/               # Static data and GeoJSON
│   ├── places/         # Place objects
│   │   └── karnataka.js
│   └── states.json     # State boundaries GeoJSON
│
├── utils/              # Utility functions
│   └── formatters.js   # Number/data formatting
│
├── constants/          # Configuration constants
│   └── index.js        # App-wide constants
│
├── App.jsx             # Root application component
├── App.css
├── main.jsx            # Application entry point
└── index.css
```

## Principles

1. **Clarity over cleverness** - Obvious folder names, clear separation
2. **Scalability** - Can grow to thousands of places without restructuring
3. **Predictability** - Developers know where to find/add code
4. **Separation of concerns** - Components, pages, services, data are distinct

## Usage

- **components/** - Reusable UI pieces (Map, PlacePanel, future: Charts, Cards)
- **pages/** - Full page layouts (HomePage, future: SearchPage, ComparePage)
- **services/** - Data fetching logic (placeService, future: apiClient, authService)
- **models/** - Type definitions and data structures
- **data/** - Static data files and hardcoded objects
- **utils/** - Helper functions used across the app
- **constants/** - Configuration values and enums
