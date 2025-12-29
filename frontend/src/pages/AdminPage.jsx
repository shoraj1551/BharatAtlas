import { Navigate } from 'react-router-dom'
import { isAdminMode, getAdminStatus } from '../utils/adminMode'
import './AdminPage.css'

function AdminPage() {
    // Redirect if admin mode is not enabled
    if (!isAdminMode()) {
        return <Navigate to="/explore" replace />
    }

    const adminStatus = getAdminStatus()

    return (
        <div className="admin-page">
            <div className="admin-content">
                <header className="admin-header">
                    <h1 className="admin-title">Admin Panel</h1>
                    <div className="admin-badge">ADMIN MODE</div>
                </header>

                <div className="admin-warning">
                    <strong>⚠️ Warning:</strong> Admin mode is enabled. This panel provides curation and governance tools.
                </div>

                <div className="admin-sections">
                    <section className="admin-section">
                        <h2>System Status</h2>
                        <div className="status-grid">
                            <div className="status-item">
                                <span className="status-label">Admin Mode:</span>
                                <span className="status-value">{adminStatus.adminMode ? '✓ Enabled' : '✗ Disabled'}</span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">Environment:</span>
                                <span className="status-value">{adminStatus.development ? 'Development' : 'Production'}</span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">Timestamp:</span>
                                <span className="status-value">{new Date(adminStatus.timestamp).toLocaleString()}</span>
                            </div>
                        </div>
                    </section>

                    <section className="admin-section">
                        <h2>Available Features</h2>
                        <div className="features-grid">
                            {Object.entries(adminStatus.features).map(([feature, enabled]) => (
                                <div key={feature} className={`feature-item ${enabled ? 'enabled' : 'disabled'}`}>
                                    <span className="feature-icon">{enabled ? '✓' : '✗'}</span>
                                    <span className="feature-name">{feature.replace(/([A-Z])/g, ' $1').trim()}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="admin-section">
                        <h2>Curation Tools</h2>
                        <p className="section-note">Curation tools will be available here for:</p>
                        <ul className="tools-list">
                            <li>Manual narrative verification</li>
                            <li>Opportunity review and approval</li>
                            <li>Source management</li>
                            <li>Data quality oversight</li>
                            <li>Audit log inspection</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default AdminPage
