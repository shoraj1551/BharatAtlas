import { useState, useEffect } from 'react'
import DashboardBuilder from '../components/Analytics/DashboardBuilder'
import { getDashboards, createDashboard, updateDashboard } from '../services/analyticsService'
import useAuthStore from '../store/authStore'
import './AnalyticsDashboard.css'

export default function AnalyticsDashboard() {
    const { user } = useAuthStore()
    const [dashboards, setDashboards] = useState([])
    const [currentDashboard, setCurrentDashboard] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadDashboards()
    }, [])

    const loadDashboards = async () => {
        try {
            const res = await getDashboards()
            setDashboards(res.data)
            if (res.data.length > 0) {
                setCurrentDashboard(res.data[0])
            }
        } catch (error) {
            console.error('Error loading dashboards:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateNew = async () => {
        const name = prompt('Enter dashboard name:')
        if (!name) return

        try {
            const res = await createDashboard({
                name,
                description: 'New custom dashboard',
                layout: []
            })
            setDashboards([...dashboards, res.data])
            setCurrentDashboard(res.data)
            setIsEditing(true)
        } catch (error) {
            alert('Failed to create dashboard')
        }
    }

    const handleSave = async (layout) => {
        if (!currentDashboard) return

        try {
            const res = await updateDashboard(currentDashboard._id, {
                ...currentDashboard,
                layout
            })

            // Update local state
            const updated = res.data
            setDashboards(dashboards.map(d => d._id === updated._id ? updated : d))
            setCurrentDashboard(updated)
            setIsEditing(false)
            alert('Dashboard saved!')
        } catch (error) {
            alert('Failed to save dashboard')
        }
    }

    if (loading) return <div className="loading">Loading analytics...</div>

    return (
        <div className="analytics-page">
            <div className="analytics-header">
                <div className="dashboard-selector">
                    <h2>Analytics Dashboard</h2>
                    <select
                        value={currentDashboard?._id || ''}
                        onChange={(e) => {
                            const dash = dashboards.find(d => d._id === e.target.value)
                            setCurrentDashboard(dash)
                            setIsEditing(false)
                        }}
                        disabled={isEditing}
                    >
                        {dashboards.map(d => (
                            <option key={d._id} value={d._id}>{d.name}</option>
                        ))}
                    </select>
                    <button className="new-dashboard-btn" onClick={handleCreateNew}>
                        + New
                    </button>
                </div>

                <div className="dashboard-actions">
                    {currentDashboard && !isEditing && (
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>
                            Edit Layout
                        </button>
                    )}
                    {isEditing && (
                        <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {currentDashboard ? (
                <DashboardBuilder
                    key={currentDashboard._id} // Force re-render on switch
                    initialLayout={currentDashboard.layout}
                    onSave={handleSave}
                    isEditable={isEditing}
                />
            ) : (
                <div className="empty-state">
                    <p>You haven't created any dashboards yet.</p>
                    <button onClick={handleCreateNew}>Create your first dashboard</button>
                </div>
            )}
        </div>
    )
}
