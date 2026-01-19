import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './PlacePanel.css'
import PlacePanelSkeleton from './PlacePanelSkeleton'
import PlaceNarrative from './PlaceNarrative'
import Opportunities from './Opportunities'
import ComparisonButton from './ComparisonButton'
import BookmarkButton from './BookmarkButton'
import ShareButtons from './ShareButtons'
import ExportMenu from './ExportMenu' // NEW
import ConfidenceBadge from './ConfidenceBadge'
import DataFreshness from './DataFreshness'
import PlaceCharts from './PlaceCharts'
import OpportunityScore from './OpportunityScore'
import TabNavigation, { TabPanel } from './TabNavigation'
import QuickStatsBar from './QuickStatsBar'
import GeographySection from './GeographySection'
import DemographicsSection from './DemographicsSection'
import EconomySection from './EconomySection'
import GovernanceSection from './GovernanceSection'
import OpportunitySection from './OpportunitySection'
import CommunitySection from './CommunitySection'
import CultureSection from './CultureSection'
import RisksSection from './RisksSection'
import FactBadge from './FactBadge'
import { Fact } from './DataProvenance' // Import Fact
import TrustLedger from './TrustLedger'
import IntelligenceSummary from './IntelligenceSummary'
import BlindSpots from './BlindSpots'
import DataFreshnessLabel from './DataFreshnessLabel' // NEW
import FieldVerificationMode from './FieldVerificationMode' // NEW
import TimelineView from './Timeline/TimelineView' // NEW - Feature 3.2
import placeService from '../services/placeService'
import narrativeService from '../services/narrativeService'
import opportunityService from '../services/opportunityService'

function PlacePanel({ placeId, place: initialPlace, activeTab = 'overview', onTabChange }) {
    const { getPlaceName, t } = useLanguage()
    const [place, setPlace] = useState(initialPlace || null)

    // Fallback for uncontrolled usage (e.g. specialized views)
    const [internalTab, setInternalTab] = useState('overview')
    const currentTab = onTabChange ? activeTab : internalTab
    const handleTabChange = (tabId) => {
        if (onTabChange) onTabChange(tabId)
        else setInternalTab(tabId)
    }

    // Loading states
    const [loadingState, setLoadingState] = useState({
        place: false,
        narrative: false,
        opportunities: false,
        children: false
    })

    const [narrative, setNarrative] = useState(null)
    const [opportunities, setOpportunities] = useState([])
    const [children, setChildren] = useState([])

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

    const [showLedger, setShowLedger] = useState(false)
    const [showFieldMode, setShowFieldMode] = useState(false) // NEW

    if (loadingState.place) {
        return <PlacePanelSkeleton />
    }

    if (!place) {
        return (
            <div className="place-panel">
                <div className="panel-content">
                    <p>No place data available.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="place-panel" role="region" aria-label="Place information panel">
            {/* Trust Ledger Modal */}
            {showLedger && (
                <TrustLedger placeId={place ? place.place_id : ''} onClose={() => setShowLedger(false)} />
            )}

            {/* Field Verification Modal */}
            {showFieldMode && (
                <FieldVerificationMode place={place} onClose={() => setShowFieldMode(false)} />
            )}

            <div className="panel-header">
                {place.parent_place_id && (
                    <nav className="place-hierarchy" aria-label="Place hierarchy">
                        <span className="hierarchy-parent">India</span>
                        <span className="hierarchy-separator" aria-hidden="true">›</span>
                    </nav>
                )}

                {/* Header Row with Trust Shield */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h2 id="place-name">{getPlaceName(place)}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <p className="place-type" aria-label="Place type">{place.place_type?.toUpperCase() ?? 'UNKNOWN'}</p>

                            {/* NEW: Field Verify Button */}
                            <button
                                onClick={() => setShowFieldMode(true)}
                                style={{
                                    border: 'none', background: 'none', cursor: 'pointer',
                                    fontSize: '0.8rem', color: '#6366f1', display: 'flex', alignItems: 'center', gap: '4px'
                                }}
                                title="Open Field Verification Checklist"
                            >
                                <span>🕵️‍♂️</span> <span style={{ textDecoration: 'underline' }}>Field Verify</span>
                            </button>
                        </div>
                    </div>

                    {/* The Trust Shield */}
                    <button
                        onClick={() => setShowLedger(true)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            background: '#ecfdf5', border: '1px solid #10b981',
                            padding: '6px 10px', borderRadius: '20px',
                            cursor: 'pointer', fontSize: '0.8rem', color: '#047857'
                        }}
                        title="Click to view Data Trust Ledger"
                    >
                        <span>🛡️</span>
                        <span style={{ fontWeight: 600 }}>Official</span>
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="place-actions">
                    <ExportMenu placeIds={[place.place_id]} /> {/* NEW EXPORT MENU */}
                    <ComparisonButton place={place} variant="default" />
                    <BookmarkButton place={place} variant="default" />
                </div>
            </div>

            {/* Quick Stats Bar */}
            <QuickStatsBar place={place} />

            {/* Tab Navigation */}
            <TabNavigation activeTab={currentTab} onTabChange={handleTabChange} />

            <div className="panel-content">
                {/* Overview Tab */}
                <TabPanel id="overview" activeTab={currentTab}>
                    {/* 1. Intelligence Executive Summary (The "One Screen" Answer) */}
                    <IntelligenceSummary placeId={place.place_id} place={place} />

                    {/* Structured Narrative */}
                    {loadingState.narrative ? (
                        <div className="place-section">
                            <div className="skeleton skeleton-text"></div>
                            <div className="skeleton skeleton-text"></div>
                            <div className="skeleton skeleton-text short"></div>
                        </div>
                    ) : narrative ? (
                        <div className="place-section">
                            <div className="section-header">
                                <h3>AI-Generated Overview</h3>
                                <FactBadge type="ai-generated" />
                            </div>
                            <PlaceNarrative narrative={narrative} />
                        </div>
                    ) : null}

                    {/* BLIND SPOTS: Transparency Section */}
                    <BlindSpots />

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
                                <Fact source="Census 2011">
                                    <span className="fact-value">{place.population?.value?.toLocaleString() ?? 'N/A'}</span>
                                </Fact>
                            </div>
                            <div className="fact-item">
                                <span className="fact-label">Area</span>
                                <Fact source="Official">
                                    <span className="fact-value">{place.area_sq_km?.toLocaleString() ?? 'N/A'} km²</span>
                                </Fact>
                            </div>
                            <div className="fact-item">
                                <span className="fact-label">Literacy Rate</span>
                                <Fact source="Census">
                                    <span className="fact-value">{place.literacy_rate?.value ?? 'N/A'}%</span>
                                </Fact>
                            </div>
                            <div className="fact-item">
                                <span className="fact-label">Districts</span>
                                <Fact source="Govt">
                                    <span className="fact-value">{place.num_districts?.value ?? 'N/A'}</span>
                                </Fact>
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
                </TabPanel>

                {/* Timeline Tab - Feature 3.2 */}
                <TabPanel id="timeline" activeTab={currentTab}>
                    <TimelineView placeId={place.place_id} />
                </TabPanel>

                {/* Geography Tab */}
                <TabPanel id="geography" activeTab={currentTab}>
                    <GeographySection place={place} />
                </TabPanel>

                {/* Demographics Tab */}
                <TabPanel id="demographics" activeTab={currentTab}>
                    <DemographicsSection place={place} />
                </TabPanel>

                {/* Economy Tab */}
                <TabPanel id="economy" activeTab={currentTab}>
                    <EconomySection place={place} />
                </TabPanel>

                {/* Governance Tab */}
                <TabPanel id="governance" activeTab={currentTab}>
                    <GovernanceSection place={place} />
                </TabPanel>

                {/* Opportunity Tab */}
                <TabPanel id="opportunity" activeTab={currentTab}>
                    <OpportunitySection activeTab={currentTab} place={place} />
                </TabPanel>

                {/* Culture Tab */}
                <TabPanel id="culture" activeTab={currentTab}>
                    <CultureSection place={place} />
                </TabPanel>

                {/* Reviews Tab - Feature 3.3 */}
                <TabPanel id="reviews" activeTab={currentTab}>
                    <ReviewsSection placeId={place.place_id} />
                </TabPanel>

                {/* Discussions Tab - Feature 3.3 */}
                <TabPanel id="discussions" activeTab={currentTab}>
                    <DiscussionBoard placeId={place.place_id} />
                </TabPanel>

                {/* Community Tab */}
                <TabPanel id="community" activeTab={currentTab}>
                    <CommunitySection place={place} />
                </TabPanel>

                {/* Risks Tab */}
                <TabPanel id="risks" activeTab={currentTab}>
                    <RisksSection place={place} />
                </TabPanel>
            </div>
        </div >
    )
}

export default PlacePanel
