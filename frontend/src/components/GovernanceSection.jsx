/**
 * GovernanceSection Component
 * 
 * Displays governance and administrative information
 */

import FactBadge from './FactBadge'
import './GovernanceSection.css'

export default function GovernanceSection({ place }) {
    if (!place) return null

    const governance = place.governance || {}

    return (
        <div className="governance-section">
            <h2 className="section-title">🏛️ Governance</h2>

            {/* Administrative Head */}
            {governance.administrative_head && (
                <div className="gov-card">
                    <div className="card-header">
                        <h3>Administrative Head</h3>
                        <FactBadge type="verified" source="Government Records" />
                    </div>
                    <div className="admin-info">
                        <span className="admin-icon">👤</span>
                        <span className="admin-name">{governance.administrative_head}</span>
                    </div>
                </div>
            )}

            {/* Constituencies */}
            {(governance.lok_sabha_seats || governance.vidhan_sabha_seats) && (
                <div className="gov-card">
                    <div className="card-header">
                        <h3>Constituencies</h3>
                        <FactBadge type="verified" source="Election Commission" />
                    </div>
                    <div className="constituency-grid">
                        {governance.lok_sabha_seats && (
                            <div className="constituency-item">
                                <span className="const-icon">🏛️</span>
                                <div className="const-content">
                                    <span className="const-label">Lok Sabha Seats</span>
                                    <span className="const-value">{governance.lok_sabha_seats}</span>
                                </div>
                            </div>
                        )}
                        {governance.vidhan_sabha_seats && (
                            <div className="constituency-item">
                                <span className="const-icon">🏢</span>
                                <div className="const-content">
                                    <span className="const-label">Vidhan Sabha Seats</span>
                                    <span className="const-value">{governance.vidhan_sabha_seats}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Local Bodies */}
            {governance.local_bodies && governance.local_bodies.length > 0 && (
                <div className="gov-card">
                    <div className="card-header">
                        <h3>Local Bodies</h3>
                        <FactBadge type="verified" />
                    </div>
                    <div className="local-body-list">
                        {governance.local_bodies.map((body, index) => (
                            <div key={index} className="local-body-item">
                                📋 {body}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Government Schemes */}
            {governance.government_schemes && governance.government_schemes.length > 0 && (
                <div className="gov-card">
                    <div className="card-header">
                        <h3>Active Government Schemes</h3>
                        <FactBadge type="community" />
                    </div>
                    <div className="scheme-list">
                        {governance.government_schemes.map((scheme, index) => (
                            <div key={index} className="scheme-item">
                                <span className="scheme-icon">📜</span>
                                <span className="scheme-name">{scheme}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Placeholder if no data */}
            {!governance.administrative_head &&
                !governance.lok_sabha_seats &&
                !governance.vidhan_sabha_seats &&
                (!governance.local_bodies || governance.local_bodies.length === 0) &&
                (!governance.government_schemes || governance.government_schemes.length === 0) && (
                    <div className="gov-card">
                        <p className="no-data">Governance data will be available soon.</p>
                    </div>
                )}
        </div>
    )
}
