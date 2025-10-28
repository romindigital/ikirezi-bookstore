import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faShoppingCart, 
  faStar, 
  faEye, 
  faBookOpen, 
  faBolt,
  faCheck,
  faTimes,
  faCalendar,
  faLanguage,
  faBook,
  faTag
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { formatPrice, formatPriceWithDiscount } from '../utils/formatPrice';
import { calculateDiscount } from '../utils/calculateDiscount';
import { RatingStars } from './RatingStars';
import { trackInteraction, trackEcommerce } from '../services/analyticsService';
import { trackBookView } from '../services/personalizationService';
import { Tooltip } from './Tooltip';
import { QuickPreviewModal } from './QuickPreviewModal';
import { LazyImage } from './LazyImage';

export function BookCard({ 
  book, 
  showAddToCart = true, 
  showWishlist = true, 
  viewMode = 'grid',
  isSelected = false,
  onSelection = null
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (isAddingToCart) return;
    
    setIsAddingToCart(true);
    try {
      addToCart(book);
      
      // Track analytics
      trackInteraction('click', 'add_to_cart', book.title, 'book_card');
      trackEcommerce('add_to_cart', {
        item_id: book.id,
        item_name: book.title,
        category: book.categories?.[0] || 'Books',
        price: book.price,
        currency: 'USD'
      });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToCartAndNavigate = async () => {
    if (isAddingToCart) return;
    
    setIsAddingToCart(true);
    try {
      addToCart(book);
      
      // Track analytics
      trackInteraction('click', 'add_to_cart', book.title, 'book_card');
      trackEcommerce('add_to_cart', {
        item_id: book.id,
        item_name: book.title,
        category: book.categories?.[0] || 'Books',
        price: book.price,
        currency: 'USD'
      });
      
      // Navigate to cart page
      navigate('/cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = () => {
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);
    
    // Track analytics
    trackInteraction('click', newWishlistState ? 'add_to_wishlist' : 'remove_from_wishlist', book.title, 'book_card');
  };

  const handleBookView = () => {
    // Track book view for personalization
    trackBookView(book.id, book);
    
    // Track analytics
    trackInteraction('click', 'view_book', book.title, 'book_card');
  };

  const discount = calculateDiscount(book.price, book.discountPercent || 0);
  const isInCartItem = isInCart(book.id);
  const cartQuantity = getItemQuantity(book.id);

  // Render different layouts based on view mode
  if (viewMode === 'list') {
    return (
      <>
        <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex">
          {/* Book Image */}
          <div className="relative w-32 h-48 flex-shrink-0">
            <div 
              className="cursor-pointer"
              onClick={handleAddToCartAndNavigate}
              aria-label={`Add ${book.title} by ${book.author} to cart`}
            >
              <LazyImage
                src={book.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTUwTDEyMCAxODBIMTgwTDE1MCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjE0Ij5Cb29rIENvdmVyPC90ZXh0Pgo8L3N2Zz4K'}
                alt={`Book cover for ${book.title} by ${book.author}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                width="300"
                height="400"
              />
            </div>
            
            {/* Discount Badge */}
            {discount.hasDiscount && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                -{discount.discountPercent}%
              </div>
            )}

            {/* Wishlist Button */}
            {showWishlist && (
              <button
                onClick={handleWishlistToggle}
                className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
                  isWishlisted 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
                }`}
              >
                <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Book Details */}
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div 
                  className="cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={handleAddToCartAndNavigate}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-1 text-sm">by {book.author}</p>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{book.description}</p>
              </div>
              
              {/* Selection Button for Compare Mode */}
              {onSelection && (
                <button
                  onClick={onSelection}
                  className={`ml-4 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-300 text-gray-400 hover:border-blue-500'
                  }`}
                >
                  {isSelected ? (
                    <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <RatingStars rating={book.rating || 0} size="sm" />
                <span className="text-xs text-gray-500">({book.reviewCount || 0})</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  {discount.hasDiscount ? (
                    <div className="flex items-center space-x-1">
                      <span className="text-xl font-bold text-gray-900">
                        {formatPrice(discount.finalPrice)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(book.price)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl font-bold text-gray-900">
                      {formatPrice(book.price)}
                    </span>
                  )}
                </div>
                
                {showAddToCart && (
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart || book.stock === 0}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-1 text-sm ${
                      isInCartItem
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : book.stock === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Adding...</span>
                      </>
                    ) : isInCartItem ? (
                      <>
                        <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" />
                        <span>In Cart ({cartQuantity})</span>
                      </>
                    ) : book.stock === 0 ? (
                      <>
                        <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" />
                        <span>Out of Stock</span>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </article>

        <BookPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          book={book}
        />
      </>
    );
  }

  if (viewMode === 'compact') {
    return (
      <>
        <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
          <div className="relative">
            <div 
              className="cursor-pointer"
              onClick={handleAddToCartAndNavigate}
              aria-label={`Add ${book.title} by ${book.author} to cart`}
            >
              <LazyImage
                src={book.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTUwTDEyMCAxODBIMTgwTDE1MCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjE0Ij5Cb29rIENvdmVyPC90ZXh0Pgo8L3N2Zz4K'}
                alt={`Book cover for ${book.title} by ${book.author}`}
                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                width="300"
                height="400"
              />
            </div>
            
            {discount.hasDiscount && (
              <div className="absolute top-1 left-1 bg-red-500 text-white px-1 py-0.5 rounded text-xs font-bold">
                -{discount.discountPercent}%
              </div>
            )}
          </div>

          <div className="p-2">
            <h3 className="font-semibold text-gray-900 text-xs mb-1 line-clamp-2 leading-tight">
              {book.title}
            </h3>
            <p className="text-gray-600 text-xs mb-1 line-clamp-1">by {book.author}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-900">
                {discount.hasDiscount ? formatPrice(discount.finalPrice) : formatPrice(book.price)}
              </span>
              <RatingStars rating={book.rating || 0} size="xs" />
            </div>
          </div>
        </article>

        <BookPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          book={book}
        />
      </>
    );
  }

  // Enhanced grid view with better visual design
  return (
    <>
      <article className="book-card bg-white rounded-xl shadow-md hover:shadow-xl h-full flex flex-col transition-all duration-300 hover:-translate-y-2 group">
        {/* Enhanced Book Image with Visual Indicators */}
        <div className="relative overflow-hidden rounded-t-xl flex-shrink-0">
          <div 
            className="cursor-pointer"
            onClick={handleAddToCartAndNavigate}
            aria-label={`Add ${book.title} by ${book.author} to cart`}
          >
            <LazyImage
              src={book.image || '/api/placeholder/300/400'}
              alt={`Book cover for ${book.title} by ${book.author}`}
              className="w-full h-48 sm:h-52 lg:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              width="300"
              height="400"
            />
          </div>
          
          {/* Enhanced Visual Indicators */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {/* Trending Badge */}
            {book.isTrending && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                <FontAwesomeIcon icon={faBolt} className="w-3 h-3" />
                Trending
              </span>
            )}
            
            {/* New Badge */}
            {book.isNew && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                <FontAwesomeIcon icon={faBook} className="w-3 h-3" />
                New
              </span>
            )}
            
            {/* Sale Badge */}
            {discount.hasDiscount && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                <FontAwesomeIcon icon={faTag} className="w-3 h-3" />
                -{discount.discountPercent}%
              </span>
            )}
          </div>
          
          {/* Discount Badge */}
          {discount.hasDiscount && (
            <div 
              className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold"
              aria-label={`${discount.discountPercent}% discount`}
            >
              -{discount.discountPercent}%
            </div>
          )}

          {/* Wishlist Button */}
          {showWishlist && (
            <button
              onClick={handleWishlistToggle}
              className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 focus:ring-2 focus:ring-red-300 focus:outline-none ${
                isWishlisted 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
              }`}
              aria-label={isWishlisted ? `Remove ${book.title} from wishlist` : `Add ${book.title} to wishlist`}
            >
              <FontAwesomeIcon icon={faHeart} className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} aria-hidden="true" />
            </button>
          )}

          {/* Selection Button for Compare Mode */}
          {onSelection && (
            <button
              onClick={onSelection}
              className={`absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                isSelected
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-300 text-gray-400 hover:border-blue-500'
              }`}
            >
              {isSelected ? (
                <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
              ) : (
                <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
              )}
            </button>
          )}

          {/* Quick View Buttons */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
            <button
              onClick={() => setShowPreview(true)}
              className="bg-white text-gray-900 px-3 py-2 rounded-lg flex items-center space-x-1 hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-white focus:outline-none text-sm font-medium"
              aria-label={`Quick preview of ${book.title}`}
            >
              <FontAwesomeIcon icon={faEye} className="w-4 h-4" aria-hidden="true" />
              <span>Preview</span>
            </button>
            <Link
              to={`/book/${book.id}`}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center space-x-1 hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-300 focus:outline-none text-sm font-medium"
              aria-label={`View details for ${book.title}`}
              onClick={handleBookView}
            >
              <FontAwesomeIcon icon={faBookOpen} className="w-4 h-4" aria-hidden="true" />
              <span>Details</span>
            </Link>
          </div>
        </div>

        {/* Book Details */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Title */}
          <div 
            className="cursor-pointer hover:text-blue-600 transition-colors flex-grow"
            onClick={handleAddToCartAndNavigate}
          >
            <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 leading-tight min-h-[2.5rem]">
              {book.title}
            </h3>
          </div>

          {/* Author */}
          <p className="text-gray-600 text-xs mb-2 line-clamp-1">
            by {book.author}
          </p>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <RatingStars rating={book.rating || 0} size="sm" />
            <span className="text-xs text-gray-500" aria-label={`${book.reviewCount || 0} reviews`}>
              ({book.reviewCount || 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            {discount.hasDiscount ? (
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900" aria-label={`Sale price ${formatPrice(discount.finalPrice)}`}>
                  {formatPrice(discount.finalPrice)}
                </span>
                <span className="text-sm text-gray-500 line-through" aria-label={`Original price ${formatPrice(book.price)}`}>
                  {formatPrice(book.price)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900" aria-label={`Price ${formatPrice(book.price)}`}>
                {formatPrice(book.price)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          {showAddToCart && (
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart || book.stock === 0}
              className={`w-full py-2.5 px-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 focus:ring-2 focus:ring-blue-300 focus:outline-none disabled:cursor-not-allowed text-sm mt-auto ${
                isInCartItem
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : book.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'
              }`}
              aria-label={
                book.stock === 0 
                  ? `${book.title} is out of stock`
                  : isInCartItem 
                  ? `${book.title} is in cart (${cartQuantity} items)`
                  : `Add ${book.title} to cart`
              }
            >
              {isAddingToCart ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" aria-hidden="true"></div>
                  <span>Adding...</span>
                </>
              ) : isInCartItem ? (
                <>
                  <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" aria-hidden="true" />
                  <span>In Cart ({cartQuantity})</span>
                </>
              ) : book.stock === 0 ? (
                <>
                  <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" aria-hidden="true" />
                  <span>Out of Stock</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" aria-hidden="true" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          )}

          {/* Stock Status */}
          {book.stock <= 5 && book.stock > 0 && (
            <p className="text-xs text-orange-600 mt-2" role="alert" aria-live="polite">
              Only {book.stock} left in stock
            </p>
          )}
          {book.stock === 0 && (
            <p className="text-xs text-red-600 mt-2" role="alert" aria-live="polite">
              Out of stock
            </p>
          )}
        </div>
      </article>

      {/* Quick Preview Modal */}
      <QuickPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        book={book}
      />
    </>
  );
}

// Skeleton loading component for book cards
export function CardSkeleton({ viewMode = 'grid', count }) {
  // Determine how many skeleton cards to show based on viewport
  const getColumnsForWidth = (width) => {
    if (width >= 1536) return 6; // 2xl
    if (width >= 1280) return 5; // xl
    if (width >= 1024) return 4; // lg
    if (width >= 640) return 3;  // sm
    return 2;                    // base
  };

  let computedCount = count;
  if (!computedCount) {
    try {
      const cols = getColumnsForWidth(typeof window !== 'undefined' ? window.innerWidth : 1024);
      const rows = viewMode === 'list' ? 6 : 2; // more items for list, 2 rows for cards
      computedCount = cols * rows;
    } catch (e) {
      computedCount = viewMode === 'list' ? 6 : 8; // safe fallback
    }
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-3">
        {[...Array(computedCount)].map((_, idx) => (
          <article key={idx} className="bg-white rounded-xl shadow-md flex animate-pulse">
            <div className="w-32 h-48 bg-gray-300 rounded-l-xl flex-shrink-0"></div>
            <div className="flex-1 p-4 space-y-3">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-300 rounded"></div>
                  ))}
                </div>
                <div className="h-6 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  }

  if (viewMode === 'compact') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {[...Array(computedCount)].map((_, idx) => (
          <article key={idx} className="bg-white rounded-lg shadow-sm animate-pulse">
            <div className="h-32 bg-gray-300 rounded-t-lg"></div>
            <div className="p-2 space-y-2">
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-300 rounded w-12"></div>
                <div className="h-3 bg-gray-300 rounded w-10"></div>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  }

  // Default grid view skeleton
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {[...Array(computedCount)].map((_, idx) => (
        <article key={idx} className="bg-white rounded-xl shadow-md h-full flex flex-col animate-pulse">
          <div className="h-48 sm:h-52 lg:h-56 bg-gray-300 rounded-t-xl flex-shrink-0"></div>
          <div className="p-4 flex flex-col flex-grow space-y-3">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            <div className="flex items-center space-x-2">
              <div className="h-3 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="h-5 bg-gray-300 rounded w-16"></div>
            <div className="h-10 bg-gray-300 rounded w-full mt-auto"></div>
          </div>
        </article>
      ))}
    </div>
  );
}
