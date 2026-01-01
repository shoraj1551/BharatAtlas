import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './PlacePanel.css'
import PlacePanelSkeleton from './PlacePanelSkeleton'
import PlaceNarrative from './PlaceNarrative'
import Opportunities from './Opportunities'
import ComparisonButton from './ComparisonButton'
import BookmarkButton from './BookmarkButton'
import ShareButtons from './ShareButtons'
import ConfidenceBadge from './ConfidenceBadge'
import DataFreshness from './DataFreshness'
import PlaceCharts from './PlaceCharts'
import OpportunityScore from './OpportunityScore'
import placeService from '../services/placeService'
import narrativeService from '../services/narrativeService'
import opportunityService from '../services/opportunityService'

function PlacePanel({ placeId, place: initialPlace }) {
    const [place, setPlace] = useState(initialPlace || null)

    // Consolidated loading state
    const [loadingState, setLoadingState] = useState({
        place: !initialPlace,
        narrative: false,
        opportunities: false,
        children: false
    })

    const [children, setChildren] = useState([])
    const [narrative, setNarrative] = useState(null)
    const [opportunities, setOpportunities] = useState([])

    useEffect(() => {
        // If place is provided as prop, use it
        if (initialPlace) {
            setPlace(initialPlace)
            setLoadingState(prev => ({ ...prev, place: false }))
            return
        }

        // Otherwise load from service
        if (placeId) {
            setLoadingState(prev => ({ ...prev, place: true }))
            placeService.getPlaceById(placeId)
                .then(data => {
                    setPlace(data)
                    setLoadingState(prev => ({ ...prev, place: false }))
                })
                .catch(error => {
                    console.error('Error loading place:', error)
                    setLoadingState(prev => ({ ...prev, place: false }))
                })
        }
    }, [placeId, initialPlace])

    // Load narrative when place is loaded
    useEffect(() => {
        if (place && place.place_id) {
            setLoadingState(prev => ({ ...prev, narrative: true }))
            narrativeService.generatePlaceNarrative(place)
                .then(narrativeData => {
                    setNarrative(narrativeData)
                    setLoadingState(prev => ({ ...prev, narrative: false }))
                })
                .catch(error => {
                    console.error('Error generating narrative:', error)
                    setLoadingState(prev => ({ ...prev, narrative: false }))
                })
        }
    }, [place])

    // Load opportunities when place is loaded
    useEffect(() => {
        if (place && place.place_id) {
            setLoadingState(prev => ({ ...prev, opportunities: true }))
            opportunityService.generatePlaceOpportunities(place)
                .then(opportunitiesData => {
                    setOpportunities(opportunitiesData)
                    setLoadingState(prev => ({ ...prev, opportunities: false }))
                })
                .catch(error => {
                    console.error('Error generating opportunities:', error)
                    setLoadingState(prev => ({ ...prev, opportunities: false }))
                })
        }
    }, [place])

    // Load children when place is loaded
    useEffect(() => {
        if (place && place.place_id) {
            setLoadingState(prev => ({ ...prev, children: true }))
            placeService.getChildren(place.place_id, { limit: 10 })
                .then(response => {
                    setChildren(response.data || [])
                    setLoadingState(prev => ({ ...prev, children: false }))
                })
                .catch(error => {
                    console.error('Error loading children:', error)
                    setLoadingState(prev => ({ ...prev, children: false }))
                })
        }
    }, [place])

    if (loadingState.place) {
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
        <div className="place-panel" role="region" aria-label="Place information panel">
            <div className="panel-header">
                {place.parent_place_id && (
                    <nav className="place-hierarchy" aria-label="Place hierarchy">
                        <span className="hierarchy-parent">India</span>
                        <span className="hierarchy-separator" aria-hidden="true">›</span>
                    </nav>
                )}
                <h2 id="place-name">{place.canonical_name}</h2>
                <p className="place-type" aria-label="Place type">{place.place_type?.toUpperCase() ?? 'UNKNOWN'}</p>

                {/* Action Buttons */}
                <div className="place-actions">
                    <ComparisonButton place={place} variant="default" />
                    <BookmarkButton place={place} variant="default" />
                </div>
            </div>
            <div className="panel-content">
                {/* Structured Narrative */}
                {loadingState.narrative ? (
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

                {/* Share Section */}
                <div className="place-section">
                    <h3>Share this Place</h3>
                    <ShareButtons place={place} variant="default" />
                </div>

                {/* Opportunity Score */}
                <OpportunityScore place={place} />

                <div className="place-section" aria-labelledby="key-facts-heading">
                    <h3 id="key-facts-heading">Key Facts</h3>
                    <div className="fact-grid" role="list">
                        <div className="fact-item">
                            <span className="fact-label">Population</span>
                            <span className="fact-value">{place.population?.value?.toLocaleString() ?? 'N/A'}</span>
                        </div>
                        <div className="fact-item">
                            <span className="fact-label">Area</span>
                            <span className="fact-value">{place.area_sq_km?.toLocaleString() ?? 'N/A'} km²</span>
                        </div>
                        <div className="fact-item">
                            <span className="fact-label">Literacy Rate</span>
                            <span className="fact-value">{place.literacy_rate?.value ?? 'N/A'}%</span>
                        </div>
                        <div className="fact-item">
                            <span className="fact-label">Districts</span>
                            <span className="fact-value">{place.num_districts?.value ?? 'N/A'}</span>
                        </div>
                    </div>
                </div>

                {/* Opportunities Section */}
                {loadingState.opportunities ? (
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
                {(children.length > 0 || loadingState.children) && (
                    <div className="place-section">
                        <h3>Districts</h3>
                        {loadingState.children ? (
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
                                            aria-label={`View details for ${child.canonical_name}`}
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

                {place.major_industries && place.major_industries.length > 0 && (
                    <div className="place-section">
                        <h3>Major Industries</h3>
                        <ul className="industry-list">
                            {place.major_industries.map((industry, index) => (
                                <li key={index}>{industry}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="place-section">
                    <h3>Data Quality</h3>
                    <div className="data-quality">
                        <span className="quality-label">Quality Score:</span>
                        <span className="quality-value">{((place.data_quality_score ?? 0) * 100).toFixed(0)}%</span>
                        <span className="quality-status">{place.verification_status ?? 'Unverified'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlacePanel
