/**
 * Base ETL Pipeline
 */

import fs from 'fs/promises'
import path from 'path'
import { createLogger } from '../utils/logger.js'

export class Pipeline {
    constructor(name) {
        this.name = name
        this.logger = createLogger(`Pipeline:${name}`)
    }

    async run() {
        this.logger.info('Starting pipeline...')
        try {
            const rawData = await this.extract()
            const transformedData = await this.transform(rawData)
            await this.load(transformedData)
            this.logger.info('Pipeline completed successfully')
        } catch (error) {
            this.logger.error('Pipeline failed', error)
            throw error
        }
    }

    async extract() {
        throw new Error('Method "extract" must be implemented')
    }

    async transform(data) {
        throw new Error('Method "transform" must be implemented')
    }

    async load(data) {
        throw new Error('Method "load" must be implemented')
    }
}

export class CsvSource {
    constructor(filePath) {
        this.filePath = filePath
    }

    async read() {
        const data = await fs.readFile(this.filePath, 'utf-8')
        const lines = data.trim().split('\n')
        const headers = lines[0].split(',').map(h => h.trim())

        return lines.slice(1).map(line => {
            const values = line.split(',')
            return headers.reduce((obj, header, index) => {
                obj[header] = values[index]?.trim()
                return obj
            }, {})
        })
    }
}
