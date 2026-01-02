
import './BookmarkButton.css'

/**
 * Bookmark Button Component
 * 
 * Allows users to bookmark/unbookmark places
 */
import { useState, useEffect } from 'react'
import workspaceService from '../services/workspaceService'
import './BookmarkButton.css'

function BookmarkButton({ place, variant = 'default' }) {
    const [bookmarked, setBookmarked] = useState(false)
    const [loading, setLoading] = useState(false)

    // Check status on mount
    useEffect(() => {
        checkStatus()
    }, [place.place_id])

    const checkStatus = async () => {
        const ws = await workspaceService.getWorkspace()
        if (ws && ws.bookmarks) {
            setBookmarked(ws.bookmarks.some(b => b.place_id === place.place_id))
        }
    }

    const handleClick = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        setLoading(true)

        if (bookmarked) {
            await workspaceService.removeBookmark(place.place_id)
            setBookmarked(false)
        } else {
            await workspaceService.addBookmark(place.place_id)
            setBookmarked(true)
        }
        setLoading(false)
    }

    const buttonText = loading ? '...' : bookmarked ? '★ Bookmarked' : '☆ Bookmark'
    const buttonClass = `bookmark-btn ${variant} ${bookmarked ? 'bookmarked' : ''}`

    return (
        <button
            onClick={handleClick}
            className={buttonClass}
            disabled={loading}
            aria-label={bookmarked ? `Remove ${place.canonical_name} from bookmarks` : `Add ${place.canonical_name} to bookmarks`}
        >
            {buttonText}
        </button>
    )
}


export default BookmarkButton
