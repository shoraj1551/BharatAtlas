import { Pipeline, CsvSource } from './etl.js'
import Place from '../../models/Place.js'
import HistoricalData from '../../models/HistoricalData.js'

export class CensusPipeline extends Pipeline {
    constructor() {
        super('Census2011')
        this.source = new CsvSource('data/raw/census_2011.csv')
    }

    async extract() {
        this.logger.info('Reading Census CSV...')
        return await this.source.read()
    }

    async transform(rawData) {
        this.logger.info(`Transforming ${rawData.length} records...`)

        return rawData.map(row => ({
            place: {
                place_id: `place_${row.state_code.toLowerCase()}_001`,
                canonical_name: row.canonical_name,
                place_type: row.state_code === 'DL' || row.state_code === 'CH' ? 'union_territory' : 'state', // Simplified logic
                state_code: row.state_code,
                area_sq_km: parseInt(row.area_sq_km),
                population: {
                    value: parseInt(row.population),
                    year: 2011,
                    source: 'Census of India 2011',
                    confidence: 0.95
                },
                literacy_rate: {
                    value: parseFloat(row.literacy_rate),
                    year: 2011,
                    source: 'Census of India 2011'
                },
                num_districts: { value: parseInt(row.num_districts) },
                verification_status: 'verified',
                data_quality_score: 0.9
            },
            historical: [
                {
                    metric: 'population',
                    value: parseInt(row.population),
                    year: 2011,
                    source: 'Census 2011'
                },
                {
                    metric: 'literacy_rate',
                    value: parseFloat(row.literacy_rate),
                    year: 2011,
                    source: 'Census 2011'
                }
            ]
        }))
    }

    async load(transformedData) {
        this.logger.info('Loading data into MongoDB...')

        let placesUpserted = 0
        let historicalUpserted = 0

        for (const item of transformedData) {
            // Upsert Place
            await Place.findOneAndUpdate(
                { place_id: item.place.place_id },
                { $set: item.place },
                { upsert: true, new: true }
            )
            placesUpserted++

            // Upsert Historical Data
            for (const hist of item.historical) {
                await HistoricalData.findOneAndUpdate(
                    {
                        place_id: item.place.place_id,
                        metric: hist.metric,
                        year: hist.year
                    },
                    { $set: hist },
                    { upsert: true }
                )
                historicalUpserted++
            }
        }

        this.logger.info(`Pipeline Result: ${placesUpserted} places, ${historicalUpserted} historical records`)
    }
}
