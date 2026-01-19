import { removeCollaborator, updatePermissions } from '../services/collaborationService'
import './CollaboratorList.css'

export default function CollaboratorList({ collaborators, workspaceId, isOwner, onUpdate }) {
    const handleRemove = async (userId) => {
        if (!window.confirm('Remove this collaborator?')) return

        try {
            await removeCollaborator(workspaceId, userId)
            if (onUpdate) onUpdate()
        } catch (error) {
            alert(error.message)
        }
    }

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updatePermissions(workspaceId, userId, newRole)
            if (onUpdate) onUpdate()
        } catch (error) {
            alert(error.message)
        }
    }

    if (!collaborators || collaborators.length === 0) {
        return <div className="no-collaborators">No collaborators yet</div>
    }

    return (
        <div className="collaborator-list">
            {collaborators.map((collab) => (
                <div key={collab.user_id._id || collab.user_id} className="collaborator-item">
                    <div className="collaborator-info">
                        <div className="avatar-small">
                            {collab.user_id.name?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div className="collaborator-details">
                            <strong>{collab.user_id.name || 'Unknown'}</strong>
                            <span className="email">{collab.user_id.email}</span>
                        </div>
                    </div>

                    <div className="collaborator-actions">
                        {isOwner ? (
                            <>
                                <select
                                    value={collab.role}
                                    onChange={(e) => handleRoleChange(collab.user_id._id || collab.user_id, e.target.value)}
                                    className="role-select"
                                >
                                    <option value="viewer">Viewer</option>
                                    <option value="editor">Editor</option>
                                </select>
                                <button
                                    onClick={() => handleRemove(collab.user_id._id || collab.user_id)}
                                    className="remove-btn"
                                >
                                    Remove
                                </button>
                            </>
                        ) : (
                            <span className={`role-badge ${collab.role}`}>{collab.role}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
