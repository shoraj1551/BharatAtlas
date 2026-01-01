/**
 * Map Style Switcher Component
 * 
 * Allows users to toggle between basic and satellite map views
 */

import { useState } from 'react'
import './MapStyleSwitcher.css'

export default function MapStyleSwitcher({ onStyleChange }) {
    const [activeStyle, setActiveStyle] = useState('basic')

    const handleStyleChange = (style) => {
        setActiveStyle(style)
        onStyleChange(style)
    }

    return (
        <div className="map-style-switcher">
            <button
                className={`style-btn ${activeStyle === 'basic' ? 'active' : ''}`}
                onClick={() => handleStyleChange('basic')}
                title="Basic Map"
            >
                🗺️ Map
            </button>
            <button
                className={`style-btn ${activeStyle === 'satellite' ? 'active' : ''}`}
                onClick={() => handleStyleChange('satellite')}
                title="Satellite View"
            >
                🛰️ Satellite
            </button>
        </div>
    )
}
