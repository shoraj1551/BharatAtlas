import React from 'react'
import './BlindSpots_v2.css'

/**
 * BlindSpots Component
 * 
 * "The Anti-Dashboard"
 * Explicitly tells the user what the digital data cannot capture.
 * Builds trust through radical honesty.
 */
export default function BlindSpots() {
    return (
        <div className="blind-spots-container">
            <div className="blind-spots-header">
                <h3>⚠️ What This Platform Cannot Tell You</h3>
                <p className="blind-subtitle">Digital data has limits. Verify these on the ground.</p>
            </div>

            <div className="blind-grid">
                <div className="blind-card">
                    <h4>🤝 Informal Power</h4>
                    <p>We verify official leadership, but we cannot map the <strong>unofficial influence</strong> of local elders, unions, or power brokers who may control market access.</p>
                </div>

                <div className="blind-card">
                    <h4>💳 Social Credit</h4>
                    <p>Lending here often relies on <strong>reputation & lineage</strong>, not CIBIL scores. Digital financial data may underrepresent true creditworthiness.</p>
                </div>

                <div className="blind-card">
                    <h4>🗣️ Hidden Costs</h4>
                    <p>Local logistics may involve <strong>unwritten fees</strong> ("facilitation costs") that no official dataset will ever capture. Ask a local shopkeeper.</p>
                </div>
            </div>
        </div>
    )
}
