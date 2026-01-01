import { Link } from 'react-router-dom'
import './RecommendationCard.css'

export default function RecommendationCard({ recommendation }) {
    return (
        <div className="recommendation-card">
            <h4>{recommendation.title}</h4>
            <p className="recommendation-reason">{recommendation.reason}</p>

            <div className="recommended-places">
                {recommendation.places.map(place => (
                    <Link
                        key={place.place_id}
                        to={`/place/${place.place_id}`}
                        className="recommended-place"
                    >
                        <span className="place-name">{place.canonical_name}</span>
                        {place.similarityScore && (
                            <span className="similarity-badge">
                                {(place.similarityScore * 100).toFixed(0)}% match
                            </span>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export function RecommendationsList({ recommendations }) {
    if (!recommendations || recommendations.length === 0) {
        return null
    }

    return (
        <div className="recommendations-list">
            <h3>🎯 Recommendations</h3>
            {recommendations.map((rec, index) => (
                <RecommendationCard key={index} recommendation={rec} />
            ))}
        </div>
    )
}
