import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { bookService } from '../services/bookService';
import { trackPageView, trackInteraction } from '../services/analyticsService';
import { BookCard } from '../components/BookCard';
import { CardSkeleton } from '../components/BookCard'; 
import { SEOHead } from '../components/SEOHead';
import { FilterPanel } from '../components/FilterPanel';
import { MobileFilterSheet } from '../components/MobileFilterSheet';
import { PaginationControls } from '../components/PaginationControls';
import { FloatingElements } from '../components/AdvancedParallax';
import { 
  Filter, X, Grid, List, BookOpen, Search, ShoppingCart, 
  Heart, ChevronRight, SlidersHorizontal, Star, TrendingUp,
  Clock, DollarSign, User, Award, Sparkles, RotateCcw,
  AlertCircle, GitCompare
} from 'lucide-react';

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

  const fetchPage = async (page, signal) => {
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
  };

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
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lastBookElementRef = useRef(null);

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

  const handleBookSelection = (bookId) => {
    setSelectedBooks(prev => {
      const updated = prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId];
      
      trackInteraction('book_compare_selection', 'selection_count', updated.length);
      return updated;
    });
  };

  const handleAddToCart = (book) => {
    // addToCart(book); // Your cart implementation
    trackInteraction('add_to_cart', 'book_list', book.id);
    // Show toast notification here
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
          
          {/* Enhanced Header */}
          <section className="sticky top-0 bg-white/95 backdrop-blur-sm z-30 pt-6 pb-8 border-b border-gray-200 shadow-sm">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-900 font-medium">Books</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {searchQuery ? `Search: "${searchQuery}"` : 'All Books'}
                </h1>
                <p className="text-gray-600">
                  Found <span className="font-semibold text-emerald-600">{books.length}</span> of{' '}
                  <span className="font-semibold">{totalItems}</span> books
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-xl font-bold text-emerald-600">{Math.floor(totalItems * 0.15)}</div>
                  <div className="text-gray-500">New This Week</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-amber-600">{Math.floor(totalItems * 0.08)}</div>
                  <div className="text-gray-500">On Sale</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600">{Math.floor(totalItems * 0.12)}</div>
                  <div className="text-gray-500">Trending</div>
                </div>
              </div>
            </div>

            {/* Search and Controls */}
            <div className="mt-6 space-y-4">
              <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                {/* Search Bar */}
                <div className="flex-1 max-w-2xl relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => handleSearchInput(e.target.value)}
                      onFocus={() => searchInput && setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchInput)}
                      placeholder="Search by title, author, or keyword..."
                      className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                      aria-label="Search books"
                    />
                    {searchInput && (
                      <button 
                        onClick={() => handleSearch('')} 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Clear search"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                    
                  {/* Search Suggestions */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-64 overflow-y-auto">
                      {searchSuggestions.map((suggestion) => (
                        <button
                          key={suggestion.id}
                          onClick={() => handleSearch(suggestion.title)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3"
                          onKeyDown={(e) => e.key === 'Enter' && handleSearch(suggestion.title)}
                        >
                          <BookOpen className="w-4 h-4 text-emerald-500" />
                          <div className="flex-1 text-left">
                            <div className="font-medium text-gray-900">{suggestion.title}</div>
                            <div className="text-sm text-gray-500">by {suggestion.author}</div>
                          </div>
                        </button>
                      ))}
                      <div className="border-t border-gray-200">
                        <button
                          onClick={() => handleSearch(searchInput)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 text-emerald-600 font-medium"
                        >
                          See all results for "{searchInput}"
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 w-full lg:w-auto">
                  {/* Sort Dropdown */}
                  <div className="relative flex-1 lg:flex-initial">
                    <select
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="w-full appearance-none cursor-pointer bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 shadow-sm hover:shadow-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                      aria-label="Sort books by"
                    >
                      {SORT_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none rotate-90" />
                  </div>

                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex bg-white rounded-xl p-1 shadow-sm border-2 border-gray-200">
                    {VIEW_OPTIONS.map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleViewModeChange(option.value)}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          viewMode === option.value 
                            ? 'bg-emerald-600 text-white shadow-lg' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        aria-label={`${option.label} view`}
                      >
                        <option.icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>

                  {/* Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 bg-white text-gray-700 border-2 border-gray-200 hover:shadow-lg hover:border-emerald-500 hover:text-emerald-600 relative group"
                    aria-expanded={showFilters}
                  >
                    <SlidersHorizontal className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="font-medium">Filters</span>
                    {getActiveFiltersCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                        {getActiveFiltersCount}
                      </span>
                    )}
                  </button>

                  {/* Compare Mode Toggle */}
                  <button
                    onClick={toggleCompareMode}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 border-2 ${
                      compareMode
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-500 hover:text-emerald-600'
                    }`}
                    aria-pressed={compareMode}
                  >
                    <GitCompare className="w-4 h-4" />
                    <span className="font-medium">Compare</span>
                  </button>
                </div>
              </div>

              {/* Active Filter Pills */}
              {getActiveFiltersCount > 0 && (
                <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-semibold text-emerald-800 flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Active Filters ({getActiveFiltersCount}):
                    </span>
                    {Array.from(searchParams.entries()).map(([key, value]) => {
                      if (key !== 'sort' && key !== 'view' && key !== 'compare' && value) {
                        return (
                          <span key={key} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium bg-emerald-600 text-white rounded-full shadow-sm">
                            <span className="capitalize">{key}: {value}</span>
                            <button
                              onClick={() => handleUpdateSearchParams(key, '', true)}
                              className="ml-1 text-emerald-100 hover:text-white transition-colors"
                              aria-label={`Remove ${key} filter`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        );
                      }
                      return null;
                    })}
                    <button 
                      onClick={clearAllFilters} 
                      className="text-sm text-red-600 hover:text-red-800 font-semibold ml-2 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Main Content */}
          <div className="flex gap-6 pt-8">
            
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block flex-shrink-0">
              <FilterPanel 
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
                isOpen={showFilters}
                onToggle={() => setShowFilters(!showFilters)}
                categories={CATEGORIES}
                priceRanges={[
                  { value: '0-10', label: 'Under $10' },
                  { value: '10-25', label: '$10 - $25' },
                  { value: '25-50', label: '$25 - $50' },
                  { value: '50+', label: 'Over $50' }
                ]}
                sortOptions={SORT_OPTIONS}
              />
            </div>

            {/* Mobile Filter Sheet */}
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
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' 
                      : 'grid-cols-1'
                  }`}>
                    {books.map((book, index) => {
                      const isLastElement = index === books.length - 1;
                      const cardProps = {
                        book,
                        viewMode,
                        compareMode,
                        isSelected: selectedBooks.includes(book.id),
                        onSelect: handleBookSelection,
                        onAddToCart: () => handleAddToCart(book)
                      };

                      return (
                        <div 
                          key={book.id} 
                          ref={isLastElement ? infiniteScrollRef : null}
                        >
                          <BookCard {...cardProps} />
                        </div>
                      );
                    })}
                  </div>

                  {/* Loading and End States */}
                  <div className="mt-12">
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
                </>
              )}
            </section>
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