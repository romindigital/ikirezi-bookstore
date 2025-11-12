import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { Link, useSearchParams } from 'react-router-dom';
import { bookService } from '../services/bookService';
import { trackPageView, trackInteraction } from '../services/analyticsService';
import { useCart } from '../context/CartContext';
// import { CardSkeleton } from '../components/BookCard';
import { SEOHead } from '../components/SEOHead';
import { CompactBookCard, PremiumCarousel } from '../components/CompactBookCard';
import { MobileFilterSheet } from '../components/MobileFilterSheet';
import { FloatingElements } from '../components/AdvancedParallax';
import { useTranslation } from '../hooks/useTranslation';
import {
  Filter, X, BookOpen, Search,
  Heart, SlidersHorizontal, Star, TrendingUp,
  Clock, DollarSign, User, Award, Sparkles,
  AlertCircle, ChevronLeft, ChevronRight
} from 'lucide-react';

// Custom hook for horizontal scroll with drag functionality
const useHorizontalScroll = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = useCallback((e) => {
    if (!scrollRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    e.preventDefault();
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !scrollRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  // Add button navigation
  const scrollLeftHandler = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }, []);

  const scrollRightHandler = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }, []);

  return {
    scrollRef,
    isDragging,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    scrollLeftHandler,
    scrollRightHandler
  };
};

// Empty State Component
const EmptyState = ({ searchQuery, selectedCategory, onClearFilters }) => (
  <div className="text-center py-16 px-4">
    <div className="max-w-md mx-auto">
      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
        <BookOpen className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        No books found
      </h3>
      <p className="text-gray-600 mb-8 text-lg">
        {searchQuery ? (
          `No results found for "${searchQuery}". Try adjusting your search terms.`
        ) : selectedCategory ? (
          `No books found in ${selectedCategory}. Try another category.`
        ) : (
          'No books match your current filters. Try adjusting your criteria.'
        )}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onClearFilters}
          className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold"
        >
          Clear All Filters
        </button>
        <Link
          to="/books"
          className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-green-500 hover:text-emerald-600 transition-all duration-300 font-semibold"
        >
          Browse All Books
        </Link>
      </div>
    </div>
  </div>
);

// Enhanced useBooksQuery hook with better error handling
function useBooksQuery(filters) {
  const [data, setData] = useState({ pages: [], pageParams: [1] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const totalItems = 150;
  const itemsPerPage = 24;

  const fetchPage = useCallback(async (page, signal) => {
    setLoading(true);
    setIsFetchingNextPage(page > 1);
    try {
      const response = await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          if (signal.aborted) {
            reject(new Error('Request aborted'));
          } else {
            resolve(bookService.getBooks(filters, page, itemsPerPage));
          }
        }, page === 1 ? 800 : 400);
        
        signal.addEventListener('abort', () => {
          clearTimeout(timeout);
          reject(new Error('Request aborted'));
        });
      });

      setData(prev => ({
        pages: [...prev.pages, response],
        pageParams: [...prev.pageParams, page],
      }));
      
      const totalFetched = (page - 1) * itemsPerPage + response.length;
      setHasNextPage(totalFetched < totalItems);
      setError(null);

    } catch (err) {
      if (err.message !== 'Request aborted') {
        console.error('API Error:', err);
        setError('Failed to load books. Please try again.');
      }
    } finally {
      setLoading(false);
      setIsFetchingNextPage(false);
    }
  }, [filters]);

  useEffect(() => {
    const controller = new AbortController();
    setData({ pages: [], pageParams: [1] });
    fetchPage(1, controller.signal);
    trackPageView('books', 'Books Page', JSON.stringify(filters));

    return () => controller.abort();
  }, [filters]);

  return { 
    data: data.pages.flat(),
    isLoading: loading && data.pages.length === 0,
    isFetching: loading || isFetchingNextPage,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage: () => hasNextPage && fetchPage(data.pageParams.slice(-1)[0] + 1, new AbortController().signal),
    error,
    totalItems,
  };
}

const CATEGORIES = ['All', 'Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Biography', 'History', 'Business'];
const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular', icon: TrendingUp },
  { value: 'newest', label: 'Newest First', icon: Clock },
  { value: 'price-low', label: 'Price: Low to High', icon: DollarSign },
  { value: 'price-high', label: 'Price: High to Low', icon: DollarSign },
  { value: 'rating', label: 'Highest Rated', icon: Star },
  { value: 'title', label: 'Title A-Z', icon: BookOpen },
  { value: 'author', label: 'Author A-Z', icon: User },
];
const PRICE_RANGES = [
  { value: '', label: 'Any Price' },
  { value: '0-10', label: '$0 - $10' },
  { value: '10-20', label: '$10 - $20' },
  { value: '20-30', label: '$20 - $30' },
  { value: '30-50', label: '$30 - $50' },
  { value: '50', label: '$50+' },
];

// Custom Carousel with Loop - Limited to 20 books per row
const LoopCarousel = ({ books, title, subtitle, onAddToCart, categorySlug }) => {
  const { t } = useTranslation();
  // Limit to 20 books per row and use only unique books
  const displayBooks = books.slice(0, 20);

  return (
    <PremiumCarousel title={title} subtitle={subtitle}>
      {displayBooks.map((book) => (
        <CompactBookCard
          key={book.id}
          book={book}
          onAddToCart={onAddToCart}
        />
      ))}
      {/* View All Link */}
      {books.length > 20 && (
        <div className="flex items-center justify-center w-48 h-full">
          <Link
            to={`/categories/${categorySlug || 'all'}`}
            className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 border-2 border-dashed border-emerald-300 hover:border-emerald-400 rounded-2xl transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <span className="text-emerald-700 font-semibold text-sm group-hover:text-emerald-800">
              {t('common.view_all')}
            </span>
            <span className="text-emerald-600 text-xs mt-1">
              {books.length - 20} more
            </span>
          </Link>
        </div>
      )}
    </PremiumCarousel>
  );
};

export function Books() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { t } = useTranslation();

  // URL State
  const sortBy = searchParams.get('sort') || 'popular';
  const searchQuery = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || '';
  const priceRange = searchParams.get('price') || '';
  const minRating = searchParams.get('rating') || '';

  // Local State
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [isDesktop, setIsDesktop] = useState(false);

  // Use the horizontal scroll hook
  const {
    scrollRef,
    isDragging,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    scrollLeftHandler,
    scrollRightHandler
  } = useHorizontalScroll();

  const debouncedSearchQuery = useDebounce(searchInput, 300);

  // Filters for data hook
  const filters = useMemo(() => ({
    searchQuery: debouncedSearchQuery,
    selectedCategory,
    sortBy,
    priceRange,
    minRating: minRating ? parseFloat(minRating) : null,
  }), [debouncedSearchQuery, selectedCategory, sortBy, priceRange, minRating]);

  // Update search input when URL changes
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // Track viewport to disable mobile sheet on desktop
  useEffect(() => {
    const update = () => setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1024);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Data fetching
  const {
    data: books,
    isLoading,
    error,
    totalItems
  } = useBooksQuery(filters);

  // Build dynamic category buckets from loaded books
  const categoryBuckets = useMemo(() => {
    if (!books || books.length === 0) return [];

    const getCategoryName = (b) =>
      (b.category || b.genre || (Array.isArray(b.categories) ? b.categories[0] : '') || 'Other').trim();

    const map = new Map();
    for (const b of books) {
      const name = getCategoryName(b);
      if (!map.has(name)) map.set(name, []);
      map.get(name).push(b);
    }

    const buckets = Array.from(map.entries())
      .map(([name, list]) => ({ name, list }))
      .sort((a, b) => b.list.length - a.list.length);

    return buckets.slice(0, 6);
  }, [books]);

  // Handlers
  const handleUpdateSearchParams = (key, value, removeIfEmpty = true) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (value && value !== '' && value !== '0' && value !== false) {
        newParams.set(key, value);
      } else if (removeIfEmpty) {
        newParams.delete(key);
      }
      return newParams;
    }, { replace: true });
  };

  const handleSearch = (query) => {
    setSearchInput(query);
    handleUpdateSearchParams('q', query);
    trackInteraction('search', 'books_search', query);
  };

  const handlePriceRangeChange = (range) => {
    handleUpdateSearchParams('price', range);
    trackInteraction('filter', 'price_range_filter', range);
  };

  const handleRatingChange = (rating) => {
    handleUpdateSearchParams('rating', rating);
    trackInteraction('filter', 'rating_filter', rating);
  };

  const handleCategoryChange = (category) => {
    handleUpdateSearchParams('category', category === 'All' ? '' : category);
    trackInteraction('filter', 'category_filter', category);
  };

  const handleSortChange = (value) => {
    handleUpdateSearchParams('sort', value);
    trackInteraction('sort', 'books_sort', value);
  };

  const handleAddToCart = (book) => {
    addToCart(book);
    trackInteraction('add_to_cart', 'book_list', book.id);
  };

  const handleSearchInput = (query) => {
    setSearchInput(query);
  };

  const clearAllFilters = () => {
    setSearchParams({}, { replace: true });
    setShowFilters(false);
    trackInteraction('filter', 'clear_all_filters');
  };

  const getActiveFiltersCount = useMemo(() => {
    let count = 0;
    searchParams.forEach((value, key) => {
      if (key !== 'view' && key !== 'sort') {
        count++;
      }
    });
    return count;
  }, [searchParams]);

  // SEO Metadata based on filters
  const seoTitle = useMemo(() => {
    if (searchQuery) return `Search: "${searchQuery}" | Ikirezi Books`;
    if (selectedCategory) return `${selectedCategory} Books | Ikirezi`;
    return 'Browse All Books | Ikirezi Bookstore';
  }, [searchQuery, selectedCategory]);

  const seoDescription = useMemo(() => {
    if (searchQuery) return `Search results for "${searchQuery}" - Find your next great read from our collection.`;
    if (selectedCategory) return `Discover the best ${selectedCategory.toLowerCase()} books. Curated selection with reviews and ratings.`;
    return `Browse our collection of ${totalItems} books. Find bestsellers, new releases, and exclusive titles with free shipping.`;
  }, [searchQuery, selectedCategory, totalItems]);

  if (error && books.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-md mx-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Books</h1>
          <p className="text-gray-600 mb-6">We encountered an error while loading the books. This might be a temporary issue.</p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-purple-600 text-white rounded-xl hover:from-green-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg"
            >
              Try Again
            </button>
            <Link
              to="/"
              className="block px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-green-500 hover:text-green-600 transition-all duration-300 font-semibold"
            >
              Go Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
        keywords={`books, ${selectedCategory || ''}, ${searchQuery || ''}, bookstore, reading`}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 relative">
        <FloatingElements count={12} intensity={0.15} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {/* Dynamic Hero Section with Categories */}
          <div className="relative rounded-3xl overflow-hidden mb-8" style={{
            backgroundSize: '400% 400%',
          }}>
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="animated-books-pattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                    <rect width="25" height="25" fill="none"/>
                    <path d="M3,3 L22,3 L22,22 L3,22 Z" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                    <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                    <circle cx="17" cy="17" r="1.5" fill="currentColor"/>
                    <rect x="5" y="12" width="15" height="1" fill="currentColor" opacity="0.6"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#animated-books-pattern)" style={{
                  animation: 'patternMove 20s linear infinite'
                }}/>
              </svg>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 p-8 md:p-12 pb-24">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6" style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  letterSpacing: '-0.03em',
                  lineHeight: '1.1',
                  animation: 'textGlow 4s ease-in-out infinite alternate'
                }}>
                  Discover Your Next
                  <span className="block text-emerald-600 font-normal" style={{
                    animation: 'colorShift 8s ease-in-out infinite'
                  }}>Great Read</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-normal" style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  letterSpacing: '-0.01em',
                  lineHeight: '1.6'
                }}>
                  Explore thousands of books across all genres. From bestsellers to hidden gems, find your perfect story.
                </p>

                {/* Stats */}
                <div className="flex justify-center gap-8 md:gap-12 mt-8">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-light text-gray-900" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>10,000+</div>
                    <div className="text-sm text-gray-600 font-normal">Books</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-light text-gray-900" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>50+</div>
                    <div className="text-sm text-gray-600 font-normal">Categories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-light text-gray-900" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>24/7</div>
                    <div className="text-sm text-gray-600 font-normal">Access</div>
                  </div>
                </div>
              </div>

              {/* Categories Attached to Bottom of Hero */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 rounded-b-3xl">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 text-sm" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>Browse by Category</h3>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={scrollLeftHandler}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button 
                        onClick={scrollRightHandler}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Category Cards - Swiper-like Draggable Scroll */}
                  <div className="relative">
                    <div className="overflow-hidden">
                      <div
                        ref={scrollRef}
                        className={`flex gap-4 pb-2 select-none overflow-x-auto scroll-smooth ${
                          isDragging ? 'cursor-grabbing' : 'cursor-grab'
                        }`}
                        style={{
                          scrollbarWidth: 'none',
                          msOverflowStyle: 'none',
                          WebkitOverflowScrolling: 'touch'
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                      >
                        {CATEGORIES.map((category) => (
                          <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-200 ${
                              selectedCategory === category || (category === 'All' && !selectedCategory)
                                ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                            }`}
                            style={{ 
                              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', 
                              minWidth: '180px',
                              flex: '0 0 auto'
                            }}
                          >
                            {/* Category Icon */}
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              selectedCategory === category || (category === 'All' && !selectedCategory)
                                ? 'bg-white/20'
                                : 'bg-emerald-100'
                            }`}>
                              <span className={`text-sm ${
                                selectedCategory === category || (category === 'All' && !selectedCategory)
                                  ? 'text-white'
                                  : 'text-emerald-600'
                              }`}>
                                {category === 'All' ? '📚' :
                                 category === 'Fiction' ? '📖' :
                                 category === 'Mystery' ? '🔍' :
                                 category === 'Romance' ? '💕' :
                                 category === 'Sci-Fi' ? '🚀' :
                                 category === 'Biography' ? '👤' :
                                 category === 'History' ? '📜' :
                                 category === 'Business' ? '💼' : '📚'}
                              </span>
                            </div>

                            {/* Category Text */}
                            <div className="text-left min-w-0 flex-1">
                              <div className={`text-sm font-medium truncate ${
                                selectedCategory === category || (category === 'All' && !selectedCategory)
                                  ? 'text-white'
                                  : 'text-gray-900'
                              }`}>
                                {category}
                              </div>
                              <div className={`text-xs ${
                                selectedCategory === category || (category === 'All' && !selectedCategory)
                                  ? 'text-white/80'
                                  : 'text-gray-500'
                              }`}>
                                {category === 'All' ? 'All books' : `${Math.floor(Math.random() * 500) + 50} books`}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Scrollbar Styling - Hidden */}
                    <style jsx>{`
                      .overflow-x-auto::-webkit-scrollbar {
                        display: none;
                      }
                      .overflow-x-auto {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                      }

                      /* Smooth momentum scrolling for WebKit */
                      .overflow-x-auto {
                        -webkit-overflow-scrolling: touch;
                      }

                      /* Enhanced drag feedback */
                      .cursor-grab:active {
                        cursor: grabbing;
                      }
                    `}</style>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Books Content */}
          <section className="flex-1 min-w-0">
              {/* Mobile Controls */}
              <div className="lg:hidden mb-6">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowFilters(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors font-medium"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      <span>{t('common.filter')}</span>
                      {getActiveFiltersCount > 0 && (
                        <span className="bg-green-600 text-white rounded-full px-2 py-1 text-xs">
                          {getActiveFiltersCount}
                        </span>
                      )}
                    </button>
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => handleSearchInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchInput)}
                        placeholder={t('common.search')}
                        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Books Content */}
              {books.length === 0 ? (
                <EmptyState 
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                  onClearFilters={clearAllFilters}
                />
              ) : (
                <div className="space-y-12">
                  {/* Featured Carousel */}
                  <LoopCarousel
                    books={books.slice(0, 12)}
                    title={t('home.featured_books')}
                    subtitle={t('home.featured_books_description')}
                    onAddToCart={handleAddToCart}
                  />

                  {/* Category Carousels */}
                  {categoryBuckets.map(({ name, list }) => {
                    const slug = name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
                    const translatedName = t(`category.${slug}`) || name;
                    const subtitle = t('home.discover_in_category', { category: translatedName }) || `Discover the best in ${translatedName}`;
                    return (
                      <LoopCarousel
                        key={name}
                        books={list}
                        title={translatedName}
                        subtitle={subtitle}
                        onAddToCart={handleAddToCart}
                        categorySlug={slug}
                      />
                    );
                  })}
                </div>
              )}
            </section>
        </div>

        {/* Mobile Filter Sheet */}
        {!isDesktop && (
          <MobileFilterSheet
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            filters={{
              category: selectedCategory,
              search: searchQuery,
              sortBy: sortBy,
              priceRange: priceRange,
              minRating: minRating
            }}
            onFiltersChange={(newFilters) => {
              handleCategoryChange(newFilters.category || '');
              handleSearch(newFilters.search || '');
              handleSortChange(newFilters.sortBy || 'popular');
              handlePriceRangeChange(newFilters.priceRange || '');
              handleRatingChange(newFilters.minRating || '');
            }}
            categories={CATEGORIES}
            priceRanges={PRICE_RANGES}
            sortOptions={SORT_OPTIONS}
          />
        )}

        {/* Global Styles for Animations */}
        <style jsx global>{`
          @keyframes patternMove {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(25px, 25px);
            }
          }

          @keyframes textGlow {
            0% {
              text-shadow: 0 0 20px rgba(16, 185, 129, 0.1);
            }
            100% {
              text-shadow: 0 0 30px rgba(16, 185, 129, 0.2);
            }
          }

          @keyframes colorShift {
            0%, 100% {
              color: #059669;
            }
            50% {
              color: #10b981;
            }
          }
        `}</style>
      </main>
    </>
  );
}