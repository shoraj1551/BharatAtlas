import { useEffect, useState } from 'react'
import './HealthPage.css'
import { getEnvironmentConfig } from '../utils/environment'
import { getScaleReadiness } from '../utils/scaleReadiness'

function HealthPage() {
    const [health, setHealth] = useState(null)

    useEffect(() => {
        // Gather health information
        const envConfig = getEnvironmentConfig()
        const scaleStatus = getScaleReadiness()

        const healthData = {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            environment: envConfig.environment,
            systems: {
                frontend: {
                    status: 'operational',
                    version: '1.0.0',
                    build: import.meta.env.MODE
                },
                dataRegistry: {
                    status: 'operational',
                    placesLoaded: true
                },
                map: {
                    status: envConfig.mapboxToken !== 'NOT CONFIGURED' ? 'operational' : 'degraded',
                    provider: 'Mapbox GL JS'
                },
                scaleReadiness: {
                    status: scaleStatus.ready ? 'ready' : 'not_ready',
                    readySystems: scaleStatus.readySystems,
                    totalSystems: scaleStatus.totalSystems,
                    percentage: scaleStatus.percentage
                }
            },
            features: {
                search: 'enabled',
                map: 'enabled',
                narratives: 'enabled',
                opportunities: 'enabled',
                adminMode: envConfig.adminMode ? 'enabled' : 'disabled'
            }
        }

        setHealth(healthData)
    }, [])

    if (!health) {
        return <div className="health-page">Loading health status...</div>
    }

    return (
        <div className="health-page">
            <div className="health-content">
                <header className="health-header">
                    <h1>System Health</h1>
                    <div className={`health-status ${health.status}`}>
                        {health.status === 'healthy' ? '✓' : '⚠'} {health.status.toUpperCase()}
                    </div>
                </header>

                <div className="health-timestamp">
                    Last checked: {new Date(health.timestamp).toLocaleString()}
                </div>

                <section className="health-section">
                    <h2>Environment</h2>
                    <div className="health-item">
                        <span className="health-label">Environment:</span>
                        <span className="health-value">{health.environment}</span>
                    </div>
                </section>

                <section className="health-section">
                    <h2>Systems</h2>
                    {Object.entries(health.systems).map(([system, data]) => (
                        <div key={system} className="health-item">
                            <span className="health-label">{system}:</span>
                            <span className={`health-value status-${data.status}`}>
                                {data.status}
                            </span>
                        </div>
                    ))}
                </section>

                <section className="health-section">
                    <h2>Features</h2>
                    {Object.entries(health.features).map(([feature, status]) => (
                        <div key={feature} className="health-item">
                            <span className="health-label">{feature}:</span>
                            <span className="health-value">{status}</span>
                        </div>
                    ))}
                </section>

                <section className="health-section">
                    <h2>Scale Readiness</h2>
                    <div className="health-item">
                        <span className="health-label">Ready Systems:</span>
                        <span className="health-value">
                            {health.systems.scaleReadiness.readySystems}/{health.systems.scaleReadiness.totalSystems}
                        </span>
                    </div>
                    <div className="health-item">
                        <span className="health-label">Readiness:</span>
                        <span className="health-value">
                            {health.systems.scaleReadiness.percentage}%
                        </span>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default HealthPage
