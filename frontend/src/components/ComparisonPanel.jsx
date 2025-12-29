import { useState } from 'react'
import './ComparisonPanel.css'
import { createComparisonSession } from '../utils/comparisonSystem'
import { exportComparisonSnapshot, logComparisonAudit } from '../utils/comparisonExport'

function ComparisonPanel({ availablePlaces }) {
    const [compareMode, setCompareMode] = useState(false)
    const [selectedPlaces, setSelectedPlaces] = useState([])
    const [selectedMetrics, setSelectedMetrics] = useState([])
    const [comparisonSession, setComparisonSession] = useState(null)

    const handleStartComparison = () => {
        // Story 131: Comparison is explicit - user must initiate
        setCompareMode(true)
    }

    const handleCreateComparison = () => {
        if (selectedPlaces.length < 2) {
            alert('Please select at least 2 places to compare')
            return
        }

        if (selectedMetrics.length === 0) {
            alert('Please select at least one metric')
            return
        }

        // Story 145: Readability check
        if (selectedMetrics.length > 7) {
            if (!confirm('Comparing more than 7 metrics may be hard to read. Continue?')) {
                return
            }
        }

        try {
            const session = createComparisonSession({
                places: selectedPlaces,
                metrics: selectedMetrics,
                scope: {
                    type: 'custom',
                    description: 'User-selected places'
                }
            })

            setComparisonSession(session)

            // Story 149: Log audit trail
            logComparisonAudit(session)
        } catch (error) {
            alert(error.message)
        }
    }

    const handleExport = () => {
        // Story 144: Export comparison snapshot
        const snapshot = exportComparisonSnapshot(comparisonSession)
        const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `comparison_${comparisonSession.id}.json`
        a.click()
    }

    if (!compareMode) {
        return (
            <div className="comparison-panel">
                {/* Story 131: Explicit comparison initiation */}
                <button onClick={handleStartComparison} className="compare-button">
                    Compare Places
                </button>
            </div>
        )
    }

    if (!comparisonSession) {
        return (
            <div className="comparison-panel">
                <h3>Select Places to Compare</h3>
                {/* Place selection UI */}
                <button onClick={handleCreateComparison}>Create Comparison</button>
                <button onClick={() => setCompareMode(false)}>Cancel</button>
            </div>
        )
    }

    return (
        <div className="comparison-panel">
            {/* Story 133: Comparison context banner */}
            <div className="comparison-context-banner">
                <small>
                    Comparing {comparisonSession.metrics.join(', ')}
                    ({comparisonSession.scope.description})
                </small>
            </div>

            {/* Story 136: Confidence indicator */}
            <div className="comparison-confidence">
                <small>
                    Confidence: {comparisonSession.confidence.level} ({comparisonSession.confidence.message})
                </small>
            </div>

            {/* Story 147: Bias disclosure */}
            {comparisonSession.biasWarnings.length > 0 && (
                <div className="bias-disclosure-banner">
                    {comparisonSession.biasWarnings.map((warning, i) => (
                        <small key={i}>⚠️ {warning}</small>
                    ))}
                </div>
            )}

            {/* Comparison results */}
            <div className="comparison-results">
                {/* Results display */}
            </div>

            {/* Story 150: Comparison ethics footer */}
            <div className="comparison-ethics-footer">
                <small>
                    <strong>Remember:</strong> Comparisons are context-dependent.
                    Rankings do not imply superiority.
                    Consider local context and data limitations.
                </small>
            </div>

            {/* Story 144: Export button */}
            <button onClick={handleExport} className="export-button">
                Export Comparison
            </button>
        </div>
    )
}

export default ComparisonPanel
