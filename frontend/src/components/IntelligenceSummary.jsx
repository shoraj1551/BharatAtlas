import { useState, useEffect } from 'react'
import narrativeService from '../services/narrativeService'
import gapAnalysisService from '../services/gapAnalysisService'
import communityService from '../services/communityService' // Need this to fetch contributions
import { useLanguage } from '../context/LanguageContext'
import './IntelligenceSummary_v2.css'

export default function IntelligenceSummary({ place, placeId }) { // Accept place prop if available
    const [summary, setSummary] = useState(null)
    const [gaps, setGaps] = useState([])
    const [loading, setLoading] = useState(true)
    const { t } = useLanguage()

    useEffect(() => {
        const fetchData = async () => {
            if (!placeId) return
            setLoading(true)

            try {
                // Parallel fetch: Summary, Contributions (for gap analysis)
                const [summaryData, contributions] = await Promise.all([
                    narrativeService.generatePlaceSummary(placeId),
                    communityService.getContributions(placeId)
                ])

                setSummary(summaryData)

                // Run Gap Analysis
                // Note: We need 'place' object. If passed as prop, use it. 
                // Otherwise we might need to fetch it, but usually this component is inside PlacePage where place is known.
                // For now assuming 'place' is passed or available via parent context.
                if (place) {
                    const detectedGaps = gapAnalysisService.analyze(place, contributions)
                    setGaps(detectedGaps)
                }

            } catch (err) {
                console.error("Intelligence Load Error", err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [placeId, place])

    if (loading) {
        return (
            <div className="intelligence-summary-skeleton">
                <div className="skeleton-line title"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
            </div>
        )
    }

    if (!summary) return null

    return (
        <div className="intelligence-summary">
            <div className="summary-header">
                <h3>🧠 {t("Place Intelligence")}</h3>
                <span className="ai-badge">AI Analysis</span>
            </div>

            {/* REALITY GAP ALERT */}
            {gaps.length > 0 && (
                <div className="reality-gap-alert" title="Click for details">
                    <span className="gap-icon">⚠️</span>
                    <div className="gap-content">
                        <strong>Reality Gap Detected</strong>
                        <p>{gaps[0].explanation} ({gaps.length} categories flagged)</p>
                    </div>
                </div>
            )}

            <div className="summary-grid">
                <div className="summary-card identity">
                    <h4>🏗️ {t("Identity")}</h4>
                    <p>{summary.identity}</p>
                </div>

                <div className="summary-card people">
                    <h4>👥 {t("People")}</h4>
                    <p>{summary.people}</p>
                </div>

                <div className="summary-card opportunity">
                    <h4>🚀 {t("Review")}</h4>
                    <p>{summary.opportunity}</p>
                </div>
            </div>
        </div>
    )
}
