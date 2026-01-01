import React from 'react'
import './Skeleton.css'

/**
 * Skeleton Loader Component
 * Principles: Maintain layout stability (CLS), provide instant feedback.
 * 
 * @param {string} className - Additional classes for dimensions (h-4, w-full, etc.)
 * @param {string} variant - 'text', 'circular', 'rectangular'
 */
function Skeleton({ className = '', variant = 'text', width, height, style = {} }) {
    const finalStyle = {
        width,
        height,
        ...style
    }

    return (
        <div
            className={`skeleton skeleton-${variant} ${className}`}
            style={finalStyle}
            aria-hidden="true"
        />
    )
}

export default Skeleton
