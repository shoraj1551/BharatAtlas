import { useBookmarksStore } from '../store/bookmarksStore'
import './BookmarkButton.css'

/**
 * Bookmark Button Component
 * 
 * Allows users to bookmark/unbookmark places
 */
function BookmarkButton({ place, variant = 'default' }) {
    const { isBookmarked, addBookmark, removeBookmark } = useBookmarksStore()

    const bookmarked = isBookmarked(place.place_id)

    const handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (bookmarked) {
            removeBookmark(place.place_id)
        } else {
            addBookmark(place)
        }
    }

    const buttonText = bookmarked ? '★ Bookmarked' : '☆ Bookmark'
    const buttonClass = `bookmark-btn ${variant} ${bookmarked ? 'bookmarked' : ''}`

    return (
        <button
            onClick={handleClick}
            className={buttonClass}
            aria-label={bookmarked ? `Remove ${place.canonical_name} from bookmarks` : `Add ${place.canonical_name} to bookmarks`}
        >
            {buttonText}
        </button>
    )
}

export default BookmarkButton
