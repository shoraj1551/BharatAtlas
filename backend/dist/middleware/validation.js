/**
 * Input Validation Middleware
 *
 * Validates and sanitizes user input to prevent injection attacks
 */
/**
 * Validate state name parameter
 */
export function validateStateName(req, res, next) {
    const { state } = req.query;
    if (!state) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'State parameter is required',
            field: 'state'
        });
    }
    // Sanitize: only allow letters, spaces, and hyphens
    const sanitized = state.trim();
    if (!/^[a-zA-Z\s-]+$/.test(sanitized)) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'State name contains invalid characters',
            field: 'state'
        });
    }
    // Length validation
    if (sanitized.length < 2 || sanitized.length > 50) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'State name must be between 2 and 50 characters',
            field: 'state'
        });
    }
    // Attach sanitized value
    req.query.state = sanitized;
    next();
}
/**
 * Validate district name parameter
 */
export function validateDistrictName(req, res, next) {
    const { district } = req.query;
    if (!district) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'District parameter is required',
            field: 'district'
        });
    }
    const sanitized = district.trim();
    if (!/^[a-zA-Z\s-]+$/.test(sanitized)) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'District name contains invalid characters',
            field: 'district'
        });
    }
    if (sanitized.length < 2 || sanitized.length > 50) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'District name must be between 2 and 50 characters',
            field: 'district'
        });
    }
    req.query.district = sanitized;
    next();
}
/**
 * Validate tehsil name parameter
 */
export function validateTehsilName(req, res, next) {
    const { tehsil } = req.query;
    if (!tehsil) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Tehsil parameter is required',
            field: 'tehsil'
        });
    }
    const sanitized = tehsil.trim();
    if (!/^[a-zA-Z\s-]+$/.test(sanitized)) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Tehsil name contains invalid characters',
            field: 'tehsil'
        });
    }
    if (sanitized.length < 2 || sanitized.length > 50) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Tehsil name must be between 2 and 50 characters',
            field: 'tehsil'
        });
    }
    req.query.tehsil = sanitized;
    next();
}
/**
 * Validate thana name parameter
 */
export function validateThanaName(req, res, next) {
    const { thana } = req.query;
    if (!thana) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Thana parameter is required',
            field: 'thana'
        });
    }
    const sanitized = thana.trim();
    if (!/^[a-zA-Z\s-]+$/.test(sanitized)) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Thana name contains invalid characters',
            field: 'thana'
        });
    }
    if (sanitized.length < 2 || sanitized.length > 50) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Thana name must be between 2 and 50 characters',
            field: 'thana'
        });
    }
    req.query.thana = sanitized;
    next();
}
/**
 * Validate limit parameter
 */
export function validateLimit(req, res, next) {
    const { limit = 100 } = req.query;
    const parsedLimit = parseInt(limit, 10);
    if (isNaN(parsedLimit)) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Limit must be a number',
            field: 'limit'
        });
    }
    if (parsedLimit < 1 || parsedLimit > 1000) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Limit must be between 1 and 1000',
            field: 'limit'
        });
    }
    req.query.limit = parsedLimit;
    next();
}
//# sourceMappingURL=validation.js.map