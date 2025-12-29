import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ExplorePage.css'
import placeService from '../services/placeService'
import LoadingSpinner from '../components/LoadingSpinner'
import RecentPlaces from '../components/RecentPlaces'

function ExplorePage() {
    const [states, setStates] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        placeService.getAllStates()
            .then(stateData => {
                // Sort alphabetically - no opinionated ranking
                const sorted = stateData.sort((a, b) =>
                    a.canonical_name.localeCompare(b.canonical_name)
                )
                setStates(sorted)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error loading states:', error)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className="explore-page">
                <LoadingSpinner message="Loading places..." />
            </div>
        )
    }

    return (
        <div className="explore-page">
            <div className="explore-content">
                <h1 className="explore-title">Explore India</h1>
                <p className="explore-subtitle">Browse places by state</p>

                <RecentPlaces />

                <div className="states-grid">
                    {states.map(state => (
                        <div key={state.place_id} className="state-card-wrapper">
                            <Link
                                to={`/place/${state.place_id}`}
                                className="state-card"
                            >
                                <h3 className="state-name">{state.canonical_name}</h3>
                                <div className="state-meta">
                                    <span className="state-population">
                                        {(state.population.value / 1000000).toFixed(1)}M people
                                    </span>
                                    <span className="state-area">
                                        {state.area_sq_km.toLocaleString()} km²
                                    </span>
                                </div>
                            </Link>
                            <Link
                                to={`/map?state=${encodeURIComponent(state.canonical_name)}`}
                                className="view-on-map-btn"
                            >
                                📍 View on Map
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ExplorePage
