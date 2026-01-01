/**
 * Level Indicator Component
 * 
 * Shows current administrative level and feature count
 */

import { useParams } from 'react-router-dom'
import { useSelectionStore } from '../store/selectionStore'
import './LevelIndicator.css'

export default function LevelIndicator() {
    const { state, district, tehsil } = useParams()
    const { selectedLevel, selectionPath, canGoBack, goBack } = useSelectionStore()

    // Determine current level
    const getCurrentLevel = () => {
        if (tehsil) return { level: 'Tehsil', icon: '🏘️', name: tehsil }
        if (district) return { level: 'District', icon: '📌', name: district }
        if (state) return { level: 'State', icon: '🗺️', name: state }
        return { level: 'India', icon: '🇮🇳', name: 'India' }
    }

    const current = getCurrentLevel()

    return (
        <div className="level-indicator">
            <div className="level-header">
                <span className="level-icon">{current.icon}</span>
                <div className="level-info">
                    <span className="level-type">{current.level}</span>
                    <span className="level-name">{current.name}</span>
                </div>
            </div>

            {/* Hierarchy Path */}
            <div className="level-path">
                {selectionPath.state && (
                    <>
                        <span className="path-item">🗺️ {selectionPath.state}</span>
                        {selectionPath.district && (
                            <>
                                <span className="path-separator">→</span>
                                <span className="path-item">📌 {selectionPath.district}</span>
                            </>
                        )}
                        {selectionPath.tehsil && (
                            <>
                                <span className="path-separator">→</span>
                                <span className="path-item">🏘️ {selectionPath.tehsil}</span>
                            </>
                        )}
                    </>
                )}
            </div>

            {/* Back Button */}
            {canGoBack() && (
                <button className="back-button" onClick={goBack}>
                    ← Back
                </button>
            )}
        </div>
    )
}
