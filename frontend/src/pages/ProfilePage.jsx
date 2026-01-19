import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import './ProfilePage.css'

export default function ProfilePage() {
    const { user, updateUser, isAuthenticated } = useAuthStore()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/')
            return
        }

        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name,
                email: user.email
            }))
        }
    }, [user, isAuthenticated, navigate])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage(null)
        setError(null)

        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match')
            return
        }

        try {
            const updateData = {
                name: formData.name,
                email: formData.email
            }

            if (formData.newPassword) {
                updateData.password = formData.newPassword
            }

            await updateUser(updateData)
            setMessage('Profile updated successfully')

            // Clear passwords
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }))
        } catch (err) {
            setError(err.message || 'Failed to update profile')
        }
    }

    if (!user) return null

    return (
        <div className="profile-page">
            <div className="profile-container">
                <h1>My Profile</h1>

                <div className="profile-card">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            {user.avatar_url ? (
                                <img src={user.avatar_url} alt={user.name} />
                            ) : (
                                <div className="avatar-placeholder-large">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="profile-info">
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                            <span className="badge-member">Member since {new Date(user.createdAt || Date.now()).getFullYear()}</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="profile-form">
                        {message && <div className="success-message">{message}</div>}
                        {error && <div className="error-message">{error}</div>}

                        <div className="form-section">
                            <h3>Personal Information</h3>

                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Change Password</h3>
                            <p className="section-desc">Leave blank to keep current password</p>

                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    minLength={6}
                                />
                            </div>

                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="save-btn">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
