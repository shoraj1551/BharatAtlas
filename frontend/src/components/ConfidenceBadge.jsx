import React, { useState } from 'react'
import { calculateDataConfidence } from '../utils/trustCalculator'
import './ConfidenceBadge.css'

export default function ConfidenceBadge({ place }) {
    const { score, label, color, missing } = calculateDataConfidence(place)
    const [showTooltip, setShowTooltip] = useState(false)

    return (
        <div
            className="confidence-badge"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <div className="badge-pill" style={{ borderColor: color, color: color }}>
                <span className="dot" style={{ backgroundColor: color }}></span>
                <span className="label">{label}</span>
            </div>

            {showTooltip && (
                <div className="confidence-tooltip">
                    <div className="tooltip-header">
                        <strong>Data Trust Score: {score}/100</strong>
                    </div>
                    {missing.length > 0 ? (
                        <div className="missing-list">
                            <p>Missing / Outdated:</p>
                            <ul>
                                {missing.slice(0, 5).map((item, i) => (
                                    <li key={i}>• {item}</li>
                                ))}
                                {missing.length > 5 && <li>+ {missing.length - 5} more</li>}
                            </ul>
                        </div>
                    ) : (
                        <p className="perfect-score">✅ Comprehensive Data Record</p>
                    )}
                </div>
            )}
        </div>
    )
}
