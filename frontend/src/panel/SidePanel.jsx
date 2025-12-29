/**
 * SidePanel Component (Updated for Progressive Navigation)
 * 
 * Displays information about selected place with breadcrumbs
 */

import { useParams, useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import './InfoPanel.css'

export default function SidePanel() {
    const { state, district, tehsil } = useParams()
    const [searchParams] = useSearchParams()
    const village = searchParams.get('village')

    // Determine current level and place name
    const level = village ? 'village' : tehsil ? 'tehsil' : district ? 'district' : state ? 'state' : 'country'
    const placeName = village || tehsil || district || state || 'India'

    // Get level icon
    const getLevelIcon = () => {
        switch (level) {
            case 'country': return '🇮🇳'
            case 'state': return '📍'
            case 'district': return '📌'
            case 'tehsil': return '🏘️'
            case 'thana': return '🚓'
            case 'village': return '🏡'
            default: return '📍'
        }
    }

    return (
        <div className="info-panel">
            <Breadcrumbs state={state} district={district} tehsil={tehsil} village={village} />

            <div className="panel-content">
                <div className="panel-header">
                    <div className="place-title">
                        <span className="place-icon">{getLevelIcon()}</span>
                        <h2 className="place-name">{placeName}</h2>
                    </div>
                    <span className="level-badge">{level.toUpperCase()}</span>
                </div>

                {/* Administrative Level */}
                <div className="info-section">
                    <h3>Administrative Level</h3>
                    <p className="level-indicator">
                        {level === 'country' && '🇮🇳 Country'}
                        {level === 'state' && '📍 State'}
                        {level === 'district' && '📌 District'}
                        {level === 'tehsil' && '🏘️ Tehsil'}
                        {level === 'thana' && '🚓 Thana'}
                        {level === 'village' && '🏡 Village'}
                    </p>
                </div>

                {/* Placeholder sections */}
                <div className="info-section placeholder">
                    <h3>Geography</h3>
                    <p className="coming-soon">Data loading...</p>
                </div>

                <div className="info-section placeholder">
                    <h3>Demographics</h3>
                    <p className="coming-soon">Data loading...</p>
                </div>

                <div className="info-section placeholder">
                    <h3>Economy</h3>
                    <p className="coming-soon">Data loading...</p>
                </div>

                {/* Development mode: Show current params */}
                {import.meta.env.DEV && (
                    <details className="info-section">
                        <summary>Debug: Current Route</summary>
                        <pre className="debug-info">
                            {JSON.stringify({ state, district, tehsil, village, level }, null, 2)}
                        </pre>
                    </details>
                )}
            </div>
        </div>
    )
}
