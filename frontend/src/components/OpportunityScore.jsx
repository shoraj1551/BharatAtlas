import './OpportunityScore.css'

/**
 * OpportunityScore (Now "Place Readiness Matrix")
 * 
 * Replaced generic "Business Score" with specific Sector Readiness.
 * "No place is bad; some are just better for specific things."
 */
function OpportunityScore({ place }) {
    if (!place) return null

    // Helper: Calculate simple readiness based on available attributes
    // In a real app, this would be a complex backend model.
    const calculateReadiness = (p) => {
        // Fallbacks if data missing
        const water = p.water_availability?.value || 50
        const power = p.power_reliability?.value || 50
        const roads = p.road_quality?.value || 50
        const literacy = p.literacy_rate?.value || 60
        const connectivity = p.internet_speed?.value || 20 // Mbps estimate

        return {
            agriculture: (water > 60 && roads > 40) ? 'ready' : (water > 40) ? 'partial' : 'not_ready',
            manufacturing: (power > 70 && roads > 60) ? 'ready' : (power > 50) ? 'partial' : 'not_ready',
            tech: (connectivity > 50 && literacy > 75) ? 'ready' : (connectivity > 20) ? 'partial' : 'not_ready',
            retail: (p.population?.value > 10000 && roads > 50) ? 'ready' : 'partial',
            tourism: (p.has_landmarks || p.scenic_score > 7) ? 'ready' : 'not_ready',
            logistics: (roads > 80) ? 'ready' : 'partial'
        }
    }

    const sectors = calculateReadiness(place)

    const getStatusIcon = (status) => {
        if (status === 'ready') return '✅'
        if (status === 'partial') return '⚠️'
        return '❌'
    }

    const getStatusLabel = (status) => {
        if (status === 'ready') return 'Ready'
        if (status === 'partial') return 'Partial'
        return 'Not Ready'
    }

    const getStatusClass = (status) => {
        if (status === 'ready') return 'status-ready'
        if (status === 'partial') return 'status-partial'
        return 'status-not-ready'
    }

    return (
        <div className="opportunity-score">
            <div className="score-header">
                <div>
                    <h3>Sector Readiness</h3>
                    <p className="score-subtitle">What is this place optimized for?</p>
                </div>
            </div>

            <div className="sector-grid">
                {/* Agriculture */}
                <div className={`sector-card ${getStatusClass(sectors.agriculture)}`}>
                    <div className="sector-icon">🌾</div>
                    <div className="sector-info">
                        <h4>Agriculture</h4>
                        <span className="sector-badge">{getStatusIcon(sectors.agriculture)} {getStatusLabel(sectors.agriculture)}</span>
                    </div>
                </div>

                {/* Manufacturing */}
                <div className={`sector-card ${getStatusClass(sectors.manufacturing)}`}>
                    <div className="sector-icon">🏭</div>
                    <div className="sector-info">
                        <h4>Manufacturing</h4>
                        <span className="sector-badge">{getStatusIcon(sectors.manufacturing)} {getStatusLabel(sectors.manufacturing)}</span>
                    </div>
                </div>

                {/* Retail */}
                <div className={`sector-card ${getStatusClass(sectors.retail)}`}>
                    <div className="sector-icon">🏪</div>
                    <div className="sector-info">
                        <h4>Retail</h4>
                        <span className="sector-badge">{getStatusIcon(sectors.retail)} {getStatusLabel(sectors.retail)}</span>
                    </div>
                </div>

                {/* Tech Services */}
                <div className={`sector-card ${getStatusClass(sectors.tech)}`}>
                    <div className="sector-icon">💻</div>
                    <div className="sector-info">
                        <h4>Tech Services</h4>
                        <span className="sector-badge">{getStatusIcon(sectors.tech)} {getStatusLabel(sectors.tech)}</span>
                    </div>
                </div>

                {/* Logistics */}
                <div className={`sector-card ${getStatusClass(sectors.logistics)}`}>
                    <div className="sector-icon">🚚</div>
                    <div className="sector-info">
                        <h4>Logistics</h4>
                        <span className="sector-badge">{getStatusIcon(sectors.logistics)} {getStatusLabel(sectors.logistics)}</span>
                    </div>
                </div>

                {/* Tourism */}
                <div className={`sector-card ${getStatusClass(sectors.tourism)}`}>
                    <div className="sector-icon">🗺️</div>
                    <div className="sector-info">
                        <h4>Tourism</h4>
                        <span className="sector-badge">{getStatusIcon(sectors.tourism)} {getStatusLabel(sectors.tourism)}</span>
                    </div>
                </div>
            </div>

            {/* Transparency Notice */}
            <div className="score-transparency">
                <p className="transparency-note">
                    <strong>Note:</strong> We do not rank places as "good" or "bad". Every place has a purpose. This matrix shows structural fit.
                </p>
            </div>
        </div>
    )
}

export default OpportunityScore
