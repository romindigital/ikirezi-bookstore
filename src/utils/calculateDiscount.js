/**
 * Calculate discount amount and final price
 * @param {number} originalPrice - The original price
 * @param {number} discountPercent - The discount percentage (0-100)
 * @returns {object} Object with discount details
 */
export function calculateDiscount(originalPrice, discountPercent) {
  if (typeof originalPrice !== 'number' || isNaN(originalPrice)) {
    return {
      originalPrice: 0,
      discountAmount: 0,
      finalPrice: 0,
      discountPercent: 0,
      hasDiscount: false
    };
  }

  if (typeof discountPercent !== 'number' || isNaN(discountPercent) || discountPercent <= 0) {
    return {
      originalPrice,
      discountAmount: 0,
      finalPrice: originalPrice,
      discountPercent: 0,
      hasDiscount: false
    };
  }

  const discountAmount = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - discountAmount;

  return {
    originalPrice,
    discountAmount: parseFloat(discountAmount.toFixed(2)),
    finalPrice: parseFloat(finalPrice.toFixed(2)),
    discountPercent: Math.round(discountPercent),
    hasDiscount: discountPercent > 0
  };
}

/**
 * Calculate bulk discount based on quantity
 * @param {number} price - The unit price
 * @param {number} quantity - The quantity
 * @returns {object} Object with bulk discount details
 */
export function calculateBulkDiscount(price, quantity) {
  let discountPercent = 0;
  
  if (quantity >= 10) {
    discountPercent = 15; // 15% off for 10+ items
  } else if (quantity >= 5) {
    discountPercent = 10; // 10% off for 5+ items
  } else if (quantity >= 3) {
    discountPercent = 5; // 5% off for 3+ items
  }

  return calculateDiscount(price, discountPercent);
}

/**
 * Calculate cart total with all discounts applied
 * @param {Array} items - Array of cart items
 * @returns {object} Object with cart totals
 */
export function calculateCartTotal(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return {
      subtotal: 0,
      totalDiscount: 0,
      total: 0,
      itemCount: 0,
      savings: 0
    };
  }

  let subtotal = 0;
  let totalDiscount = 0;
  let itemCount = 0;

  items.forEach(item => {
    const itemSubtotal = item.price * item.quantity;
    subtotal += itemSubtotal;
    itemCount += item.quantity;

    if (item.discountPercent && item.discountPercent > 0) {
      const discount = calculateDiscount(item.price, item.discountPercent);
      totalDiscount += discount.discountAmount * item.quantity;
    }
  });

  const total = subtotal - totalDiscount;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    totalDiscount: parseFloat(totalDiscount.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    itemCount,
    savings: totalDiscount
  };
}

/**
 * Check if a book is on sale
 * @param {object} book - The book object
 * @returns {boolean} True if the book has a discount
 */
export function isOnSale(book) {
  return book.discountPercent && book.discountPercent > 0;
}

/**
 * Get the effective price (discounted or original)
 * @param {object} book - The book object
 * @returns {number} The effective price
 */
export function getEffectivePrice(book) {
  if (isOnSale(book)) {
    const discount = calculateDiscount(book.price, book.discountPercent);
    return discount.finalPrice;
  }
  return book.price;
}
