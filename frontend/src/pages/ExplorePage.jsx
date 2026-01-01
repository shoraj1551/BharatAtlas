import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './ExplorePage.css'
import placeService from '../services/placeService'
import RecentPlaces from '../components/RecentPlaces'
import Skeleton from '../components/ui/Skeleton'

/**
 * ExplorePage - The "Intelligence Dashboard"
 * Aggregates state data, provides high-level metrics, and drill-down capabilities.
 */
function ExplorePage() {
    const [states, setStates] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        placeService.getAllStates()
            .then(data => {
                // Sort by name for now, but in a real dashboard we might sort by risk/pop
                const sorted = data.sort((a, b) => a.canonical_name.localeCompare(b.canonical_name))
                setStates(sorted)
                setLoading(false)
            })
            .catch(err => {
                console.error("Dashboard data load failed:", err)
                setLoading(false)
            })
    }, [])

    // --- Analytics: Compute aggregate metrics (Staff requirement: Data Density) ---
    const metrics = useMemo(() => {
        if (!states.length) return null

        const totalStates = states.filter(s => s.place_type === 'state').length
        const totalUTs = states.filter(s => s.place_type === 'union territory').length

        // Find max population for viz bars scaling
        const maxPop = Math.max(...states.map(s => s.population?.value || 0))
        const totalPop = states.reduce((acc, s) => acc + (s.population?.value || 0), 0)

        return { totalStates, totalUTs, maxPop, totalPop }
    }, [states])

    // --- Loading State (Optimistic UI) ---
    if (loading) {
        return (
            <div className="explore-page">
                <div className="dashboard-container">
                    {/* Hero Skeleton */}
                    <div style={{ marginBottom: '3rem' }}>
                        <Skeleton width="50%" height="3rem" variant="text" />
                        <Skeleton width="30%" height="1.5rem" variant="text" />
                    </div>
                    {/* Grid Skeleton */}
                    <div className="states-grid">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <Skeleton key={i} height="180px" variant="rectangular" className="state-card" />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="explore-page">
            <div className="dashboard-container">

                {/* 1. HERO SECTION */}
                <header className="dashboard-hero">
                    <h1 className="hero-title">National Intelligence Grid</h1>
                    <p className="hero-subtitle">Comprehensive data coverage of {metrics?.totalStates} States & {metrics?.totalUTs} Union Territories.</p>
                </header>

                {/* 2. ANALYTICS RIBBON */}
                <section className="metrics-ribbon">
                    <div className="metric-card">
                        <div className="metric-label">Registered States</div>
                        <div className="metric-value">{metrics?.totalStates}</div>
                    </div>
                    <div className="metric-card accent-warn">
                        <div className="metric-label">Union Territories</div>
                        <div className="metric-value">{metrics?.totalUTs}</div>
                    </div>
                    <div className="metric-card accent-good">
                        <div className="metric-label">Est. Population</div>
                        <div className="metric-value">{(metrics?.totalPop / 10000000).toFixed(1)} Cr</div>
                    </div>
                </section>

                {/* 3. RECENT ACTIVITY */}
                <RecentPlaces />

                {/* 4. MAIN GRID */}
                <div className="states-grid">
                    {states.map(state => {
                        // Calculate relative population percentage for the bar
                        const popRaw = state.population?.value || 0
                        const popPercent = metrics?.maxPop ? (popRaw / metrics.maxPop) * 100 : 0

                        return (
                            <Link
                                key={state.place_id}
                                to={`/place/${state.place_id}`}
                                className="state-card"
                            >
                                <div className="card-header-row">
                                    <h3 className="state-name">{state.canonical_name}</h3>
                                    <span className="state-type-badge">
                                        {state.place_type === 'union territory' ? 'UT' : 'State'}
                                    </span>
                                </div>

                                <div className="population-viz">
                                    <div className="viz-header">
                                        <span>Population</span>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                                            {popRaw ? (popRaw / 1000000).toFixed(2) + ' M' : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="viz-bar-track">
                                        <div
                                            className="viz-bar-fill"
                                            style={{ width: `${popPercent}%` }}
                                        />
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ExplorePage
