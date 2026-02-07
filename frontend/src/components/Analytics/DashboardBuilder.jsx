import { useState, useEffect } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import TrendChart from './TrendChart'
import ComparisonChart from './ComparisonChart'
import InsightCard from './InsightCard'
import { getTrends, getComparisons, getInsights } from '../../services/analyticsService'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './DashboardBuilder.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

// AVAILABLE WIDGET TYPES
const WIDGET_TYPES = [
    { type: 'trend_chart', name: 'Trend Chart', defaultW: 6, defaultH: 4 },
    { type: 'comparison', name: 'Comparison', defaultW: 6, defaultH: 4 },
    { type: 'insight_card', name: 'Insights', defaultW: 4, defaultH: 6 }
]

export default function DashboardBuilder({
    initialLayout = [],
    onSave,
    isEditable = false
}) {
    const [layout, setLayout] = useState(initialLayout)
    const [dataCache, setDataCache] = useState({})

    // Transform saved layout to RGL layout
    const rglLayout = layout.map(item => ({
        i: item.widget_id,
        x: item.position.x,
        y: item.position.y,
        w: item.position.w,
        h: item.position.h
    }))

    const [currentBreakpoints, setCurrentBreakpoints] = useState('lg')

    // Load data for widgets
    useEffect(() => {
        layout.forEach(widget => {
            fetchWidgetData(widget)
        })
    }, [layout])

    const fetchWidgetData = async (widget) => {
        if (dataCache[widget.widget_id]) return

        try {
            let data
            if (widget.widget_type === 'trend_chart') {
                const res = await getTrends(widget.config.metric)
                data = res.data
            } else if (widget.widget_type === 'comparison') {
                const res = await getComparisons(widget.config.placeIds, widget.config.metrics)
                data = res.data
            } else if (widget.widget_type === 'insight_card') {
                const res = await getInsights(widget.config.placeIds?.[0])
                data = res.data
            }

            setDataCache(prev => ({ ...prev, [widget.widget_id]: data }))
        } catch (error) {
            console.error(`Error loading data for widget ${widget.widget_id}`, error)
        }
    }

    const handleLayoutChange = (newLayout) => {
        // Sync RGL layout changes back to our layout state
        const updatedLayout = layout.map(widget => {
            const match = newLayout.find(l => l.i === widget.widget_id)
            if (match) {
                return {
                    ...widget,
                    position: { x: match.x, y: match.y, w: match.w, h: match.h }
                }
            }
            return widget
        })
        setLayout(updatedLayout)
    }

    const addWidget = (type) => {
        const template = WIDGET_TYPES.find(t => t.type === type)
        const newWidget = {
            widget_id: `widget_${Date.now()}`,
            widget_type: type,
            position: { x: 0, y: Infinity, w: template.defaultW, h: template.defaultH },
            config: generateDefaultConfig(type)
        }
        setLayout([...layout, newWidget])
    }

    const removeWidget = (id) => {
        setLayout(layout.filter(w => w.widget_id !== id))
    }

    const generateDefaultConfig = (type) => {
        switch (type) {
            case 'trend_chart': return { metric: 'population', title: 'Population Trends' }
            case 'comparison': return { placeIds: [], metrics: ['population', 'literacy_rate'], title: 'Place Comparison' }
            case 'insight_card': return { placeIds: [], title: 'Key Insights' }
            default: return {}
        }
    }

    const renderWidget = (widget) => {
        const data = dataCache[widget.widget_id]

        let Content
        switch (widget.widget_type) {
            case 'trend_chart': Content = TrendChart; break;
            case 'comparison': Content = ComparisonChart; break;
            case 'insight_card': Content = InsightCard; break;
            default: Content = () => <div>Unknown Widget</div>
        }

        return (
            <div key={widget.widget_id} className="grid-item">
                {isEditable && (
                    <button
                        className="remove-widget-btn"
                        onClick={() => removeWidget(widget.widget_id)}
                    >
                        ×
                    </button>
                )}
                <Content
                    data={data}
                    title={widget.config.title}
                    config={widget.config}
                />
            </div>
        )
    }

    return (
        <div className="dashboard-builder">
            {isEditable && (
                <div className="toolbar">
                    <div className="widget-palette">
                        {WIDGET_TYPES.map(t => (
                            <button
                                key={t.type}
                                onClick={() => addWidget(t.type)}
                                className="add-widget-btn"
                            >
                                + {t.name}
                            </button>
                        ))}
                    </div>
                    <button className="save-btn" onClick={() => onSave(layout)}>
                        Save Dashboard
                    </button>
                </div>
            )}

            <ResponsiveGridLayout
                className="layout"
                layouts={{ lg: rglLayout }}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={30}
                onLayoutChange={handleLayoutChange}
                isDraggable={isEditable}
                isResizable={isEditable}
            >
                {layout.map(widget => renderWidget(widget))}
            </ResponsiveGridLayout>
        </div>
    )
}
