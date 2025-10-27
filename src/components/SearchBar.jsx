import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faMicrophone, faCamera } from '@fortawesome/free-solid-svg-icons';
import { useMobileDetection, MobileButton } from './TouchGestures';

export function SearchBar({ onSearch, placeholder = "Search books, authors, categories..." }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showMobileActions, setShowMobileActions] = useState(false);
  const navigate = useNavigate();
  const { isMobile, isTouch } = useMobileDetection();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
      setQuery('');
    }
  };

  const handleClear = () => {
    setQuery('');
    setShowMobileActions(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (isMobile) {
      setShowMobileActions(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (isMobile && !query) {
      setShowMobileActions(false);
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
    // In a real app, this would open camera or file picker
    alert('Image search feature coming soon!');
  };

  // Auto-hide mobile actions when query is empty
  useEffect(() => {
    if (isMobile && !query && !isFocused) {
      setShowMobileActions(false);
    }
  }, [query, isFocused, isMobile]);

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className={`relative flex items-center transition-all duration-200 ${
        isFocused ? 'ring-2 ring-blue-500' : ''
      }`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
          style={{ 
            fontSize: isMobile ? '16px' : '14px', // Prevents zoom on iOS
            WebkitAppearance: 'none'
          }}
          aria-label="Search for books, authors, or categories"
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <FontAwesomeIcon icon={faTimes} className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

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
  );
}
