import './KnowledgeBadge.css'
import { KnowledgeType, getKnowledgeTypeLabel, getKnowledgeTypeColor } from '../models/KnowledgeType'

function KnowledgeBadge({ knowledgeType, confidence }) {
    const label = getKnowledgeTypeLabel(knowledgeType)
    const color = getKnowledgeTypeColor(knowledgeType)

    // Special styling for AI_INFERENCE - must be visually obvious
    const isInference = knowledgeType === KnowledgeType.AI_INFERENCE
    const isUnknown = knowledgeType === KnowledgeType.UNKNOWN

    return (
        <div
            className={`knowledge-badge ${isInference ? 'inference' : ''} ${isUnknown ? 'unknown' : ''}`}
            style={{ borderColor: color }}
        >
            <span className="knowledge-icon" style={{ color }}>
                {knowledgeType === KnowledgeType.VERIFIED_FACT && '✓'}
                {knowledgeType === KnowledgeType.OFFICIAL_STATISTIC && '📊'}
                {knowledgeType === KnowledgeType.LOCAL_REPORT && '📍'}
                {knowledgeType === KnowledgeType.AI_INFERENCE && '🤖'}
                {knowledgeType === KnowledgeType.UNKNOWN && '?'}
            </span>
            <span className="knowledge-label" style={{ color }}>
                {label}
            </span>
            {confidence !== undefined && (
                <span className="knowledge-confidence" style={{ color }}>
                    {confidence}%
                </span>
            )}
        </div>
    )
}

export default KnowledgeBadge
