import ApiKey from '../../models/ApiKey.js'
import { createLogger } from '../utils/logger.js'

const logger = createLogger('ApiKeyService')

export async function createApiKey(name, permissions = ['read:places']) {
    const key = ApiKey.generateKey()

    const apiKey = await ApiKey.create({
        key,
        name,
        permissions,
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
    })

    return apiKey
}

export async function validateApiKey(key) {
    const apiKey = await ApiKey.findOne({ key, is_active: true })

    if (!apiKey) return null
    if (apiKey.expires_at && apiKey.expires_at < new Date()) return null

    // Update usage stats async
    ApiKey.updateOne(
        { _id: apiKey._id },
        {
            $inc: { usage_count: 1 },
            $set: { last_used: new Date() }
        }
    ).exec()

    return apiKey
}

export async function listApiKeys() {
    return ApiKey.find({ is_active: true })
        .select('key name usage_count created_at last_used')
        .sort({ created_at: -1 })
}

export async function revokeApiKey(id) {
    return ApiKey.findByIdAndUpdate(id, { is_active: false })
}
