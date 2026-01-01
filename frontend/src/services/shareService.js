/**
 * Share Service
 * 
 * Handles sharing and embedding functionality
 */

/**
 * Generate shareable URL for a place
 */
export function getPlaceShareUrl(placeId) {
    const baseUrl = window.location.origin
    return `${baseUrl}/place/${placeId}`
}

/**
 * Generate shareable URL for comparison
 */
export function getComparisonShareUrl(placeIds) {
    const baseUrl = window.location.origin
    const idsParam = placeIds.join(',')
    return `${baseUrl}/compare?places=${idsParam}`
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text)
        return true
    } catch (err) {
        console.error('Failed to copy:', err)
        return false
    }
}

/**
 * Share via Web Share API (mobile)
 */
export async function shareViaWebShare(title, text, url) {
    if (!navigator.share) {
        return false
    }

    try {
        await navigator.share({ title, text, url })
        return true
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error('Share failed:', err)
        }
        return false
    }
}

/**
 * Generate Twitter share URL
 */
export function getTwitterShareUrl(text, url) {
    const params = new URLSearchParams({
        text: text,
        url: url,
        hashtags: 'BharatAtlas,India'
    })
    return `https://twitter.com/intent/tweet?${params.toString()}`
}

/**
 * Generate Facebook share URL
 */
export function getFacebookShareUrl(url) {
    const params = new URLSearchParams({
        u: url
    })
    return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`
}

/**
 * Generate LinkedIn share URL
 */
export function getLinkedInShareUrl(url) {
    const params = new URLSearchParams({
        url: url
    })
    return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`
}

/**
 * Generate WhatsApp share URL
 */
export function getWhatsAppShareUrl(text, url) {
    const message = `${text}\n${url}`
    const params = new URLSearchParams({
        text: message
    })
    return `https://wa.me/?${params.toString()}`
}

/**
 * Generate embed code for place
 */
export function generatePlaceEmbedCode(placeId, width = 600, height = 400) {
    const baseUrl = window.location.origin
    const embedUrl = `${baseUrl}/embed/place/${placeId}`

    return `<iframe src="${embedUrl}" width="${width}" height="${height}" frameborder="0" style="border: 1px solid #e5e7eb; border-radius: 8px;"></iframe>`
}

/**
 * Generate embed code for comparison
 */
export function generateComparisonEmbedCode(placeIds, width = 800, height = 600) {
    const baseUrl = window.location.origin
    const idsParam = placeIds.join(',')
    const embedUrl = `${baseUrl}/embed/compare?places=${idsParam}`

    return `<iframe src="${embedUrl}" width="${width}" height="${height}" frameborder="0" style="border: 1px solid #e5e7eb; border-radius: 8px;"></iframe>`
}

export default {
    getPlaceShareUrl,
    getComparisonShareUrl,
    copyToClipboard,
    shareViaWebShare,
    getTwitterShareUrl,
    getFacebookShareUrl,
    getLinkedInShareUrl,
    getWhatsAppShareUrl,
    generatePlaceEmbedCode,
    generateComparisonEmbedCode
}
