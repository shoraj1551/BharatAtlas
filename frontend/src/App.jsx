import './App.css'

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

      <main>
        <section>
          <h2>System Initialized</h2>
          <p>React + Vite application is running.</p>
        </section>

        <section className="info">
          <h3>Environment</h3>
          <ul>
            <li>Mode: {import.meta.env.MODE}</li>
            <li>Base URL: {import.meta.env.BASE_URL}</li>
          </ul>
        </section>
      </main>

      <footer>
        <p>BharatAtlas © 2025</p>
      </footer>
    </div>
  )
}

export default App
