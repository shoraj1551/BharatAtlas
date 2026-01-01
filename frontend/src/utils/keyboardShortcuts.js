/**
 * Keyboard Shortcuts Manager
 * 
 * Global keyboard shortcuts for power users
 */

class KeyboardShortcutManager {
    constructor() {
        this.shortcuts = new Map()
        this.enabled = true
        this.init()
    }

    init() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this))
    }

    handleKeyDown(e) {
        if (!this.enabled) return

        // Don't trigger shortcuts when typing in inputs
        if (e.target.tagName === 'INPUT' ||
            e.target.tagName === 'TEXTAREA' ||
            e.target.isContentEditable) {
            return
        }

        const key = this.getKeyCombo(e)
        const handler = this.shortcuts.get(key)

        if (handler) {
            e.preventDefault()
            handler(e)
        }
    }

    getKeyCombo(e) {
        const parts = []
        if (e.ctrlKey || e.metaKey) parts.push('ctrl')
        if (e.shiftKey) parts.push('shift')
        if (e.altKey) parts.push('alt')
        parts.push(e.key.toLowerCase())
        return parts.join('+')
    }

    register(keyCombo, handler, description = '') {
        this.shortcuts.set(keyCombo, handler)
        console.log(`[Shortcuts] Registered: ${keyCombo} - ${description}`)
    }

    unregister(keyCombo) {
        this.shortcuts.delete(keyCombo)
    }

    enable() {
        this.enabled = true
    }

    disable() {
        this.enabled = false
    }

    getAll() {
        return Array.from(this.shortcuts.keys())
    }

    destroy() {
        document.removeEventListener('keydown', this.handleKeyDown)
        this.shortcuts.clear()
    }
}

// Create singleton
const shortcutManager = new KeyboardShortcutManager()

export default shortcutManager

/**
 * React hook for keyboard shortcuts
 */
export function useKeyboardShortcut(keyCombo, handler, description = '') {
    const { useEffect } = require('react')

    useEffect(() => {
        shortcutManager.register(keyCombo, handler, description)

        return () => {
            shortcutManager.unregister(keyCombo)
        }
    }, [keyCombo, handler, description])
}

/**
 * Default shortcuts
 */
export const DEFAULT_SHORTCUTS = {
    SEARCH: 'ctrl+k',
    COMPARE: 'ctrl+shift+c',
    HELP: '?',
    CLOSE: 'escape',
    FOCUS_SEARCH: '/',
    NEXT: 'arrowright',
    PREV: 'arrowleft',
    SELECT: 'enter'
}
