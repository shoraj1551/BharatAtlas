import './Widgets.css'

export default function InsightCard({ data, title }) {
    if (!data || data.length === 0) {
        return (
            <div className="widget-container">
                <h3>{title}</h3>
                <div className="no-data">No insights generated</div>
            </div>
        )
    }

    return (
        <div className="widget-container">
            <h3>{title}</h3>
            <div className="insights-list">
                {data.map((insight, index) => (
                    <div key={index} className="insight-item">
                        <div className="insight-icon">{insight.icon || '💡'}</div>
                        <div className="insight-content">
                            <h4>{insight.title}</h4>
                            <p>{insight.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
