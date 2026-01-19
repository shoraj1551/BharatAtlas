import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function TimeSeriesChart({ data, metric, color = '#8884d8' }) {
    if (!data || data.length === 0) {
        return <div className="no-data">No historical data available for this metric</div>
    }

    // Format data for Recharts
    // data is expected to be array of { year, value, source }
    const chartData = data.map(item => ({
        year: item.year.toString(),
        value: item.value,
        source: item.source
    }))

    const formatYAxis = (value) => {
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
        if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
        return value
    }

    return (
        <div className="timeseries-chart" style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={formatYAxis} />
                    <Tooltip
                        formatter={(value) => [new Intl.NumberFormat('en-IN').format(value), metric]}
                        labelStyle={{ color: '#333' }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="value"
                        name={metric.replace('_', ' ')}
                        stroke={color}
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
