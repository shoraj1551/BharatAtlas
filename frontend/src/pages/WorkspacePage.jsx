/**
 * WorkspacePage (Entrepreneur Research)
 * 
 * Dashboard for looking at saved places, insights, and planned comparisons.
 * "Productivity" Design Standard.
 */

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import workspaceService from '../services/workspaceService'
import './WorkspacePage.css'
import LoadingSpinner from '../components/LoadingSpinner'

export default function WorkspacePage() {
    const [workspace, setWorkspace] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadWorkspace()
    }, [])

    const loadWorkspace = async () => {
        setLoading(true)
        const data = await workspaceService.getWorkspace()
        setWorkspace(data)
        setLoading(false)
    }

    const removeBookmark = async (placeId) => {
        await workspaceService.removeBookmark(placeId)
        loadWorkspace() // Reload to refresh list
    }

    if (loading) return <LoadingSpinner message="Loading your workspace..." />

    if (!workspace) return (
        <div className="workspace-empty">
            <h2>Research Workspace</h2>
            <p>Error loading workspace. Please refresh.</p>
        </div>
    )

    return (
        <div className="workspace-page">
            <header className="ws-header">
                <div className="ws-title-group">
                    <h1>🗂️ My Research Workspace</h1>
                    <p>Your personal collection of places, insights, and opportunities.</p>
                </div>
                <div className="ws-meta">
                    <span className="ws-id">ID: {workspace.workspace_id?.substring(0, 8)}...</span>
                </div>
            </header>

            <div className="ws-grid">

                {/* 1. SAVED PLACES (BOOKMARKS) */}
                <section className="ws-section bookmarks-section">
                    <div className="sec-header">
                        <h2>📌 Saved Places ({workspace.bookmarks?.length || 0})</h2>
                        <Link to="/explore" className="ws-action-link">+ Add Place</Link>
                    </div>

                    <div className="bookmarks-list">
                        {workspace.bookmarks && workspace.bookmarks.length > 0 ? (
                            workspace.bookmarks.map((bm, i) => (
                                <div key={i} className="bookmark-card">
                                    <div className="bm-header">
                                        <Link to={`/place/${bm.place_id}`} className="bm-title">
                                            {bm.place_name || bm.place_id}
                                        </Link>
                                        <button
                                            className="bm-remove"
                                            onClick={() => removeBookmark(bm.place_id)}
                                            title="Remove bookmark"
                                        >✕</button>
                                    </div>
                                    <div className="bm-date">
                                        Saved {new Date(bm.saved_at).toLocaleDateString()}
                                    </div>
                                    {bm.notes && <div className="bm-notes">📝 {bm.notes}</div>}
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>No places bookmarked yet.</p>
                                <small>Go to the Map or Explore page to save locations.</small>
                            </div>
                        )}
                    </div>
                </section>

                {/* 2. SAVED INSIGHTS / AI CHATS */}
                <section className="ws-section insights-section">
                    <div className="sec-header">
                        <h2>💡 Saved Insights ({workspace.saved_insights?.length || 0})</h2>
                    </div>

                    <div className="insights-list">
                        {workspace.saved_insights && workspace.saved_insights.length > 0 ? (
                            workspace.saved_insights.map((insight, i) => (
                                <div key={i} className={`insight-card type-${insight.type}`}>
                                    <div className="insight-badge">{insight.type.replace('_', ' ')}</div>
                                    <h3 className="insight-title">{insight.title || 'Untitled Insight'}</h3>

                                    <div className="insight-content">
                                        {typeof insight.content === 'string'
                                            ? insight.content.substring(0, 150) + '...'
                                            : JSON.stringify(insight.content).substring(0, 150) + '...'
                                        }
                                    </div>

                                    <div className="insight-footer">
                                        {insight.source_place_id && (
                                            <Link to={`/place/${insight.source_place_id}`} className="source-link">
                                                Go to Source Place
                                            </Link>
                                        )}
                                        <span className="insight-date">{new Date(insight.saved_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>No insights saved yet.</p>
                                <small>Ask the AI Consultant or use the Simulator to save findings.</small>
                            </div>
                        )}
                    </div>
                </section>

                {/* 3. COMPARISONS */}
                <section className="ws-section comparisons-section">
                    <div className="sec-header">
                        <h2>⚖️ Comparison Sets ({workspace.saved_comparisons?.length || 0})</h2>
                        <Link to="/compare" className="ws-action-link">New Comparison</Link>
                    </div>

                    <div className="comparisons-list">
                        {workspace.saved_comparisons && workspace.saved_comparisons.length > 0 ? (
                            workspace.saved_comparisons.map((cmp, i) => (
                                <div key={i} className="comp-card">
                                    <h3>{cmp.title || 'Untitled Comparison'}</h3>
                                    <div className="comp-places">
                                        {cmp.place_ids.length} places
                                    </div>
                                    <button className="ws-btn-small">Load Comparison</button>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>No comparisons saved.</p>
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </div>
    )
}
