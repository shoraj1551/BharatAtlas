import React from 'react'
import './DataProvenance_v2.css'

/**
 * DataProvenance Component
 * 
 * Visually distinguishes between:
 * - FACT: Hard data (Census, Official)
 * - SIGNAL: Trends, patterns, AI analysis
 * - STORY: Anecdotes, quotes, qualitative data
 */

export function Fact({ children, source }) {
    return (
        <span className="provenance-fact">
            {children}
            {source && <span className="source-cite" title={`Source: ${source}`}>[{source}]</span>}
        </span>
    )
}

export function Signal({ children, trend, type = 'info' }) {
    // type: 'info' | 'warning' | 'good'
    const trendIcon = trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'
    return (
        <span className={`provenance-signal ${type}`}>
            {children}
            {trend && <span className="trend-arrow">{trendIcon}</span>}
        </span>
    )
}

export function Story({ children, author }) {
    return (
        <div className="provenance-story">
            {children}
            {author && <div style={{ fontSize: '0.8em', marginTop: '6px', fontStyle: 'normal', color: '#64748b' }}>— {author}</div>}
        </div>
    )
}
