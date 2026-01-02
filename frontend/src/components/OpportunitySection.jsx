/**
 * OpportunitySection - AI Business Intelligence Radar
 * 
 * Allows users to scan raw local signals and visualize entrepreneurial opportunities.
 * "Tech Bureau" Design Standard.
 */

import React, { useState, useEffect } from 'react'
import opportunityService from '../services/opportunityService'
import BusinessSimulator from './BusinessSimulator'
import './OpportunitySection_v2.css'

export default function OpportunitySection({ place }) {
    const [opportunities, setOpportunities] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [mode, setMode] = useState('view') // 'view' or 'analyze'
    const [inputText, setInputText] = useState('')
    const [analyzing, setAnalyzing] = useState(false)

    // Load initial opportunities
    const loadOpportunities = () => {
        setLoading(true)
        opportunityService.generatePlaceOpportunities(place)
            .then(data => {
                setOpportunities(data)
                setLoading(false)
            })
            .catch(err => {
                console.error("Failed to load opportunities", err)
                setLoading(false)
            })
    }

    useEffect(() => {
        if (place) {
            loadOpportunities()
        }
    }, [place])

    const handleAnalyze = async () => {
        if (!inputText.trim()) return

        setAnalyzing(true)
        setError(null)

        try {
            // Split by newlines to simulate multiple sources if user pastes a block
            const signals = inputText.split('\n').filter(line => line.trim().length > 10)

            const res = await fetch(`/api/opportunities/analyze/${place.place_id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ signals })
            })

            const data = await res.json()

            if (data.success) {
                setOpportunities(prev => [...data.data, ...prev]) // Prepend new findings
                setMode('view')
                setInputText('')
            } else {
                setError(data.error || "Analysis failed.")
            }
        } catch (err) {
            console.error("Analysis Error", err)
            setError("Network error during analysis.")
        } finally {
            setAnalyzing(false)
        }
    }

    if (!place) return null

    return (
        <div className="opportunity-section">
            <header className="opp-header">
                <div>
                    <h2 className="section-title">📡 Opportunity Radar</h2>
                    <p className="opp-subtitle">AI Signal Analysis & Business Gaps</p>
                </div>
                <button
                    className={`action-btn ${mode === 'analyze' ? 'active' : ''}`}
                    onClick={() => setMode(mode === 'view' ? 'analyze' : 'view')}
                >
                    {mode === 'view' ? '➕ New Scan' : 'Cancel'}
                </button>
            </header>

            {/* ERROR ALERT */}
            {error && <div className="opp-error">{error}</div>}

            {/* ANALYZE MODE (Input Sensor) */}
            {mode === 'analyze' && (
                <div className="analyze-panel">
                    <div className="panel-instructions">
                        <span className="icon">📝</span>
                        <p>Paste raw local reports, forum complaints, or blog texts here. Our AI will cluster them into business opportunities.</p>
                    </div>
                    <textarea
                        className="signal-input"
                        placeholder="e.g. 'Local farmers are complaining about 40% tomato spoilage due to lack of cold storage...' (One signal per line)"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        disabled={analyzing}
                    />
                    <div className="panel-actions">
                        <button
                            className="run-scan-btn"
                            onClick={handleAnalyze}
                            disabled={analyzing || !inputText.trim()}
                        >
                            {analyzing ? 'Scanning Signals...' : 'Run Opportunity Scan ⚡'}
                        </button>
                    </div>
                </div>
            )}

            {/* VIEW MODE (Radar Dashboard) */}
            {mode === 'view' && (
                <>
                    <div className="radar-dashboard">
                        {opportunities.length === 0 ? (
                            <div className="empty-radar">
                                <span className="radar-icon">📡</span>
                                <p>No signals detected yet.</p>
                                <button onClick={() => setMode('analyze')}>Start a Scan</button>
                            </div>
                        ) : (
                            <div className="opp-grid">
                                {opportunities.map((opp, idx) => (
                                    <div key={opp._id || idx} className="opp-card">
                                        <div className="card-top">
                                            <span className={`opp-type ${opp.signal.type.toLowerCase().replace(' ', '-')}`}>
                                                {opp.signal.type}
                                            </span>
                                            <span className="opp-score" title="AI Confidence Score">
                                                {opp.signal.confidence_score}% Conf.
                                            </span>
                                            <button
                                                className="track-btn"
                                                onClick={() => workspaceService.saveInsight('opportunity', opp.signal.title, opp, place.place_id)}
                                                title="Save to Workspace"
                                            >
                                                📌 Track
                                            </button>
                                        </div>

                                        <h3 className="opp-title">{opp.signal.title}</h3>
                                        <p className="opp-desc">{opp.signal.description}</p>

                                        <div className="opp-evidence">
                                            <h4>Evidence Trace:</h4>
                                            {opp.evidence.map((ev, i) => (
                                                <div key={i} className="evidence-chip">
                                                    "{ev.snippet}" <span className="source">— {ev.source}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="opp-models">
                                            {opp.recommended_business_models.map((model, i) => (
                                                <span key={i} className="model-tag">🚀 {model}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* IDEA VALIDATOR: Business Simulator */}
                    <BusinessSimulator placeId={place.place_id} />
                </>
            )}
        </div>
    )
}
