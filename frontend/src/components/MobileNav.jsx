import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './MobileNav.css'

export default function MobileNav() {
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        { path: '/', icon: '🏠', label: 'Home' },
        { path: '/map', icon: '🗺️', label: 'Map' },
        { path: '/explore', icon: '🔍', label: 'Explore' },
        { path: '/compare', icon: '⚖️', label: 'Compare' },
        { path: '/bookmarks', icon: '🔖', label: 'Saved' }
    ]

    return (
        <>
            {/* Bottom Navigation Bar */}
            <nav className="mobile-bottom-nav">
                {navItems.map(item => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`mobile-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Hamburger Menu Button */}
            <button
                className="mobile-menu-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menu"
            >
                {isOpen ? '✕' : '☰'}
            </button>

            {/* Slide-out Menu */}
            {isOpen && (
                <>
                    <div className="mobile-menu-overlay" onClick={() => setIsOpen(false)} />
                    <div className="mobile-menu">
                        <div className="mobile-menu-header">
                            <h2>BharatAtlas</h2>
                            <button onClick={() => setIsOpen(false)}>✕</button>
                        </div>
                        <div className="mobile-menu-content">
                            {navItems.map(item => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="mobile-menu-item"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
