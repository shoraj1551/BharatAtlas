import './MapVisualizationToggle.css'

export default function MapVisualizationToggle({ mode, onModeChange }) {
    const modes = [
        { id: 'none', label: 'Default', icon: '🗺️' },
        { id: 'density', label: 'Population Density', icon: '👥' },
        { id: 'literacy', label: 'Literacy Rate', icon: '📚' }
    ]

    return (
        <div className="map-viz-toggle">
            <label>Visualization:</label>
            <div className="viz-buttons">
                {modes.map(m => (
                    <button
                        key={m.id}
                        className={`viz-btn ${mode === m.id ? 'active' : ''}`}
                        onClick={() => onModeChange(m.id)}
                        title={m.label}
                    >
                        <span className="viz-icon">{m.icon}</span>
                        <span className="viz-label">{m.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
