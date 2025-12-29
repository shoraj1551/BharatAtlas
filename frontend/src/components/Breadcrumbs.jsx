/**
 * Breadcrumbs Component
 * 
 * Displays hierarchical navigation path
 */

import { Link } from 'react-router-dom'
import './Breadcrumbs.css'

export default function Breadcrumbs({ state, district, tehsil, village }) {
    return (
        <nav className="breadcrumbs">
            <Link to="/map" className="breadcrumb-link">
                🇮🇳 India
            </Link>

            {state && (
                <>
                    <span className="breadcrumb-separator">›</span>
                    <Link to={`/map/state/${state}`} className="breadcrumb-link">
                        {state}
                    </Link>
                </>
            )}

            {district && (
                <>
                    <span className="breadcrumb-separator">›</span>
                    <Link to={`/map/state/${state}/district/${district}`} className="breadcrumb-link">
                        {district}
                    </Link>
                </>
            )}

            {tehsil && (
                <>
                    <span className="breadcrumb-separator">›</span>
                    <Link to={`/map/state/${state}/district/${district}/tehsil/${tehsil}`} className="breadcrumb-link">
                        {tehsil}
                    </Link>
                </>
            )}

            {village && (
                <>
                    <span className="breadcrumb-separator">›</span>
                    <span className="breadcrumb-current">{village}</span>
                </>
            )}
        </nav>
    )
}
