/**
 * DisasterRisksCard Component
 * 
 * Displays natural disaster risks with business impact and mitigation strategies
 */

import FactBadge from './FactBadge'
import './DisasterRisksCard.css'

export default function DisasterRisksCard({ place }) {
    if (!place) return null

    const disasterRisks = place.disaster_risks || {}

    // Calculate overall risk level
    const calculateOverallRisk = () => {
        const risks = [
            disasterRisks.flood_risk?.level,
            disasterRisks.earthquake_zone?.zone > 3 ? 'High' : disasterRisks.earthquake_zone?.zone > 2 ? 'Moderate' : 'Low',
            disasterRisks.cyclone_risk?.level,
            disasterRisks.drought_risk?.frequency === 'Frequent' ? 'High' : 'Moderate'
        ].filter(Boolean)

        const highCount = risks.filter(r => r === 'High').length
        if (highCount >= 2) return 'High'
        if (highCount === 1) return 'Moderate'
        return 'Low'
    }

    const overallRisk = calculateOverallRisk()

    return (
        <div className="disaster-risks-card">
            <div className="card-header">
                <h3>⚠️ Natural Disaster Risks</h3>
                <FactBadge type="verified" source="NDMA, IMD" />
            </div>

            {/* Overall Risk Indicator */}
            <div className={`risk-meter ${overallRisk.toLowerCase()}`}>
                <div className="meter-icon">⚠️</div>
                <div className="meter-content">
                    <span className="meter-label">Overall Risk Level</span>
                    <span className="meter-value">{overallRisk}</span>
                </div>
            </div>

            {/* Risk Matrix */}
            <div className="risk-matrix">
                {/* Flood Risk */}
                {disasterRisks.flood_risk && (
                    <div className={`risk-item ${disasterRisks.flood_risk.level?.toLowerCase()}`}>
                        <div className="risk-header">
                            <span className="risk-icon">🌊</span>
                            <div className="risk-title">
                                <h4>Flood Risk</h4>
                                <span className={`risk-badge ${disasterRisks.flood_risk.level?.toLowerCase()}`}>
                                    {disasterRisks.flood_risk.level}
                                </span>
                            </div>
                        </div>
                        <div className="risk-details">
                            <p className="risk-frequency">
                                <strong>Frequency:</strong> {disasterRisks.flood_risk.frequency || 'Seasonal (Jun-Sep)'}
                            </p>
                            <div className="business-impact">
                                <h5>💼 Business Impact:</h5>
                                <ul>
                                    <li>Supply chain disruptions 2-3 weeks/year</li>
                                    <li>Higher insurance premiums</li>
                                    <li>Warehouse elevation requirements</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Earthquake Risk */}
                {disasterRisks.earthquake_zone && (
                    <div className={`risk-item ${disasterRisks.earthquake_zone.zone > 3 ? 'high' : disasterRisks.earthquake_zone.zone > 2 ? 'moderate' : 'low'}`}>
                        <div className="risk-header">
                            <span className="risk-icon">🏚️</span>
                            <div className="risk-title">
                                <h4>Earthquake Risk</h4>
                                <span className={`risk-badge ${disasterRisks.earthquake_zone.zone > 3 ? 'high' : disasterRisks.earthquake_zone.zone > 2 ? 'moderate' : 'low'}`}>
                                    Zone {disasterRisks.earthquake_zone.zone}
                                </span>
                            </div>
                        </div>
                        <div className="risk-details">
                            <p className="risk-description">{disasterRisks.earthquake_zone.description || 'Moderate seismic activity'}</p>
                            <div className="business-impact">
                                <h5>💼 Business Impact:</h5>
                                <ul>
                                    {disasterRisks.earthquake_zone.zone > 3 ? (
                                        <>
                                            <li>Earthquake-resistant construction required</li>
                                            <li>Higher structural costs (15-20%)</li>
                                            <li>Mandatory seismic insurance</li>
                                        </>
                                    ) : (
                                        <>
                                            <li>Standard building codes sufficient</li>
                                            <li>No special structural requirements</li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cyclone Risk */}
                {disasterRisks.cyclone_risk && (
                    <div className={`risk-item ${disasterRisks.cyclone_risk.level?.toLowerCase()}`}>
                        <div className="risk-header">
                            <span className="risk-icon">🌀</span>
                            <div className="risk-title">
                                <h4>Cyclone Risk</h4>
                                <span className={`risk-badge ${disasterRisks.cyclone_risk.level?.toLowerCase()}`}>
                                    {disasterRisks.cyclone_risk.level}
                                </span>
                            </div>
                        </div>
                        <div className="risk-details">
                            <p className="risk-frequency">
                                <strong>Season:</strong> {disasterRisks.cyclone_risk.season || 'Apr-Jun, Oct-Dec'}
                            </p>
                            <div className="business-impact">
                                <h5>💼 Business Impact:</h5>
                                <ul>
                                    <li>Seasonal operational shutdowns</li>
                                    <li>Reinforced infrastructure needed</li>
                                    <li>Emergency preparedness costs</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Drought Risk */}
                {disasterRisks.drought_risk && (
                    <div className={`risk-item ${disasterRisks.drought_risk.frequency === 'Frequent' ? 'high' : 'moderate'}`}>
                        <div className="risk-header">
                            <span className="risk-icon">☀️</span>
                            <div className="risk-title">
                                <h4>Drought Risk</h4>
                                <span className={`risk-badge ${disasterRisks.drought_risk.frequency === 'Frequent' ? 'high' : 'moderate'}`}>
                                    {disasterRisks.drought_risk.frequency}
                                </span>
                            </div>
                        </div>
                        <div className="risk-details">
                            <p className="risk-severity">
                                <strong>Severity:</strong> {disasterRisks.drought_risk.severity || 'Moderate'}
                            </p>
                            <div className="business-impact">
                                <h5>💼 Business Impact:</h5>
                                <ul>
                                    <li>Water scarcity affects operations</li>
                                    <li>Higher water procurement costs</li>
                                    <li>Agriculture-dependent supply chains at risk</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mitigation Strategies */}
            {overallRisk !== 'Low' && (
                <div className="mitigation-tips">
                    <h4>💡 Risk Mitigation Strategies</h4>
                    <div className="tips-grid">
                        {disasterRisks.flood_risk?.level === 'High' && (
                            <div className="tip-item">
                                <span className="tip-icon">🌊</span>
                                <div className="tip-content">
                                    <strong>Flood Protection:</strong>
                                    <p>Elevate ground-floor inventory, install flood barriers, maintain emergency drainage</p>
                                </div>
                            </div>
                        )}
                        {disasterRisks.earthquake_zone?.zone > 3 && (
                            <div className="tip-item">
                                <span className="tip-icon">🏗️</span>
                                <div className="tip-content">
                                    <strong>Seismic Safety:</strong>
                                    <p>Use earthquake-resistant design, secure heavy equipment, conduct safety drills</p>
                                </div>
                            </div>
                        )}
                        <div className="tip-item">
                            <span className="tip-icon">📋</span>
                            <div className="tip-content">
                                <strong>Insurance:</strong>
                                <p>Consider comprehensive disaster insurance, maintain business continuity plan</p>
                            </div>
                        </div>
                        <div className="tip-item">
                            <span className="tip-icon">📦</span>
                            <div className="tip-content">
                                <strong>Inventory:</strong>
                                <p>Plan for seasonal inventory buildup, diversify suppliers across regions</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* No Risk Message */}
            {overallRisk === 'Low' && Object.keys(disasterRisks).length === 0 && (
                <div className="no-risk-message">
                    <p>✅ Low natural disaster risk. Standard business planning applies.</p>
                </div>
            )}
        </div>
    )
}
