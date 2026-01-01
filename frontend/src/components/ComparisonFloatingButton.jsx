import { useComparisonStore } from '../store/comparisonStore'
import { Link } from 'react-router-dom'
import './ComparisonFloatingButton.css'

/**
 * Floating Comparison Button
 * 
 * Shows selected places count and navigates to comparison page
 */
function ComparisonFloatingButton() {
    const { selectedPlaces, comparisonMode } = useComparisonStore()

    if (!comparisonMode || selectedPlaces.length === 0) {
        return null
    }

    return (
        <Link to="/compare" className="comparison-floating-btn" aria-label="View comparison">
            <div className="floating-btn-content">
                <span className="floating-btn-icon">⚖️</span>
                <div className="floating-btn-text">
                    <span className="floating-btn-label">Compare</span>
                    <span className="floating-btn-count">{selectedPlaces.length} places</span>
                </div>
            </div>
        </Link>
    )
}

export default ComparisonFloatingButton
