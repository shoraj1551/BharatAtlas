import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './PlaceCharts.css'

/**
 * Place Charts Component
 * 
 * Interactive data visualizations for place metrics
 */

function PlaceCharts({ place }) {
    if (!place) return null

    // Prepare population data (if historical data available)
    const populationData = [
        {
            year: '2011',
            population: place.population?.value || 0,
            label: 'Census 2011'
        }
    ]

    // Prepare literacy comparison (if available)
    const literacyData = place.literacy_rate?.value ? [
        {
            category: place.canonical_name,
            rate: place.literacy_rate.value,
            national: 74.04 // India average
        }
    ] : null

    // Prepare area breakdown (if districts available)
    const hasAreaData = place.area_sq_km

    return (
        <div className="place-charts">
            <h3>Data Visualizations</h3>

            {/* Population Chart */}
            {populationData[0].population > 0 && (
                <div className="chart-container">
                    <h4>Population</h4>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={populationData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="label" />
                            <YAxis />
                            <Tooltip formatter={(value) => value.toLocaleString()} />
                            <Legend />
                            <Bar dataKey="population" fill="#2563eb" name="Population" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Literacy Rate Comparison */}
            {literacyData && (
                <div className="chart-container">
                    <h4>Literacy Rate Comparison</h4>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={literacyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip formatter={(value) => `${value}%`} />
                            <Legend />
                            <Bar dataKey="rate" fill="#10b981" name={`${place.canonical_name} Literacy`} />
                            <Bar dataKey="national" fill="#6b7280" name="National Average" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Key Metrics Summary */}
            <div className="metrics-summary">
                <h4>Key Metrics</h4>
                <div className="metrics-grid">
                    {place.population?.value && (
                        <div className="metric-card">
                            <div className="metric-value">{place.population.value.toLocaleString()}</div>
                            <div className="metric-label">Population</div>
                        </div>
                    )}
                    {place.area_sq_km && (
                        <div className="metric-card">
                            <div className="metric-value">{place.area_sq_km.toLocaleString()}</div>
                            <div className="metric-label">Area (km²)</div>
                        </div>
                    )}
                    {place.population?.value && place.area_sq_km && (
                        <div className="metric-card">
                            <div className="metric-value">
                                {Math.round(place.population.value / place.area_sq_km).toLocaleString()}
                            </div>
                            <div className="metric-label">Density (per km²)</div>
                        </div>
                    )}
                    {place.literacy_rate?.value && (
                        <div className="metric-card">
                            <div className="metric-value">{place.literacy_rate.value}%</div>
                            <div className="metric-label">Literacy Rate</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PlaceCharts
