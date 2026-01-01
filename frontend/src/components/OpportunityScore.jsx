import { calculateOpportunityScore } from '../services/opportunityScoring'
import './OpportunityScore.css'

/**
 * Opportunity Score Component
 * 
 * Displays opportunity score with breakdown
 */
function OpportunityScore({ place }) {
    if (!place) return null

    const scoreData = calculateOpportunityScore(place)
    const { totalScore, confidence, breakdown, warnings } = scoreData

    const getScoreColor = (score) => {
        if (score >= 80) return '#10b981' // Green
        if (score >= 60) return '#3b82f6' // Blue
        if (score >= 40) return '#f59e0b' // Orange
        return '#ef4444' // Red
    }

    const getScoreLabel = (score) => {
        if (score >= 80) return 'Excellent'
        if (score >= 60) return 'Good'
        if (score >= 40) return 'Moderate'
        return 'Limited'
    }

    return (
        <div className="opportunity-score">
            <div className="score-header">
                <h3>Opportunity Score</h3>
                <div className="score-badge" style={{ backgroundColor: getScoreColor(totalScore) }}>
                    <span className="score-value">{totalScore}</span>
                    <span className="score-max">/100</span>
                </div>
            </div>

            <div className="score-label">
                {getScoreLabel(totalScore)} Opportunity
            </div>

            <div className="score-confidence">
                <span className="confidence-label">Confidence:</span>
                <span className="confidence-value">{Math.round(confidence * 100)}%</span>
            </div>

            {/* Score Breakdown */}
            {Object.keys(breakdown).length > 0 && (
                <div className="score-breakdown">
                    <h4>Score Breakdown</h4>
                    {Object.entries(breakdown).map(([factor, data]) => (
                        <div key={factor} className="factor-item">
                            <div className="factor-header">
                                <span className="factor-name">
                                    {factor.charAt(0).toUpperCase() + factor.slice(1)}
                                </span>
                                <span className="factor-score">{Math.round(data.score)}</span>
                            </div>
                            <div className="factor-bar">
                                <div
                                    className="factor-fill"
                                    style={{
                                        width: `${data.score}%`,
                                        backgroundColor: getScoreColor(data.score)
                                    }}
                                />
                            </div>
                            {data.details && (
                                <div className="factor-details">
                                    {Object.entries(data.details).map(([key, value]) => (
                                        <span key={key} className="detail-item">
                                            {key}: {value}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Warnings */}
            {warnings.length > 0 && (
                <div className="score-warnings">
                    <h4>⚠️ Data Limitations</h4>
                    <ul>
                        {warnings.map((warning, idx) => (
                            <li key={idx}>{warning}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Transparency Notice */}
            <div className="score-transparency">
                <p className="transparency-note">
                    <strong>Note:</strong> This score is calculated using available data and should be used as one of many factors in decision-making. Scores are subject to data quality and completeness.
                </p>
            </div>
        </div>
    )
}

export default OpportunityScore
