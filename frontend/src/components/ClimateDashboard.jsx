import './ClimateDashboard.css'

export default function ClimateDashboard({ climate }) {
    if (!climate) return null

    const {
        avg_temperature,
        annual_rainfall,
        forest_cover_percent,
        air_quality_index,
        environmental_score
    } = climate

    const getAQILevel = (aqi) => {
        if (aqi <= 50) return { label: 'Good', color: '#10b981' }
        if (aqi <= 100) return { label: 'Moderate', color: '#84cc16' }
        if (aqi <= 150) return { label: 'Unhealthy for Sensitive', color: '#fbbf24' }
        if (aqi <= 200) return { label: 'Unhealthy', color: '#f97316' }
        if (aqi <= 300) return { label: 'Very Unhealthy', color: '#ef4444' }
        return { label: 'Hazardous', color: '#991b1b' }
    }

    const aqiLevel = getAQILevel(air_quality_index)

    return (
        <div className="climate-dashboard">
            <h3>🌍 Climate & Environment</h3>

            <div className="climate-grid">
                <div className="climate-card">
                    <span className="climate-icon">🌡️</span>
                    <div className="climate-info">
                        <span className="climate-label">Avg Temperature</span>
                        <span className="climate-value">{avg_temperature}°C</span>
                    </div>
                </div>

                <div className="climate-card">
                    <span className="climate-icon">🌧️</span>
                    <div className="climate-info">
                        <span className="climate-label">Annual Rainfall</span>
                        <span className="climate-value">{annual_rainfall} mm</span>
                    </div>
                </div>

                <div className="climate-card">
                    <span className="climate-icon">🌳</span>
                    <div className="climate-info">
                        <span className="climate-label">Forest Cover</span>
                        <span className="climate-value">{forest_cover_percent}%</span>
                    </div>
                </div>

                <div className="climate-card aqi" style={{ borderLeftColor: aqiLevel.color }}>
                    <span className="climate-icon">💨</span>
                    <div className="climate-info">
                        <span className="climate-label">Air Quality Index</span>
                        <span className="climate-value">{air_quality_index}</span>
                        <span className="aqi-level" style={{ color: aqiLevel.color }}>
                            {aqiLevel.label}
                        </span>
                    </div>
                </div>
            </div>

            <div className="env-score-section">
                <h4>Environmental Score</h4>
                <div className="env-score-bar">
                    <div
                        className="env-score-fill"
                        style={{
                            width: `${environmental_score}%`,
                            background: getScoreGradient(environmental_score)
                        }}
                    >
                        <span className="env-score-text">{environmental_score}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function getScoreGradient(score) {
    if (score >= 80) return 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
    if (score >= 60) return 'linear-gradient(90deg, #84cc16 0%, #65a30d 100%)'
    if (score >= 40) return 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)'
    return 'linear-gradient(90deg, #f87171 0%, #ef4444 100%)'
}
