import React, { useState } from 'react'
import './BusinessSimulator.css'

export default function BusinessSimulator({ placeId }) {
    const [businessType, setBusinessType] = useState('')
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSimulate = async () => {
        if (!businessType.trim()) return

        setLoading(true)
        setResult(null)

        try {
            const res = await fetch(`/api/opportunities/evaluate/${placeId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ businessType })
            })
            const data = await res.json()
            if (data.success) {
                setResult(data.data)
            }
        } catch (error) {
            console.error("Simulation failed", error)
        } finally {
            setLoading(false)
        }
    }

    const getScoreColor = (score) => {
        if (score >= 75) return '#10b981' // Green
        if (score >= 40) return '#f59e0b' // Yellow
        return '#ef4444' // Red
    }

    return (
        <div className="business-simulator">
            <div className="sim-header">
                <h3>🧪 Idea Validator</h3>
                <p>Test your business concept against this location's data.</p>
            </div>

            <div className="sim-input-group">
                <input
                    type="text"
                    placeholder="e.g. 'Luxury Electric Car Showroom'"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSimulate()}
                    disabled={loading}
                />
                <button
                    onClick={handleSimulate}
                    disabled={loading || !businessType.trim()}
                    className="sim-btn"
                >
                    {loading ? 'Simulating...' : 'Check Feasibility'}
                </button>
            </div>

            {result && (
                <div className="sim-result fade-in">
                    <div className="score-badge" style={{ borderColor: getScoreColor(result.fit_score) }}>
                        <span className="sc-val" style={{ color: getScoreColor(result.fit_score) }}>
                            {result.fit_score}
                        </span>
                        <span className="sc-label">FIT SCORE</span>
                    </div>

                    <div className="sim-verdict">
                        <h4>Verdict:</h4>
                        <p>{result.verdict}</p>
                    </div>

                    <div className="sim-grid">
                        <div className="sim-col risks">
                            <h4>⚠️ Key Risks</h4>
                            <ul>
                                {result.key_risks.map((risk, i) => (
                                    <li key={i}>{risk}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="sim-col verify">
                            <h4>✅ Verify on Ground</h4>
                            <ul>
                                {result.on_ground_verification.map((step, i) => (
                                    <li key={i}>{step}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
