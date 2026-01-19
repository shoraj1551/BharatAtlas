import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password_hash: { type: String, required: true },
    avatar_url: String,
    preferences: {
        language: { type: String, default: 'en' },
        theme: { type: String, default: 'light' },
        notifications_enabled: { type: Boolean, default: true }
    },
    last_login: Date
}, { timestamps: true })

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password_hash)
}

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password_hash')) return next()
    const salt = await bcrypt.genSalt(10)
    this.password_hash = await bcrypt.hash(this.password_hash, salt)
    next()
})

export default mongoose.model('User', UserSchema)
