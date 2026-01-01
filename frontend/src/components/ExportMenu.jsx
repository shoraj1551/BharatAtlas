import { useState } from 'react'
import { exportToPDF, generateShareLink, copyToClipboard, shareOnSocial, generateEmbedCode } from '../utils/exportUtils'
import './ExportMenu.css'

export default function ExportMenu({ place, onClose }) {
    const [copied, setCopied] = useState(false)
    const [showEmbed, setShowEmbed] = useState(false)

    const handleCopyLink = async () => {
        const link = generateShareLink('place', place)
        const success = await copyToClipboard(link)
        if (success) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const handleExportPDF = () => {
        exportToPDF(place)
        onClose()
    }

    const handleShare = (platform) => {
        const link = generateShareLink('place', place)
        const text = `Check out ${place.canonical_name} on BharatAtlas`
        shareOnSocial(platform, link, text)
    }

    const embedCode = generateEmbedCode(generateShareLink('place', place))

    return (
        <div className="export-menu">
            <h3>📤 Export & Share</h3>

            <div className="export-section">
                <h4>Download</h4>
                <button className="export-btn" onClick={handleExportPDF}>
                    📄 Export as PDF
                </button>
            </div>

            <div className="export-section">
                <h4>Share</h4>
                <button className="export-btn" onClick={handleCopyLink}>
                    {copied ? '✓ Copied!' : '🔗 Copy Link'}
                </button>
                <button className="export-btn" onClick={() => handleShare('twitter')}>
                    🐦 Share on Twitter
                </button>
                <button className="export-btn" onClick={() => handleShare('facebook')}>
                    📘 Share on Facebook
                </button>
            </div>

            <div className="export-section">
                <h4>Embed</h4>
                <button className="export-btn" onClick={() => setShowEmbed(!showEmbed)}>
                    🔲 Get Embed Code
                </button>
                {showEmbed && (
                    <textarea
                        className="embed-code"
                        value={embedCode}
                        readOnly
                        onClick={(e) => e.target.select()}
                    />
                )}
            </div>
        </div>
    )
}
