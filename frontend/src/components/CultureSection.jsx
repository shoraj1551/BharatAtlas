/**
 * CultureSection Component
 * 
 * Displays cultural information including heritage, festivals, languages, and cuisine
 */

import FactBadge from './FactBadge'
import './CultureSection.css'

export default function CultureSection({ place }) {
    if (!place) return null

    const culture = place.culture || {}

    return (
        <div className="culture-section">
            <h2 className="section-title">🎭 Culture & Heritage</h2>

            {/* Cultural Heritage */}
            {culture.heritage_sites && culture.heritage_sites.length > 0 && (
                <div className="culture-card">
                    <div className="card-header">
                        <h3>🏛️ Heritage Sites</h3>
                        <FactBadge type="verified" source="UNESCO, ASI" />
                    </div>
                    <div className="heritage-grid">
                        {culture.heritage_sites.map((site, index) => (
                            <div key={index} className="heritage-item">
                                <span className="heritage-icon">🏛️</span>
                                <div className="heritage-content">
                                    <h4>{site.name}</h4>
                                    {site.type && <p className="heritage-type">{site.type}</p>}
                                    {site.description && <p className="heritage-desc">{site.description}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Festivals */}
            {culture.major_festivals && culture.major_festivals.length > 0 && (
                <div className="culture-card">
                    <div className="card-header">
                        <h3>🎉 Major Festivals</h3>
                        <FactBadge type="community" />
                    </div>
                    <div className="festival-grid">
                        {culture.major_festivals.map((festival, index) => (
                            <div key={index} className="festival-item">
                                <span className="festival-icon">🎊</span>
                                <div className="festival-content">
                                    <h4>{festival.name || festival}</h4>
                                    {festival.month && <p className="festival-time">📅 {festival.month}</p>}
                                    {festival.significance && <p className="festival-desc">{festival.significance}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Languages */}
            {culture.languages && culture.languages.length > 0 && (
                <div className="culture-card">
                    <div className="card-header">
                        <h3>🗣️ Languages Spoken</h3>
                        <FactBadge type="verified" source="Census 2011" />
                    </div>
                    <div className="language-tags">
                        {culture.languages.map((lang, index) => (
                            <div key={index} className="language-tag">
                                {typeof lang === 'string' ? lang : lang.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Cuisine */}
            {culture.famous_cuisine && culture.famous_cuisine.length > 0 && (
                <div className="culture-card">
                    <div className="card-header">
                        <h3>🍛 Famous Cuisine</h3>
                        <FactBadge type="community" />
                    </div>
                    <div className="cuisine-grid">
                        {culture.famous_cuisine.map((dish, index) => (
                            <div key={index} className="cuisine-item">
                                <span className="cuisine-icon">🍽️</span>
                                <span className="cuisine-name">{dish}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Art & Crafts */}
            {culture.traditional_arts && culture.traditional_arts.length > 0 && (
                <div className="culture-card">
                    <div className="card-header">
                        <h3>🎨 Traditional Arts & Crafts</h3>
                        <FactBadge type="community" />
                    </div>
                    <div className="arts-grid">
                        {culture.traditional_arts.map((art, index) => (
                            <div key={index} className="art-tag">
                                {art}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Placeholder if no data */}
            {!culture.heritage_sites && !culture.major_festivals && !culture.languages && !culture.famous_cuisine && !culture.traditional_arts && (
                <div className="culture-card">
                    <div className="placeholder-content">
                        <span className="placeholder-icon">🎭</span>
                        <h3>Cultural Information Coming Soon</h3>
                        <p>We're gathering comprehensive cultural data for this region.</p>
                        <div className="placeholder-features">
                            <div className="feature-item">🏛️ Heritage Sites</div>
                            <div className="feature-item">🎉 Festivals</div>
                            <div className="feature-item">🗣️ Languages</div>
                            <div className="feature-item">🍛 Cuisine</div>
                            <div className="feature-item">🎨 Arts & Crafts</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
