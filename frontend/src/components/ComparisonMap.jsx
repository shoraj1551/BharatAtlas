import { useState, useRef, useEffect } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { MAP_CONFIG, MAP_STYLES } from '../map/mapConfig'
import './ComparisonMap.css'

export default function ComparisonMap({ places, onClose }) {
    const [maps, setMaps] = useState([])
    const containerRefs = useRef([])
    const mapRefs = useRef([])

    useEffect(() => {
        // Initialize maps for each place
        places.forEach((place, index) => {
            if (!containerRefs.current[index] || mapRefs.current[index]) return

            const map = new maplibregl.Map({
                container: containerRefs.current[index],
                style: MAP_STYLES.BASIC,
                center: place.coordinates || MAP_CONFIG.INITIAL_CENTER,
                zoom: place.place_type === 'state' ? 6 : 9,
                attributionControl: false
            })

            map.addControl(new maplibregl.NavigationControl(), 'top-right')

            // Sync maps on move
            map.on('move', () => {
                if (!map.syncingMove) {
                    mapRefs.current.forEach((otherMap, i) => {
                        if (i !== index && otherMap) {
                            otherMap.syncingMove = true
                            otherMap.setCenter(map.getCenter())
                            otherMap.setZoom(map.getZoom())
                            otherMap.syncingMove = false
                        }
                    })
                }
            })

            mapRefs.current[index] = map
        })

        return () => {
            mapRefs.current.forEach(map => {
                if (map) map.remove()
            })
        }
    }, [places])

    return (
        <div className="comparison-map-container">
            <div className="comparison-header">
                <h2>Comparison Mode</h2>
                <button className="close-btn" onClick={onClose}>✕</button>
            </div>

            <div className={`comparison-grid grid-${places.length}`}>
                {places.map((place, index) => (
                    <div key={place.place_id} className="comparison-panel">
                        <div className="panel-header">
                            <h3>{place.canonical_name}</h3>
                            <div className="panel-stats">
                                <span>Pop: {place.population?.value?.toLocaleString() || 'N/A'}</span>
                                <span>Literacy: {place.literacy_rate?.value || 'N/A'}%</span>
                                <span>Area: {place.area_sq_km?.toLocaleString() || 'N/A'} km²</span>
                            </div>
                        </div>
                        <div
                            ref={el => containerRefs.current[index] = el}
                            className="comparison-map"
                        />
                    </div>
                ))}
            </div>

            <div className="comparison-metrics">
                <h3>Comparison Metrics</h3>
                <div className="metrics-grid">
                    <div className="metric">
                        <span className="metric-label">Population Difference:</span>
                        <span className="metric-value">
                            {calculateDifference(places, 'population')}
                        </span>
                    </div>
                    <div className="metric">
                        <span className="metric-label">Literacy Difference:</span>
                        <span className="metric-value">
                            {calculateDifference(places, 'literacy')}
                        </span>
                    </div>
                    <div className="metric">
                        <span className="metric-label">Area Difference:</span>
                        <span className="metric-value">
                            {calculateDifference(places, 'area')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function calculateDifference(places, metric) {
    if (places.length < 2) return 'N/A'

    const values = places.map(p => {
        switch (metric) {
            case 'population':
                return p.population?.value || 0
            case 'literacy':
                return p.literacy_rate?.value || 0
            case 'area':
                return p.area_sq_km || 0
            default:
                return 0
        }
    })

    const max = Math.max(...values)
    const min = Math.min(...values)
    const diff = max - min

    if (metric === 'literacy') {
        return `${diff.toFixed(1)}%`
    }
    return diff.toLocaleString()
}
