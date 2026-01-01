import { useState, useEffect } from 'react'
import { findSimilarPlaces } from '../services/nearbyPlaces'
import { Link } from 'react-router-dom'
import './SimilarPlaces.css'

/**
 * Similar Places Component
 * 
 * Shows places similar to the current one
 */
function SimilarPlaces({ currentPlace, allPlaces = [] }) {
    const [similarPlaces, setSimilarPlaces] = useState([])

    useEffect(() => {
        if (currentPlace && allPlaces.length > 0) {
            const similar = findSimilarPlaces(currentPlace, allPlaces, 5)
            setSimilarPlaces(similar)
        }
    }, [currentPlace, allPlaces])

    if (similarPlaces.length === 0) {
        return null
    }

    return (
        <div className="similar-places">
            <h3>Similar Places</h3>
            <p className="similar-subtitle">
                Places with similar characteristics to {currentPlace.canonical_name}
            </p>

            <div className="similar-grid">
                {similarPlaces.map(place => (
                    <Link
                        key={place.place_id}
                        to={`/place/${place.place_id}`}
                        className="similar-card"
                    >
                        <div className="similar-header">
                            <h4>{place.canonical_name}</h4>
                            <span className="similar-type">{place.place_type.toUpperCase()}</span>
                        </div>

                        <div className="similar-stats">
                            {place.population?.value && (
                                <div className="stat-item">
                                    <span className="stat-label">Population:</span>
                                    <span className="stat-value">
                                        {place.population.value.toLocaleString()}
                                    </span>
                                </div>
                            )}
                            {place.area_sq_km && (
                                <div className="stat-item">
                                    <span className="stat-label">Area:</span>
                                    <span className="stat-value">
                                        {place.area_sq_km.toLocaleString()} km²
                                    </span>
                                </div>
                            )}
                            {place.literacy_rate?.value && (
                                <div className="stat-item">
                                    <span className="stat-label">Literacy:</span>
                                    <span className="stat-value">
                                        {place.literacy_rate.value}%
                                    </span>
                                </div>
                            )}
                        </div>

                        {place.similarityScore !== undefined && (
                            <div className="similarity-badge">
                                {Math.round(place.similarityScore)}% similar
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SimilarPlaces
