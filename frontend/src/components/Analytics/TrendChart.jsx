import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './Widgets.css'

export default function TrendChart({ data, title, config }) {
    if (!data || data.length === 0) {
        return (
            <div className="widget-container">
                <h3>{title}</h3>
                <div className="no-data">No trend data available</div>
            </div>
        )
    }

    const chartType = config.chartType || 'line'
    const color = config.color || '#2196f3'
    const metricName = config.metricName || 'Value'

    return (
        <div className="widget-container">
            <h3>{title}</h3>
            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'line' ? (
                        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="avgValue" name={metricName} stroke={color} />
                        </LineChart>
                    ) : (
                        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="avgValue" name={metricName} fill={color} />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    )
}
