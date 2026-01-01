/**
 * ConnectivityCard Component
 * 
 * Displays connectivity and logistics information with cost implications
 */

import FactBadge from './FactBadge'
import './ConnectivityCard.css'

export default function ConnectivityCard({ place }) {
    if (!place) return null

    const connectivity = place.connectivity || {}

    // Calculate connectivity score
    const calculateConnectivityScore = () => {
        let score = 0
        let maxScore = 0

        // Road (0-3 points)
        if (connectivity.road_network) {
            maxScore += 3
            const quality = connectivity.road_network.quality_rating
            if (quality === 'Excellent') score += 3
            else if (quality === 'Good') score += 2
            else if (quality === 'Fair') score += 1
        }

        // Rail (0-3 points)
        if (connectivity.rail_connectivity) {
            maxScore += 3
            if (connectivity.rail_connectivity.freight_facilities) score += 3
            else if (connectivity.rail_connectivity.railway_stations > 0) score += 2
        }

        // Air (0-2 points)
        if (connectivity.air_connectivity) {
            maxScore += 2
            if (connectivity.air_connectivity.distance_km < 50) score += 2
            else if (connectivity.air_connectivity.distance_km < 100) score += 1
        }

        // Port (0-2 points)
        if (connectivity.port_access) {
            maxScore += 2
            if (connectivity.port_access.port_type === 'Major') score += 2
            else if (connectivity.port_access.port_type === 'Minor') score += 1
        }

        return maxScore > 0 ? Math.round((score / maxScore) * 10) : 5
    }

    const connectivityScore = calculateConnectivityScore()

    return (
        <div className="connectivity-card">
            <div className="card-header">
                <h3>🚛 Connectivity & Logistics</h3>
                <FactBadge type="verified" source="NHAI, Indian Railways" />
            </div>

            {/* Connectivity Score */}
            <div className={`connectivity-score ${connectivityScore >= 7 ? 'excellent' : connectivityScore >= 5 ? 'good' : 'fair'}`}>
                <div className="score-circle">
                    <span className="score-value">{connectivityScore}</span>
                    <span className="score-max">/10</span>
                </div>
                <div className="score-label">
                    <h4>Connectivity Rating</h4>
                    <p>{connectivityScore >= 7 ? 'Excellent' : connectivityScore >= 5 ? 'Good' : 'Needs Improvement'}</p>
                </div>
            </div>

            {/* Transport Grid */}
            <div className="transport-grid">
                {/* Road */}
                <div className="transport-item road">
                    <div className="transport-header">
                        <span className="transport-icon">🛣️</span>
                        <h4>Road Network</h4>
                    </div>
                    {connectivity.road_network ? (
                        <>
                            <div className="transport-quality">
                                <span className={`quality-badge ${connectivity.road_network.quality_rating?.toLowerCase()}`}>
                                    {connectivity.road_network.quality_rating || 'Good'}
                                </span>
                            </div>
                            <div className="transport-details">
                                {connectivity.road_network.national_highways > 0 && (
                                    <p>🛣️ {connectivity.road_network.national_highways} National Highway(s)</p>
                                )}
                                {connectivity.road_network.state_highways > 0 && (
                                    <p>🛤️ {connectivity.road_network.state_highways} State Highway(s)</p>
                                )}
                            </div>
                            <div className="business-impact">
                                <strong>💼 Impact:</strong>
                                <p>{connectivity.road_network.business_impact || 'Reliable trucking, low logistics costs'}</p>
                            </div>
                        </>
                    ) : (
                        <p className="no-data">Data not available</p>
                    )}
                </div>

                {/* Rail */}
                <div className="transport-item rail">
                    <div className="transport-header">
                        <span className="transport-icon">🚂</span>
                        <h4>Rail Connectivity</h4>
                    </div>
                    {connectivity.rail_connectivity ? (
                        <>
                            <div className="transport-details">
                                <p>🚉 {connectivity.rail_connectivity.railway_stations || 0} Railway Station(s)</p>
                                {connectivity.rail_connectivity.freight_facilities && (
                                    <p>📦 Freight Terminal Available</p>
                                )}
                                {connectivity.rail_connectivity.major_junctions?.length > 0 && (
                                    <p>🔀 Major Junction: {connectivity.rail_connectivity.major_junctions[0]}</p>
                                )}
                            </div>
                            <div className="business-impact">
                                <strong>💼 Impact:</strong>
                                <p>{connectivity.rail_connectivity.business_impact || 'Cost-effective bulk transport'}</p>
                            </div>
                        </>
                    ) : (
                        <p className="no-data">Data not available</p>
                    )}
                </div>

                {/* Air */}
                <div className="transport-item air">
                    <div className="transport-header">
                        <span className="transport-icon">✈️</span>
                        <h4>Air Connectivity</h4>
                    </div>
                    {connectivity.air_connectivity ? (
                        <>
                            <div className="transport-details">
                                <p>🛫 {connectivity.air_connectivity.nearest_airport || 'Airport'}</p>
                                <p>📍 {connectivity.air_connectivity.distance_km || 'N/A'} km away</p>
                                <p>🏷️ {connectivity.air_connectivity.airport_type || 'Domestic'}</p>
                            </div>
                            <div className="business-impact">
                                <strong>💼 Impact:</strong>
                                <p>{connectivity.air_connectivity.business_impact || 'Suitable for time-sensitive cargo'}</p>
                            </div>
                        </>
                    ) : (
                        <p className="no-data">Data not available</p>
                    )}
                </div>

                {/* Port */}
                <div className="transport-item port">
                    <div className="transport-header">
                        <span className="transport-icon">🚢</span>
                        <h4>Sea Port Access</h4>
                    </div>
                    {connectivity.port_access ? (
                        <>
                            <div className="transport-details">
                                <p>⚓ {connectivity.port_access.nearest_port || 'Port'}</p>
                                <p>📍 {connectivity.port_access.distance_km || 'N/A'} km away</p>
                                <p>🏷️ {connectivity.port_access.port_type || 'Minor'} Port</p>
                            </div>
                            <div className="business-impact">
                                <strong>💼 Impact:</strong>
                                <p>{connectivity.port_access.business_impact || 'Ideal for import/export business'}</p>
                            </div>
                        </>
                    ) : (
                        <p className="no-data">Landlocked / No major port nearby</p>
                    )}
                </div>
            </div>

            {/* Logistics Costs */}
            <div className="logistics-costs">
                <h4>📦 Estimated Logistics Costs</h4>
                <div className="cost-grid">
                    <div className="cost-item">
                        <span className="cost-icon">🚛</span>
                        <div className="cost-content">
                            <span className="cost-label">Road Freight</span>
                            <span className="cost-value">₹8-12/km</span>
                        </div>
                    </div>
                    <div className="cost-item">
                        <span className="cost-icon">🚂</span>
                        <div className="cost-content">
                            <span className="cost-label">Rail Freight</span>
                            <span className="cost-value">30% cheaper</span>
                        </div>
                    </div>
                    <div className="cost-item">
                        <span className="cost-icon">✈️</span>
                        <div className="cost-content">
                            <span className="cost-label">Air Cargo</span>
                            <span className="cost-value">Premium</span>
                        </div>
                    </div>
                    <div className="cost-item">
                        <span className="cost-icon">🚢</span>
                        <div className="cost-content">
                            <span className="cost-label">Sea Freight</span>
                            <span className="cost-value">Most economical</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
