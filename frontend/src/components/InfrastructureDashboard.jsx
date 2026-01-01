import './InfrastructureDashboard.css'

export default function InfrastructureDashboard({ infrastructure }) {
    if (!infrastructure) return null

    const {
        road_density,
        railway_stations,
        airports,
        internet_penetration,
        electricity_access,
        infrastructure_score
    } = infrastructure

    return (
        <div className="infrastructure-dashboard">
            <h3>🏗️ Infrastructure</h3>

            <div className="infra-score-card">
                <div className="score-circle">
                    <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" className="score-bg" />
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            className="score-fill"
                            style={{
                                strokeDasharray: `${infrastructure_score * 2.83} 283`,
                                stroke: getScoreColor(infrastructure_score)
                            }}
                        />
                    </svg>
                    <div className="score-text">
                        <span className="score-number">{infrastructure_score}</span>
                        <span className="score-label">Score</span>
                    </div>
                </div>
            </div>

            <div className="infra-metrics">
                <div className="infra-metric">
                    <span className="metric-icon">🛣️</span>
                    <div className="metric-info">
                        <span className="metric-label">Road Density</span>
                        <span className="metric-value">{road_density} km/100km²</span>
                    </div>
                </div>

                <div className="infra-metric">
                    <span className="metric-icon">🚂</span>
                    <div className="metric-info">
                        <span className="metric-label">Railway Stations</span>
                        <span className="metric-value">{railway_stations}</span>
                    </div>
                </div>

                <div className="infra-metric">
                    <span className="metric-icon">✈️</span>
                    <div className="metric-info">
                        <span className="metric-label">Airports</span>
                        <span className="metric-value">{airports}</span>
                    </div>
                </div>

                <div className="infra-metric">
                    <span className="metric-icon">📡</span>
                    <div className="metric-info">
                        <span className="metric-label">Internet Penetration</span>
                        <span className="metric-value">{internet_penetration}%</span>
                    </div>
                </div>

                <div className="infra-metric">
                    <span className="metric-icon">⚡</span>
                    <div className="metric-info">
                        <span className="metric-label">Electricity Access</span>
                        <span className="metric-value">{electricity_access}%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function getScoreColor(score) {
    if (score >= 80) return '#10b981'
    if (score >= 60) return '#84cc16'
    if (score >= 40) return '#fbbf24'
    return '#f87171'
}
