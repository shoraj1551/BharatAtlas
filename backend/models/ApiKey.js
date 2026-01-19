import mongoose from 'mongoose'
import crypto from 'crypto'

const ApiKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  permissions: [{
    type: String,
    enum: ['read:places', 'read:geo', 'read:all']
  }],
  rate_limit: {
    type: Number,
    default: 1000 // requests per hour
  },
  usage_count: {
    type: Number,
    default: 0
  },
  last_used: Date,
  is_active: {
    type: Boolean,
    default: true
  },
  expires_at: Date
}, {
  timestamps: true
})

// Generate secure key
ApiKeySchema.statics.generateKey = function() {
  return `sk_${crypto.randomBytes(24).toString('hex')}`
}

export default mongoose.model('ApiKey', ApiKeySchema)
