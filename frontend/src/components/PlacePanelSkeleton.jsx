import './PlacePanelSkeleton.css'

function PlacePanelSkeleton() {
    return (
        <div className="place-panel">
            <div className="panel-header">
                <div className="skeleton skeleton-hierarchy"></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-type"></div>
            </div>
            <div className="panel-content">
                <div className="place-section">
                    <div className="skeleton skeleton-section-title"></div>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text short"></div>
                </div>

                <div className="place-section">
                    <div className="skeleton skeleton-section-title"></div>
                    <div className="fact-grid">
                        <div className="skeleton skeleton-fact"></div>
                        <div className="skeleton skeleton-fact"></div>
                        <div className="skeleton skeleton-fact"></div>
                        <div className="skeleton skeleton-fact"></div>
                    </div>
                </div>

                <div className="place-section">
                    <div className="skeleton skeleton-section-title"></div>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text short"></div>
                </div>
            </div>
        </div>
    )
}

export default PlacePanelSkeleton
