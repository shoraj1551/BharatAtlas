import './App.css'
import Map from './components/Map'

function App() {
  return (
    <div className="app">
      <header className="identity-header">
        <div className="header-content">
          <div className="identity">
            <h1 className="platform-name">BharatAtlas</h1>
            <p className="platform-purpose">Digital Intelligence for India</p>
          </div>
          <div className="system-info">
            <span className="status-indicator">●</span>
            <span className="status-text">Operational</span>
          </div>
        </div>
      </header>

      <Map />
    </div>
  )
}

export default App
