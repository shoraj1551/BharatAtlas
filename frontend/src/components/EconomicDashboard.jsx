import './EconomicDashboard.css'

export default function EconomicDashboard({ economicData }) {
    if (!economicData) return null

    const { gdp, per_capita_income, unemployment_rate, growth_rate, industry_breakdown } = economicData

    return (
        <div className="economic-dashboard">
            <h3>💰 Economic Indicators</h3>

            <div className="economic-grid">
                <div className="economic-card">
                    <div className="card-icon">📊</div>
                    <div className="card-content">
                        <span className="card-label">GDP</span>
                        <span className="card-value">₹{gdp?.toLocaleString()} Cr</span>
                    </div>
                </div>

                <div className="economic-card">
                    <div className="card-icon">💵</div>
                    <div className="card-content">
                        <span className="card-label">Per Capita Income</span>
                        <span className="card-value">₹{per_capita_income?.toLocaleString()}</span>
                    </div>
                </div>

                <div className="economic-card">
                    <div className="card-icon">📈</div>
                    <div className="card-content">
                        <span className="card-label">Growth Rate</span>
                        <span className="card-value">{growth_rate}%</span>
                    </div>
                </div>

                <div className="economic-card">
                    <div className="card-icon">👔</div>
                    <div className="card-content">
                        <span className="card-label">Unemployment</span>
                        <span className="card-value">{unemployment_rate}%</span>
                    </div>
                </div>
            </div>

            {industry_breakdown && (
                <div className="industry-breakdown">
                    <h4>Industry Breakdown</h4>
                    <div className="breakdown-bars">
                        <div className="breakdown-item">
                            <span className="breakdown-label">🌾 Agriculture</span>
                            <div className="breakdown-bar">
                                <div
                                    className="breakdown-fill agriculture"
                                    style={{ width: `${industry_breakdown.agriculture}%` }}
                                />
                            </div>
                            <span className="breakdown-value">{industry_breakdown.agriculture}%</span>
                        </div>

                        <div className="breakdown-item">
                            <span className="breakdown-label">🏭 Manufacturing</span>
                            <div className="breakdown-bar">
                                <div
                                    className="breakdown-fill manufacturing"
                                    style={{ width: `${industry_breakdown.manufacturing}%` }}
                                />
                            </div>
                            <span className="breakdown-value">{industry_breakdown.manufacturing}%</span>
                        </div>

                        <div className="breakdown-item">
                            <span className="breakdown-label">💼 Services</span>
                            <div className="breakdown-bar">
                                <div
                                    className="breakdown-fill services"
                                    style={{ width: `${industry_breakdown.services}%` }}
                                />
                            </div>
                            <span className="breakdown-value">{industry_breakdown.services}%</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
