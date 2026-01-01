import { usePreferencesStore } from '../store/preferencesStore'
import './DashboardCustomizer.css'

export default function DashboardCustomizer({ isOpen, onClose }) {
    const {
        visibleMetrics,
        toggleMetric,
        mapStyle,
        setMapStyle,
        units,
        setUnits,
        reset
    } = usePreferencesStore()

    const availableMetrics = [
        { id: 'population', label: 'Population', icon: '👥' },
        { id: 'literacy_rate', label: 'Literacy Rate', icon: '📚' },
        { id: 'area', label: 'Area', icon: '📏' },
        { id: 'density', label: 'Population Density', icon: '🏘️' },
        { id: 'industries', label: 'Industries', icon: '🏭' },
        { id: 'gdp', label: 'GDP', icon: '💰' }
    ]

    if (!isOpen) return null

    return (
        <div className="customizer-overlay" onClick={onClose}>
            <div className="customizer-panel" onClick={e => e.stopPropagation()}>
                <div className="customizer-header">
                    <h2>⚙️ Customize Dashboard</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="customizer-content">
                    {/* Visible Metrics */}
                    <section className="customizer-section">
                        <h3>Visible Metrics</h3>
                        <p className="section-desc">Choose which metrics to display</p>
                        <div className="metrics-grid">
                            {availableMetrics.map(metric => (
                                <label key={metric.id} className="metric-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={visibleMetrics.includes(metric.id)}
                                        onChange={() => toggleMetric(metric.id)}
                                    />
                                    <span className="metric-icon">{metric.icon}</span>
                                    <span className="metric-label">{metric.label}</span>
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* Map Style */}
                    <section className="customizer-section">
                        <h3>Map Style</h3>
                        <select value={mapStyle} onChange={(e) => setMapStyle(e.target.value)}>
                            <option value="basic">Basic</option>
                            <option value="satellite">Satellite</option>
                            <option value="terrain">Terrain</option>
                        </select>
                    </section>

                    {/* Units */}
                    <section className="customizer-section">
                        <h3>Units</h3>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    value="metric"
                                    checked={units === 'metric'}
                                    onChange={(e) => setUnits(e.target.value)}
                                />
                                Metric (km, km²)
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="imperial"
                                    checked={units === 'imperial'}
                                    onChange={(e) => setUnits(e.target.value)}
                                />
                                Imperial (mi, mi²)
                            </label>
                        </div>
                    </section>

                    {/* Reset */}
                    <section className="customizer-section">
                        <button className="reset-btn" onClick={reset}>
                            🔄 Reset to Defaults
                        </button>
                    </section>
                </div>
            </div>
        </div>
    )
}
