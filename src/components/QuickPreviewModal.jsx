import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faHeart, 
  faShoppingCart, 
  faStar,
  faBookOpen,
  faTag,
  faBolt,
  faBook
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { calculateDiscount } from '../utils/calculateDiscount';
import { RatingStars } from './RatingStars';
import { LazyImage } from './LazyImage';

export function QuickPreviewModal({ isOpen, onClose, book }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart, isInCart, getItemQuantity } = useCart();

  if (!isOpen || !book) return null;

  const discount = calculateDiscount(book.price, book.discountPercent || 0);
  const isInCartItem = isInCart(book.id);
  const cartQuantity = getItemQuantity(book.id);

  const handleAddToCart = async () => {
    if (isAddingToCart) return;
    
    setIsAddingToCart(true);
    try {
      addToCart(book);
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Quick Preview</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Book Image */}
          <div className="lg:w-1/2 p-6">
            <div className="relative">
              <LazyImage
                src={book.image || '/api/placeholder/400/600'}
                alt={`Book cover for ${book.title} by ${book.author}`}
                className="w-full h-96 lg:h-[500px] object-cover rounded-xl shadow-lg"
                width="400"
                height="600"
              />
              
              {/* Visual Indicators */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {book.isTrending && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
                    <FontAwesomeIcon icon={faBolt} className="w-3 h-3" />
                    Trending
                  </span>
                )}
                {book.isNew && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full shadow-lg">
                    <FontAwesomeIcon icon={faBook} className="w-3 h-3" />
                    New
                  </span>
                )}
                {discount.hasDiscount && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full shadow-lg">
                    <FontAwesomeIcon icon={faTag} className="w-3 h-3" />
                    -{discount.discountPercent}%
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 ${
                  isWishlisted 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
                }`}
              >
                <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Book Details */}
          <div className="lg:w-1/2 p-6 flex flex-col">
            {/* Title & Author */}
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                {book.title}
              </h3>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-3 mb-4">
                <RatingStars rating={book.rating || 0} size="lg" />
                <span className="text-gray-500 font-medium">
                  ({book.reviewCount || 0} reviews)
                </span>
              </div>

              {/* Category */}
              {book.category && (
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {book.category}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mb-6">
              {discount.hasDiscount ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(discount.finalPrice)}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(book.price)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-bold rounded-full">
                      Save {formatPrice(book.price - discount.finalPrice)}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({discount.discountPercent}% off)
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(book.price)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6 flex-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Description</h4>
              <p className="text-gray-600 leading-relaxed">
                {book.description || "No description available for this book. This is a placeholder description that would normally contain information about the book's content, themes, and key features."}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || book.stock === 0}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  isInCartItem
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : book.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isAddingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Adding to Cart...</span>
                  </>
                ) : isInCartItem ? (
                  <>
                    <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
                    <span>In Cart ({cartQuantity})</span>
                  </>
                ) : book.stock === 0 ? (
                  <>
                    <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
                    <span>Out of Stock</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={() => window.location.href = `/book/${book.id}`}
                className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
              >
                <FontAwesomeIcon icon={faBookOpen} className="w-4 h-4" />
                <span>View Full Details</span>
              </button>
            </div>

            {/* Stock Status */}
            {book.stock <= 5 && book.stock > 0 && (
              <p className="text-sm text-orange-600 mt-4 text-center">
                ⚠️ Only {book.stock} left in stock
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
