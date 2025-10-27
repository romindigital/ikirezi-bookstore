// Utility functions for handling images and fallbacks

/**
 * Creates a fallback SVG image data URI
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} text - Text to display on the fallback image
 * @returns {string} Data URI for the fallback image
 */
export function createFallbackImage(width = 300, height = 400, text = 'Book Cover') {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#F3F4F6"/>
      <path d="M${width/2} ${height/2}L${width/2 - 30} ${height/2 + 30}H${width/2 + 30}L${width/2} ${height/2}Z" fill="#9CA3AF"/>
      <text x="${width/2}" y="${height/2 + 50}" text-anchor="middle" fill="#6B7280" font-family="system-ui" font-size="${Math.min(width, height) * 0.05}">${text}</text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Handles image loading errors by replacing with fallback
 * @param {Event} event - The error event
 * @param {string} fallbackSrc - Fallback image source
 */
export function handleImageError(event, fallbackSrc) {
  if (event.target.src !== fallbackSrc) {
    event.target.src = fallbackSrc;
  }
}

/**
 * Preloads an image and returns a promise
 * @param {string} src - Image source URL
 * @returns {Promise} Promise that resolves when image loads or rejects on error
 */
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Checks if an image URL is valid and accessible
 * @param {string} url - Image URL to check
 * @returns {Promise<boolean>} Promise that resolves to true if image is accessible
 */
export async function isImageAccessible(url) {
  try {
    await preloadImage(url);
    return true;
  } catch (error) {
    console.warn(`Image not accessible: ${url}`, error);
    return false;
  }
}

/**
 * Gets a safe image URL with fallback
 * @param {string} originalSrc - Original image source
 * @param {number} width - Fallback image width
 * @param {number} height - Fallback image height
 * @param {string} fallbackText - Fallback image text
 * @returns {string} Safe image URL
 */
export function getSafeImageUrl(originalSrc, width = 300, height = 400, fallbackText = 'Book Cover') {
  if (!originalSrc || originalSrc.includes('/api/placeholder/')) {
    return createFallbackImage(width, height, fallbackText);
  }
  return originalSrc;
}
