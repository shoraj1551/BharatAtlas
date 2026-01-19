import { useState, useEffect } from 'react'
import { getHistoricalData } from '../../services/historicalDataService'
import TimeSeriesChart from './TimeSeriesChart'
import './Timeline.css'

const METRIC_LABELS = {
    population: 'Population',
    literacy_rate: 'Literacy Rate (%)',
    sex_ratio: 'Sex Ratio (females per 1000 males)',
    urban_population: 'Urban Population',
    decadal_growth: 'Decadal Growth Rate (%)'
}

const METRIC_COLORS = {
    population: '#2196f3',
    literacy_rate: '#4caf50',
    sex_ratio: '#9c27b0',
    urban_population: '#ff9800',
    decadal_growth: '#f44336'
}

export default function TimelineView({ placeId }) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedMetric, setSelectedMetric] = useState('population')

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const response = await getHistoricalData(placeId)
                if (response.success) {
                    setData(response.data)
                    // Set default metric to first available if population not there
                    if (!response.data.population && Object.keys(response.data).length > 0) {
                        setSelectedMetric(Object.keys(response.data)[0])
                    }
                }
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (placeId) {
            fetchData()
        }
    }, [placeId])

    if (loading) return <div className="timeline-loading">Loading historical data...</div>
    if (error) return <div className="timeline-error">Error: {error}</div>
    if (!data || Object.keys(data).length === 0) return null

    const availableMetrics = Object.keys(data)

    return (
        <div className="timeline-view">
            <div className="timeline-header">
                <h3>Historical Trends</h3>
                <div className="metric-selector">
                    {availableMetrics.map(metric => (
                        <button
                            key={metric}
                            className={`metric-btn ${selectedMetric === metric ? 'active' : ''}`}
                            onClick={() => setSelectedMetric(metric)}
                            style={{
                                borderColor: selectedMetric === metric ? METRIC_COLORS[metric] || '#888' : '#ddd',
                                color: selectedMetric === metric ? METRIC_COLORS[metric] || '#333' : '#666',
                                backgroundColor: selectedMetric === metric ? `${METRIC_COLORS[metric]}10` : 'transparent'
                            }}
                        >
                            {METRIC_LABELS[metric] || metric.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            <div className="chart-container">
                <TimeSeriesChart
                    data={data[selectedMetric]}
                    metric={METRIC_LABELS[selectedMetric] || selectedMetric}
                    color={METRIC_COLORS[selectedMetric]}
                />
            </div>

            <div className="data-source-note">
                Source: Census of India (1981-2011)
            </div>
        </div>
    )
}
