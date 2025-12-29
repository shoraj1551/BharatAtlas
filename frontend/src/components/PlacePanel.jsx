import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './PlacePanel.css'
import PlacePanelSkeleton from './PlacePanelSkeleton'
import PlaceNarrative from './PlaceNarrative'
import Opportunities from './Opportunities'
import placeService from '../services/placeService'
import narrativeService from '../services/narrativeService'
import opportunityService from '../services/opportunityService'

function PlacePanel({ placeId, place: initialPlace }) {
    const [place, setPlace] = useState(initialPlace || null)
    const [loading, setLoading] = useState(!initialPlace)
    const [children, setChildren] = useState([])
    const [childrenLoading, setChildrenLoading] = useState(false)
    const [narrative, setNarrative] = useState(null)
    const [narrativeLoading, setNarrativeLoading] = useState(false)
    const [opportunities, setOpportunities] = useState([])
    const [opportunitiesLoading, setOpportunitiesLoading] = useState(false)

    useEffect(() => {
        // If place is provided as prop, use it
        if (initialPlace) {
            setPlace(initialPlace)
            setLoading(false)
            return
        }

        // Otherwise load from service
        if (placeId) {
            setLoading(true)
            placeService.getPlaceById(placeId)
                .then(data => {
                    setPlace(data)
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Error loading place:', error)
                    setLoading(false)
                })
        }
    }, [placeId, initialPlace])

    // Load narrative when place is loaded
    useEffect(() => {
        if (place && place.place_id) {
            setNarrativeLoading(true)
            narrativeService.generatePlaceNarrative(place)
                .then(narrativeData => {
                    setNarrative(narrativeData)
                    setNarrativeLoading(false)
                })
                .catch(error => {
                    console.error('Error generating narrative:', error)
                    setNarrativeLoading(false)
                })
        }
    }, [place])

    // Load opportunities when place is loaded
    useEffect(() => {
        if (place && place.place_id) {
            setOpportunitiesLoading(true)
            opportunityService.generatePlaceOpportunities(place)
                .then(opportunitiesData => {
                    setOpportunities(opportunitiesData)
                    setOpportunitiesLoading(false)
                })
                .catch(error => {
                    console.error('Error generating opportunities:', error)
                    setOpportunitiesLoading(false)
                })
        }
    }, [place])

    // Load children when place is loaded
    useEffect(() => {
        if (place && place.place_id) {
            setChildrenLoading(true)
            placeService.getChildren(place.place_id, { limit: 10 })
                .then(response => {
                    setChildren(response.data || [])
                    setChildrenLoading(false)
                })
                .catch(error => {
                    console.error('Error loading children:', error)
                    setChildrenLoading(false)
                })
        }
    }, [place])

    if (loading) {
        return <PlacePanelSkeleton />
    }

    if (!place) {
        return (
            <div className="place-panel">
                <div className="panel-content">
                    <p className="placeholder-text">No place data available</p>
                </div>
            </div>
        )
    }

    return (
        <div className="place-panel">
            <div className="panel-header">
                {place.parent_place_id && (
                    <div className="place-hierarchy">
                        <span className="hierarchy-parent">India</span>
                        <span className="hierarchy-separator">›</span>
                    </div>
                )}
                <h2>{place.canonical_name}</h2>
                <p className="place-type">{place.place_type.toUpperCase()}</p>
            </div>
            <div className="panel-content">
                {/* Structured Narrative */}
                {narrativeLoading ? (
                    <div className="place-section">
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text short"></div>
                    </div>
                ) : narrative ? (
                    <div className="place-section">
                        <PlaceNarrative narrative={narrative} />
                    </div>
                ) : null}

                <div className="place-section">
                    <h3>Key Facts</h3>
                    <div className="fact-grid">
                        <div className="fact-item">
                            <span className="fact-label">Population</span>
                            <span className="fact-value">{place.population.value.toLocaleString()}</span>
                        </div>
                        <div className="fact-item">
                            <span className="fact-label">Area</span>
                            <span className="fact-value">{place.area_sq_km.toLocaleString()} km²</span>
                        </div>
                        <div className="fact-item">
                            <span className="fact-label">Literacy Rate</span>
                            <span className="fact-value">{place.literacy_rate.value}%</span>
                        </div>
                        <div className="fact-item">
                            <span className="fact-label">Districts</span>
                            <span className="fact-value">{place.num_districts.value}</span>
                        </div>
                    </div>
                </div>

                {/* Opportunities Section */}
                {opportunitiesLoading ? (
                    <div className="place-section">
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text short"></div>
                    </div>
                ) : opportunities.length > 0 ? (
                    <div className="place-section">
                        <Opportunities opportunities={opportunities} />
                    </div>
                ) : null}

                {/* Child Places Section */}
                {(children.length > 0 || childrenLoading) && (
                    <div className="place-section">
                        <h3>Districts</h3>
                        {childrenLoading ? (
                            <div className="children-loading">
                                <div className="skeleton skeleton-text"></div>
                                <div className="skeleton skeleton-text short"></div>
                            </div>
                        ) : (
                            <div className="children-list">
                                {children.length > 0 ? (
                                    children.map(child => (
                                        <Link
                                            key={child.place_id}
                                            to={`/place/${child.place_id}`}
                                            className="child-place-link"
                                        >
                                            {child.canonical_name}
                                        </Link>
                                    ))
                                ) : (
                                    <p className="no-children">No districts available</p>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className="place-section">
                    <h3>Major Industries</h3>
                    <ul className="industry-list">
                        {place.major_industries.map((industry, index) => (
                            <li key={index}>{industry}</li>
                        ))}
                    </ul>
                </div>

                <div className="place-section">
                    <h3>Data Quality</h3>
                    <div className="data-quality">
                        <span className="quality-label">Quality Score:</span>
                        <span className="quality-value">{(place.data_quality_score * 100).toFixed(0)}%</span>
                        <span className="quality-status">{place.verification_status}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlacePanel
