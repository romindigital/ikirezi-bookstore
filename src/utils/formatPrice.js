/**
 * Format price with currency symbol and proper decimal places
 * @param {number} price - The price to format
 * @param {string} currency - The currency code (default: 'USD')
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Formatted price string
 */
export function formatPrice(price, currency = 'USD', locale = 'en-US') {
  if (typeof price !== 'number' || isNaN(price)) {
    return '$0.00';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Format price with discount applied
 * @param {number} originalPrice - The original price
 * @param {number} discountPercent - The discount percentage (0-100)
 * @param {string} currency - The currency code
 * @returns {object} Object with original, discounted, and savings
 */
export function formatPriceWithDiscount(originalPrice, discountPercent, currency = 'USD') {
  const discountAmount = (originalPrice * discountPercent) / 100;
  const discountedPrice = originalPrice - discountAmount;
  
  return {
    original: formatPrice(originalPrice, currency),
    discounted: formatPrice(discountedPrice, currency),
    savings: formatPrice(discountAmount, currency),
    discountPercent: Math.round(discountPercent)
  };
}

/**
 * Format large numbers with K, M, B suffixes
 * @param {number} num - The number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
