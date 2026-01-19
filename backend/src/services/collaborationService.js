import Workspace from '../../models/Workspace.js'
import User from '../../models/User.js'
import crypto from 'crypto'
import { createLogger } from '../utils/logger.js'

const logger = createLogger('CollaborationService')

/**
 * Share workspace with a user
 */
export async function shareWorkspace(workspaceId, userEmail, role = 'viewer', requestingUserId) {
    const workspace = await Workspace.findOne({ workspace_id: workspaceId })

    if (!workspace) {
        throw new Error('Workspace not found')
    }

    // Check if requesting user is owner
    if (workspace.owner_id && workspace.owner_id.toString() !== requestingUserId.toString()) {
        throw new Error('Only workspace owner can share')
    }

    // Find user by email
    const user = await User.findOne({ email: userEmail })
    if (!user) {
        throw new Error('User not found')
    }

    // Check if already a collaborator
    const existingCollaborator = workspace.collaborators.find(
        c => c.user_id.toString() === user._id.toString()
    )

    if (existingCollaborator) {
        throw new Error('User is already a collaborator')
    }

    // Add collaborator
    workspace.collaborators.push({
        user_id: user._id,
        role,
        added_at: new Date()
    })

    // Log activity
    workspace.activity_log.push({
        user_id: requestingUserId,
        action: `Added ${user.name} as ${role}`,
        timestamp: new Date()
    })

    await workspace.save()

    logger.info(`Workspace ${workspaceId} shared with ${userEmail}`)

    return workspace
}

/**
 * Remove collaborator from workspace
 */
export async function removeCollaborator(workspaceId, userId, requestingUserId) {
    const workspace = await Workspace.findOne({ workspace_id: workspaceId })

    if (!workspace) {
        throw new Error('Workspace not found')
    }

    // Check if requesting user is owner
    if (workspace.owner_id && workspace.owner_id.toString() !== requestingUserId.toString()) {
        throw new Error('Only workspace owner can remove collaborators')
    }

    // Remove collaborator
    workspace.collaborators = workspace.collaborators.filter(
        c => c.user_id.toString() !== userId.toString()
    )

    // Log activity
    workspace.activity_log.push({
        user_id: requestingUserId,
        action: `Removed collaborator`,
        timestamp: new Date()
    })

    await workspace.save()

    return workspace
}

/**
 * Update collaborator permissions
 */
export async function updatePermissions(workspaceId, userId, newRole, requestingUserId) {
    const workspace = await Workspace.findOne({ workspace_id: workspaceId })

    if (!workspace) {
        throw new Error('Workspace not found')
    }

    // Check if requesting user is owner
    if (workspace.owner_id && workspace.owner_id.toString() !== requestingUserId.toString()) {
        throw new Error('Only workspace owner can update permissions')
    }

    // Find and update collaborator
    const collaborator = workspace.collaborators.find(
        c => c.user_id.toString() === userId.toString()
    )

    if (!collaborator) {
        throw new Error('Collaborator not found')
    }

    collaborator.role = newRole

    // Log activity
    workspace.activity_log.push({
        user_id: requestingUserId,
        action: `Changed permissions to ${newRole}`,
        timestamp: new Date()
    })

    await workspace.save()

    return workspace
}

/**
 * Get workspaces shared with a user
 */
export async function getSharedWorkspaces(userId) {
    const workspaces = await Workspace.find({
        'collaborators.user_id': userId
    }).populate('owner_id', 'name email avatar_url')

    return workspaces
}

/**
 * Generate shareable link for workspace
 */
export async function generateShareLink(workspaceId, requestingUserId) {
    const workspace = await Workspace.findOne({ workspace_id: workspaceId })

    if (!workspace) {
        throw new Error('Workspace not found')
    }

    // Check if requesting user is owner
    if (workspace.owner_id && workspace.owner_id.toString() !== requestingUserId.toString()) {
        throw new Error('Only workspace owner can generate share links')
    }

    // Generate unique link token
    const linkToken = crypto.randomBytes(16).toString('hex')
    workspace.shared_link = linkToken

    // Log activity
    workspace.activity_log.push({
        user_id: requestingUserId,
        action: 'Generated share link',
        timestamp: new Date()
    })

    await workspace.save()

    return linkToken
}

/**
 * Log activity in workspace
 */
export async function logActivity(workspaceId, userId, action) {
    const workspace = await Workspace.findOne({ workspace_id: workspaceId })

    if (!workspace) {
        throw new Error('Workspace not found')
    }

    workspace.activity_log.push({
        user_id: userId,
        action,
        timestamp: new Date()
    })

    // Keep only last 100 activities
    if (workspace.activity_log.length > 100) {
        workspace.activity_log = workspace.activity_log.slice(-100)
    }

    await workspace.save()
}

/**
 * Check if user has access to workspace
 */
export async function checkAccess(workspaceId, userId) {
    const workspace = await Workspace.findOne({ workspace_id: workspaceId })

    if (!workspace) {
        return { hasAccess: false, role: null }
    }

    // Check if owner
    if (workspace.owner_id && workspace.owner_id.toString() === userId.toString()) {
        return { hasAccess: true, role: 'owner' }
    }

    // Check if collaborator
    const collaborator = workspace.collaborators.find(
        c => c.user_id.toString() === userId.toString()
    )

    if (collaborator) {
        return { hasAccess: true, role: collaborator.role }
    }

    // Check if public
    if (workspace.visibility === 'public') {
        return { hasAccess: true, role: 'viewer' }
    }

    return { hasAccess: false, role: null }
}
