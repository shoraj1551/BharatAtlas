/**
 * Bookmarks Store - Zustand State Management
 * 
 * Manages bookmarked places and collections
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useBookmarksStore = create(
    persist(
        (set, get) => ({
            // State
            bookmarks: [], // Array of bookmarked place objects
            collections: [], // Array of collection objects

            // Bookmark Actions
            addBookmark: (place) => {
                const { bookmarks } = get()

                // Prevent duplicates
                if (bookmarks.find(b => b.place_id === place.place_id)) {
                    return
                }

                const bookmark = {
                    ...place,
                    bookmarkedAt: new Date().toISOString(),
                    notes: '',
                    collectionIds: []
                }

                set({ bookmarks: [...bookmarks, bookmark] })
            },

            removeBookmark: (placeId) => {
                const { bookmarks } = get()
                set({ bookmarks: bookmarks.filter(b => b.place_id !== placeId) })
            },

            updateBookmarkNotes: (placeId, notes) => {
                const { bookmarks } = get()
                set({
                    bookmarks: bookmarks.map(b =>
                        b.place_id === placeId ? { ...b, notes } : b
                    )
                })
            },

            isBookmarked: (placeId) => {
                const { bookmarks } = get()
                return bookmarks.some(b => b.place_id === placeId)
            },

            // Collection Actions
            createCollection: (name, description = '') => {
                const { collections } = get()

                const collection = {
                    id: `collection_${Date.now()}`,
                    name,
                    description,
                    createdAt: new Date().toISOString(),
                    placeIds: []
                }

                set({ collections: [...collections, collection] })
                return collection.id
            },

            deleteCollection: (collectionId) => {
                const { collections, bookmarks } = get()

                // Remove collection
                set({ collections: collections.filter(c => c.id !== collectionId) })

                // Remove collection reference from bookmarks
                set({
                    bookmarks: bookmarks.map(b => ({
                        ...b,
                        collectionIds: b.collectionIds.filter(id => id !== collectionId)
                    }))
                })
            },

            updateCollection: (collectionId, updates) => {
                const { collections } = get()
                set({
                    collections: collections.map(c =>
                        c.id === collectionId ? { ...c, ...updates } : c
                    )
                })
            },

            addToCollection: (placeId, collectionId) => {
                const { collections, bookmarks } = get()

                // Add place to collection
                set({
                    collections: collections.map(c =>
                        c.id === collectionId && !c.placeIds.includes(placeId)
                            ? { ...c, placeIds: [...c.placeIds, placeId] }
                            : c
                    )
                })

                // Add collection reference to bookmark
                set({
                    bookmarks: bookmarks.map(b =>
                        b.place_id === placeId && !b.collectionIds.includes(collectionId)
                            ? { ...b, collectionIds: [...b.collectionIds, collectionId] }
                            : b
                    )
                })
            },

            removeFromCollection: (placeId, collectionId) => {
                const { collections, bookmarks } = get()

                // Remove place from collection
                set({
                    collections: collections.map(c =>
                        c.id === collectionId
                            ? { ...c, placeIds: c.placeIds.filter(id => id !== placeId) }
                            : c
                    )
                })

                // Remove collection reference from bookmark
                set({
                    bookmarks: bookmarks.map(b =>
                        b.place_id === placeId
                            ? { ...b, collectionIds: b.collectionIds.filter(id => id !== collectionId) }
                            : b
                    )
                })
            },

            getCollectionPlaces: (collectionId) => {
                const { collections, bookmarks } = get()
                const collection = collections.find(c => c.id === collectionId)

                if (!collection) return []

                return bookmarks.filter(b => collection.placeIds.includes(b.place_id))
            }
        }),
        {
            name: 'bharatatlas-bookmarks', // LocalStorage key
            partialize: (state) => ({
                bookmarks: state.bookmarks,
                collections: state.collections
            })
        }
    )
)
