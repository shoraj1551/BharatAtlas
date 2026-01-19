import { useState } from 'react'
import { exportPlaces } from '../services/exportService'
import './ExportMenu.css'

export default function ExportMenu({ placeIds, label = "Export" }) {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleExport = async (format) => {
        try {
            setLoading(true)
            setIsOpen(false)
            await exportPlaces(placeIds, format)
        } catch (error) {
            console.error('Export failed', error)
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="export-menu-container">
            <button
                className="export-trigger-btn"
                onClick={() => setIsOpen(!isOpen)}
                disabled={loading}
            >
                {loading ? 'Exporting...' : label} ▼
            </button>

            {isOpen && (
                <div className="export-dropdown">
                    <button onClick={() => handleExport('json')}>
                        Export as JSON
                    </button>
                    <button onClick={() => handleExport('csv')}>
                        Export as CSV
                    </button>
                </div>
            )}
        </div>
    )
}
