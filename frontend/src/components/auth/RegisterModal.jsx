import { useState } from 'react'
import useAuthStore from '../../store/authStore'
import './AuthModal.css'

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { register, loading, error } = useAuthStore()

    if (!isOpen) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await register(name, email, password)
            onClose()
        } catch (err) {
            // Error handled in store
        }
    }

    return (
        <div className="auth-modal-overlay">
            <div className="auth-modal">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>Create Account</h2>
                <p>Join BharatAtlas to unlock personalized features.</p>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min. 6 characters"
                            minLength={6}
                            required
                        />
                    </div>

                    <button type="submit" className="auth-submit-btn" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <button className="link-btn" onClick={onSwitchToLogin}>Log In</button>
                </div>
            </div>
        </div>
    )
}
