import { useState } from 'react'
import {
    getPlaceShareUrl,
    copyToClipboard,
    shareViaWebShare,
    getTwitterShareUrl,
    getFacebookShareUrl,
    getLinkedInShareUrl,
    getWhatsAppShareUrl,
    generatePlaceEmbedCode
} from '../services/shareService'
import './ShareButtons.css'

/**
 * Share Buttons Component
 * 
 * Provides sharing options for places
 */
function ShareButtons({ place, variant = 'default' }) {
    const [showEmbed, setShowEmbed] = useState(false)
    const [copied, setCopied] = useState(false)

    if (!place) return null

    const shareUrl = getPlaceShareUrl(place.place_id)
    const shareText = `Check out ${place.canonical_name} on BharatAtlas`

    const handleCopyLink = async () => {
        const success = await copyToClipboard(shareUrl)
        if (success) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const handleNativeShare = async () => {
        const shared = await shareViaWebShare(
            place.canonical_name,
            shareText,
            shareUrl
        )

        if (!shared) {
            // Fallback to copy link
            handleCopyLink()
        }
    }

    const handleCopyEmbed = async () => {
        const embedCode = generatePlaceEmbedCode(place.place_id)
        const success = await copyToClipboard(embedCode)
        if (success) {
            alert('Embed code copied to clipboard!')
        }
    }

    const openShareWindow = (url) => {
        window.open(url, 'share', 'width=600,height=400')
    }

    return (
        <div className={`share-buttons ${variant}`}>
            <button onClick={handleNativeShare} className="share-btn share-primary">
                <span className="share-icon">🔗</span>
                <span className="share-text">Share</span>
            </button>

            <button onClick={handleCopyLink} className="share-btn share-copy">
                <span className="share-icon">{copied ? '✓' : '📋'}</span>
                <span className="share-text">{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>

            <button
                onClick={() => openShareWindow(getTwitterShareUrl(shareText, shareUrl))}
                className="share-btn share-twitter"
                aria-label="Share on Twitter"
            >
                <span className="share-icon">𝕏</span>
            </button>

            <button
                onClick={() => openShareWindow(getFacebookShareUrl(shareUrl))}
                className="share-btn share-facebook"
                aria-label="Share on Facebook"
            >
                <span className="share-icon">f</span>
            </button>

            <button
                onClick={() => openShareWindow(getLinkedInShareUrl(shareUrl))}
                className="share-btn share-linkedin"
                aria-label="Share on LinkedIn"
            >
                <span className="share-icon">in</span>
            </button>

            <button
                onClick={() => openShareWindow(getWhatsAppShareUrl(shareText, shareUrl))}
                className="share-btn share-whatsapp"
                aria-label="Share on WhatsApp"
            >
                <span className="share-icon">📱</span>
            </button>

            <button onClick={() => setShowEmbed(!showEmbed)} className="share-btn share-embed">
                <span className="share-icon">{'</>'}</span>
                <span className="share-text">Embed</span>
            </button>

            {showEmbed && (
                <div className="embed-panel">
                    <h4>Embed Code</h4>
                    <textarea
                        readOnly
                        value={generatePlaceEmbedCode(place.place_id)}
                        rows={3}
                        className="embed-code"
                    />
                    <button onClick={handleCopyEmbed} className="btn-primary">
                        Copy Embed Code
                    </button>
                </div>
            )}
        </div>
    )
}

export default ShareButtons
