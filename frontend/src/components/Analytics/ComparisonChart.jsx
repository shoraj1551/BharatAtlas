import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './Widgets.css'

export default function ComparisonChart({ data, title, config }) {
    if (!data || data.length === 0) {
        return (
            <div className="widget-container">
                <h3>{title}</h3>
                <div className="no-data">No comparison data available</div>
            </div>
        )
    }

    const metrics = config.metrics || []
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe']

    return (
        <div className="widget-container">
            <h3>{title}</h3>
            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {metrics.map((metric, index) => (
                            <Bar
                                key={metric}
                                dataKey={metric}
                                name={metric.split('.').pop().replace('_', ' ')}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
