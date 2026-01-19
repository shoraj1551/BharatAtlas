import { useState } from 'react'
import './SearchFilterPanel.css'

export default function SearchFilterPanel({ onFilterChange, onClear }) {
    const [filters, setFilters] = useState({
        population: { min: '', max: '' },
        literacy: { min: '', max: '' },
        industries: [],
        climate: '',
        infrastructure_min: '',
        place_type: ''
    })

    const industries = [
        'Agriculture', 'Manufacturing', 'IT/Software', 'Tourism',
        'Textiles', 'Automotive', 'Pharmaceuticals', 'Mining'
    ]

    const climateTypes = [
        'Tropical', 'Subtropical', 'Temperate', 'Arid', 'Semi-Arid'
    ]

    const handleChange = (field, value) => {
        const newFilters = { ...filters, [field]: value }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const handleRangeChange = (field, subfield, value) => {
        const newFilters = {
            ...filters,
            [field]: { ...filters[field], [subfield]: value }
        }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const handleIndustryToggle = (industry) => {
        const newIndustries = filters.industries.includes(industry)
            ? filters.industries.filter(i => i !== industry)
            : [...filters.industries, industry]

        const newFilters = { ...filters, industries: newIndustries }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const handleClear = () => {
        const clearedFilters = {
            population: { min: '', max: '' },
            literacy: { min: '', max: '' },
            industries: [],
            climate: '',
            infrastructure_min: '',
            place_type: ''
        }
        setFilters(clearedFilters)
        onClear()
    }

    return (
        <div className="search-filter-panel">
            <div className="filter-header">
                <h3>Filters</h3>
                <button onClick={handleClear} className="clear-btn">Clear All</button>
            </div>

            {/* Population Filter */}
            <div className="filter-group">
                <label>Population</label>
                <div className="range-inputs">
                    <input
                        type="number"
                        placeholder="Min"
                        value={filters.population.min}
                        onChange={(e) => handleRangeChange('population', 'min', e.target.value)}
                    />
                    <span>to</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={filters.population.max}
                        onChange={(e) => handleRangeChange('population', 'max', e.target.value)}
                    />
                </div>
            </div>

            {/* Literacy Filter */}
            <div className="filter-group">
                <label>Literacy Rate (%)</label>
                <div className="range-inputs">
                    <input
                        type="number"
                        placeholder="Min"
                        min="0"
                        max="100"
                        value={filters.literacy.min}
                        onChange={(e) => handleRangeChange('literacy', 'min', e.target.value)}
                    />
                    <span>to</span>
                    <input
                        type="number"
                        placeholder="Max"
                        min="0"
                        max="100"
                        value={filters.literacy.max}
                        onChange={(e) => handleRangeChange('literacy', 'max', e.target.value)}
                    />
                </div>
            </div>

            {/* Industries Filter */}
            <div className="filter-group">
                <label>Industries</label>
                <div className="checkbox-group">
                    {industries.map(industry => (
                        <label key={industry} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={filters.industries.includes(industry)}
                                onChange={() => handleIndustryToggle(industry)}
                            />
                            {industry}
                        </label>
                    ))}
                </div>
            </div>

            {/* Climate Filter */}
            <div className="filter-group">
                <label>Climate Type</label>
                <select
                    value={filters.climate}
                    onChange={(e) => handleChange('climate', e.target.value)}
                >
                    <option value="">All</option>
                    {climateTypes.map(climate => (
                        <option key={climate} value={climate}>{climate}</option>
                    ))}
                </select>
            </div>

            {/* Infrastructure Score */}
            <div className="filter-group">
                <label>Min Infrastructure Score</label>
                <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0-100"
                    value={filters.infrastructure_min}
                    onChange={(e) => handleChange('infrastructure_min', e.target.value)}
                />
            </div>

            {/* Place Type */}
            <div className="filter-group">
                <label>Place Type</label>
                <select
                    value={filters.place_type}
                    onChange={(e) => handleChange('place_type', e.target.value)}
                >
                    <option value="">All</option>
                    <option value="state">State</option>
                    <option value="district">District</option>
                    <option value="city">City</option>
                    <option value="union territory">Union Territory</option>
                </select>
            </div>
        </div>
    )
}
