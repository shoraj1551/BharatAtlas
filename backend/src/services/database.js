/**
 * PostgreSQL Database Connection Pool
 * 
 * Manages database connections with pooling for performance
 */

import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

// Database configuration
const config = {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'bharatatlas',
    password: process.env.DB_PASSWORD || 'postgres',
    port: parseInt(process.env.DB_PORT || '5432'),

    // Pool configuration
    max: 20,  // Maximum number of clients in the pool
    idleTimeoutMillis: 30000,  // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000,  // Return error after 2 seconds if no connection available
}

// Create pool
const pool = new Pool(config)

// Pool error handler
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
}

// Test connection on startup
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message)
        console.error('Make sure PostgreSQL is running and database exists')
        console.error('Run: ./database/setup.sh')
    } else {
        console.log('✓ Database connected:', res.rows[0].now)
    }
})

/**
 * Execute a query
 * @param {string} text - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise} Query result
 */
export async function query(text, params) {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start

    if (process.env.NODE_ENV === 'development') {
        console.log('Query executed:', { text, duration, rows: res.rowCount })
    }

    return res
}

/**
 * Get a client from the pool for transactions
 * @returns {Promise} Database client
 */
export async function getClient() {
    const client = await pool.connect()
    return client
}

export default pool
