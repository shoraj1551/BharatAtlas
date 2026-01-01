import { getLegendItems } from '../map/colorScales'
import './MapLegend.css'

export default function MapLegend({ scale, title }) {
    const items = getLegendItems(scale)

    return (
        <div className="map-legend">
            <h4>{title}</h4>
            <div className="legend-items">
                {items.map((item, idx) => (
                    <div key={idx} className="legend-item">
                        <div
                            className="legend-color"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="legend-label">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
            <p className="legend-note">{scale.unit} (Census 2011)</p>
        </div>
    )
}
