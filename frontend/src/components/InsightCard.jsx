import { getInsightColor } from '../utils/insightEngine'
import './InsightCard.css'

export default function InsightCard({ insight }) {
    const color = getInsightColor(insight.severity)

    return (
        <div className="insight-card" style={{ borderLeftColor: color }}>
            <div className="insight-icon">{insight.icon}</div>
            <div className="insight-content">
                <h4 className="insight-title">{insight.title}</h4>
                <p className="insight-description">{insight.description}</p>
            </div>
        </div>
    )
}

export function InsightsList({ insights }) {
    if (!insights || insights.length === 0) {
        return (
            <div className="insights-empty">
                <p>No insights available</p>
            </div>
        )
    }

    return (
        <div className="insights-list">
            <h3>💡 AI Insights</h3>
            {insights.map((insight, index) => (
                <InsightCard key={index} insight={insight} />
            ))}
        </div>
    )
}
