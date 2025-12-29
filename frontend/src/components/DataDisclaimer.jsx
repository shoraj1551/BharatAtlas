/**
 * DataDisclaimer Component
 * 
 * Legal disclaimer for map boundaries
 * Required until official Survey of India data is obtained
 */

import './DataDisclaimer.css'

export default function DataDisclaimer() {
    return (
        <div className="data-disclaimer">
            <div className="disclaimer-content">
                <span className="disclaimer-icon">⚠️</span>
                <p className="disclaimer-text">
                    <strong>Disclaimer:</strong> Map boundaries are for reference only and not authenticated by Survey of India.
                    For official boundaries, refer to Survey of India maps.
                    Boundaries shown are indicative and may not reflect current administrative divisions.
                </p>
            </div>
        </div>
    )
}
