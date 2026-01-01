/**
 * QuickStatsBar Component
 * 
 * Top-level stats bar showing key metrics at a glance
 */

import './QuickStatsBar.css'

export default function QuickStatsBar({ place }) {
    if (!place) return null

    const stats = [
        {
            icon: '👥',
            label: 'Population',
            value: place.population?.value?.toLocaleString() || 'N/A',
            color: '#3b82f6'
        },
        {
            icon: '📏',
            label: 'Area',
            value: place.area_sq_km ? `${place.area_sq_km.toLocaleString()} km²` : 'N/A',
            color: '#10b981'
        },
        {
            icon: '📚',
            label: 'Literacy',
            value: place.literacy_rate?.value ? `${place.literacy_rate.value}%` : 'N/A',
            color: '#8b5cf6'
        },
        {
            icon: '💰',
            label: 'GDP',
            value: place.economic_data?.gdp ? `₹${(place.economic_data.gdp / 1000).toFixed(1)}K Cr` : 'N/A',
            color: '#f59e0b'
        }
    ]

    return (
        <div className="quick-stats-bar">
            {stats.map((stat, index) => (
                <div key={index} className="stat-item" style={{ '--stat-color': stat.color }}>
                    <span className="stat-icon">{stat.icon}</span>
                    <div className="stat-content">
                        <span className="stat-label">{stat.label}</span>
                        <span className="stat-value">{stat.value}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
