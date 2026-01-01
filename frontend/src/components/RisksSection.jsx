/**
 * RisksSection Component
 * 
 * Aggregates all business risks (natural disasters, operational, market) with overall assessment
 */

import FactBadge from './FactBadge'
import './RisksSection.css'

export default function RisksSection({ place }) {
    if (!place) return null

    const disasterRisks = place.disaster_risks || {}
    const waterResources = place.water_resources || {}
    const connectivity = place.connectivity || {}

    // Calculate overall business risk
    const calculateOverallBusinessRisk = () => {
        const risks = []

        // Natural disaster risks
        if (disasterRisks.flood_risk?.level === 'High') risks.push('high')
        if (disasterRisks.earthquake_zone?.zone > 3) risks.push('high')
        if (disasterRisks.cyclone_risk?.level === 'High') risks.push('high')

        // Operational risks
        if (waterResources.groundwater_level === 'Scarce') risks.push('moderate')
        if (connectivity?.road_network?.quality_rating === 'Poor') risks.push('moderate')

        const highCount = risks.filter(r => r === 'high').length
        if (highCount >= 2) return 'High'
        if (highCount === 1 || risks.length >= 3) return 'Moderate'
        return 'Low'
    }

    const overallRisk = calculateOverallBusinessRisk()

    return (
        <div className="risks-section">
            <h2 className="section-title">⚠️ Business Risks & Challenges</h2>

            {/* Overall Risk Assessment */}
            <div className={`risk-assessment ${overallRisk.toLowerCase()}`}>
                <div className="assessment-header">
                    <span className="assessment-icon">⚠️</span>
                    <div className="assessment-content">
                        <h3>Overall Business Risk</h3>
                        <span className={`risk-level ${overallRisk.toLowerCase()}`}>{overallRisk}</span>
                    </div>
                </div>
                <p className="assessment-desc">
                    {overallRisk === 'High'
                        ? 'Multiple significant risks identified. Comprehensive risk management required.'
                        : overallRisk === 'Moderate'
                            ? 'Some risks present. Standard mitigation strategies recommended.'
                            : 'Low overall risk. Standard business planning applies.'}
                </p>
            </div>

            {/* Natural Disaster Risks */}
            <div className="risk-category">
                <h3>🌊 Natural Disaster Risks</h3>
                <div className="risk-items">
                    {disasterRisks.flood_risk && (
                        <div className={`risk-card ${disasterRisks.flood_risk.level?.toLowerCase()}`}>
                            <div className="risk-card-header">
                                <span>Flood Risk</span>
                                <span className={`badge ${disasterRisks.flood_risk.level?.toLowerCase()}`}>
                                    {disasterRisks.flood_risk.level}
                                </span>
                            </div>
                            <p>{disasterRisks.flood_risk.impact || 'Supply chain disruptions during monsoon season'}</p>
                        </div>
                    )}

                    {disasterRisks.earthquake_zone && (
                        <div className={`risk-card ${disasterRisks.earthquake_zone.zone > 3 ? 'high' : 'low'}`}>
                            <div className="risk-card-header">
                                <span>Earthquake Risk</span>
                                <span className={`badge ${disasterRisks.earthquake_zone.zone > 3 ? 'high' : 'low'}`}>
                                    Zone {disasterRisks.earthquake_zone.zone}
                                </span>
                            </div>
                            <p>{disasterRisks.earthquake_zone.impact || disasterRisks.earthquake_zone.description}</p>
                        </div>
                    )}

                    {disasterRisks.cyclone_risk && (
                        <div className={`risk-card ${disasterRisks.cyclone_risk.level?.toLowerCase()}`}>
                            <div className="risk-card-header">
                                <span>Cyclone Risk</span>
                                <span className={`badge ${disasterRisks.cyclone_risk.level?.toLowerCase()}`}>
                                    {disasterRisks.cyclone_risk.level}
                                </span>
                            </div>
                            <p>{disasterRisks.cyclone_risk.impact || 'Seasonal operational disruptions'}</p>
                        </div>
                    )}

                    {disasterRisks.drought_risk && (
                        <div className={`risk-card ${disasterRisks.drought_risk.frequency === 'Frequent' ? 'high' : 'moderate'}`}>
                            <div className="risk-card-header">
                                <span>Drought Risk</span>
                                <span className={`badge ${disasterRisks.drought_risk.frequency === 'Frequent' ? 'high' : 'moderate'}`}>
                                    {disasterRisks.drought_risk.frequency}
                                </span>
                            </div>
                            <p>{disasterRisks.drought_risk.impact || 'Water scarcity affects operations'}</p>
                        </div>
                    )}

                    {!disasterRisks.flood_risk && !disasterRisks.earthquake_zone && !disasterRisks.cyclone_risk && !disasterRisks.drought_risk && (
                        <p className="no-risk">✅ Low natural disaster risk</p>
                    )}
                </div>
            </div>

            {/* Operational Risks */}
            <div className="risk-category">
                <h3>⚙️ Operational Risks</h3>
                <div className="risk-items">
                    {waterResources.groundwater_level === 'Scarce' && (
                        <div className="risk-card moderate">
                            <div className="risk-card-header">
                                <span>Water Scarcity</span>
                                <span className="badge moderate">Moderate</span>
                            </div>
                            <p>Limited water availability. Higher procurement costs and conservation measures required.</p>
                        </div>
                    )}

                    {connectivity?.road_network?.quality_rating === 'Poor' && (
                        <div className="risk-card moderate">
                            <div className="risk-card-header">
                                <span>Poor Connectivity</span>
                                <span className="badge moderate">Moderate</span>
                            </div>
                            <p>Limited road infrastructure. Higher logistics costs and delivery delays possible.</p>
                        </div>
                    )}

                    {waterResources.groundwater_level !== 'Scarce' && connectivity?.road_network?.quality_rating !== 'Poor' && (
                        <p className="no-risk">✅ No major operational risks identified</p>
                    )}
                </div>
            </div>

            {/* Risk Mitigation Summary */}
            {overallRisk !== 'Low' && (
                <div className="mitigation-summary">
                    <h3>💡 Key Mitigation Strategies</h3>
                    <div className="strategy-grid">
                        <div className="strategy-item">
                            <span className="strategy-icon">📋</span>
                            <div className="strategy-content">
                                <strong>Insurance Coverage</strong>
                                <p>Comprehensive disaster and business interruption insurance</p>
                            </div>
                        </div>
                        <div className="strategy-item">
                            <span className="strategy-icon">📦</span>
                            <div className="strategy-content">
                                <strong>Supply Chain Diversification</strong>
                                <p>Multiple suppliers across different regions</p>
                            </div>
                        </div>
                        <div className="strategy-item">
                            <span className="strategy-icon">🏗️</span>
                            <div className="strategy-content">
                                <strong>Infrastructure Planning</strong>
                                <p>Risk-appropriate construction and safety measures</p>
                            </div>
                        </div>
                        <div className="strategy-item">
                            <span className="strategy-icon">📊</span>
                            <div className="strategy-content">
                                <strong>Business Continuity Plan</strong>
                                <p>Emergency procedures and backup operations</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
