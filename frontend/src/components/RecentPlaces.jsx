import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './RecentPlaces.css'
import recentPlacesService from '../services/recentPlacesService'

function RecentPlaces() {
    const [recentPlaces, setRecentPlaces] = useState([])

    useEffect(() => {
        const places = recentPlacesService.getRecentPlaces()
        setRecentPlaces(places)
    }, [])

    if (recentPlaces.length === 0) {
        return null
    }

    return (
        <div className="recent-places">
            <h3 className="recent-title">Recently Viewed</h3>
            <div className="recent-list">
                {recentPlaces.map(place => (
                    <Link
                        key={place.place_id}
                        to={`/place/${place.place_id}`}
                        className="recent-item"
                    >
                        <span className="recent-name">{place.canonical_name}</span>
                        <span className="recent-type">{place.place_type}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default RecentPlaces
