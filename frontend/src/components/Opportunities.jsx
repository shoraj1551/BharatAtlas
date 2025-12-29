import './Opportunities.css'
import { OpportunityConfidence } from '../models/Opportunity'

// Confidence badge colors
const CONFIDENCE_COLORS = {
    [OpportunityConfidence.HIGH]: '#2e7d32',
    [OpportunityConfidence.MEDIUM]: '#f57c00',
    [OpportunityConfidence.LOW]: '#d32f2f'
}

function Opportunities({ opportunities }) {
    if (!opportunities || opportunities.length === 0) {
        return null
    }

    return (
        <div className="opportunities">
            <h3 className="opportunities-title">Identified Opportunities</h3>
            <div className="opportunities-list">
                {opportunities.map(opportunity => (
                    <div key={opportunity.id} className="opportunity-card">
                        <div className="opportunity-header">
                            <h4 className="opportunity-title">{opportunity.title}</h4>
                            <span
                                className="opportunity-confidence-badge"
                                style={{ backgroundColor: CONFIDENCE_COLORS[opportunity.confidence] }}
                                title={`Confidence: ${opportunity.confidence}`}
                            >
                                {opportunity.confidence}
                            </span>
                        </div>

                        <p className="opportunity-category">{opportunity.category.replace(/_/g, ' ').toUpperCase()}</p>

                        <p className="opportunity-description">{opportunity.description}</p>

                        <div className="opportunity-reasoning">
                            <h5 className="reasoning-title">Reasoning</h5>
                            <p className="reasoning-type">{opportunity.reasoning.type.replace(/_/g, ' ')}</p>
                            <p className="reasoning-explanation">{opportunity.reasoning.explanation}</p>

                            {opportunity.reasoning.data_points.length > 0 && (
                                <div className="reasoning-data-points">
                                    <strong>Data Points:</strong>
                                    <ul>
                                        {opportunity.reasoning.data_points.map((point, idx) => (
                                            <li key={idx}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {opportunity.reasoning.sources.length > 0 && (
                                <div className="reasoning-sources">
                                    <strong>Sources:</strong>
                                    <ul>
                                        {opportunity.reasoning.sources.map((source, idx) => (
                                            <li key={idx}>{source}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {opportunity.estimated_timeline && (
                            <p className="opportunity-timeline">
                                <strong>Estimated Timeline:</strong> {opportunity.estimated_timeline}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Opportunities
