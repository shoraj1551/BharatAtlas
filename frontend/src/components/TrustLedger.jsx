/**
 * TrustLedger Component
 * 
 * " The Security Log"
 * Displays the immutable history of a place's data.
 */

import React, { useEffect, useState } from 'react'
import './TrustLedger.css'

export default function TrustLedger({ placeId, onClose }) {
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:3001/api/places/${placeId}/history`)
            .then(res => res.json())
            .then(res => {
                if (res.success) setHistory(res.data)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [placeId])

    return (
        <div className="trust-ledger-overlay" onClick={onClose}>
            <div className="trust-ledger-modal" onClick={e => e.stopPropagation()}>
                <header className="ledger-header">
                    <div>
                        <h3>🛡️ Data Integrity Ledger</h3>
                        <p>Immutable record of all updates.</p>
                    </div>
                    <button className="close-btn" onClick={onClose}>×</button>
                </header>

                <div className="ledger-body">
                    {loading ? (
                        <div className="ledger-loading">Loading audit logs...</div>
                    ) : history.length === 0 ? (
                        <div className="ledger-empty">
                            No history recorded yet. Accessing initial import.
                        </div>
                    ) : (
                        <div className="timeline">
                            {history.map(entry => (
                                <div key={entry._id} className="timeline-item">
                                    <div className="t-icon">
                                        {entry.action === 'create' ? '🌱' :
                                            entry.action === 'verify' ? '✅' : '✏️'}
                                    </div>
                                    <div className="t-content">
                                        <div className="t-meta">
                                            <span className="t-date">
                                                {new Date(entry.timestamp).toLocaleDateString()}
                                            </span>
                                            <span className={`t-badge ${entry.actor.role}`}>
                                                {entry.actor.role}
                                            </span>
                                        </div>
                                        <div className="t-desc">
                                            <strong>{entry.actor.name}</strong>
                                            {entry.action === 'create' ? ' created this profile.' :
                                                entry.action === 'verify' ? ' verified existing data.' :
                                                    ' updated information.'}
                                        </div>
                                        {entry.changes && entry.changes.length > 0 && (
                                            <div className="t-changes">
                                                {entry.changes.map((c, i) => (
                                                    <div key={i}>
                                                        Changed <code>{c.field}</code>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {entry.metadata?.source_citation && (
                                            <div className="t-source">
                                                Source: {entry.metadata.source_citation}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
