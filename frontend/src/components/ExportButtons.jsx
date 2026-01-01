import { exportComparisonToCSV, exportComparisonToJSON } from '../services/exportService'
import './ExportButtons.css'

/**
 * Export Buttons Component
 * 
 * Provides export functionality for comparison data
 */
function ExportButtons({ comparisonData, places, variant = 'default' }) {
    if (!comparisonData || !places || places.length === 0) {
        return null
    }

    const handleExportCSV = () => {
        try {
            exportComparisonToCSV(comparisonData, places)
        } catch (error) {
            console.error('Export to CSV failed:', error)
            alert('Failed to export to CSV. Please try again.')
        }
    }

    const handleExportJSON = () => {
        try {
            exportComparisonToJSON(comparisonData, places)
        } catch (error) {
            console.error('Export to JSON failed:', error)
            alert('Failed to export to JSON. Please try again.')
        }
    }

    return (
        <div className={`export-buttons ${variant}`}>
            <button
                onClick={handleExportCSV}
                className="export-btn export-csv"
                aria-label="Export comparison as CSV"
            >
                <span className="export-icon">📊</span>
                <span className="export-text">Export CSV</span>
            </button>
            <button
                onClick={handleExportJSON}
                className="export-btn export-json"
                aria-label="Export comparison as JSON"
            >
                <span className="export-icon">📄</span>
                <span className="export-text">Export JSON</span>
            </button>
        </div>
    )
}

export default ExportButtons
