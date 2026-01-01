/**
 * EconomySection Component
 * 
 * Displays economic data and integrates Phase 3 dashboards
 */

import FactBadge from './FactBadge'
import EconomicDashboard from './EconomicDashboard'
import InfrastructureDashboard from './InfrastructureDashboard'
import './EconomySection.css'

export default function EconomySection({ place }) {
    if (!place) return null

    const economicData = place.economic_data || {}
    const infrastructure = place.infrastructure || {}

    return (
        <div className="economy-section">
            <h2 className="section-title">💰 Economy</h2>

            {/* Economic Dashboard from Phase 3 */}
            {economicData && Object.keys(economicData).length > 0 && (
                <div className="economy-card">
                    <div className="card-header">
                        <h3>Economic Indicators</h3>
                        <FactBadge type="ai-generated" tooltip="AI-generated insights based on sample data" />
                    </div>
                    <EconomicDashboard economicData={economicData} />
                </div>
            )}

            {/* Infrastructure Dashboard from Phase 3 */}
            {infrastructure && Object.keys(infrastructure).length > 0 && (
                <div className="economy-card">
                    <div className="card-header">
                        <h3>Infrastructure</h3>
                        <FactBadge type="ai-generated" tooltip="AI-generated insights based on sample data" />
                    </div>
                    <InfrastructureDashboard infrastructure={infrastructure} />
                </div>
            )}

            {/* Major Industries */}
            {place.major_industries && place.major_industries.length > 0 && (
                <div className="economy-card">
                    <div className="card-header">
                        <h3>Major Industries</h3>
                        <FactBadge type="community" />
                    </div>
                    <div className="industry-grid">
                        {place.major_industries.map((industry, index) => (
                            <div key={index} className="industry-tag">
                                🏭 {industry}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Employment Sectors (if available) */}
            {economicData.employment_sectors && (
                <div className="economy-card">
                    <div className="card-header">
                        <h3>Employment Sectors</h3>
                        <FactBadge type="verified" source="Labour Bureau" />
                    </div>
                    <div className="sector-list">
                        {Object.entries(economicData.employment_sectors).map(([sector, percent]) => (
                            <div key={sector} className="sector-item">
                                <span className="sector-name">{sector}</span>
                                <div className="sector-bar">
                                    <div
                                        className="sector-fill"
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                                <span className="sector-percent">{percent}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
