import { useComparisonStore } from '../store/comparisonStore'
import { alignMetrics, generateComparisonSummary, checkComparability } from '../services/comparisonService'
import { Link } from 'react-router-dom'
import ExportButtons from '../components/ExportButtons'
import './ComparePage.css'

function ComparePage() {
    const { selectedPlaces, removePlace, clearComparison } = useComparisonStore()

    // Check if we have places to compare
    if (selectedPlaces.length === 0) {
        return (
            <div className="compare-page">
                <div className="compare-empty">
                    <h2>No Places Selected for Comparison</h2>
                    <p>Select places from the explore page to compare them.</p>
                    <Link to="/explore" className="btn-primary">
                        Go to Explore
                    </Link>
                </div>
            </div>
        )
    }

    // Get comparison data
    const comparisonData = alignMetrics(selectedPlaces)
    const summary = generateComparisonSummary(selectedPlaces)
    const { comparable, warnings } = checkComparability(selectedPlaces)

    return (
        <div className="compare-page">
            <div className="compare-header">
                <h1>Place Comparison</h1>
                <div className="header-actions">
                    <ExportButtons comparisonData={comparisonData} places={selectedPlaces} />
                    <button onClick={clearComparison} className="btn-secondary">
                        Clear All
                    </button>
                </div>
            </div>

            {/* Warnings */}
            {warnings.length > 0 && (
                <div className="compare-warnings">
                    <h3>⚠️ Comparison Warnings</h3>
                    <ul>
                        {warnings.map((warning, idx) => (
                            <li key={idx}>{warning}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Summary */}
            {summary && (
                <div className="compare-summary">
                    <h3>Comparison Summary</h3>
                    <div className="summary-grid">
                        <div className="summary-item">
                            <span className="summary-label">Places Compared</span>
                            <span className="summary-value">{summary.totalPlaces}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Place Types</span>
                            <span className="summary-value">{summary.placeTypes.join(', ')}</span>
                        </div>
                        {summary.avgPopulation && (
                            <div className="summary-item">
                                <span className="summary-label">Avg. Population</span>
                                <span className="summary-value">{summary.avgPopulation.toLocaleString()}</span>
                            </div>
                        )}
                        {summary.avgArea && (
                            <div className="summary-item">
                                <span className="summary-label">Avg. Area</span>
                                <span className="summary-value">{summary.avgArea.toLocaleString()} km²</span>
                            </div>
                        )}
                        {summary.avgLiteracy && (
                            <div className="summary-item">
                                <span className="summary-label">Avg. Literacy Rate</span>
                                <span className="summary-value">{summary.avgLiteracy}%</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Selected Places */}
            <div className="compare-places">
                {selectedPlaces.map(place => (
                    <div key={place.place_id} className="compare-place-card">
                        <button
                            onClick={() => removePlace(place.place_id)}
                            className="remove-place-btn"
                            aria-label={`Remove ${place.canonical_name}`}
                        >
                            ×
                        </button>
                        <h3>{place.canonical_name}</h3>
                        <p className="place-type">{place.place_type.toUpperCase()}</p>
                        <Link to={`/place/${place.place_id}`} className="view-details-link">
                            View Details →
                        </Link>
                    </div>
                ))}
            </div>

            {/* Comparison Table */}
            <div className="comparison-table-container">
                <table className="comparison-table">
                    <thead>
                        <tr>
                            <th>Metric</th>
                            {selectedPlaces.map(place => (
                                <th key={place.place_id}>{place.canonical_name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {comparisonData.map((row, idx) => (
                            <tr key={idx}>
                                <td className="metric-name">
                                    {row.metric}
                                    {row.unit && <span className="metric-unit"> ({row.unit})</span>}
                                </td>
                                {row.values.map((value, vIdx) => {
                                    const isMax = row.max !== undefined && value.rawValue === row.max
                                    const isMin = row.min !== undefined && value.rawValue === row.min
                                    const className = isMax ? 'value-max' : isMin ? 'value-min' : ''

                                    return (
                                        <td key={vIdx} className={className}>
                                            <span className="value-display">{value.displayValue}</span>
                                            {value.confidence !== undefined && (
                                                <span className="confidence-badge" title={`Confidence: ${(value.confidence * 100).toFixed(0)}%`}>
                                                    {(value.confidence * 100).toFixed(0)}%
                                                </span>
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Data Transparency Notice */}
            <div className="data-transparency">
                <h4>📊 Data Transparency</h4>
                <ul>
                    <li>Green highlights indicate maximum values</li>
                    <li>Blue highlights indicate minimum values</li>
                    <li>Confidence scores show data quality (higher is better)</li>
                    <li>N/A indicates data not available</li>
                    <li>All metrics aligned for fair comparison</li>
                </ul>
            </div>
        </div>
    )
}

export default ComparePage
