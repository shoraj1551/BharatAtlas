/**
 * Data Loader for BharatAtlas
 * 
 * Orchestrates ETL pipelines to populate the database
 */

import { connectMongo, closeMongo } from '../src/services/mongoService.js'
import { CensusPipeline } from '../src/pipelines/censusPipeline.js'
import dotenv from 'dotenv'

dotenv.config()

async function runDataPipelines() {
    console.log('🚀 Starting Data Pipelines...')

    try {
        await connectMongo()

        // Run Census Pipeline
        const censusPipeline = new CensusPipeline()
        await censusPipeline.run()

        console.log('✅ All pipelines completed successfully')
        process.exit(0)
    } catch (error) {
        console.error('❌ Pipeline failed:', error)
        process.exit(1)
    }
}

runDataPipelines()
