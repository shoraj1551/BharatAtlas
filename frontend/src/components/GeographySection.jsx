/**
 * GeographySection Component
 * 
 * Displays geographic information about a place
 */

import FactBadge from './FactBadge'
import BusinessImpactSummary from './BusinessImpactSummary'
import WaterResourcesCard from './WaterResourcesCard'
import DisasterRisksCard from './DisasterRisksCard'
import ConnectivityCard from './ConnectivityCard'
import './GeographySection.css'

export default function GeographySection({ place }) {
    if (!place) return null

    const geography = place.geography || {}

    return (
        <div className="geography-section">
            <h2 className="section-title">🗺️ Geography & Physical Constraints</h2>

            {/* Business Impact Summary */}
            <BusinessImpactSummary place={place} />

            {/* Water Resources */}
            <WaterResourcesCard place={place} />

            {/* Disaster Risks */}
            <DisasterRisksCard place={place} />

            {/* Connectivity */}
            <ConnectivityCard place={place} />

            {/* Coordinates */}
            <div className="geo-card">
                <div className="card-header">
                    <h3>Location</h3>
                    <FactBadge type="verified" source="Survey of India" />
                </div>
                <div className="geo-grid">
                    <div className="geo-item">
                        <span className="geo-label">Latitude</span>
                        <span className="geo-value">
                            {geography.coordinates?.lat?.toFixed(4) || place.latitude?.toFixed(4) || 'N/A'}°
                        </span>
                    </div>
                    <div className="geo-item">
                        <span className="geo-label">Longitude</span>
                        <span className="geo-value">
                            {geography.coordinates?.lon?.toFixed(4) || place.longitude?.toFixed(4) || 'N/A'}°
                        </span>
                    </div>
                    <div className="geo-item">
                        <span className="geo-label">Elevation</span>
                        <span className="geo-value">
                            {geography.elevation ? `${geography.elevation} m` : 'N/A'}
                        </span>
                    </div>
                    <div className="geo-item">
                        <span className="geo-label">Area</span>
                        <span className="geo-value">
                            {place.area_sq_km ? `${place.area_sq_km.toLocaleString()} km²` : 'N/A'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Terrain & Climate */}
            <div className="geo-card">
                <div className="card-header">
                    <h3>Terrain & Climate</h3>
                    <FactBadge type="verified" source="IMD" />
                </div>
                <div className="info-list">
                    <div className="info-item">
                        <span className="info-icon">🏔️</span>
                        <div className="info-content">
                            <span className="info-label">Terrain</span>
                            <span className="info-value">{geography.terrain || 'Plains'}</span>
                        </div>
                    </div>
                    <div className="info-item">
                        <span className="info-icon">🌡️</span>
                        <div className="info-content">
                            <span className="info-label">Climate Zone</span>
                            <span className="info-value">{geography.climate_zone || 'Tropical'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Natural Features */}
            {geography.natural_features && geography.natural_features.length > 0 && (
                <div className="geo-card">
                    <div className="card-header">
                        <h3>Natural Features</h3>
                        <FactBadge type="community" />
                    </div>
                    <div className="feature-list">
                        {geography.natural_features.map((feature, index) => (
                            <div key={index} className="feature-tag">
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Neighboring Places */}
            {geography.neighboring_places && geography.neighboring_places.length > 0 && (
                <div className="geo-card">
                    <div className="card-header">
                        <h3>Neighboring Places</h3>
                        <FactBadge type="verified" />
                    </div>
                    <div className="neighbor-list">
                        {geography.neighboring_places.map((neighbor, index) => (
                            <div key={index} className="neighbor-item">
                                📍 {neighbor}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
