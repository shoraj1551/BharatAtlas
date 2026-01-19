import { useState } from 'react'
import useAuthStore from '../../store/authStore'
import './AuthModal.css'

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, loading, error } = useAuthStore()

    if (!isOpen) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(email, password)
            onClose()
        } catch (err) {
            // Error is handled in store
        }
    }

    return (
        <div className="auth-modal-overlay">
            <div className="auth-modal">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>Welcome Back</h2>
                <p>Log in to access your profile and saved items.</p>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
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
                            required
                        />
                    </div>

                    <button type="submit" className="auth-submit-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <div className="auth-footer">
                    Don't have an account? <button className="link-btn" onClick={onSwitchToRegister}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}
