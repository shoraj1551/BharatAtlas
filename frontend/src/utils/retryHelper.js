/**
 * Retry Helper Utility
 * 
 * Provides retry logic with exponential backoff for failed async operations
 */

/**
 * Retry an async function with exponential backoff
 * 
 * @param {Function} fn - Async function to retry
 * @param {Object} options - Retry options
 * @param {number} options.maxRetries - Maximum number of retry attempts (default: 3)
 * @param {number} options.initialDelay - Initial delay in ms (default: 1000)
 * @param {number} options.maxDelay - Maximum delay in ms (default: 10000)
 * @param {Function} options.shouldRetry - Function to determine if error should trigger retry
 * @returns {Promise} Result of the function or throws last error
 */
export async function retryWithBackoff(fn, options = {}) {
    const {
        maxRetries = 3,
        initialDelay = 1000,
        maxDelay = 10000,
        shouldRetry = () => true
    } = options

    let lastError
    let delay = initialDelay

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn()
        } catch (error) {
            lastError = error

            // Don't retry if we've exhausted attempts
            if (attempt === maxRetries) {
                break
            }

            // Don't retry if error shouldn't be retried
            if (!shouldRetry(error)) {
                break
            }

            // Log retry attempt
            console.warn(`Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`, error.message)

            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, delay))

            // Exponential backoff with jitter
            delay = Math.min(delay * 2 + Math.random() * 1000, maxDelay)
        }
    }

    throw lastError
}

/**
 * Default retry policy for network errors
 */
export function shouldRetryNetworkError(error) {
    // Don't retry on client errors (4xx)
    if (error.response && error.response.status >= 400 && error.response.status < 500) {
        return false
    }

    // Don't retry on abort errors
    if (error.name === 'AbortError') {
        return false
    }

    // Retry on network errors, timeouts, and server errors (5xx)
    return true
}

/**
 * Fetch with retry
 * 
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options
 * @param {Object} retryOptions - Retry options
 * @returns {Promise<Response>} Fetch response
 */
export async function fetchWithRetry(url, options = {}, retryOptions = {}) {
    return retryWithBackoff(
        () => fetch(url, options).then(response => {
            if (!response.ok) {
                const error = new Error(`HTTP ${response.status}: ${response.statusText}`)
                error.response = response
                throw error
            }
            return response
        }),
        {
            shouldRetry: shouldRetryNetworkError,
            ...retryOptions
        }
    )
}
