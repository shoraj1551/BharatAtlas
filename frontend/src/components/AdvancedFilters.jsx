import { useState } from 'react'
import './AdvancedFilters.css'

/**
 * Advanced Filters Component
 * 
 * Provides filtering capabilities for place search
 */

const PLACE_TYPES = ['state', 'district', 'tehsil', 'thana', 'village']

function AdvancedFilters({ onFilterChange, initialFilters = {} }) {
    const [filters, setFilters] = useState({
        placeType: initialFilters.placeType || '',
        populationMin: initialFilters.populationMin || '',
        populationMax: initialFilters.populationMax || '',
        areaMin: initialFilters.areaMin || '',
        areaMax: initialFilters.areaMax || '',
        literacyMin: initialFilters.literacyMin || '',
        literacyMax: initialFilters.literacyMax || '',
        sortBy: initialFilters.sortBy || 'name',
        sortOrder: initialFilters.sortOrder || 'asc'
    })

    const [isExpanded, setIsExpanded] = useState(false)

    const handleChange = (field, value) => {
        const newFilters = { ...filters, [field]: value }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const handleReset = () => {
        const resetFilters = {
            placeType: '',
            populationMin: '',
            populationMax: '',
            areaMin: '',
            areaMax: '',
            literacyMin: '',
            literacyMax: '',
            sortBy: 'name',
            sortOrder: 'asc'
        }
        setFilters(resetFilters)
        onFilterChange(resetFilters)
    }

    const activeFilterCount = Object.values(filters).filter(v => v && v !== 'name' && v !== 'asc').length

    return (
        <div className="advanced-filters">
            <div className="filters-header">
                <button
                    className="filters-toggle"
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-expanded={isExpanded}
                >
                    <span className="toggle-icon">{isExpanded ? '▼' : '▶'}</span>
                    <span className="toggle-text">Advanced Filters</span>
                    {activeFilterCount > 0 && (
                        <span className="filter-count">{activeFilterCount} active</span>
                    )}
                </button>
                {activeFilterCount > 0 && (
                    <button className="reset-btn" onClick={handleReset}>
                        Reset All
                    </button>
                )}
            </div>

            {isExpanded && (
                <div className="filters-content">
                    {/* Place Type Filter */}
                    <div className="filter-group">
                        <label htmlFor="placeType">Place Type</label>
                        <select
                            id="placeType"
                            value={filters.placeType}
                            onChange={(e) => handleChange('placeType', e.target.value)}
                        >
                            <option value="">All Types</option>
                            {PLACE_TYPES.map(type => (
                                <option key={type} value={type}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Population Range */}
                    <div className="filter-group">
                        <label>Population Range</label>
                        <div className="range-inputs">
                            <input
                                type="number"
                                placeholder="Min"
                                value={filters.populationMin}
                                onChange={(e) => handleChange('populationMin', e.target.value)}
                            />
                            <span className="range-separator">to</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={filters.populationMax}
                                onChange={(e) => handleChange('populationMax', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Area Range */}
                    <div className="filter-group">
                        <label>Area (km²)</label>
                        <div className="range-inputs">
                            <input
                                type="number"
                                placeholder="Min"
                                value={filters.areaMin}
                                onChange={(e) => handleChange('areaMin', e.target.value)}
                            />
                            <span className="range-separator">to</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={filters.areaMax}
                                onChange={(e) => handleChange('areaMax', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Literacy Rate Range */}
                    <div className="filter-group">
                        <label>Literacy Rate (%)</label>
                        <div className="range-inputs">
                            <input
                                type="number"
                                placeholder="Min"
                                min="0"
                                max="100"
                                value={filters.literacyMin}
                                onChange={(e) => handleChange('literacyMin', e.target.value)}
                            />
                            <span className="range-separator">to</span>
                            <input
                                type="number"
                                placeholder="Max"
                                min="0"
                                max="100"
                                value={filters.literacyMax}
                                onChange={(e) => handleChange('literacyMax', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Sort Options */}
                    <div className="filter-group">
                        <label htmlFor="sortBy">Sort By</label>
                        <div className="sort-controls">
                            <select
                                id="sortBy"
                                value={filters.sortBy}
                                onChange={(e) => handleChange('sortBy', e.target.value)}
                            >
                                <option value="name">Name</option>
                                <option value="population">Population</option>
                                <option value="area">Area</option>
                                <option value="literacy">Literacy Rate</option>
                            </select>
                            <select
                                value={filters.sortOrder}
                                onChange={(e) => handleChange('sortOrder', e.target.value)}
                                aria-label="Sort order"
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdvancedFilters
