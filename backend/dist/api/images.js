/**
 * Images API Router
 *
 * Endpoints for fetching images from Wikimedia Commons
 */
import express from 'express';
import NodeCache from 'node-cache';
const router = express.Router();
// Cache instance (TTL: 24 hours for images)
const cache = new NodeCache({ stdTTL: 86400 });
/**
 * Fetch images from Wikimedia Commons API
 */
async function fetchWikimediaImages(placeName, limit = 5) {
    try {
        // Wikimedia Commons API endpoint
        const searchQuery = encodeURIComponent(placeName);
        const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch=${searchQuery}&gsrlimit=${limit}&prop=imageinfo&iiprop=url|extmetadata`;
        const response = await fetch(url);
        const data = await response.json();
        if (!data.query || !data.query.pages) {
            return [];
        }
        // Transform to our format
        const images = Object.values(data.query.pages).map(page => {
            const imageInfo = page.imageinfo?.[0];
            const metadata = imageInfo?.extmetadata;
            return {
                url: imageInfo?.url,
                title: page.title?.replace('File:', ''),
                license: metadata?.LicenseShortName?.value || 'Unknown',
                attribution: metadata?.Artist?.value || 'Unknown',
                description: metadata?.ImageDescription?.value
            };
        }).filter(img => img.url); // Filter out any without URLs
        return images;
    }
    catch (err) {
        console.error('Error fetching Wikimedia images:', err);
        return [];
    }
}
/**
 * GET /api/images?place=Jaipur&type=district&limit=5
 * Returns images for specified place from Wikimedia Commons
 */
router.get('/', async (req, res, next) => {
    try {
        const { place, type = 'place', limit = 5 } = req.query;
        if (!place) {
            return res.status(400).json({ error: 'Place parameter is required' });
        }
        const cacheKey = `images:${place}:${type}:${limit}`;
        // Check cache
        const cached = cache.get(cacheKey);
        if (cached) {
            console.log(`✓ Cache hit: images for ${place}`);
            return res.json({ images: cached });
        }
        // Fetch from Wikimedia
        console.log(`Fetching images for ${place} from Wikimedia Commons...`);
        const images = await fetchWikimediaImages(place, parseInt(limit));
        // Cache result
        cache.set(cacheKey, images);
        console.log(`✓ Found ${images.length} images for ${place}`);
        res.json({ images });
    }
    catch (err) {
        next(err);
    }
});
export default router;
//# sourceMappingURL=images.js.map