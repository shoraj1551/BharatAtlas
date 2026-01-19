import { useState } from 'react'
import { shareWorkspace, generateShareLink } from '../services/collaborationService'
import './WorkspaceShareModal.css'

export default function WorkspaceShareModal({ isOpen, onClose, workspaceId, onSuccess }) {
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('viewer')
    const [shareLink, setShareLink] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    if (!isOpen) return null

    const handleShare = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await shareWorkspace(workspaceId, email, role)
            setEmail('')
            if (onSuccess) onSuccess()
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleGenerateLink = async () => {
        setLoading(true)
        setError(null)

        try {
            const data = await generateShareLink(workspaceId)
            const fullLink = `${window.location.origin}/workspace/shared/${data.link}`
            setShareLink(fullLink)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const copyLink = () => {
        navigator.clipboard.writeText(shareLink)
        alert('Link copied to clipboard!')
    }

    return (
        <div className="share-modal-overlay">
            <div className="share-modal">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>Share Workspace</h2>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleShare} className="share-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="colleague@example.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="viewer">Viewer (Read only)</option>
                            <option value="editor">Editor (Can edit)</option>
                        </select>
                    </div>

                    <button type="submit" className="share-btn" disabled={loading}>
                        {loading ? 'Sharing...' : 'Share'}
                    </button>
                </form>

                <div className="divider">OR</div>

                <div className="link-section">
                    <button onClick={handleGenerateLink} className="generate-link-btn" disabled={loading}>
                        Generate Shareable Link
                    </button>

                    {shareLink && (
                        <div className="link-display">
                            <input type="text" value={shareLink} readOnly />
                            <button onClick={copyLink} className="copy-btn">Copy</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
