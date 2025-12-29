/**
 * MapPage Component (Updated for Progressive Navigation)
 * 
 * Main page integrating MapContainer and SidePanel
 */

import MapContainer from '../map/MapContainer'
import SidePanel from '../panel/SidePanel'
import './MapPage.css'

export default function MapPage() {
    return (
        <div className="map-page">
            <MapContainer />
            <SidePanel />
        </div>
    )
}
