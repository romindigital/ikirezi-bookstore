import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  faTag,
  faUser,
  faBuilding,
  faFileText,
  faGlobe,
  faLayerGroup,
  faExclamationTriangle,
  faArrowRight,
  faShare,
  faBookmark
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { RatingStars } from './RatingStars';
import { trackInteraction, trackEcommerce } from '../services/analyticsService';
import { trackBookView } from '../services/personalizationService';
import { Tooltip } from './Tooltip';
import { LazyImage } from './LazyImage';

export function PremiumBookPreview({ 
  book = {
    id: 1,
    title: "The Great Book 2",
    author: "Author 1",
    price: 11.00,
    rating: 2.0,
    reviewCount: 15,
    publisher: "N/A",
    publishedYear: "N/A",
    pages: "N/A",
    language: "English",
    format: "Paperback",
    stock: 0,
    description: "No description available for this book.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&q=80",
    categories: ["Fiction", "Literature"],
    isbn: "978-0-123456-78-9",
    dimensions: "5.1 x 7.8 x 0.6 inches",
    weight: "0.4 pounds"
  },
  showAddToCart = true, 
  showWishlist = true,
  variant = 'preview' // 'preview', 'detailed', 'minimal'
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const handleAddToCart = async () => {
    if (isAddingToCart) return;
    
    setIsAddingToCart(true);
    try {
      addToCart(book);
      
      // Track analytics
      trackInteraction('click', 'add_to_cart', book.title, 'premium_book_preview');
      trackEcommerce('add_to_cart', {
        item_id: book.id,
        item_name: book.title,
        category: book.categories?.[0] || 'Books',
        price: book.price,
        currency: 'USD'
      });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = () => {
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);
    
    // Track analytics
    trackInteraction('click', newWishlistState ? 'add_to_wishlist' : 'remove_from_wishlist', book.title, 'premium_book_preview');
  };

  const handleBookView = () => {
    // Track book view for personalization
    trackBookView(book.id, book);
    
    // Track analytics
    trackInteraction('click', 'view_book', book.title, 'premium_book_preview');
  };

  const isInCartItem = isInCart(book.id);
  const cartQuantity = getItemQuantity(book.id);
  const isOutOfStock = book.stock === 0;

  // Minimal variant for compact display
  if (variant === 'minimal') {
    return (
      <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200">
        <div className="relative">
          <LazyImage
            src={book.image}
            alt={`${book.title} by ${book.author}`}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            width="300"
            height="400"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">by {book.author}</p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <RatingStars rating={book.rating} size="sm" />
              <span className="text-xs text-gray-500">({book.reviewCount})</span>
            </div>
            <span className="text-lg font-bold text-gray-900">{formatPrice(book.price)}</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || isOutOfStock}
            className={`w-full py-2 px-4 rounded-xl font-semibold transition-all duration-300 ${
              isOutOfStock
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    );
  }

  // Detailed variant for comprehensive display
  if (variant === 'detailed') {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Side - Book Image */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12">
            <div className="relative max-w-sm mx-auto">
              <LazyImage
                src={book.image}
                alt={`${book.title} by ${book.author}`}
                className="w-full h-auto rounded-2xl shadow-2xl"
                width="400"
                height="600"
              />
              
              {/* Floating Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button
                  onClick={handleWishlistToggle}
                  className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
                    isWishlisted 
                      ? 'bg-red-500 text-white shadow-lg' 
                      : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white shadow-md'
                  }`}
                  aria-label={isWishlisted ? `Remove ${book.title} from wishlist` : `Add ${book.title} to wishlist`}
                >
                  <FontAwesomeIcon icon={faHeart} className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                
                <button className="p-3 bg-white/80 text-gray-600 hover:bg-blue-500 hover:text-white rounded-full backdrop-blur-sm transition-all duration-300 shadow-md">
                  <FontAwesomeIcon icon={faShare} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Book Details */}
          <div className="p-8 lg:p-12">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                  {book.title}
                </h1>
                <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
                
                {/* Rating */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex items-center space-x-1">
                    <RatingStars rating={book.rating} size="lg" />
                  </div>
                  <span className="text-lg font-semibold text-gray-700">{book.rating}</span>
                  <span className="text-gray-500">({book.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {formatPrice(book.price)}
                </div>
                <p className="text-sm text-gray-500">Price</p>
              </div>

              {/* Book Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Publisher:</p>
                  <p className="text-gray-900">{book.publisher}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Published:</p>
                  <p className="text-gray-900">{book.publishedYear}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Pages:</p>
                  <p className="text-gray-900">{book.pages}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Language:</p>
                  <p className="text-gray-900">{book.language}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Format:</p>
                  <p className="text-gray-900">{book.format}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Stock:</p>
                  <p className={`font-semibold ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
                    {isOutOfStock ? 'Out of stock' : `${book.stock} available`}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8 flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || isOutOfStock}
                  className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isOutOfStock
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                >
                  {isAddingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Adding...</span>
                    </>
                  ) : isOutOfStock ? (
                    <>
                      <FontAwesomeIcon icon={faExclamationTriangle} className="w-5 h-5" />
                      <span>Out of Stock</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
                
                <Link
                  to={`/book/${book.id}`}
                  onClick={handleBookView}
                  className="flex-1 py-4 px-6 bg-gray-100 text-gray-900 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <FontAwesomeIcon icon={faBookOpen} className="w-5 h-5" />
                  <span>View Details</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default preview variant - Premium card design
  return (
    <div className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2">
      {/* Premium Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Book Image Section */}
      <div className="relative overflow-hidden">
        <LazyImage
          src={book.image}
          alt={`${book.title} by ${book.author}`}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
          width="400"
          height="500"
        />
        
        {/* Premium Overlay Effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <Tooltip content={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}>
            <button
              onClick={handleWishlistToggle}
              className={`p-3 rounded-2xl backdrop-blur-md transition-all duration-300 shadow-lg ${
                isWishlisted 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
              }`}
              aria-label={isWishlisted ? `Remove ${book.title} from wishlist` : `Add ${book.title} to wishlist`}
            >
              <FontAwesomeIcon icon={faHeart} className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </Tooltip>
          
          <Tooltip content="Quick preview">
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="p-3 bg-white/90 text-gray-600 hover:bg-blue-500 hover:text-white rounded-2xl backdrop-blur-md transition-all duration-300 shadow-lg"
              aria-label={`Quick preview of ${book.title}`}
            >
              <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
            </button>
          </Tooltip>
        </div>

        {/* Stock Status Badge */}
        <div className="absolute top-4 left-4">
          <div className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md ${
            isOutOfStock 
              ? 'bg-red-500/90 text-white' 
              : 'bg-green-500/90 text-white'
          }`}>
            {isOutOfStock ? 'Out of Stock' : 'In Stock'}
          </div>
        </div>

        {/* Premium Category Badge */}
        {book.categories && book.categories.length > 0 && (
          <div className="absolute bottom-4 left-4">
            <div className="px-3 py-1.5 bg-blue-500/90 text-white rounded-full text-xs font-semibold backdrop-blur-md">
              {book.categories[0]}
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-8 relative z-10">
        {/* Title and Author */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
            {book.title}
          </h3>
          <p className="text-gray-600 text-lg font-medium">by {book.author}</p>
        </div>

        {/* Premium Rating Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <RatingStars rating={book.rating} size="lg" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">{book.rating}</span>
              <span className="text-gray-500 text-sm">({book.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="mb-8">
          <div className="text-4xl font-bold text-gray-900 mb-1">
            {formatPrice(book.price)}
          </div>
          <p className="text-sm text-gray-500 font-medium">Price</p>
        </div>

        {/* Book Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Publisher</p>
            <p className="text-gray-900 font-medium">{book.publisher}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Published</p>
            <p className="text-gray-900 font-medium">{book.publishedYear}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pages</p>
            <p className="text-gray-900 font-medium">{book.pages}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Language</p>
            <p className="text-gray-900 font-medium">{book.language}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Format</p>
            <p className="text-gray-900 font-medium">{book.format}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Stock</p>
            <p className={`font-semibold ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
              {isOutOfStock ? 'Out of stock' : 'Available'}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Description</h4>
          <p className="text-gray-700 leading-relaxed text-sm">{book.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || isOutOfStock}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
              isOutOfStock
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
            }`}
            aria-label={
              isOutOfStock 
                ? `${book.title} is out of stock`
                : `Add ${book.title} to cart`
            }
          >
            {isAddingToCart ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Adding to Cart...</span>
              </>
            ) : isOutOfStock ? (
              <>
                <FontAwesomeIcon icon={faExclamationTriangle} className="w-5 h-5" />
                <span>Out of Stock</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
          
          <Link
            to={`/book/${book.id}`}
            onClick={handleBookView}
            className="w-full py-3 px-6 bg-gray-100 text-gray-900 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2 group"
          >
            <FontAwesomeIcon icon={faBookOpen} className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>View Details</span>
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Premium Hover Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
    </div>
  );
}

// Skeleton loading component
export function PremiumBookPreviewSkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="h-80 bg-gray-300"></div>
      <div className="p-8 space-y-6">
        <div className="space-y-3">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-5 bg-gray-300 rounded w-1/2"></div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-5 h-5 bg-gray-300 rounded"></div>
            ))}
          </div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
        
        <div className="h-12 bg-gray-300 rounded w-24"></div>
        
        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 bg-gray-300 rounded w-20"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
          ))}
        </div>
        
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
        
        <div className="space-y-3">
          <div className="h-12 bg-gray-300 rounded w-full"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}
