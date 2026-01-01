/**
 * MongoDB Service for BharatAtlas
 * 
 * Handles MongoDB Atlas connection and provides database access
 */

import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI
const DB_NAME = 'bharatatlas'

let client = null
let db = null

/**
 * Connect to MongoDB Atlas
 */
export async function connectMongo() {
    if (db) {
        return db
    }

    try {
        if (!MONGO_URI) {
            throw new Error('MONGO_URI not found in environment variables')
        }

        client = new MongoClient(MONGO_URI)
        await client.connect()
        db = client.db(DB_NAME)
        console.log('✅ Connected to MongoDB Atlas')
        return db
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message)
        throw error
    }
}

/**
 * Get MongoDB database instance
 */
export function getMongoDb() {
    if (!db) {
        throw new Error('MongoDB not connected. Call connectMongo() first.')
    }
    return db
}

/**
 * Close MongoDB connection
 */
export async function closeMongo() {
    if (client) {
        await client.close()
        client = null
        db = null
        console.log('MongoDB connection closed')
    }
}

export default {
    connectMongo,
    getMongoDb,
    closeMongo
}
