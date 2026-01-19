import { useState, useEffect } from 'react'
import { listApiKeys, generateApiKey, revokeApiKey } from '../services/apiKeyService'
import './APIKeyManager.css'

export default function APIKeyManager() {
    const [keys, setKeys] = useState([])
    const [loading, setLoading] = useState(true)
    const [newKeyName, setNewKeyName] = useState('')
    const [generatedKey, setGeneratedKey] = useState(null)

    useEffect(() => {
        loadKeys()
    }, [])

    async function loadKeys() {
        try {
            setLoading(true)
            const response = await listApiKeys()
            setKeys(response.data)
        } catch (error) {
            console.error('Failed to load keys', error)
        } finally {
            setLoading(false)
        }
    }

    async function handleGenerate(e) {
        e.preventDefault()
        if (!newKeyName.trim()) return

        try {
            const response = await generateApiKey(newKeyName)
            setGeneratedKey(response.data)
            setNewKeyName('')
            loadKeys()
        } catch (error) {
            console.error('Failed to generate key', error)
        }
    }

    async function handleRevoke(id) {
        if (!window.confirm('Are you sure you want to revoke this key? It will stop working immediately.')) return

        try {
            await revokeApiKey(id)
            loadKeys()
        } catch (error) {
            console.error('Failed to revoke key', error)
        }
    }

    return (
        <div className="api-key-manager">
            <h2>API Access Keys</h2>
            <p className="description">Manage API keys to access BharatAtlas data programmatically.</p>

            {generatedKey && (
                <div className="key-created-modal">
                    <div className="modal-content">
                        <h3>Key Generated Successfully!</h3>
                        <p>Please copy your key now. You won't be able to see it again.</p>
                        <div className="key-display">
                            <code>{generatedKey.key}</code>
                            <button onClick={() => navigator.clipboard.writeText(generatedKey.key)}>Copy</button>
                        </div>
                        <button className="close-btn" onClick={() => setGeneratedKey(null)}>Done</button>
                    </div>
                </div>
            )}

            <form onSubmit={handleGenerate} className="generate-form">
                <input
                    type="text"
                    placeholder="Key Name (e.g., Integration App)"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                />
                <button type="submit" disabled={!newKeyName.trim()}>Generate New Key</button>
            </form>

            <div className="keys-list">
                {loading ? (
                    <div>Loading keys...</div>
                ) : keys.length === 0 ? (
                    <div className="no-keys">No API keys found. Generate one to get started.</div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Prefix</th>
                                <th>Created</th>
                                <th>Usage</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {keys.map(key => (
                                <tr key={key._id}>
                                    <td>{key.name}</td>
                                    <td className="font-mono">{key.key ? key.key.substring(0, 8) + '...' : 'sk_...'}</td>
                                    <td>{new Date(key.createdAt).toLocaleDateString()}</td>
                                    <td>{key.usage_count} reqs</td>
                                    <td><span className="status-active">Active</span></td>
                                    <td>
                                        <button className="revoke-btn" onClick={() => handleRevoke(key._id)}>Revoke</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
