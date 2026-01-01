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
                        <Link
                            key={state.place_id}
                            to={`/place/${state.place_id}`}
                            className="state-card"
                        >
                            <h3 className="state-name">{state.canonical_name}</h3>
                            <div className="state-meta">
                                <span className="state-type">{state.place_type.toUpperCase()}</span>
                            </div>
                            {state.population && (
                                <div className="state-stat">
                                    <span className="stat-label">Population:</span>
                                    <span className="stat-value">{state.population.value?.toLocaleString() || 'N/A'}</span>
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ExplorePage
