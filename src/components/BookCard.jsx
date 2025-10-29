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
import { useTranslation } from '../hooks/useTranslation';

export function BookCard({ 
  book, 
  showAddToCart = true, 
  showWishlist = true, 
  viewMode = 'grid',
  isSelected = false,
  onSelection = null,
  className = ''
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  // Premium badge configurations
  const getPremiumBadge = () => {
    if (book.isBestseller) {
      return {
        label: 'Bestseller',
        icon: faBolt,
        color: 'from-purple-600 to-purple-700',
        textColor: 'text-white'
      };
    }
    if (book.isNew) {
      return {
        label: 'New Release',
        icon: faLanguage,
        color: 'from-blue-600 to-cyan-600',
        textColor: 'text-white'
      };
    }
    if (book.isTrending) {
      return {
        label: 'Trending',
        icon: faBolt,
        color: 'from-orange-500 to-red-500',
        textColor: 'text-white'
      };
    }
    if (book.award) {
      return {
        label: book.award,
        icon: faBook,
        color: 'from-amber-500 to-yellow-500',
        textColor: 'text-white'
      };
    }
    return null;
  };

  const premiumBadge = getPremiumBadge();

  if (viewMode === 'list') {
    return (
      <>
        <article className={`bg-white rounded-2xl transition-all duration-500 group border border-gray-100/80 backdrop-blur-sm ${className}`}>
          <div className="flex items-start gap-6 p-6">
            {/* Book Image */}
            <div className="relative flex-shrink-0">
              <Link 
                to={`/book/${book.id}`}
                className="block relative overflow-hidden rounded-xl group/image"
              >
                <div className={`w-28 h-36 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl transition-all duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} />
                <img
                  src={book.image}
                  alt={book.title}
                  onLoad={() => setImageLoaded(true)}
                  className={`w-28 h-36 object-cover rounded-xl transition-all duration-500 group-hover/image:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-all duration-300 rounded-xl" />
              </Link>

              {/* Premium Badge */}
              {premiumBadge && (
                <div className={`absolute -top-2 -left-2 bg-gradient-to-r ${premiumBadge.color} ${premiumBadge.textColor} px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5`}>
                  <FontAwesomeIcon icon={premiumBadge.icon} className="w-3 h-3" />
                  {premiumBadge.label}
                </div>
              )}
            </div>

            {/* Book Details */}
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <Link to={`/book/${book.id}`}>
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 leading-tight mb-2">
                      {book.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm font-medium">by {book.author}</p>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                    {book.description}
                  </p>
                </div>

                {/* Selection Button */}
                {onSelection && (
                  <button
                    onClick={onSelection}
                    className={`flex-shrink-0 w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                        : 'bg-white border-gray-300 text-gray-400 hover:border-blue-400 hover:scale-110'
                    }`}
                  >
                    {isSelected ? (
                      <FontAwesomeIcon icon={faCheck} className="w-5 h-5" />
                    ) : (
                      <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <RatingStars rating={book.rating || 0} size="md" />
                  <span className="text-sm text-gray-500">({book.reviewCount || 0})</span>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Price */}
                  <div className="text-right">
                    {discount.hasDiscount ? (
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-900">
                          {formatPrice(discount.finalPrice)}
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(book.price)}
                        </span>
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          -{discount.discountPercent}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(book.price)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart */}
                  {showAddToCart && (
                    <button
                      onClick={handleAddToCart}
                      disabled={isAddingToCart || book.stock === 0}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                        isInCartItem
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : book.stock === 0
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
                      }`}
                    >
                      {isAddingToCart ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                          <span>{t('common.loading')}</span>
                        </>
                      ) : isInCartItem ? (
                        <>
                          <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
                          <span>{t('book.in_cart')} ({cartQuantity})</span>
                        </>
                      ) : book.stock === 0 ? (
                        <>
                          <FontAwesomeIcon icon={faCalendar} className="w-5 h-5" />
                          <span>{t('book.out_of_stock')}</span>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
                          <span>{t('book.add_to_cart')}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>

        <QuickPreviewModal
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
        <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100">
          <div className="relative">
            <Link 
              to={`/book/${book.id}`}
              className="block relative overflow-hidden rounded-t-xl"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
            </Link>
            
            {discount.hasDiscount && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                -{discount.discountPercent}%
              </div>
            )}
          </div>

          <div className="p-3 space-y-2">
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight">
              {book.title}
            </h3>
            <p className="text-gray-600 text-xs line-clamp-1">by {book.author}</p>
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-gray-900">
                {discount.hasDiscount ? formatPrice(discount.finalPrice) : formatPrice(book.price)}
              </span>
              <RatingStars rating={book.rating || 0} size="xs" />
            </div>
          </div>
        </article>
      </>
    );
  }

  // Premium Grid View
  return (
    <>
      <article className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl h-full flex flex-col transition-all duration-500 group border border-gray-100/80 backdrop-blur-sm overflow-hidden ${className}`}>
        {/* Book Image Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <Link 
            to={`/book/${book.id}`}
            className="block relative aspect-[3/4] overflow-hidden"
          >
            {/* Loading Skeleton */}
            <div className={`absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 transition-opacity duration-500 ${
              imageLoaded ? 'opacity-0' : 'opacity-100'
            }`} />
            
            {/* Book Image */}
            <img
              src={book.image}
              alt={book.title}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </Link>

          {/* Premium Badge */}
          {premiumBadge && (
            <div className={`absolute top-4 left-4 bg-gradient-to-r ${premiumBadge.color} ${premiumBadge.textColor} px-3 py-2 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2 z-10`}>
              <FontAwesomeIcon icon={premiumBadge.icon} className="w-3.5 h-3.5" />
              {premiumBadge.label}
            </div>
          )}

          {/* Discount Badge */}
          {discount.hasDiscount && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-2 rounded-xl text-sm font-bold shadow-2xl z-10">
              -{discount.discountPercent}%
            </div>
          )}

          {/* Action Buttons Overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40">
            <button
              onClick={() => setShowPreview(true)}
              className="bg-white text-gray-900 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-2xl flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
              {t('preview')}
            </button>
            <Link
              to={`/book/${book.id}`}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-2xl flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faBookOpen} className="w-4 h-4" />
              {t('details')}
            </Link>
          </div>

          {/* Wishlist Button */}
          {showWishlist && (
            <button
              onClick={handleWishlistToggle}
              className={`absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 z-20 ${
                isWishlisted
                  ? 'bg-red-500 text-white shadow-2xl scale-110'
                  : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white hover:scale-110 hover:shadow-2xl'
              }`}
            >
              <FontAwesomeIcon icon={faHeart} className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* Book Details */}
        <div className="p-6 flex flex-col flex-grow space-y-4">
          {/* Title and Author */}
          <div className="space-y-2">
            <Link to={`/book/${book.id}`}>
              <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
                {book.title}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm font-medium">by {book.author}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <RatingStars rating={book.rating || 0} size="sm" />
            <span className="text-sm text-gray-500">({book.reviewCount || 0})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            {discount.hasDiscount ? (
              <>
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(discount.finalPrice)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(book.price)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(book.price)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          {showAddToCart && (
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart || book.stock === 0}
              className={`w-full py-3.5 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 mt-auto ${
                isInCartItem
                  ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300'
                  : book.stock === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
              }`}
            >
              {isAddingToCart ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  <span>{t('loading')}</span>
                </>
              ) : isInCartItem ? (
                <>
                  <FontAwesomeIcon icon={faCheck} className="w-5 h-5" />
                  <span>{t('in_cart')}({cartQuantity})</span>
                </>
              ) : book.stock === 0 ? (
                <>
                  <FontAwesomeIcon icon={faCalendar} className="w-5 h-5" />
                  <span>{t('out_of_stock')}</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
                  <span>{t('add_to_cart')}</span>
                </>
              )}
            </button>
          )}

          {/* Stock Status */}
          {book.stock <= 5 && book.stock > 0 && (
            <p className="text-sm text-amber-600 font-medium text-center">
              {t('only_stock_left', { stock: book.stock })}
            </p>
          )}
        </div>
      </article>

      <QuickPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        book={book}
      />
    </>
  );
}

// Premium Skeleton Component
export function CardSkeleton({ viewMode = 'grid', count = 8 }) {
  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {[...Array(count)].map((_, idx) => (
          <article key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex animate-pulse">
            <div className="w-28 h-36 bg-gray-200 rounded-l-2xl flex-shrink-0" />
            <div className="flex-1 p-6 space-y-4">
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-gray-200 rounded" />
                  ))}
                </div>
                <div className="h-8 bg-gray-200 rounded w-24" />
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
        {[...Array(count)].map((_, idx) => (
          <article key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse">
            <div className="h-40 bg-gray-200 rounded-t-xl" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-12" />
                <div className="h-3 bg-gray-200 rounded w-10" />
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  }

  // Grid View Skeleton
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, idx) => (
        <article key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col animate-pulse">
          <div className="aspect-[3/4] bg-gray-200 rounded-t-2xl" />
          <div className="p-6 flex flex-col flex-grow space-y-4">
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="h-6 bg-gray-200 rounded w-20" />
            <div className="h-12 bg-gray-200 rounded w-full mt-auto" />
          </div>
        </article>
      ))}
    </div>
  );
}