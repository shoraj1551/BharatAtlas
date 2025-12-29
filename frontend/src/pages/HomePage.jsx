import './HomePage.css'
import Map from '../components/Map'
import PlacePanel from '../components/PlacePanel'

function HomePage() {
    return (
        <div className="home-page">
            <div className="main-layout">
                <Map />
                <PlacePanel />
            </div>
        </div>
    )
}

export default HomePage
