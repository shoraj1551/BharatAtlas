import React, { createContext, useState, useContext, useEffect } from 'react'
import { translations } from '../utils/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en')

    // Persist language choice
    useEffect(() => {
        const savedLang = localStorage.getItem('app_language')
        if (savedLang && translations[savedLang]) {
            setLanguage(savedLang)
        }
    }, [])

    const switchLanguage = (lang) => {
        if (translations[lang]) {
            setLanguage(lang)
            localStorage.setItem('app_language', lang)
        }
    }

    /**
     * Translate a key.
     * If key is not found, returns the English key (fallback).
     */
    const t = (key) => {
        return translations[language][key] || key
    }

    /**
     * Get localized name for a place object
     */
    const getPlaceName = (place) => {
        if (!place) return ''
        if (language === 'en') return place.canonical_name

        // Try to get local name
        if (place.local_names && place.local_names[language]) {
            return place.local_names[language]
        }

        // Fallback to canonical name
        return place.canonical_name
    }

    return (
        <LanguageContext.Provider value={{ language, switchLanguage, t, getPlaceName }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => useContext(LanguageContext)
