import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import './UserMenu.css' // We'll need to create this

export default function UserMenu({ onOpenLogin }) {
    const { user, isAuthenticated, logout } = useAuthStore()
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        setIsOpen(false)
        navigate('/')
    }

    if (!isAuthenticated) {
        return (
            <button className="auth-login-btn" onClick={onOpenLogin}>
                Sign In
            </button>
        )
    }

    return (
        <div className="user-menu-container">
            <button
                className="user-avatar-btn"
                onClick={() => setIsOpen(!isOpen)}
                title={user.name}
            >
                {user.avatar_url ? (
                    <img src={user.avatar_url} alt={user.name} />
                ) : (
                    <div className="avatar-placeholder">{user.name.charAt(0).toUpperCase()}</div>
                )}
            </button>

            {isOpen && (
                <div className="user-dropdown">
                    <div className="user-info">
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                    </div>
                    <hr />
                    <Link to="/profile" className="menu-item" onClick={() => setIsOpen(false)}>
                        My Profile
                    </Link>
                    <Link to="/workspace" className="menu-item" onClick={() => setIsOpen(false)}>
                        My Workspace
                    </Link>
                    <hr />
                    <button className="menu-item logout" onClick={handleLogout}>
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    )
}
