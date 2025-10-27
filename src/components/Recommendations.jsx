import { useState, useEffect, useRef } from 'react';
import { BookCard } from './BookCard';
import { LoadingSpinner } from './LoadingSpinner';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { bookService } from '../services/bookService';
import { useTouchGestures, useMobileDetection, MobileCarousel } from './TouchGestures';

export function Recommendations({ 
  title = "Recommended for You", 
  category, 
  limit = 8,
  autoSlide = true,
  slideInterval = 5000,
  showControls = true,
  showDots = true
}) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoSlide);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const { isMobile, isTouch } = useMobileDetection();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        let response;
        
        if (category) {
          response = await bookService.getBooksByCategory(category);
        } else {
          response = await bookService.getFeaturedBooks();
        }
        
        setBooks(response.slice(0, limit));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [category, limit]);

  // Auto-slide functionality
  useEffect(() => {
    const totalSlides = Math.ceil(books.length / 4);
    
    if (isPlaying && !isHovered && books.length > 4 && totalSlides > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, slideInterval);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, isHovered, books.length, slideInterval]);

  // Reset to first slide when books change
  useEffect(() => {
    setCurrentIndex(0);
  }, [books]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(books.length / 4));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(books.length / 4)) % Math.ceil(books.length / 4));
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Touch gesture handlers
  const carouselRef = useTouchGestures({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide,
    threshold: 50
  });

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
          <LoadingSpinner size="lg" text="Loading recommendations..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
          <div className="text-center py-8">
            <p className="text-red-600">Failed to load recommendations: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (books.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {books.length > 4 && (
            <div className="flex space-x-2">
              {/* Play/Pause Button */}
              {autoSlide && (
                <button
                  onClick={togglePlayPause}
                  className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors"
                  aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
              )}
              
              {/* Navigation Arrows */}
              {showControls && (
                <>
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Previous books"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Next books"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div 
          ref={carouselRef}
          className="relative overflow-hidden touch-pan-x"
          style={{ touchAction: 'pan-x' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: Math.ceil(books.length / 4) }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className={`grid gap-6 ${
                  isMobile 
                    ? 'grid-cols-1' 
                    : isTouch 
                    ? 'grid-cols-2' 
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                }`}>
                  {books.slice(slideIndex * 4, (slideIndex + 1) * 4).map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        {showDots && books.length > 4 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: Math.ceil(books.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
