import { useState } from 'react'
import './SourceList.css'

function SourceList({ sources }) {
    const [isExpanded, setIsExpanded] = useState(false)

    if (!sources || sources.length === 0) {
        return null
    }

    return (
        <div className="source-list">
            <button
                className="source-toggle"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
            >
                <span className="source-toggle-icon">{isExpanded ? '▼' : '▶'}</span>
                <span className="source-toggle-text">
                    Sources ({sources.length})
                </span>
            </button>

            {isExpanded && (
                <div className="source-items">
                    {sources.map((source, index) => (
                        <div key={source.source_id || index} className="source-item">
                            <div className="source-number">[{index + 1}]</div>
                            <div className="source-content">
                                <div className="source-title">{source.title}</div>
                                <div className="source-meta">
                                    <span className="source-org">{source.organization}</span>
                                    {source.publication_date && (
                                        <span className="source-date">
                                            ({new Date(source.publication_date).getFullYear()})
                                        </span>
                                    )}
                                </div>
                                {source.url && (
                                    <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="source-link"
                                    >
                                        View source ↗
                                    </a>
                                )}
                                {source.citation_text && (
                                    <div className="source-citation">{source.citation_text}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SourceList
