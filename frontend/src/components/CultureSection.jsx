/**
 * CultureSection - Market Adaptation Intelligence
 * 
 * Decodes soft infrastructure: Language, Food, Social Norms.
 * "Bureau Soft" Design Standard.
 */

import React from 'react'
import './CultureSection.css'

export default function CultureSection({ place }) {
    if (!place || !place.culture_society) return null

    const {
        languages,
        cuisine,
        festivals,
        social_norms,
        market_adaptation_tips,
        heritage_sites
    } = place.culture_society

    return (
        <div className="culture-section">
            <header className="culture-header">
                <div>
                    <h2 className="section-title">🎭 Cultural Intelligence</h2>
                    <p className="culture-subtitle">Market Adaptation & Social Context</p>
                </div>
            </header>

            {/* 1. ENTREPRENEURIAL INSIGHTS (The "Cheat Sheet") */}
            {market_adaptation_tips && market_adaptation_tips.length > 0 && (
                <section className="culture-group">
                    <h3 className="group-title">💡 Market Adaptation Strategy</h3>
                    <div className="tips-grid">
                        {market_adaptation_tips.map((tip, idx) => (
                            <div key={idx} className="tip-card">
                                <span className="tip-icon">✨</span>
                                <p>{tip}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 2. LINGUISTIC PROFILE */}
            {languages && (
                <section className="culture-group">
                    <div className="group-header">
                        <h3 className="group-title">🗣️ Linguistic Landscape</h3>
                    </div>
                    <div className="lang-dashboard">
                        <div className="lang-stat">
                            <label>Official</label>
                            <div className="lang-values">
                                {languages.official?.map(l => <span key={l} className="lang-tag official">{l}</span>)}
                            </div>
                        </div>
                        <div className="lang-stat">
                            <label>Market / Street</label>
                            <div className="lang-values">
                                {languages.spoken?.map(l => <span key={l} className="lang-tag spoke">{l}</span>)}
                            </div>
                        </div>
                        {languages.business_preferred && (
                            <div className="lang-context">
                                <strong>Business Preference:</strong> {languages.business_preferred}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* 3. CONSUMPTION & CUISINE */}
            {cuisine && (
                <section className="culture-group">
                    <h3 className="group-title">🍛 Consumption Habits</h3>
                    <div className="cuisine-panel">
                        <div className="diet-monitor">
                            <div className="monitor-row">
                                <span className="monitor-label">Staple Diet</span>
                                <span className="monitor-val">{cuisine.staple_diet}</span>
                            </div>
                            {cuisine.dietary_restrictions && (
                                <div className="monitor-row alert">
                                    <span className="monitor-label">Dietary Note</span>
                                    <span className="monitor-val">{cuisine.dietary_restrictions}</span>
                                </div>
                            )}
                        </div>
                        <div className="dishes-list">
                            <h4>Local Favorites</h4>
                            <div className="dish-tags">
                                {cuisine.famous_dishes?.map(dish => (
                                    <span key={dish} className="dish-tag">{dish}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 4. SOCIAL NORMS & ETIQUETTE */}
            {social_norms && (
                <section className="culture-group">
                    <h3 className="group-title">🤝 Social Norms & Etiquette</h3>
                    <div className="norms-grid">
                        {social_norms.greetings && (
                            <div className="norm-card">
                                <h4>Greetings</h4>
                                <p>{social_norms.greetings}</p>
                            </div>
                        )}
                        {social_norms.business_etiquette && (
                            <div className="norm-card highlight">
                                <h4>Business Etiquette</h4>
                                <p>{social_norms.business_etiquette}</p>
                            </div>
                        )}
                        {social_norms.taboos && social_norms.taboos.length > 0 && (
                            <div className="norm-card warning">
                                <h4>⚠️ Sensitivities to Avoid</h4>
                                <ul>
                                    {social_norms.taboos.map((t, i) => <li key={i}>{t}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* 5. BUSINESS CALENDAR (Festivals) */}
            {festivals && festivals.length > 0 && (
                <section className="culture-group">
                    <h3 className="group-title">📅 Business Calendar Impact</h3>
                    <div className="fest-timeline">
                        {festivals.map((fest, idx) => (
                            <div key={idx} className="fest-item">
                                <div className="fest-month">{fest.month || 'Season'}</div>
                                <div className="fest-details">
                                    <div className="fest-name">{fest.name}</div>
                                    <div className="fest-impact">
                                        <span className="impact-label">Business Impact:</span> {fest.business_impact}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Legacy Heritage Fallback */}
            {heritage_sites && heritage_sites.length > 0 && (
                <section className="culture-group">
                    <h3 className="group-title">🏛️ Heritage Context</h3>
                    <div className="heritage-mini-grid">
                        {heritage_sites.map((site, i) => (
                            <div key={i} className="heritage-chip">{site.name}</div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
