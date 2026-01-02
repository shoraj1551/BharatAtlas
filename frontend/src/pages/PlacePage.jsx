import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './PlacePage.css'
import MapView from '../map/MapView'
import PlacePanel from '../components/PlacePanel'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import AIConsultant from '../components/AIConsultant'
import placeService from '../services/placeService'
import recentPlacesService from '../services/recentPlacesService'

function PlacePage() {
    const { placeId, layer } = useParams() // Get layer from URL
    const navigate = useNavigate()
    const [place, setPlace] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Sync tab with URL
    const activeLayer = layer || 'overview'

    const handleLayerChange = (newLayer) => {
        // Update URL when tab changes
        navigate(`/place/${placeId}/${newLayer}`)
    }

    useEffect(() => {
        setLoading(true)
        setError(null)

        placeService.getPlaceById(placeId)
            .then(data => {
                setPlace(data)
                setLoading(false)

                // Add to recent places
                recentPlacesService.addPlace(data)
            })
            .catch(err => {
                console.error('Error loading place:', err)
                setError(err.message || 'Place not found')
                setLoading(false)
            })
    }, [placeId])

    if (loading) {
        return (
            <div className="place-page">
                <LoadingSpinner message="Loading place data..." />
            </div>
        )
    }

    if (error || !place) {
        return (
            <div className="place-page">
                <ErrorMessage
                    title="Place Not Found"
                    message={`The place with ID "${placeId}" could not be found.`}
                />
            </div>
        )
    }

    return (
        <div className="place-page">
            <div className="main-layout">
                <MapView />
                <PlacePanel
                    placeId={placeId}
                    place={place}
                    activeTab={activeLayer}
                    onTabChange={handleLayerChange}
                />
                <AIConsultant place={place} />
            </div>
        </div>
    )
}

export default PlacePage
