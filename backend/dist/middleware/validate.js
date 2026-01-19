/**
 * Validation Middleware
 *
 * Express middleware for request validation using Zod
 */
import { ZodError } from 'zod';
export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            });
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    error: {
                        status: 'fail',
                        code: 'VALIDATION_ERROR',
                        message: 'Invalid request data',
                        details: error.errors.map(err => ({
                            path: err.path.join('.'),
                            message: err.message
                        }))
                    }
                });
            }
            next(error);
        }
    };
};
// Validate specific parts of the request
export const validateQuery = (schema) => {
    return async (req, res, next) => {
        try {
            req.query = await schema.parseAsync(req.query);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    error: {
                        status: 'fail',
                        code: 'VALIDATION_ERROR',
                        message: 'Invalid query parameters',
                        details: error.errors
                    }
                });
            }
            next(error);
        }
    };
};
export const validateParams = (schema) => {
    return async (req, res, next) => {
        try {
            req.params = await schema.parseAsync(req.params);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    error: {
                        status: 'fail',
                        code: 'VALIDATION_ERROR',
                        message: 'Invalid path parameters',
                        details: error.errors
                    }
                });
            }
            next(error);
        }
    };
};
//# sourceMappingURL=validate.js.map