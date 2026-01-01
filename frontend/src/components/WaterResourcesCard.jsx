/**
 * WaterResourcesCard Component
 * 
 * Displays water availability with business impact
 */

import FactBadge from './FactBadge'
import './WaterResourcesCard.css'

export default function WaterResourcesCard({ place }) {
    if (!place) return null

    const waterResources = place.water_resources || {}
    const geography = place.geography || {}

    // Determine water availability level
    const getWaterLevel = () => {
        if (waterResources.groundwater_level) {
            return waterResources.groundwater_level
        }
        // Fallback based on rainfall
        const rainfall = waterResources.annual_rainfall_mm || 0
        if (rainfall > 1500) return 'Abundant'
        if (rainfall > 800) return 'Moderate'
        return 'Scarce'
    }

    const waterLevel = getWaterLevel()

    // Get business suitability
    const getSuitability = () => {
        switch (waterLevel) {
            case 'Abundant':
                return {
                    text: 'Suitable for water-intensive industries',
                    industries: ['Food Processing', 'Textiles', 'Beverages', 'Agriculture'],
                    color: 'green'
                }
            case 'Moderate':
                return {
                    text: 'Suitable for moderate water use',
                    industries: ['Light Manufacturing', 'Services', 'IT'],
                    color: 'yellow'
                }
            case 'Scarce':
                return {
                    text: 'Water conservation required',
                    industries: ['IT Services', 'Trading', 'Consulting'],
                    color: 'red'
                }
            default:
                return { text: 'Data not available', industries: [], color: 'gray' }
        }
    }

    const suitability = getSuitability()

    return (
        <div className="water-resources-card">
            <div className="card-header">
                <h3>💧 Water Availability</h3>
                <FactBadge type="verified" source="Central Ground Water Board" />
            </div>

            {/* Water Level Meter */}
            <div className={`water-meter ${suitability.color}`}>
                <div className="meter-icon">💧</div>
                <div className="meter-content">
                    <span className="meter-label">Water Availability</span>
                    <span className="meter-value">{waterLevel}</span>
                </div>
            </div>

            {/* Key Facts */}
            <div className="water-facts">
                <div className="fact-item">
                    <span className="fact-icon">🌧️</span>
                    <div className="fact-content">
                        <span className="fact-label">Annual Rainfall</span>
                        <span className="fact-value">
                            {waterResources.annual_rainfall_mm
                                ? `${waterResources.annual_rainfall_mm}mm/year`
                                : 'Data not available'}
                        </span>
                        {waterResources.annual_rainfall_mm && (
                            <span className="fact-impact">
                                {waterResources.annual_rainfall_mm > 1500
                                    ? 'Excellent for agriculture'
                                    : waterResources.annual_rainfall_mm > 800
                                        ? 'Good for most crops'
                                        : 'Irrigation required'}
                            </span>
                        )}
                    </div>
                </div>

                <div className="fact-item">
                    <span className="fact-icon">🚰</span>
                    <div className="fact-content">
                        <span className="fact-label">Groundwater</span>
                        <span className="fact-value">{waterLevel}</span>
                        <span className="fact-impact">
                            {waterLevel === 'Abundant'
                                ? 'Low extraction costs'
                                : waterLevel === 'Moderate'
                                    ? 'Moderate extraction costs'
                                    : 'High extraction costs'}
                        </span>
                    </div>
                </div>

                {waterResources.major_water_bodies && waterResources.major_water_bodies.length > 0 && (
                    <div className="fact-item">
                        <span className="fact-icon">🏞️</span>
                        <div className="fact-content">
                            <span className="fact-label">Major Water Bodies</span>
                            <div className="water-bodies-list">
                                {waterResources.major_water_bodies.map((body, idx) => (
                                    <span key={idx} className="water-body-tag">{body}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Business Impact */}
            <div className="business-impact">
                <h4>💼 Business Impact</h4>
                <div className="impact-content">
                    <p className="impact-text">{suitability.text}</p>
                    {suitability.industries.length > 0 && (
                        <div className="suitable-industries">
                            <span className="industries-label">Suitable for:</span>
                            <div className="industries-list">
                                {suitability.industries.map((industry, idx) => (
                                    <span key={idx} className="industry-tag">{industry}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Tips */}
            {waterLevel === 'Scarce' && (
                <div className="water-tips">
                    <h4>💡 Recommendations</h4>
                    <ul>
                        <li>Implement water recycling systems</li>
                        <li>Consider rainwater harvesting</li>
                        <li>Budget for water procurement costs</li>
                    </ul>
                </div>
            )}
        </div>
    )
}
