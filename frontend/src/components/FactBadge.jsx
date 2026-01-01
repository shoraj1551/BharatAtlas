/**
 * FactBadge Component
 * 
 * Visual indicator for data provenance
 * - Verified facts (green checkmark)
 * - AI-generated insights (purple robot)
 * - Community data (blue people)
 * - Unverified data (yellow warning)
 */

import './FactBadge.css'

export default function FactBadge({ type = 'verified', source, lastUpdated, tooltip }) {
    const getBadgeConfig = () => {
        switch (type) {
            case 'verified':
                return {
                    icon: '✅',
                    label: 'Verified',
                    className: 'fact-badge-verified',
                    color: '#10b981'
                }
            case 'ai-generated':
                return {
                    icon: '🤖',
                    label: 'AI Insight',
                    className: 'fact-badge-ai',
                    color: '#8b5cf6'
                }
            case 'community':
                return {
                    icon: '👥',
                    label: 'Community',
                    className: 'fact-badge-community',
                    color: '#3b82f6'
                }
            case 'unverified':
                return {
                    icon: '⚠️',
                    label: 'Needs Verification',
                    className: 'fact-badge-unverified',
                    color: '#f59e0b'
                }
            default:
                return {
                    icon: '❓',
                    label: 'Unknown',
                    className: 'fact-badge-unknown',
                    color: '#6b7280'
                }
        }
    }

    const config = getBadgeConfig()

    const tooltipContent = tooltip || (
        source ? `Source: ${source}${lastUpdated ? ` (Updated: ${new Date(lastUpdated).toLocaleDateString()})` : ''}` : config.label
    )

    return (
        <span
            className={`fact-badge ${config.className}`}
            title={tooltipContent}
            aria-label={tooltipContent}
        >
            <span className="fact-badge-icon">{config.icon}</span>
            <span className="fact-badge-label">{config.label}</span>
            {source && (
                <span className="fact-badge-source">
                    <span className="source-icon">📊</span>
                    <span className="source-text">{source}</span>
                </span>
            )}
        </span>
    )
}
