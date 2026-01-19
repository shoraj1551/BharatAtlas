import APIKeyManager from '../components/APIKeyManager'
import './DeveloperPage.css'

export default function DeveloperPage() {
    return (
        <div className="developer-page">
            <header className="dev-header">
                <div className="container">
                    <h1>Developer Platform</h1>
                    <p>Build the future of India with BharatAtlas Data</p>
                </div>
            </header>

            <main className="container dev-content">
                <section className="intro-section">
                    <h2>Getting Started</h2>
                    <p>
                        Welcome to the BharatAtlas Developer Platform. Here you can generate API keys,
                        monitor your usage, and access documentation for integrating BharatAtlas data
                        into your applications.
                    </p>
                    <div className="docs-link">
                        <a href="http://localhost:3001/api-docs" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                            View API Documentation
                        </a>
                    </div>
                </section>

                <section className="keys-section">
                    <APIKeyManager />
                </section>

                <section className="resources-section">
                    <h2>Resources</h2>
                    <div className="resource-grid">
                        <div className="resource-card">
                            <h3>API Reference</h3>
                            <p>Comprehensive guide to all available endpoints and data models.</p>
                        </div>
                        <div className="resource-card">
                            <h3>SDKs & Libraries</h3>
                            <p>Official helper libraries for Node.js, Python, and React.</p>
                        </div>
                        <div className="resource-card">
                            <h3>Community Support</h3>
                            <p>Join our Discord server to connect with other developers.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
