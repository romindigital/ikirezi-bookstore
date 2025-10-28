import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { Link, useSearchParams } from 'react-router-dom';
import { bookService } from '../services/bookService';
import { trackPageView, trackInteraction } from '../services/analyticsService';
import { useCart } from '../context/CartContext';
import { BookCard } from '../components/BookCard';
import { CardSkeleton } from '../components/BookCard'; 
import { SEOHead } from '../components/SEOHead';
// import { FilterPanel } from '../components/FilterPanel';
import CompactBookCard from '../components/CompactBookCard';
import { MobileFilterSheet } from '../components/MobileFilterSheet';
import { PaginationControls } from '../components/PaginationControls';
import { FloatingElements } from '../components/AdvancedParallax';
import { 
  Filter, X, Grid, List, BookOpen, Search, ShoppingCart, 
  Heart, ChevronRight, SlidersHorizontal, Star, TrendingUp,
  Clock, DollarSign, User, Award, Sparkles, RotateCcw,
  AlertCircle, GitCompare
} from 'lucide-react';

// Swiper for horizontal carousels
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

// Empty State Component
const EmptyState = ({ searchQuery, selectedCategory, onClearFilters }) => (
  <div className="text-center py-16 px-4">
    <div className="max-w-md mx-auto">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <BookOpen className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No books found
      </h3>
      <p className="text-gray-600 mb-6">
        {searchQuery ? (
          `No results found for "${searchQuery}". Try adjusting your search terms.`
        ) : selectedCategory ? (
          `No books found in ${selectedCategory}. Try another category.`
        ) : (
          'No books match your current filters. Try adjusting your criteria.'
        )}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onClearFilters}
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          Clear All Filters
        </button>
        <Link
          to="/books"
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-emerald-600 hover:text-emerald-600 transition-colors font-medium"
        >
          Browse All Books
        </Link>
      </div>
    </div>
  </div>
);

// Compare Drawer Component
const CompareDrawer = ({ selectedBooks, books, onClose, onClearSelection }) => {
  const selectedBookData = books.filter(book => selectedBooks.includes(book.id));
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 transform transition-transform duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Compare className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-gray-900">
              Compare Books ({selectedBookData.length})
            </h3>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClearSelection}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {selectedBookData.map(book => (
            <div key={book.id} className="flex-shrink-0 w-32">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <p className="text-sm font-medium text-gray-900 line-clamp-2">
                {book.title}
              </p>
            </div>
          ))}
        </div>
        
        {selectedBookData.length >= 2 && (
          <div className="mt-4 text-center">
            <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
              Compare Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

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

  // We intentionally omit `fetchPage` from deps because it's recreated per-hook call
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

const CATEGORIES = ['All', 'Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Biography'];
const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular', icon: TrendingUp },
  { value: 'newest', label: 'Newest First', icon: Clock },
  { value: 'price-low', label: 'Price: Low to High', icon: DollarSign },
  { value: 'price-high', label: 'Price: High to Low', icon: DollarSign },
  { value: 'rating', label: 'Highest Rated', icon: Star },
  { value: 'title', label: 'Title A-Z', icon: BookOpen },
  { value: 'author', label: 'Author A-Z', icon: User },
];
const VIEW_OPTIONS = [
  { value: 'grid', label: 'Grid', icon: Grid },
  { value: 'list', label: 'List', icon: List },
];

export function Books() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  // URL State
  const viewMode = searchParams.get('view') || 'grid';
  const sortBy = searchParams.get('sort') || 'popular';
  const searchQuery = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || '';
  const priceRange = searchParams.get('price') || '';
  const compareMode = searchParams.get('compare') === 'true';

  // Local State
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [showCompareDrawer, setShowCompareDrawer] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  const debouncedSearchQuery = useDebounce(searchInput, 300);

  // Filters for data hook
  const filters = useMemo(() => ({
    searchQuery: debouncedSearchQuery,
    selectedCategory,
    sortBy,
    priceRange,
  }), [debouncedSearchQuery, selectedCategory, sortBy, priceRange]);

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

  // Show compare drawer when books are selected
  useEffect(() => {
    setShowCompareDrawer(selectedBooks.length > 0);
  }, [selectedBooks.length]);

  // Data fetching
  const { 
    data: books, 
    isLoading, 
    isFetching, 
    isFetchingNextPage, 
    hasNextPage, 
    fetchNextPage,
    error,
    totalItems 
  } = useBooksQuery(filters);

  // Build dynamic category buckets from loaded books (Barnes & Noble-like rows)
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

    // Limit to top 8 categories for performance/clarity
    return buckets.slice(0, 8);
  }, [books]);

  // Infinite Scroll
  const observer = useRef(null);
  const infiniteScrollRef = useCallback(node => {
    if (isFetching) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        trackInteraction('infinite_scroll', 'load_more');
        fetchNextPage();
      }
    }, { threshold: 0.5 });

    if (node) observer.current.observe(node);
  }, [isFetching, hasNextPage, fetchNextPage]);

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
    setShowSuggestions(false);
    trackInteraction('search', 'books_search', query);
  };

  const handleCategoryChange = (category) => {
    handleUpdateSearchParams('category', category === 'All' ? '' : category);
    trackInteraction('filter', 'category_filter', category);
  };

  const handlePriceRangeChange = (priceRange) => {
    handleUpdateSearchParams('price', priceRange);
    trackInteraction('filter', 'price_filter', priceRange);
  };
  
  const handleSortChange = (value) => {
    handleUpdateSearchParams('sort', value);
    trackInteraction('sort', 'books_sort', value);
  };

  const handleViewModeChange = (mode) => {
    handleUpdateSearchParams('view', mode);
    trackInteraction('view_mode_change', 'books_view_mode', mode);
  };

  const toggleCompareMode = () => {
    handleUpdateSearchParams('compare', compareMode ? '' : 'true');
    setSelectedBooks([]);
    trackInteraction('toggle', 'compare_mode', compareMode ? 'off' : 'on');
  };



  const handleAddToCart = (book) => {
    addToCart(book);
    trackInteraction('add_to_cart', 'book_list', book.id);
  };

  const handleSearchInput = (query) => {
    setSearchInput(query);
    
    if (query.length > 2) {
      const suggestions = books.filter(b => 
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const clearAllFilters = () => {
    setSearchParams({}, { replace: true });
    setSelectedBooks([]);
    setShowFilters(false);
    trackInteraction('filter', 'clear_all_filters');
  };

  const clearSelection = () => {
    setSelectedBooks([]);
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

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <SEOHead title="Loading Books..." />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">All Books</h1>
          <CardSkeleton count={24} viewMode={viewMode} />
        </div>
      </main>
    );
  }

  if (error && books.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white shadow-xl rounded-lg max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-600 mb-4">Unable to Load Books</h1>
          <p className="text-gray-600 mb-6">We encountered an error while loading the books. This might be a temporary issue.</p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Try Again
            </button>
            <Link
              to="/"
              className="block px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-emerald-600 hover:text-emerald-600 transition-colors font-medium"
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
      
      <main className="min-h-screen bg-gray-50 relative">
        <FloatingElements count={8} intensity={0.1} />

        <div className="max-w-full px-2 sm:px-4 lg:px-6 py-10 relative z-10">

          {/* Main Content */}
          <div className="flex gap-6 pt-8">

            {/* Mobile Controls + Sheet (small screens only) */}
            <div className="lg:hidden w-full">
              <div className="sticky top-16 z-20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-200">
                <div className="px-2 py-3 flex items-center gap-2">
                  <button
                    onClick={() => setShowFilters(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm hover:border-emerald-500 hover:text-emerald-600"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="text-sm font-medium">Filters</span>
                    {getActiveFiltersCount > 0 && (
                      <span className="ml-1 text-xs bg-emerald-600 text-white rounded-full px-2 py-0.5">
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
                      placeholder="Search in books..."
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
              {!isDesktop && (
                <MobileFilterSheet
                  isOpen={showFilters}
                  onClose={() => setShowFilters(false)}
                  filters={{
                    category: selectedCategory,
                    search: searchQuery,
                    sortBy: sortBy,
                    priceRange: priceRange
                  }}
                  onFiltersChange={(newFilters) => {
                    handleCategoryChange(newFilters.category || '');
                    handleSearch(newFilters.search || '');
                    handleSortChange(newFilters.sortBy || 'popular');
                    handlePriceRangeChange(newFilters.priceRange || '');
                  }}
                  categories={CATEGORIES}
                  priceRanges={[
                    { value: '0-10', label: 'Under $10' },
                    { value: '10-25', label: '$10 - $25' },
                    { value: '25-50', label: '$25 - $50' },
                    { value: '50+', label: 'Over $50' }
                  ]}
                  sortOptions={SORT_OPTIONS}
                />
              )}
            </div>

            {/* Left Sidebar: Search + Filters */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24 space-y-4">
                {/* Sidebar Search */}
                <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm p-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => handleSearchInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchInput)}
                      placeholder="Search in books..."
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </aside>

            {/* Books Listings */}
            <section className="flex-1 min-w-0">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {books.length} {books.length === 1 ? 'Book' : 'Books'}
                  </h2>
                  {selectedCategory && (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                      {selectedCategory}
                    </span>
                  )}
                </div>
              </div>

              {/* Books Grid/List */}
              {books.length === 0 ? (
                <EmptyState 
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                  onClearFilters={clearAllFilters}
                />
              ) : (
                <>
                  {/* Carousel rows per category (Google/B&N-like) */}
                  <div className="space-y-10">
                    {/* Featured/All row */}
                    {books.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">Featured Picks</h3>
                          <Link to="/books" className="text-sm text-emerald-600 hover:underline">See all</Link>
                        </div>
                        <div className="relative">
                          <Swiper
                            modules={[FreeMode, Navigation]}
                            freeMode={true}
                            navigation
                            slidesPerView={'auto'}
                            spaceBetween={16}
                            className="py-2"
                          >
                            {books.slice(0, 20).map((book, i) => (
                              <SwiperSlide key={book.id || `featured-${i}`} className="!w-auto">
                                <div ref={i === 19 ? infiniteScrollRef : null} className="px-1">
                                  <CompactBookCard book={book} onAddToCart={() => handleAddToCart(book)} />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                      </div>
                    )}

                    {/* Dynamic top categories */}
                    {categoryBuckets.map(({ name, list }, idx) => (
                      <div key={`${name}-${idx}`}>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                          <Link to={`/books?category=${encodeURIComponent(name)}`} className="text-sm text-emerald-600 hover:underline">See all</Link>
                        </div>
                        <div className="relative">
                          <Swiper
                            modules={[FreeMode, Navigation]}
                            freeMode={true}
                            navigation
                            slidesPerView={'auto'}
                            spaceBetween={16}
                            className="py-2"
                          >
                            {list.map((book, i) => (
                              <SwiperSlide key={book.id || `${name}-${i}`} className="!w-auto">
                                <div ref={i === list.length - 1 ? infiniteScrollRef : null} className="px-1">
                                  <CompactBookCard book={book} onAddToCart={() => handleAddToCart(book)} />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                      </div>
                    ))}

                    {/* Loading and End States (kept below carousels) */}
                    <div className="mt-6">
                      {isFetchingNextPage && (
                        <div className="space-y-4">
                          <div className="text-center mb-6">
                            <div className="inline-flex items-center gap-2 text-emerald-600">
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-emerald-600 border-t-transparent"></div>
                              <span className="font-medium">Loading more books...</span>
                            </div>
                          </div>
                          <CardSkeleton count={4} viewMode={viewMode} />
                        </div>
                      )}

                      {!isFetching && hasNextPage && (
                        <div className="text-center">
                          <button
                            onClick={fetchNextPage}
                            disabled={isFetchingNextPage}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl"
                          >
                            {isFetchingNextPage ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                <span>Loading...</span>
                              </>
                            ) : (
                              <>
                                <BookOpen className="w-4 h-4" />
                                <span>Load More Books</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {!isFetching && !hasNextPage && books.length > 0 && (
                        <div className="text-center py-12">
                          <div className="inline-flex flex-col items-center gap-4 p-8 bg-gray-50 rounded-2xl border border-gray-200">
                            <Award className="w-12 h-12 text-emerald-600" />
                            <div className="text-center">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">You've seen it all!</h3>
                              <p className="text-gray-600">You've reached the end of our collection.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </section>

            {/* Right sidebar removed to keep internal left filter + right rows */}
          </div>
        </div>

        {/* Compare Drawer */}
        {showCompareDrawer && (
          <CompareDrawer
            selectedBooks={selectedBooks}
            books={books}
            onClose={() => setShowCompareDrawer(false)}
            onClearSelection={clearSelection}
          />
        )}
      </main>
    </>
  );
}