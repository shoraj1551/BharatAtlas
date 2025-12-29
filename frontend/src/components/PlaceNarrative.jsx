import './PlaceNarrative.css'
import { ConfidenceLevel } from '../models/Narrative'

// Section title mapping
const SECTION_TITLES = {
    geographic_context: 'Geographic Context',
    demographic_overview: 'Demographics',
    economic_profile: 'Economy',
    infrastructure: 'Infrastructure',
    governance: 'Governance',
    historical_note: 'Historical Note'
}

// Confidence badge colors
const CONFIDENCE_COLORS = {
    [ConfidenceLevel.VERIFIED]: '#2e7d32',
    [ConfidenceLevel.HIGH]: '#388e3c',
    [ConfidenceLevel.MEDIUM]: '#f57c00',
    [ConfidenceLevel.LOW]: '#d32f2f',
    [ConfidenceLevel.UNVERIFIED]: '#757575'
}

function PlaceNarrative({ narrative }) {
    if (!narrative || !narrative.sections) {
        return null
    }

    const sections = Object.entries(narrative.sections)
        .filter(([_, section]) => section !== null)
        .sort((a, b) => {
            // Sort by section type order
            const order = Object.keys(SECTION_TITLES)
            return order.indexOf(a[0]) - order.indexOf(b[0])
        })

    if (sections.length === 0) {
        return null
    }

    return (
        <div className="place-narrative">
            {sections.map(([sectionType, section]) => (
                <div key={sectionType} className="narrative-section">
                    <div className="narrative-section-header">
                        <h4 className="narrative-section-title">
                            {SECTION_TITLES[sectionType] || sectionType}
                        </h4>
                        {section.confidence && (
                            <span
                                className="narrative-confidence-badge"
                                style={{
                                    backgroundColor: CONFIDENCE_COLORS[section.confidence] || '#999'
                                }}
                                title={`Confidence: ${section.confidence}`}
                            >
                                {section.confidence}
                            </span>
                        )}
                    </div>
                    <p className="narrative-section-content">{section.content}</p>
                    {section.source_detail && (
                        <p className="narrative-source">
                            Source: {section.source_detail}
                        </p>
                    )}
                </div>
            ))}
        </div>
    )
}

export default PlaceNarrative
