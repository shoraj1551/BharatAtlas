/**
 * Validation Middleware
 * 
 * Express middleware for request validation using Zod
 */

import { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'

// Fix for TS7030: explicitly return void
export const validate = (schema: ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            })
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    error: {
                        status: 'fail',
                        code: 'VALIDATION_ERROR',
                        message: 'Invalid request data',
                        details: (error as any).errors.map((err: any) => ({
                            path: err.path.join('.'),
                            message: err.message
                        }))
                    }
                })
                return
            }
            next(error)
        }
    }
}

// Validate specific parts of the request
export const validateQuery = (schema: ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            req.query = await schema.parseAsync(req.query) as any
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    error: {
                        status: 'fail',
                        code: 'VALIDATION_ERROR',
                        message: 'Invalid query parameters',
                        details: (error as any).errors
                    }
                })
                return
            }
            next(error)
        }
    }
}

export const validateParams = (schema: ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            req.params = await schema.parseAsync(req.params) as any
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    error: {
                        status: 'fail',
                        code: 'VALIDATION_ERROR',
                        message: 'Invalid path parameters',
                        details: (error as any).errors
                    }
                })
                return
            }
            next(error)
        }
    }
}
