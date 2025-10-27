import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft, 
  faChevronRight, 
  faHeart, 
  faShoppingCart, 
  faStar, 
  faEye, 
  faBookOpen,
  faPlay,
  faPause,
  faBolt,
  faFire
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { calculateDiscount } from '../utils/calculateDiscount';
import { RatingStars } from './RatingStars';
import { trackInteraction, trackEcommerce } from '../services/analyticsService';
import { trackBookView } from '../services/personalizationService';
import { LazyImage } from './LazyImage';

export function AdvancedBookShowcase({ 
  books = [], 
  title = "Featured Books",
  autoSlide = true,
  slideInterval = 5000,
  showControls = true,
  showDots = true,
  booksPerSlide = 4
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoSlide);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState({});
  const [isAddingToCart, setIsAddingToCart] = useState({});
  const intervalRef = useRef(null);
  const { addToCart, isInCart, getItemQuantity } = useCart();

  // Calculate total slides
  const totalSlides = Math.ceil(books.length / booksPerSlide);

  // Auto-slide functionality with infinite loop
  useEffect(() => {
    if (isPlaying && !isHovered && books.length > booksPerSlide && totalSlides > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          const nextSlide = (prev + 1) % totalSlides;
          return nextSlide;
        });
      }, slideInterval);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, isHovered, books.length, booksPerSlide, slideInterval, totalSlides]);

  // Reset to first slide when books change
  useEffect(() => {
    setCurrentSlide(0);
  }, [books]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Get books for current slide
  const getCurrentSlideBooks = () => {
    const startIndex = currentSlide * booksPerSlide;
    return books.slice(startIndex, startIndex + booksPerSlide);
  };

  // Handle add to cart
  const handleAddToCart = async (book) => {
    if (isAddingToCart[book.id]) return;
    
    setIsAddingToCart(prev => ({ ...prev, [book.id]: true }));
    try {
      addToCart(book);
      
      // Track analytics
      trackInteraction('click', 'add_to_cart', book.title, 'book_showcase');
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
      setIsAddingToCart(prev => ({ ...prev, [book.id]: false }));
    }
  };

  // Handle wishlist toggle
  const handleWishlistToggle = (bookId) => {
    setIsWishlisted(prev => ({
      ...prev,
      [bookId]: !prev[bookId]
    }));
    
    const book = books.find(b => b.id === bookId);
    trackInteraction('click', isWishlisted[bookId] ? 'remove_from_wishlist' : 'add_to_wishlist', book?.title, 'book_showcase');
  };

  // Handle book view
  const handleBookView = (book) => {
    trackBookView(book.id, book);
    trackInteraction('click', 'view_book', book.title, 'book_showcase');
  };

  if (books.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 mb-6">
            <FontAwesomeIcon icon={faFire} className="w-4 h-4 mr-2" />
            Bestsellers Collection
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Books</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our curated selection of bestselling books with exclusive discounts and free shipping on orders over $25.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          {showControls && totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                aria-label="Previous books"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                aria-label="Next books"
              >
                <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}

          {/* Play/Pause Button */}
          {autoSlide && totalSlides > 1 && (
            <button
              onClick={togglePlayPause}
              className="absolute top-0 right-0 z-10 w-10 h-10 bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              <FontAwesomeIcon 
                icon={isPlaying ? faPause : faPlay} 
                className="w-4 h-4 group-hover:scale-110 transition-transform" 
              />
            </button>
          )}

          {/* Books Grid */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {books.slice(slideIndex * booksPerSlide, (slideIndex + 1) * booksPerSlide).map((book, index) => {
                      const discount = calculateDiscount(book.price, book.discountPercent || 0);
                      const isInCartItem = isInCart(book.id);
                      const cartQuantity = getItemQuantity(book.id);

                      return (
                        <article 
                          key={book.id} 
                          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {/* Book Image */}
                          <div className="relative overflow-hidden">
                            <Link 
                              to={`/book/${book.id}`}
                              aria-label={`View details for ${book.title} by ${book.author}`}
                              onClick={() => handleBookView(book)}
                            >
                              <LazyImage
                                src={book.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTUwTDEyMCAxODBIMTgwTDE1MCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjE0Ij5Cb29rIENvdmVyPC90ZXh0Pgo8L3N2Zz4K'}
                                alt={`Book cover for ${book.title} by ${book.author}`}
                                className="w-full h-64 sm:h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                                width="300"
                                height="400"
                              />
                            </Link>
                            
                            {/* Discount Badge */}
                            {discount.hasDiscount && (
                              <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                -{discount.discountPercent}%
                              </div>
                            )}

                            {/* Wishlist Button */}
                            <button
                              onClick={() => handleWishlistToggle(book.id)}
                              className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
                                isWishlisted[book.id]
                                  ? 'bg-red-500 text-white shadow-lg'
                                  : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white shadow-lg'
                              }`}
                              aria-label={isWishlisted[book.id] ? `Remove ${book.title} from wishlist` : `Add ${book.title} to wishlist`}
                            >
                              <FontAwesomeIcon 
                                icon={faHeart} 
                                className={`w-4 h-4 ${isWishlisted[book.id] ? 'fill-current' : ''}`} 
                              />
                            </button>

                            {/* Quick View Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                              <button
                                className="bg-white text-gray-900 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-100 transition-colors font-medium"
                                aria-label={`Quick preview of ${book.title}`}
                              >
                                <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                                <span>Preview</span>
                              </button>
                              <Link
                                to={`/book/${book.id}`}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors font-medium"
                                aria-label={`View details for ${book.title}`}
                                onClick={() => handleBookView(book)}
                              >
                                <FontAwesomeIcon icon={faBookOpen} className="w-4 h-4" />
                                <span>Details</span>
                              </Link>
                            </div>
                          </div>

                          {/* Book Details */}
                          <div className="p-6">
                            {/* Title */}
                            <Link 
                              to={`/book/${book.id}`}
                              className="hover:text-blue-600 transition-colors"
                              onClick={() => handleBookView(book)}
                            >
                              <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
                                {book.title}
                              </h3>
                            </Link>

                            {/* Author */}
                            <p className="text-gray-600 text-sm mb-3 font-medium">
                              by {book.author}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center space-x-2 mb-4">
                              <RatingStars rating={book.rating || 0} size="sm" />
                              <span className="text-sm text-gray-500 font-medium">
                                ({book.reviewCount || 0})
                              </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-2">
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
                            </div>

                            {/* Add to Cart Button */}
                            <button
                              onClick={() => handleAddToCart(book)}
                              disabled={isAddingToCart[book.id] || book.stock === 0}
                              className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:cursor-not-allowed ${
                                isInCartItem
                                  ? 'bg-green-100 text-green-800 border-2 border-green-300'
                                  : book.stock === 0
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                              }`}
                              aria-label={
                                book.stock === 0 
                                  ? `${book.title} is out of stock`
                                  : isInCartItem 
                                  ? `${book.title} is in cart (${cartQuantity} items)`
                                  : `Add ${book.title} to cart`
                              }
                            >
                              {isAddingToCart[book.id] ? (
                                <>
                                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" aria-hidden="true"></div>
                                  <span>Adding...</span>
                                </>
                              ) : isInCartItem ? (
                                <>
                                  <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" aria-hidden="true" />
                                  <span>In Cart ({cartQuantity})</span>
                                </>
                              ) : book.stock === 0 ? (
                                <>
                                  <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" aria-hidden="true" />
                                  <span>Out of Stock</span>
                                </>
                              ) : (
                                <>
                                  <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" aria-hidden="true" />
                                  <span>Add to Cart</span>
                                </>
                              )}
                            </button>

                            {/* Stock Status */}
                            {book.stock <= 5 && book.stock > 0 && (
                              <p className="text-sm text-orange-600 mt-3 text-center font-medium" role="alert" aria-live="polite">
                                Only {book.stock} left in stock
                              </p>
                            )}
                            {book.stock === 0 && (
                              <p className="text-sm text-red-600 mt-3 text-center font-medium" role="alert" aria-live="polite">
                                Out of stock
                              </p>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          {showDots && totalSlides > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-blue-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/books"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
            aria-label="View all books"
          >
            <FontAwesomeIcon icon={faBolt} className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            View All Books
            <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
