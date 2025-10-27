import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faTimes, 
  faMicrophone, 
  faCamera,
  faClock,
  faArrowTrendUp,
  faBook,
  faUser,
  faTag
} from '@fortawesome/free-solid-svg-icons';
import { useMobileDetection, MobileButton } from './TouchGestures';
import { bookService } from '../services/bookService';
import { useTranslation } from '../hooks/useTranslation';

export function EnhancedSearchBar({ onSearch, placeholder = "Search books, authors, categories..." }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showMobileActions, setShowMobileActions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const navigate = useNavigate();
  const { isMobile, isTouch } = useMobileDetection();
  const { t } = useTranslation();
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Load popular searches (mock data for now)
  useEffect(() => {
    setPopularSearches([
      'fiction books',
      'mystery novels',
      'romance',
      'science fiction',
      'self help',
      'business books',
      'history',
      'biography'
    ]);
  }, []);

  // Debounced search suggestions
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        const results = await bookService.searchBooks(query, { limit: 5 });
        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Save to recent searches
      const newRecent = [query.trim(), ...recentSearches.filter(s => s !== query.trim())].slice(0, 5);
      setRecentSearches(newRecent);
      localStorage.setItem('recentSearches', JSON.stringify(newRecent));

      if (onSearch) {
        onSearch(query.trim());
      } else {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
      setQuery('');
      setSuggestions([]);
      setIsFocused(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowMobileActions(false);
    setSelectedIndex(-1);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (isMobile) {
      setShowMobileActions(true);
    }
  };

  const handleBlur = (e) => {
    // Don't close if clicking on suggestions
    if (suggestionsRef.current && suggestionsRef.current.contains(e.relatedTarget)) {
      return;
    }
    
    setIsFocused(false);
    if (isMobile && !query) {
      setShowMobileActions(false);
    }
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSubmit({ preventDefault: () => {} });
  };

  const handleKeyDown = (e) => {
    if (!isFocused || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex].title);
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setSuggestions([]);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };
      
      recognition.start();
    }
  };

  const handleImageSearch = () => {
    alert('Image search feature coming soon!');
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative flex items-center transition-all duration-200 ${
          isFocused ? 'ring-2 ring-blue-500' : ''
        }`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-500" />
          </div>
          
          <label htmlFor="search-input" className="sr-only">
            Search for books, authors, or categories
          </label>
          <input
            id="search-input"
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
            style={{ 
              fontSize: isMobile ? '16px' : '14px',
              WebkitAppearance: 'none'
            }}
            aria-label="Search for books, authors, or categories"
            aria-expanded={isFocused && suggestions.length > 0}
            aria-haspopup="listbox"
            role="combobox"
            autoComplete="off"
          />
          
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label="Clear search"
            >
              <FontAwesomeIcon icon={faTimes} className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Search Suggestions Dropdown */}
        {isFocused && (suggestions.length > 0 || recentSearches.length > 0 || popularSearches.length > 0) && (
          <div 
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
            role="listbox"
          >
            {/* Search Results */}
            {suggestions.length > 0 && (
              <div className="p-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                  {t('search.suggestions')}
                </div>
                {suggestions.map((book, index) => (
                  <button
                    key={book.id}
                    onClick={() => handleSuggestionClick(book.title)}
                    className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-50 text-left ${
                      selectedIndex === index ? 'bg-blue-50' : ''
                    }`}
                    role="option"
                    aria-selected={selectedIndex === index}
                  >
                    <FontAwesomeIcon icon={faBook} className="w-4 h-4 text-gray-500 mr-3" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{book.title}</div>
                      <div className="text-sm text-gray-600 truncate">{book.author}</div>
                    </div>
                    <div className="text-sm text-gray-500">${book.price}</div>
                  </button>
                ))}
              </div>
            )}

            {/* Recent Searches */}
            {suggestions.length === 0 && recentSearches.length > 0 && (
              <div className="p-2">
                <div className="flex items-center justify-between mb-2 px-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t('search.recent')}
                  </div>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    {t('search.clear')}
                  </button>
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="w-full flex items-center p-2 rounded-lg hover:bg-gray-50 text-left"
                    role="option"
                  >
                    <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-gray-500 mr-3" />
                    <span className="text-gray-700">{search}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Popular Searches */}
            {suggestions.length === 0 && recentSearches.length === 0 && (
              <div className="p-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                  {t('search.popular')}
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                      role="option"
                    >
                      <FontAwesomeIcon icon={faArrowTrendUp} className="w-3 h-3 mr-1" />
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                {t('search.loading')}
              </div>
            )}
          </div>
        )}

        {/* Mobile Action Buttons */}
        {isMobile && showMobileActions && (
          <div className="flex items-center space-x-2 mt-2">
            <MobileButton
              onClick={handleVoiceSearch}
              className="flex items-center space-x-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
              aria-label="Voice search"
            >
              <FontAwesomeIcon icon={faMicrophone} className="w-4 h-4" />
              <span>Voice</span>
            </MobileButton>
            
            <MobileButton
              onClick={handleImageSearch}
              className="flex items-center space-x-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium"
              aria-label="Image search"
            >
              <FontAwesomeIcon icon={faCamera} className="w-4 h-4" />
              <span>Image</span>
            </MobileButton>
          </div>
        )}
      </form>
    </div>
  );
}
