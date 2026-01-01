import { usePreferencesStore } from '../store/preferencesStore'
import './ThemeToggle.css'

export default function ThemeToggle() {
    const { theme, toggleTheme } = usePreferencesStore()

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    )
}
