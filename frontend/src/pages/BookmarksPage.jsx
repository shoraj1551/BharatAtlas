import { useBookmarksStore } from '../store/bookmarksStore'
import { Link } from 'react-router-dom'
import './BookmarksPage.css'

function BookmarksPage() {
    const { bookmarks, collections, removeBookmark, createCollection, deleteCollection } = useBookmarksStore()

    const handleCreateCollection = () => {
        const name = prompt('Enter collection name:')
        if (name && name.trim()) {
            createCollection(name.trim())
        }
    }

    const handleDeleteCollection = (collectionId, collectionName) => {
        if (confirm(`Delete collection "${collectionName}"?`)) {
            deleteCollection(collectionId)
        }
    }

    return (
        <div className="bookmarks-page">
            <div className="bookmarks-header">
                <h1>My Bookmarks</h1>
                <button onClick={handleCreateCollection} className="btn-primary">
                    + New Collection
                </button>
            </div>

            {/* Collections */}
            {collections.length > 0 && (
                <div className="collections-section">
                    <h2>Collections</h2>
                    <div className="collections-grid">
                        {collections.map(collection => {
                            const places = bookmarks.filter(b =>
                                collection.placeIds.includes(b.place_id)
                            )

                            return (
                                <div key={collection.id} className="collection-card">
                                    <div className="collection-header">
                                        <h3>{collection.name}</h3>
                                        <button
                                            onClick={() => handleDeleteCollection(collection.id, collection.name)}
                                            className="delete-btn"
                                            aria-label={`Delete ${collection.name}`}
                                        >
                                            ×
                                        </button>
                                    </div>
                                    {collection.description && (
                                        <p className="collection-description">{collection.description}</p>
                                    )}
                                    <div className="collection-stats">
                                        <span className="stat">{places.length} places</span>
                                        <span className="stat-date">
                                            Created {new Date(collection.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* All Bookmarks */}
            <div className="bookmarks-section">
                <h2>All Bookmarks ({bookmarks.length})</h2>

                {bookmarks.length === 0 ? (
                    <div className="empty-state">
                        <p>No bookmarks yet</p>
                        <p className="empty-hint">Bookmark places from the explore page to save them here</p>
                        <Link to="/explore" className="btn-primary">
                            Explore Places
                        </Link>
                    </div>
                ) : (
                    <div className="bookmarks-grid">
                        {bookmarks.map(bookmark => (
                            <div key={bookmark.place_id} className="bookmark-card">
                                <div className="bookmark-header">
                                    <Link to={`/place/${bookmark.place_id}`} className="bookmark-link">
                                        <h3>{bookmark.canonical_name}</h3>
                                        <p className="bookmark-type">{bookmark.place_type.toUpperCase()}</p>
                                    </Link>
                                    <button
                                        onClick={() => removeBookmark(bookmark.place_id)}
                                        className="remove-btn"
                                        aria-label={`Remove ${bookmark.canonical_name} from bookmarks`}
                                    >
                                        ★
                                    </button>
                                </div>

                                {bookmark.notes && (
                                    <p className="bookmark-notes">{bookmark.notes}</p>
                                )}

                                <div className="bookmark-meta">
                                    <span className="bookmark-date">
                                        Saved {new Date(bookmark.bookmarkedAt).toLocaleDateString()}
                                    </span>
                                    {bookmark.collectionIds.length > 0 && (
                                        <span className="bookmark-collections">
                                            {bookmark.collectionIds.length} collection{bookmark.collectionIds.length > 1 ? 's' : ''}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default BookmarksPage
