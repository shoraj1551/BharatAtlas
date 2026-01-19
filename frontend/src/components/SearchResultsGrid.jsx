import { useNavigate } from 'react-router-dom'
import './SearchResultsGrid.css'

export default function SearchResultsGrid({ results, loading }) {
    const navigate = useNavigate()

    if (loading) {
        return <div className="loading">Searching...</div>
    }

    if (!results || results.length === 0) {
        return (
            <div className="no-results">
                <p>No places found matching your criteria</p>
                <p className="hint">Try adjusting your filters</p>
            </div>
        )
    }

    return (
        <div className="search-results-grid">
            {results.map(place => (
                <div
                    key={place.place_id}
                    className="result-card"
                    onClick={() => navigate(`/place/${place.place_id}`)}
                >
                    <h3>{place.canonical_name}</h3>
                    <span className="place-type">{place.place_type}</span>

                    <div className="result-stats">
                        {place.filters.population.value > 0 && (
                            <div className="stat">
                                <span className="label">Population:</span>
                                <span className="value">
                                    {(place.filters.population.value / 1000000).toFixed(1)}M
                                </span>
                            </div>
                        )}

                        {place.filters.literacy_rate.value > 0 && (
                            <div className="stat">
                                <span className="label">Literacy:</span>
                                <span className="value">
                                    {place.filters.literacy_rate.value.toFixed(1)}%
                                </span>
                            </div>
                        )}

                        {place.filters.infrastructure_score > 0 && (
                            <div className="stat">
                                <span className="label">Infrastructure:</span>
                                <span className="value">
                                    {place.filters.infrastructure_score}/100
                                </span>
                            </div>
                        )}
                    </div>

                    {place.filters.industries.length > 0 && (
                        <div className="industries">
                            {place.filters.industries.slice(0, 3).map(industry => (
                                <span key={industry} className="industry-tag">{industry}</span>
                            ))}
                        </div>
                    )}

                    {place.readiness_score.total > 0 && (
                        <div className="readiness-badge">
                            <span className="score">{place.readiness_score.total}</span>
                            <span className="label">{place.readiness_score.label}</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
