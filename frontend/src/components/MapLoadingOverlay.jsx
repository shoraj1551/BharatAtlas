import './MapLoadingOverlay.css'

/**
 * MapLoadingOverlay Component
 * 
 * Displays a loading overlay while map is initializing
 */
function MapLoadingOverlay({ message = 'Loading map...' }) {
    return (
        <div className="map-loading-overlay">
            <div className="map-loading-content">
                <div className="map-loading-spinner"></div>
                <p className="map-loading-message">{message}</p>
            </div>
        </div>
    )
}

export default MapLoadingOverlay
