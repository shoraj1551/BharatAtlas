import { getTrendIcon } from '../utils/predictionEngine'
import './PredictionCard.css'

export default function PredictionCard({ prediction }) {
    const trendIcon = getTrendIcon(prediction.change > 0 ? 'up' : 'down')

    return (
        <div className="prediction-card">
            <div className="prediction-header">
                <span className="prediction-icon">{prediction.icon}</span>
                <h4>{prediction.metric}</h4>
            </div>

            <div className="prediction-values">
                <div className="value-box">
                    <span className="value-label">Current (2011)</span>
                    <span className="value-number">{prediction.current.toLocaleString()}</span>
                </div>

                <div className="trend-arrow">{trendIcon}</div>

                <div className="value-box">
                    <span className="value-label">Predicted ({prediction.year})</span>
                    <span className="value-number predicted">{prediction.predicted.toLocaleString()}</span>
                </div>
            </div>

            <div className="prediction-meta">
                <span className="change-badge">
                    {prediction.change > 0 ? '+' : ''}{prediction.change}%
                </span>
                <span className="confidence-badge">
                    {(prediction.confidence * 100).toFixed(0)}% confidence
                </span>
            </div>
        </div>
    )
}

export function PredictionsList({ predictions }) {
    if (!predictions || predictions.length === 0) {
        return null
    }

    return (
        <div className="predictions-list">
            <h3>🔮 Predictions for 2030</h3>
            <div className="predictions-grid">
                {predictions.map((pred, index) => (
                    <PredictionCard key={index} prediction={pred} />
                ))}
            </div>
        </div>
    )
}
