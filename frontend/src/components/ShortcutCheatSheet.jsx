import { useState } from 'react'
import './ShortcutCheatSheet.css'

export default function ShortcutCheatSheet({ isOpen, onClose }) {
    const shortcuts = [
        { key: 'Ctrl + K', description: 'Open search', mac: '⌘ K' },
        { key: 'Ctrl + Shift + C', description: 'Open compare', mac: '⌘ ⇧ C' },
        { key: '?', description: 'Show shortcuts', mac: '?' },
        { key: 'Esc', description: 'Close modal', mac: 'Esc' },
        { key: '/', description: 'Focus search', mac: '/' },
        { key: '←/→', description: 'Navigate', mac: '←/→' },
        { key: 'Enter', description: 'Select item', mac: 'Enter' }
    ]

    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0

    if (!isOpen) return null

    return (
        <div className="shortcut-overlay" onClick={onClose}>
            <div className="shortcut-sheet" onClick={e => e.stopPropagation()}>
                <div className="shortcut-header">
                    <h2>⌨️ Keyboard Shortcuts</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="shortcut-list">
                    {shortcuts.map((shortcut, index) => (
                        <div key={index} className="shortcut-item">
                            <kbd className="shortcut-key">
                                {isMac ? shortcut.mac : shortcut.key}
                            </kbd>
                            <span className="shortcut-desc">{shortcut.description}</span>
                        </div>
                    ))}
                </div>

                <div className="shortcut-footer">
                    <p>Press <kbd>?</kbd> anytime to show this help</p>
                </div>
            </div>
        </div>
    )
}
