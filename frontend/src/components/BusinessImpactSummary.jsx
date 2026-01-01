/**
 * BusinessImpactSummary Component
 * 
 * Entrepreneur-friendly summary of geographic advantages and challenges
 */

import './BusinessImpactSummary.css'

export default function BusinessImpactSummary({ place }) {
    if (!place) return null

    const geography = place.geography || {}
    const waterResources = place.water_resources || {}
    const connectivity = place.connectivity || {}

    // Generate advantages
    const advantages = []
    if (waterResources.groundwater_level === 'Abundant') {
        advantages.push('Abundant water (low extraction costs)')
    }
    if (geography.terrain === 'Plains' || geography.terrain === 'Flat') {
        advantages.push('Flat terrain (easy construction)')
    }
    if (connectivity?.road_network?.quality_rating === 'Excellent') {
        advantages.push('Excellent road network (low logistics costs)')
    }

    // Generate challenges
    const challenges = []
    if (place.disaster_risks?.flood_risk?.level === 'High') {
        challenges.push('Monsoon flooding (Jun-Sep disruptions)')
    }
    if (geography.climate_zone?.includes('Humid')) {
        challenges.push('High humidity (AC costs, storage considerations)')
    }
    if (!connectivity?.air_connectivity?.nearest_airport) {
        challenges.push('Limited air connectivity')
    }

    return (
        <div className="business-impact-summary">
            <h3 className="summary-title">📊 Geographic Overview for Entrepreneurs</h3>

            {advantages.length > 0 && (
                <div className="impact-section advantages">
                    <h4>✅ Advantages</h4>
                    <ul>
                        {advantages.map((adv, idx) => (
                            <li key={idx}>{adv}</li>
                        ))}
                    </ul>
                </div>
            )}

            {challenges.length > 0 && (
                <div className="impact-section challenges">
                    <h4>⚠️ Challenges</h4>
                    <ul>
                        {challenges.map((chal, idx) => (
                            <li key={idx}>{chal}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="impact-section bottom-line">
                <h4>💡 Bottom Line</h4>
                <p>
                    {advantages.length > challenges.length
                        ? "Strong geographic advantages for business. Plan for seasonal challenges."
                        : challenges.length > advantages.length
                            ? "Geographic challenges present. Mitigation strategies recommended."
                            : "Balanced geographic profile. Standard business planning applies."}
                </p>
            </div>
        </div>
    )
}
