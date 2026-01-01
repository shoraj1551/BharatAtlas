/**
 * DemographicsSection Component
 * 
 * Displays demographic information with charts and breakdowns
 */

import FactBadge from './FactBadge'
import './DemographicsSection.css'

export default function DemographicsSection({ place }) {
    if (!place) return null

    const demographics = place.demographics || {}
    const population = place.population || {}
    const literacy = place.literacy_rate || {}

    return (
        <div className="demographics-section">
            <h2 className="section-title">👥 Demographics</h2>

            {/* Population Overview */}
            <div className="demo-card">
                <div className="card-header">
                    <h3>Population</h3>
                    <FactBadge type="verified" source="Census 2011" />
                </div>
                <div className="demo-grid">
                    <div className="demo-stat">
                        <span className="stat-icon">👥</span>
                        <div className="stat-content">
                            <span className="stat-label">Total</span>
                            <span className="stat-value">
                                {population.value?.toLocaleString() || demographics.population?.total?.toLocaleString() || 'N/A'}
                            </span>
                        </div>
                    </div>
                    <div className="demo-stat">
                        <span className="stat-icon">👨</span>
                        <div className="stat-content">
                            <span className="stat-label">Male</span>
                            <span className="stat-value">
                                {demographics.population?.male?.toLocaleString() || 'N/A'}
                            </span>
                        </div>
                    </div>
                    <div className="demo-stat">
                        <span className="stat-icon">👩</span>
                        <div className="stat-content">
                            <span className="stat-label">Female</span>
                            <span className="stat-value">
                                {demographics.population?.female?.toLocaleString() || 'N/A'}
                            </span>
                        </div>
                    </div>
                    <div className="demo-stat">
                        <span className="stat-icon">🏙️</span>
                        <div className="stat-content">
                            <span className="stat-label">Urban</span>
                            <span className="stat-value">
                                {demographics.population?.urban?.toLocaleString() || 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Literacy */}
            <div className="demo-card">
                <div className="card-header">
                    <h3>Literacy</h3>
                    <FactBadge type="verified" source="Census 2011" />
                </div>
                <div className="literacy-bars">
                    <div className="literacy-item">
                        <div className="literacy-header">
                            <span className="literacy-label">Total Literacy</span>
                            <span className="literacy-percent">{literacy.value || demographics.literacy?.total || 'N/A'}%</span>
                        </div>
                        <div className="literacy-bar">
                            <div
                                className="literacy-fill total"
                                style={{ width: `${literacy.value || demographics.literacy?.total || 0}%` }}
                            />
                        </div>
                    </div>
                    <div className="literacy-item">
                        <div className="literacy-header">
                            <span className="literacy-label">Male Literacy</span>
                            <span className="literacy-percent">{literacy.male || demographics.literacy?.male || 'N/A'}%</span>
                        </div>
                        <div className="literacy-bar">
                            <div
                                className="literacy-fill male"
                                style={{ width: `${literacy.male || demographics.literacy?.male || 0}%` }}
                            />
                        </div>
                    </div>
                    <div className="literacy-item">
                        <div className="literacy-header">
                            <span className="literacy-label">Female Literacy</span>
                            <span className="literacy-percent">{literacy.female || demographics.literacy?.female || 'N/A'}%</span>
                        </div>
                        <div className="literacy-bar">
                            <div
                                className="literacy-fill female"
                                style={{ width: `${literacy.female || demographics.literacy?.female || 0}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Languages */}
            {demographics.languages && demographics.languages.length > 0 && (
                <div className="demo-card">
                    <div className="card-header">
                        <h3>Languages Spoken</h3>
                        <FactBadge type="verified" source="Census 2011" />
                    </div>
                    <div className="language-list">
                        {demographics.languages.map((lang, index) => (
                            <div key={index} className="language-item">
                                <span className="language-name">{lang.name}</span>
                                <span className="language-percent">{lang.speakers_percent}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Religions */}
            {demographics.religions && demographics.religions.length > 0 && (
                <div className="demo-card">
                    <div className="card-header">
                        <h3>Religious Composition</h3>
                        <FactBadge type="verified" source="Census 2011" />
                    </div>
                    <div className="religion-list">
                        {demographics.religions.map((religion, index) => (
                            <div key={index} className="religion-item">
                                <span className="religion-name">{religion.name}</span>
                                <div className="religion-bar">
                                    <div
                                        className="religion-fill"
                                        style={{ width: `${religion.followers_percent}%` }}
                                    />
                                </div>
                                <span className="religion-percent">{religion.followers_percent}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SC/ST Statistics */}
            {(demographics.scheduled_castes_percent || demographics.scheduled_tribes_percent) && (
                <div className="demo-card">
                    <div className="card-header">
                        <h3>SC/ST Population</h3>
                        <FactBadge type="verified" source="Census 2011" />
                    </div>
                    <div className="sc-st-grid">
                        {demographics.scheduled_castes_percent && (
                            <div className="sc-st-item">
                                <span className="sc-st-label">Scheduled Castes</span>
                                <span className="sc-st-value">{demographics.scheduled_castes_percent}%</span>
                            </div>
                        )}
                        {demographics.scheduled_tribes_percent && (
                            <div className="sc-st-item">
                                <span className="sc-st-label">Scheduled Tribes</span>
                                <span className="sc-st-value">{demographics.scheduled_tribes_percent}%</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
