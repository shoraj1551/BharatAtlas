import React, { useState } from 'react'
import './FieldVerificationMode_v2.css'

export default function FieldVerificationMode({ place, onClose }) {
    const [checklist, setChecklist] = useState([
        { id: 1, category: 'Utilities', task: 'Check water pressure at 2 PM', checked: false },
        { id: 2, category: 'Utilities', task: 'Check water pressure at 8 PM', checked: false },
        { id: 3, category: 'Connectivity', task: 'Verify 4G/5G internet speed indoors', checked: false },
        { id: 4, category: 'Connectivity', task: 'Check mobile signal strength in basement/ground floor', checked: false },
        { id: 5, category: 'Market', task: 'Talk to 3 local shopkeepers about "Hafta" (unofficial taxes)', checked: false },
        { id: 6, category: 'Market', task: 'Ask about frequency of unannounced official inspections', checked: false },
        { id: 7, category: 'Logistics', task: 'Verify heavy vehicle entry restrictions timings', checked: false },
        { id: 8, category: 'Safety', task: 'Visit area at 9 PM to gauge street safety', checked: false }
    ])

    const toggleCheck = (id) => {
        setChecklist(checklist.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ))
    }

    const progress = Math.round((checklist.filter(c => c.checked).length / checklist.length) * 100)

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="field-verification-overlay">
            <div className="field-verification-modal">
                <header className="fv-header">
                    <div className="fv-title-group">
                        <h2>🕵️‍♂️ Field Verification Mode</h2>
                        <span className="fv-subtitle">"Trust but Verify" &mdash; On-Ground Checklist for {place.canonical_name}</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </header>

                <div className="fv-body">
                    <div className="fv-context">
                        <p><strong>Why do this?</strong> Digital data in India is often incomplete. To build a resilient business, you must verify critical infrastructure and social realities personally.</p>
                        <div className="fv-progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                            <span className="progress-text">{progress}% Verified</span>
                        </div>
                    </div>

                    <div className="fv-list">
                        {['Utilities', 'Connectivity', 'Market', 'Logistics', 'Safety'].map(category => {
                            const items = checklist.filter(c => c.category === category)
                            if (items.length === 0) return null
                            return (
                                <div key={category} className="fv-category-group">
                                    <h4>{category}</h4>
                                    {items.map(item => (
                                        <label key={item.id} className={`fv-item ${item.checked ? 'checked' : ''}`}>
                                            <input
                                                type="checkbox"
                                                checked={item.checked}
                                                onChange={() => toggleCheck(item.id)}
                                            />
                                            <span className="checkbox-custom"></span>
                                            <span className="task-text">{item.task}</span>
                                        </label>
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <footer className="fv-footer">
                    <button className="print-btn" onClick={handlePrint}>🖨️ Print Checklist</button>
                    <p className="footer-note">Save this checklist to your Workspace after completion.</p>
                </footer>
            </div>
        </div>
    )
}
