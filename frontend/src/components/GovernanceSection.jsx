/**
 * GovernanceSection - Civic Intelligence Layer
 * 
 * Maps public administration, elected representatives, and civic infrastructure.
 * "Bureau" Design Standard.
 */

import React from 'react'
import DataFreshnessLabel from './DataFreshnessLabel' // NEW
import './GovernanceSection_v2.css'

export default function GovernanceSection({ place }) {
    if (!place || !place.governance) return null

    const {
        administration,
        representatives,
        public_offices,
        last_updated,
        data_source
    } = place.governance

    // Format helpers
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        return new Date(dateString).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
    }

    return (
        <div className="governance-section">
            <header className="gov-header">
                <div>
                    <h2 className="section-title">🏛️ Governance Intelligence</h2>
                    <p className="gov-subtitle">Civic Administration & Representation</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    {last_updated && <DataFreshnessLabel date={last_updated} type="GOVERNANCE" />}
                    {data_source && (
                        <div className="gov-source-badge">
                            <span>Source: {data_source}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* 1. ADMINISTRATION (The Executive) */}
            {administration && (
                <section className="gov-group">
                    <h3 className="group-title">Executive Administration</h3>
                    <div className="gov-grid">
                        {administration.district_magistrate && (
                            <div className="gov-card">
                                <div className="card-role">District Magistrate</div>
                                <div className="card-name">{administration.district_magistrate.name}</div>
                                <div className="card-details">
                                    <p>📍 {administration.district_magistrate.office_address}</p>
                                    <p>📞 {administration.district_magistrate.contact}</p>
                                </div>
                            </div>
                        )}
                        {administration.police_superintendent && (
                            <div className="gov-card">
                                <div className="card-role">Superintendent of Police</div>
                                <div className="card-name">{administration.police_superintendent.name}</div>
                                <div className="card-details">
                                    <p>📍 {administration.police_superintendent.office_address}</p>
                                    <p>📞 {administration.police_superintendent.contact}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* 2. REPRESENTATIVES (The Legislative) */}
            {representatives && (
                <section className="gov-group">
                    <h3 className="group-title">Elected Representatives</h3>
                    <div className="gov-grid">
                        {representatives.mp && (
                            <div className="gov-card rep-card">
                                <div className="card-badge">Member of Parliament</div>
                                <div className="card-name">{representatives.mp.name}</div>
                                <div className="rep-meta">
                                    <span className="party-tag">{representatives.mp.party}</span>
                                    <span className="const-name">{representatives.mp.constituency}</span>
                                </div>
                                <div className="term-info">Term ends: {formatDate(representatives.mp.term_end)}</div>
                            </div>
                        )}
                        {representatives.mla && (
                            <div className="gov-card rep-card">
                                <div className="card-badge">Member of Legislative Assembly</div>
                                <div className="card-name">{representatives.mla.name}</div>
                                <div className="rep-meta">
                                    <span className="party-tag">{representatives.mla.party}</span>
                                    <span className="const-name">{representatives.mla.constituency}</span>
                                </div>
                                <div className="term-info">Term ends: {formatDate(representatives.mla.term_end)}</div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* 3. PUBLIC OFFICES (Civic Infrastructure) */}
            {public_offices && public_offices.length > 0 && (
                <section className="gov-group">
                    <h3 className="group-title">Public Offices Directory</h3>
                    <div className="offices-list">
                        {public_offices.map((office, idx) => (
                            <div key={idx} className="office-row">
                                <div className="office-icon">
                                    {office.type === 'police' ? '👮' :
                                        office.type === 'judiciary' ? '⚖️' :
                                            office.type === 'medical' ? '🏥' : '🏢'}
                                </div>
                                <div className="office-info">
                                    <div className="office-name">{office.name}</div>
                                    <div className="office-address">{office.address}</div>
                                </div>
                                <button className="navigate-btn" title="View location">↗</button>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 4. LOCAL PROCESSES (The "How-To") */}
            {place.governance.local_processes && place.governance.local_processes.length > 0 && (
                <section className="gov-group">
                    <h3 className="group-title">📋 Key Compliance & Approvals</h3>
                    <div className="process-grid">
                        {place.governance.local_processes.map((proc, idx) => (
                            <div key={idx} className="process-card">
                                <div className="proc-header">
                                    <span className="proc-name">{proc.name}</span>
                                    <span className={`risk-badge risk-${proc.risk_level.toLowerCase()}`}>
                                        {proc.risk_level} Risk
                                    </span>
                                </div>
                                <div className="proc-body">
                                    <div className="proc-office">🏛️ {proc.responsible_office} ({proc.level})</div>
                                    <div className="proc-sla">⏱️ ~{proc.approval_timeline_days} Days</div>
                                    {proc.verification_required && (
                                        <div className="proc-check">⚠️ Phys. Verification</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Fallback for Pre-Migration Data */}
            {!administration && !representatives && place.governance.administrative_head && (
                <div className="legacy-gov-data">
                    <p><strong>Head:</strong> {place.governance.administrative_head}</p>
                    <p className="legacy-note">Detailed governance data migrating...</p>
                </div>
            )}
        </div>
    )
}
