import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
import { createLogger } from '../utils/logger.js'

const logger = createLogger('AuthService')

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'dev_secret_key_change_in_prod', {
        expiresIn: '30d'
    })
}

export async function registerUser(name, email, password) {
    const userExists = await User.findOne({ email })

    if (userExists) {
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password_hash: password
    })

    if (user) {
        logger.info(`User registered: ${user._id}`)
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar_url: user.avatar_url,
            token: generateToken(user._id)
        }
    } else {
        throw new Error('Invalid user data')
    }
}

export async function loginUser(email, password) {
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        // Update last login
        user.last_login = new Date()
        await user.save()

        logger.info(`User logged in: ${user._id}`)
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar_url: user.avatar_url,
            preferences: user.preferences,
            token: generateToken(user._id)
        }
    } else {
        throw new Error('Invalid email or password')
    }
}

export async function getUserProfile(userId) {
    const user = await User.findById(userId).select('-password_hash')
    if (user) {
        return user
    } else {
        throw new Error('User not found')
    }
}

export async function updateUserProfile(userId, data) {
    const user = await User.findById(userId)

    if (user) {
        user.name = data.name || user.name
        user.email = data.email || user.email
        user.avatar_url = data.avatar_url || user.avatar_url

        if (data.preferences) {
            user.preferences = { ...user.preferences, ...data.preferences }
        }

        if (data.password) {
            user.password_hash = data.password
        }

        const updatedUser = await user.save()

        return {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar_url: updatedUser.avatar_url,
            preferences: updatedUser.preferences,
            token: generateToken(updatedUser._id)
        }
    } else {
        throw new Error('User not found')
    }
}
