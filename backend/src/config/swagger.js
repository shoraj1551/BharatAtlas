/**
 * Swagger/OpenAPI Configuration
 * 
 * Generates API documentation from JSDoc comments
 */

import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BharatAtlas API',
            version: '1.0.0',
            description: 'Comprehensive API for hierarchical geospatial data and intelligence about India',
            contact: {
                name: 'BharatAtlas Team'
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Development server'
            },
            {
                url: '/api/v1',
                description: 'API v1 (versioned)'
            }
        ],
        tags: [
            {
                name: 'Places',
                description: 'Place data and search operations'
            },
            {
                name: 'Geo',
                description: 'Geospatial data operations'
            },
            {
                name: 'Images',
                description: 'Image services'
            },
            {
                name: 'AI',
                description: 'AI-powered features'
            },
            {
                name: 'Community',
                description: 'Community features'
            },
            {
                name: 'Opportunities',
                description: 'Business opportunities'
            },
            {
                name: 'Workspace',
                description: 'Workspace management'
            }
        ],
        components: {
            schemas: {
                Place: {
                    type: 'object',
                    properties: {
                        place_id: { type: 'string', example: 'karnataka' },
                        canonical_name: { type: 'string', example: 'Karnataka' },
                        place_type: {
                            type: 'string',
                            enum: ['state', 'district', 'city', 'union territory'],
                            example: 'state'
                        },
                        population: {
                            type: 'object',
                            properties: {
                                value: { type: 'number', example: 61095297 },
                                year: { type: 'number', example: 2011 },
                                source: { type: 'string', example: 'Census 2011' }
                            }
                        }
                    }
                },
                ApiResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        data: { type: 'object' },
                        error: {
                            type: 'object',
                            properties: {
                                status: { type: 'string' },
                                message: { type: 'string' }
                            }
                        }
                    }
                },
                PaginatedResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        data: { type: 'array', items: { type: 'object' } },
                        pagination: {
                            type: 'object',
                            properties: {
                                page: { type: 'number' },
                                limit: { type: 'number' },
                                total: { type: 'number' },
                                totalPages: { type: 'number' },
                                hasMore: { type: 'boolean' }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/api/**/*.js', './src/api/v1/*.js']
}

export const swaggerSpec = swaggerJsdoc(options)
