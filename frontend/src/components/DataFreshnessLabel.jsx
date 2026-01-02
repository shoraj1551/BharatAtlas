import React from 'react'
import { getFreshnessInfo } from '../utils/dateUtils'
import './DataFreshnessLabel_v2.css'

/**
 * DataFreshnessLabel
 * 
 * Visually warns user if data is stale.
 * "Last verified in 2018. Conditions may have changed."
 */
export default function DataFreshnessLabel({ date, type = 'DEFAULT', showIconOnly = false }) {
    if (!date) return null

    const info = getFreshnessInfo(date, type)

    if (showIconOnly) {
        return (
            <span
                className={`freshness-dot status-${info.status}`}
                title={info.label}
            />
        )
    }

    return (
        <div className={`data-freshness-label status-${info.status}`}>
            <span className="freshness-icon">
                {info.status === 'stale' ? '⌛' : info.status === 'aging' ? '🗓️' : '✅'}
            </span>
            <span className="freshness-text">{info.label}</span>
        </div>
    )
}
