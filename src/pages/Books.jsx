import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { bookService } from '../services/bookService';
import { trackPageView, trackInteraction } from '../services/analyticsService';
// Standardized Components (assuming these are updated for better structure)
import { BookCard } from '../components/BookCard';
import { CardSkeleton } from '../components/BookCard'; 
import { SEOHead } from '../components/SEOHead';
import { FilterPanel } from '../components/FilterPanel'; // New, dedicated component
import { MobileFilterSheet } from '../components/MobileFilterSheet'; // Mobile-optimized filter
import { PaginationControls } from '../components/PaginationControls'; // New, dedicated component
import { FloatingElements } from '../components/AdvancedParallax';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBalanceScale, faSliders, faTimes, faThLarge, faListUl, faBookOpen,
  faMagic, faArrowUp, faStar, faChevronDown, faSearch, faTimesCircle,
  faShoppingCart, faChevronLeft, faChevronRight, faHeart, faChevronRight as faChevronRightIcon
} from '@fortawesome/free-solid-svg-icons';

// --- Placeholder for Advanced Data Fetching (e.g., TanStack Query or RTK Query) ---
// In a real app, this hook handles:
// - Caching (no re-fetch on back button)
// - Background revalidation (data is always fresh)
// - Simple isLoading/isError states
// - Pagination/Infinite Scroll logic (via useInfiniteQuery)
function useBooksQuery(filters) {
    // NOTE: This is a SIMULATED hook to replace the manual fetchBooks logic
    const [data, setData] = useState({ pages: [], pageParams: [1] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const totalItems = 150; 
    const itemsPerPage = 24;

    const fetchPage = async (page) => {
        setLoading(true);
        setIsFetchingNextPage(page > 1);
        try {
            // SIMULATE API CALL
            const response = await new Promise(resolve => 
                setTimeout(() => resolve(bookService.getBooks(filters)), page === 1 ? 800 : 400)
            );

            setData(prev => ({
                pages: [...prev.pages, response],
                pageParams: [...prev.pageParams, page],
            }));
            
            const totalFetched = (page - 1) * itemsPerPage + response.length;
            setHasNextPage(totalFetched < totalItems);

        } catch (err) {
            console.error('API Error:', err);
            setError('Failed to load books.');
        } finally {
            setLoading(false);
            setIsFetchingNextPage(false);
        }
    };

    // Trigger initial fetch or re-fetch on filter change
    useEffect(() => {
        setData({ pages: [], pageParams: [1] });
        fetchPage(1);
        trackPageView('books', 'Books Page', JSON.stringify(filters)); // Advanced analytics
    }, [filters]);

    return { 
        data: data.pages.flat(), // Flattened array of all books
        isLoading: loading && data.pages.length === 0, // Initial loading
        isFetching: loading || isFetchingNextPage, // Any fetching
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage: () => hasNextPage && fetchPage(data.pageParams.slice(-1)[0] + 1), // Only fetch if there is a next page
        error,
        totalItems,
    };
}

// Global window service mock for demonstration
if (!window.bookService) {
  window.bookService = {
    getBooks: (filters, page, limit) => {
      const allBooks = Array.from({ length: 150 }, (_, i) => ({
        id: i + 1,
        title: `The Great Book ${i + 1}`,
        author: `Author ${Math.floor(i / 10) + 1}`,
        price: (i % 50) + 10,
        rating: (i % 5) + 1,
        reviewCount: i * 10 + 5,
        isTrending: i < 4 || (i > 50 && i < 54),
        isNew: i < 10 || (i > 100 && i < 110),
        discountPercent: i % 20 === 0 ? Math.floor(Math.random() * 30) + 10 : 0,
        stock: Math.floor(Math.random() * 20) + 1,
        image: `https://picsum.photos/id/${100 + i}/300/450`,
        category: ['Fiction', 'Mystery', 'Sci-Fi', 'Romance', 'Biography'][i % 5],
        description: `This is an amazing book that tells the story of ${i + 1}. It's a captivating read that will keep you engaged from start to finish.`,
        publishedDate: new Date(2020 + (i % 4), i % 12, (i % 28) + 1).toISOString(),
        isbn: `978-${Math.floor(Math.random() * 900000000) + 100000000}`,
        language: ['English', 'French', 'Spanish'][i % 3],
        pages: Math.floor(Math.random() * 500) + 100
      }));
      
      let filtered = [...allBooks];
      
      // Advanced search functionality
      if (filters.searchQuery) {
        const searchTerm = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(book => 
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm) ||
          book.description.toLowerCase().includes(searchTerm) ||
          book.isbn.toLowerCase().includes(searchTerm)
        );
      }
      
      // Category filtering
      if (filters.selectedCategory && filters.selectedCategory !== 'All') {
        filtered = filtered.filter(book => book.category === filters.selectedCategory);
      }
      
      // Price range filtering
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        filtered = filtered.filter(book => {
          if (max) {
            return book.price >= min && book.price <= max;
          } else {
            return book.price >= min;
          }
        });
      }
      
      // Advanced sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'popular':
            filtered.sort((a, b) => b.reviewCount - a.reviewCount);
            break;
          case 'newest':
            filtered.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
            break;
          case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
          case 'title':
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'author':
            filtered.sort((a, b) => a.author.localeCompare(b.author));
            break;
          default:
            // Default sorting by relevance (trending first, then by review count)
            filtered.sort((a, b) => {
              if (a.isTrending && !b.isTrending) return -1;
              if (!a.isTrending && b.isTrending) return 1;
              return b.reviewCount - a.reviewCount;
            });
        }
      }

      // Simple pagination/slicing
      const start = (page - 1) * limit;
      const end = start + limit;
      return filtered.slice(start, end);
    }
  };
}

// Categories and Sort Options (Static data is fine here)
const CATEGORIES = ['All', 'Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Biography'];
const SORT_OPTIONS = [
    { value: 'popular', label: 'Most Popular', icon: faArrowUp },
    { value: 'newest', label: 'Newest First', icon: faMagic },
    { value: 'price-low', label: 'Price: Low to High', icon: faArrowUp },
    { value: 'rating', label: 'Highest Rated', icon: faStar },
];
const VIEW_OPTIONS = [
    { value: 'grid', label: 'Grid', icon: faThLarge },
    { value: 'list', label: 'List', icon: faListUl },
];


// --- The Advanced Books Page Component ---
export function Books() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lastBookElementRef = useRef(null);

  // 1. Get State from URL (Standardization)
  const viewMode = searchParams.get('view') || 'grid';
  const sortBy = searchParams.get('sort') || 'popular';
  const searchQuery = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || '';
  const priceRange = searchParams.get('price') || '';
  const compareMode = searchParams.get('compare') === 'true';

  // 2. Local UI State (State not needed in URL)
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);
  
  // Debounced search for better performance
  const debouncedSearchQuery = useDebounce(searchInput, 300);

  // 3. Define the consolidated filter object for the data hook
  const filters = useMemo(() => ({
    searchQuery: debouncedSearchQuery,
    selectedCategory,
    sortBy,
    priceRange,
    // Add other advanced filters here...
  }), [debouncedSearchQuery, selectedCategory, sortBy, priceRange]);

  // Update search input when URL changes
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // 4. Advanced Data Fetching Hook
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

  // 5. Infinite Scroll Observer (Modern Implementation)
  const observer = useRef(null);
  const infiniteScrollRef = useCallback(node => {
    if (isFetching) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        trackInteraction('infinite_scroll', 'load_more');
        fetchNextPage();
      }
    }, { threshold: 0.5 }); // Load when the element is 50% visible

    if (node) observer.current.observe(node);
  }, [isFetching, hasNextPage, fetchNextPage]);


  // --- HANDLERS (URL State Management) ---

  const handleUpdateSearchParams = (key, value, removeIfEmpty = true) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (value && value !== '' && value !== '0' && value !== false) {
        newParams.set(key, value);
      } else if (removeIfEmpty) {
        newParams.delete(key);
      }
      return newParams;
    }, { replace: true }); // Use 'replace' to avoid excessive history entries
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
  
  const handleSortChange = (e) => {
    handleUpdateSearchParams('sort', e.target.value);
    trackInteraction('sort', 'books_sort', e.target.value);
  };

  const handleViewModeChange = (mode) => {
    handleUpdateSearchParams('view', mode);
    trackInteraction('view_mode_change', 'books_view_mode', mode);
  };

  const toggleCompareMode = () => {
    handleUpdateSearchParams('compare', compareMode ? '' : 'true');
    setSelectedBooks([]); // Clear selected books when turning off
    trackInteraction('toggle', 'compare_mode', compareMode ? 'off' : 'on');
  };
  
  // --- HANDLERS (Local State Management) ---

  const handleBookSelection = (bookId) => {
    setSelectedBooks(prev => {
      const updated = prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId];
      
      trackInteraction('book_compare_selection', 'selection_count', updated.length);
      return updated;
    });
  };

  const handleAddToCartAndNavigate = (book) => {
    // Assuming useCart is external and standard
    // addToCart(book); 
    navigate('/cart');
    trackInteraction('add_to_cart', 'book_list', book.id);
  };

  // Simplified Suggestion Logic (real implementation would use a debounced API call)
  const handleSearchInput = (query) => {
    setSearchInput(query);
    
    if (query.length > 2) {
      // SIMULATE live search suggestions
      const suggestions = books.filter(b => b.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
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

  const getActiveFiltersCount = useMemo(() => {
    let count = 0;
    searchParams.forEach((value, key) => {
      if (key !== 'view' && key !== 'sort') { // Exclude non-filter params
        count++;
      }
    });
    return count;
  }, [searchParams]);

  // --- RENDERING LOGIC ---

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

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white shadow-xl rounded-lg">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Data Error 💔</h1>
          <p className="text-xl text-gray-600 mb-8">Failed to load books. Please check your connection.</p>
          <button 
            onClick={() => window.location.reload()} // Simple refresh to retry fetch
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry Loading
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEOHead 
        title={`Books: ${searchQuery || 'Browse'} | Ikirezi`}
        description={`Find your next read from our collection of ${totalItems.toLocaleString()} books.`}
        keywords="books, bookstore, online books, search books, filter books"
      />
      <main className="min-h-screen bg-gray-50 relative">
        <FloatingElements count={8} intensity={0.1} />

        <div className="max-w-full px-2 sm:px-4 lg:px-6 py-10 relative z-10">
          
          {/* Enhanced Header with Breadcrumbs */}
          <section className="sticky top-0 bg-white/95 backdrop-blur-sm z-30 pt-6 pb-8 border-b border-gray-200 shadow-sm">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <FontAwesomeIcon icon={faChevronRightIcon} className="w-3 h-3" />
              <span className="text-gray-900 font-medium">Books</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2">
                  All <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Books</span>
                </h1>
                <p className="text-lg text-gray-600">
                  Found <span className="font-semibold text-blue-600">{books.length.toLocaleString()}</span> of <span className="font-semibold">{totalItems.toLocaleString()}</span> available books
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{Math.floor(totalItems * 0.15)}</div>
                  <div className="text-gray-500">New This Week</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{Math.floor(totalItems * 0.08)}</div>
                  <div className="text-gray-500">On Sale</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{Math.floor(totalItems * 0.12)}</div>
                  <div className="text-gray-500">Trending</div>
                </div>
              </div>
            </div>

            {/* Enhanced Search and Controls */}
            <div className="mt-6 space-y-4">
              <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                {/* Enhanced Search Bar */}
                <div className="flex-1 max-w-2xl relative w-full lg:w-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => handleSearchInput(e.target.value)}
                      onFocus={() => searchInput && setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchInput)}
                      placeholder="Search by title, author, or keyword..."
                      className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    {searchInput && (
                      <button 
                        onClick={() => handleSearch('')} 
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" 
                        aria-label="Clear search"
                      >
                        <FontAwesomeIcon icon={faTimesCircle} className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                    
                  {/* Search Suggestions */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-64 overflow-y-auto">
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(suggestion.title)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3"
                        >
                          <FontAwesomeIcon icon={faBookOpen} className="w-4 h-4 text-blue-500" />
                          <div className="font-medium text-gray-900">{suggestion.title}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Enhanced Controls */}
                <div className="flex items-center gap-3 w-full lg:w-auto">
                  {/* Sort Dropdown */}
                  <div className="relative flex-1 lg:flex-initial">
                    <select
                      value={sortBy}
                      onChange={handleSortChange}
                      className="w-full appearance-none cursor-pointer bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    >
                      {SORT_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex bg-white rounded-xl p-1 shadow-sm border-2 border-gray-200">
                    {VIEW_OPTIONS.map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleViewModeChange(option.value)}
                        className={`p-3 rounded-lg transition-all duration-300 ${
                          viewMode === option.value 
                            ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                            : 'text-gray-600 hover:bg-gray-50 hover:scale-105'
                        }`}
                        aria-label={`${option.label} view`}
                      >
                        <FontAwesomeIcon icon={option.icon} className="w-5 h-5" />
                      </button>
                    ))}
                  </div>

                  {/* Enhanced Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 bg-white text-gray-700 border-2 border-gray-200 hover:shadow-lg hover:border-blue-500 hover:text-blue-600 relative focus:ring-2 focus:ring-blue-500 group"
                    aria-expanded={showFilters}
                  >
                    <FontAwesomeIcon icon={faSliders} className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="font-medium">Filters</span>
                    {getActiveFiltersCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                        {getActiveFiltersCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Enhanced Active Filter Pills */}
              {getActiveFiltersCount > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                      <FontAwesomeIcon icon={faSliders} className="w-4 h-4" />
                      Active Filters ({getActiveFiltersCount}):
                    </span>
                    {Array.from(searchParams.entries()).map(([key, value]) => {
                      if (key !== 'sort' && key !== 'view' && value) {
                        return (
                          <span key={key} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition-colors">
                            <span className="capitalize">{key}: {value}</span>
                            <button
                              onClick={() => handleUpdateSearchParams(key, '', true)}
                              className="ml-1 text-blue-100 hover:text-white transition-colors"
                              aria-label={`Remove ${key} filter`}
                            >
                              <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
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
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Main Content with Filter Sidebar */}
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
                  handleSortChange({ target: { value: newFilters.sortBy || 'popular' } });
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
                sortOptions={[
                  { value: 'popular', label: 'Most Popular' },
                  { value: 'newest', label: 'Newest First' },
                  { value: 'price-low', label: 'Price: Low to High' },
                  { value: 'price-high', label: 'Price: High to Low' },
                  { value: 'rating', label: 'Highest Rated' }
                ]}
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
                handleSortChange({ target: { value: newFilters.sortBy || 'popular' } });
                handlePriceRangeChange(newFilters.priceRange || '');
              }}
              categories={CATEGORIES}
              priceRanges={[
                { value: '0-10', label: 'Under $10' },
                { value: '10-25', label: '$10 - $25' },
                { value: '25-50', label: '$25 - $50' },
                { value: '50+', label: 'Over $50' }
              ]}
              sortOptions={[
                { value: 'popular', label: 'Most Popular' },
                { value: 'newest', label: 'Newest First' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' },
                { value: 'rating', label: 'Highest Rated' }
              ]}
            />

            {/* Enhanced Books Listings */}
            <section className="flex-1 min-w-0">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'All Books'}
                  </h2>
                  {selectedCategory && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {selectedCategory}
                    </span>
                  )}
                </div>
                
                {/* Results Summary */}
                <div className="text-sm text-gray-600">
                  Showing {books.length} of {totalItems} books
                </div>
              </div>

              {/* Enhanced Book Grid/List */}
              <div className={`grid gap-4 ${
                viewMode === 'grid' 
                  ? 'grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10' 
                  : 'grid-cols-1'
              }`}>
                {books.map((book, index) => {
                  // Attach ref to the last element of the *current page* (or near the end)
                  const isLastElement = index === books.length - 1;
                  const cardProps = {
                    book,
                    viewMode,
                    compareMode,
                    isSelected: selectedBooks.includes(book.id),
                    onSelect: handleBookSelection,
                    onAddToCart: () => handleAddToCartAndNavigate(book)
                  };

                  return (
                    <div 
                      key={book.id} 
                      ref={isLastElement ? infiniteScrollRef : null}
                      className="transition-transform duration-300"
                    >
                      <BookCard {...cardProps} />
                    </div>
                  );
                })}
              </div>

              {/* Enhanced Loading/End States */}
              <div className="mt-12">
                {isFetchingNextPage && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-2 text-blue-600">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
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
                      className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      {isFetchingNextPage ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faBookOpen} className="w-5 h-5" />
                          <span>Load More Books</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
                
                {!isFetching && !hasNextPage && books.length > 0 && (
                  <div className="text-center py-12">
                    <div className="inline-flex flex-col items-center gap-4 p-8 bg-gray-50 rounded-2xl border border-gray-200">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faBookOpen} className="w-8 h-8 text-green-600" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">You've reached the end!</h3>
                        <p className="text-gray-600">You've seen all {totalItems.toLocaleString()} available books.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
                
              {/* This is where a dedicated <PaginationControls /> component would go if using traditional pagination */}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}