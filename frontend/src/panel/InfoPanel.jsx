/**
 * InfoPanel Component - Side Information Panel
 * 
 * Displays information about selected place
 * Consumes selection state from Zustand store (no prop drilling)
 */

import { useSelectionStore } from '../store/selectionStore'
import './InfoPanel.css'

export default function InfoPanel() {
    const { selectedLevel, selectedFeature } = useSelectionStore()

    // Empty state - no selection
    if (!selectedFeature) {
        return (
            <div className="info-panel">
                <div className="panel-empty">
                    <div className="empty-icon">🗺️</div>
                    <h3>Select a Place</h3>
                    <p>Click on any state or district on the map to view detailed information</p>
                </div>
            </div>
        )
    }

    // Get place name based on level
    const placeName = selectedLevel === 'state'
        ? (selectedFeature.ST_NM || selectedFeature.st_nm)
        : (selectedFeature.DIST_NM || selectedFeature.district)

    return (
        <div className="info-panel">
            <div className="panel-header">
                <h2 className="place-name">{placeName}</h2>
                <span className="admin-badge">{selectedLevel.toUpperCase()}</span>
            </div>

            <div className="panel-content">
                {/* Admin Level Indicator */}
                <div className="info-section">
                    <h3>Administrative Level</h3>
                    <p className="level-indicator">
                        {selectedLevel === 'state' && '📍 State'}
                        {selectedLevel === 'district' && '📌 District'}
                        {selectedLevel === 'tehsil' && '🏘️ Tehsil'}
                        {selectedLevel === 'village' && '🏡 Village'}
                    </p>
                </div>

                {/* State Code (if available) */}
                {selectedFeature.ST_CODE && (
                    <div className="info-section">
                        <h3>State Code</h3>
                        <p>{selectedFeature.ST_CODE}</p>
                    </div>
                )}

                {/* District Code (if available) */}
                {selectedFeature.dt_code && (
                    <div className="info-section">
                        <h3>District Code</h3>
                        <p>{selectedFeature.dt_code}</p>
                    </div>
                )}

                {/* Raw Properties (for debugging) */}
                {import.meta.env.DEV && (
                    <details className="info-section">
                        <summary>Debug: Raw Properties</summary>
                        <pre className="properties-debug">
                            {JSON.stringify(selectedFeature, null, 2)}
                        </pre>
                    </details>
                )}

                {/* Placeholder sections for future data */}
                <div className="info-section placeholder">
                    <h3>Geography</h3>
                    <p className="coming-soon">Coming soon...</p>
                </div>

                <div className="info-section placeholder">
                    <h3>Demographics</h3>
                    <p className="coming-soon">Coming soon...</p>
                </div>

                <div className="info-section placeholder">
                    <h3>Economy</h3>
                    <p className="coming-soon">Coming soon...</p>
                </div>
            </div>
        </div>
    )
}
