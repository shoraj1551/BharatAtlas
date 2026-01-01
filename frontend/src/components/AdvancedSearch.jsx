import { useState, useMemo } from 'react'
import './AdvancedSearch.css'

export default function AdvancedSearch({ places, onSelect }) {
    const [query, setQuery] = useState('')
    const [filters, setFilters] = useState({
        type: 'all',
        populationMin: '',
        populationMax: '',
        literacyMin: '',
        literacyMax: ''
    })
    const [sortBy, setSortBy] = useState('name-asc')

    // Filter and sort places
    const filteredPlaces = useMemo(() => {
        let results = places.filter(place => {
            // Text search
            if (query && !place.canonical_name.toLowerCase().includes(query.toLowerCase())) {
                return false
            }

            // Type filter
            if (filters.type !== 'all' && place.place_type !== filters.type) {
                return false
            }

            // Population filter
            const pop = place.population?.value || 0
            if (filters.populationMin && pop < parseInt(filters.populationMin)) return false
            if (filters.populationMax && pop > parseInt(filters.populationMax)) return false

            // Literacy filter
            const lit = place.literacy_rate?.value || 0
            if (filters.literacyMin && lit < parseFloat(filters.literacyMin)) return false
            if (filters.literacyMax && lit > parseFloat(filters.literacyMax)) return false

            return true
        })

        // Sort
        results.sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.canonical_name.localeCompare(b.canonical_name)
                case 'name-desc':
                    return b.canonical_name.localeCompare(a.canonical_name)
                case 'population-desc':
                    return (b.population?.value || 0) - (a.population?.value || 0)
                case 'population-asc':
                    return (a.population?.value || 0) - (b.population?.value || 0)
                case 'literacy-desc':
                    return (b.literacy_rate?.value || 0) - (a.literacy_rate?.value || 0)
                case 'literacy-asc':
                    return (a.literacy_rate?.value || 0) - (b.literacy_rate?.value || 0)
                default:
                    return 0
            }
        })

        return results
    }, [places, query, filters, sortBy])

    return (
        <div className="advanced-search">
            <div className="search-header">
                <h2>🔍 Advanced Search</h2>
                <p>{filteredPlaces.length} results</p>
            </div>

            {/* Search Input */}
            <input
                type="text"
                className="search-input"
                placeholder="Search places..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {/* Filters */}
            <div className="search-filters">
                <div className="filter-group">
                    <label>Type</label>
                    <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
                        <option value="all">All</option>
                        <option value="state">States</option>
                        <option value="district">Districts</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Population</label>
                    <div className="range-inputs">
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.populationMin}
                            onChange={(e) => setFilters({ ...filters, populationMin: e.target.value })}
                        />
                        <span>to</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.populationMax}
                            onChange={(e) => setFilters({ ...filters, populationMax: e.target.value })}
                        />
                    </div>
                </div>

                <div className="filter-group">
                    <label>Literacy Rate (%)</label>
                    <div className="range-inputs">
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.literacyMin}
                            onChange={(e) => setFilters({ ...filters, literacyMin: e.target.value })}
                        />
                        <span>to</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.literacyMax}
                            onChange={(e) => setFilters({ ...filters, literacyMax: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* Sort */}
            <div className="search-sort">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="population-desc">Population (High-Low)</option>
                    <option value="population-asc">Population (Low-High)</option>
                    <option value="literacy-desc">Literacy (High-Low)</option>
                    <option value="literacy-asc">Literacy (Low-High)</option>
                </select>
            </div>

            {/* Results */}
            <div className="search-results">
                {filteredPlaces.map(place => (
                    <div key={place.place_id} className="search-result-item" onClick={() => onSelect(place)}>
                        <div className="result-name">{place.canonical_name}</div>
                        <div className="result-meta">
                            <span className="result-type">{place.place_type}</span>
                            {place.population?.value && (
                                <span className="result-stat">Pop: {(place.population.value / 1000000).toFixed(1)}M</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
