import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { BookCard } from '../components/BookCard';
import { CompactBookCard } from '../components/CompactBookCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { SEOHead } from '../components/SEOHead';
import {
  BookOpen,
  TrendingUp,
  Star,
  Users,
  ArrowRight,
  Search,
  ChevronLeft,
  ChevronRight,
  Heart,
  Award,
  BookMarked,
  Sparkles,
  Glasses,
  GraduationCap,
  Play,
  Pause
} from 'lucide-react';
import { bookService } from '../services/bookService';
import { trackPageView, trackInteraction } from '../services/analyticsService';

export function Categories() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const FEATURED_CATEGORIES = [
    {
      id: 'fiction',
      name: 'Fiction',
      description: 'Explore worlds of imagination and adventure',
      image: '/images/categories/fiction.jpg',
      gradient: 'from-blue-600 to-purple-600',
      icon: BookOpen
    },
    {
      id: 'business',
      name: 'Business',
      description: 'Learn from industry leaders and innovators',
      image: '/images/categories/business.jpg',
      gradient: 'from-green-600 to-teal-600',
      icon: TrendingUp
    }
  ];

  const CATEGORY_STYLES = {
    Fiction: {
      vector: '/illustrations/fiction.svg',
      description: 'Explore imaginative worlds'
    },
    'Non-Fiction': {
      vector: '/illustrations/non-fiction.svg',
      description: 'Discover real-world knowledge'
    }
    // Add more category styles as needed
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === FEATURED_CATEGORIES.length - 1 ? 0 : prev + 1));
  }, [FEATURED_CATEGORIES.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? FEATURED_CATEGORIES.length - 1 : prev - 1));
  }, [FEATURED_CATEGORIES.length]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch categories
      const categoriesData = await bookService.getCategories();
      setCategories(categoriesData);
      
      // Fetch featured books
      const featuredBooksData = await bookService.getFeaturedBooks();
      setFeaturedBooks(featuredBooksData);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load categories. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      // Cleanup if needed
    };
  }, []);

  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  const handleCategoryClick = (categoryName) => {
    trackInteraction('category_click', {
      category: categoryName
    });
  };

  if (loading) {
    return (
      <>
        <SEOHead
          title="Browse Book Categories | Ikirezi Bookstore"
          description="Explore our diverse collection of books across different categories and genres. Find your perfect read today."
          keywords="book categories, genres, fiction, non-fiction, mystery, romance, sci-fi, browse books"
        />
        <main className="min-h-screen bg-gray-50">
          <div className="desktop-container py-8">
            <LoadingSpinner size="xl" text="Loading categories..." />
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="desktop-text-4xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p className="desktop-text-xl text-gray-600 mb-8">{error}</p>
          <button
            onClick={fetchData}
            className="desktop-button bg-blue-600 text-white hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEOHead
        title="Browse Book Categories | Ikirezi Bookstore"
        description="Explore our diverse collection of books across different categories and genres. Find your perfect read today."
        keywords="book categories, genres, fiction, non-fiction, mystery, romance, sci-fi, browse books"
      />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Carousel Section */}
        <section className="relative h-[600px] overflow-hidden">
          {FEATURED_CATEGORIES.map((category, index) => (
            <div
              key={category.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient}`} />
              </div>

              {/* Content */}
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-2xl text-white">
                  <h1 className="text-5xl font-bold mb-6">{category.name}</h1>
                  <p className="text-2xl mb-8">{category.description}</p>
                  <div className="flex space-x-4">
                    <Link
                      to={`/categories/${category.id}`}
                      className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 flex items-center"
                    >
                      <category.icon className="w-5 h-5 mr-2" />
                      Explore {category.name}
                    </Link>
                    <button
                      onClick={toggleAutoPlay}
                      className="p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
                      aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
                    >
                      {isAutoPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            <button
              onClick={prevSlide}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <div className="flex space-x-2">
              {FEATURED_CATEGORIES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </section>

        {/* Browse by Category Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Browse by Category
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our extensive collection across various genres and subjects
              </p>
            </div>

            <div className="relative">
              {/* Left scroll button */}
              <button 
                onClick={() => {
                  const container = document.getElementById('categories-carousel');
                  container.scrollBy({ left: -300, behavior: 'smooth' });
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-r-full hover:bg-white/30 transition-all duration-300"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>

              {/* Categories carousel */}
              <div 
                id="categories-carousel"
                className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {categories.map((category) => {
                  const style = CATEGORY_STYLES[category.name] || {
                    vector: '/illustrations/fiction.jpg',
                    description: 'Explore our collection'
                  };

                  return (
                    <Link
                      key={category.name}
                      to={`/categories/${category.name.toLowerCase().replace(' ', '-')}`}
                      onClick={() => handleCategoryClick(category.name)}
                      className="flex-none w-[280px] snap-start group relative overflow-hidden rounded-2xl bg-white transition-all duration-500 h-[140px]"
                    >
                      {/* Main content area with illustration background */}
                      <div className="relative h-full p-4">
                        {/* Background illustration */}
                        <div className="absolute inset-0 group-hover:opacity-80 group-hover:opacity-25 transition-opacity duration-500">
                          <img 
                            src={style.vector || '/illustrations/default-category.svg'} 
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="relative h-full flex flex-col justify-between">
                          <div className="text-center">
                            <h3 className="text-lg font-bold text-emerald-800">
                              {category.name}
                            </h3>
                          </div>
                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-amber-600 font-medium text-sm">
                              {category.count || category.bookCount || 0} books
                            </span>
                            <span className="flex items-center text-emerald-600 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                              Explore <ArrowRight className="w-4 h-4 ml-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                      
                    </Link>
                  );
                })}
              </div>

              {/* Right scroll button */}
              <button 
                onClick={() => {
                  const container = document.getElementById('categories-carousel');
                  container.scrollBy({ left: 300, behavior: 'smooth' });
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-l-full hover:bg-white/30 transition-all duration-300"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-20 bg-amber-500/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Featured Collections
              </h2>
              <p className="text-xl text-gray-800 max-w-2xl mx-auto">
                Discover our handpicked selections across various themes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Award Winners',
                  icon: Award,
                  gradient: 'from-yellow-500 to-amber-500',
                  count: '250+'
                },
                {
                  title: 'Staff Picks',
                  icon: Heart,
                  gradient: 'from-rose-500 to-pink-500',
                  count: '100+'
                },
                {
                  title: 'New Releases',
                  icon: Sparkles,
                  gradient: 'from-blue-500 to-indigo-500',
                  count: '500+'
                },
                {
                  title: 'Most Read',
                  icon: Glasses,
                  gradient: 'from-emerald-500 to-green-500',
                  count: '1000+'
                }
              ].map((collection) => (
                <Link
                  key={collection.title}
                  to={`/collections/${collection.title.toLowerCase().replace(' ', '-')}`}
                  className="block group"
                >
                  <div className="bg-gray-50 rounded-2xl p-6 text-center transition-transform duration-300 group-hover:-translate-y-2">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${collection.gradient} flex items-center justify-center`}>
                      <collection.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {collection.title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {collection.count} Books
                    </p>
                    <span className=" flex items-center justify-center">
                      View Collection <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Books Carousel */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Featured Books
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover our most popular and highly-rated books
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {featuredBooks.map((book) => (
                <CompactBookCard
                  key={book.id}
                  book={book}
                  className="hover:-translate-y-2 transition-transform duration-300"
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/books"
                className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-all duration-300"
              >
                View All Books
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-br from-green-500 to-emerald-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { icon: BookOpen, count: '50,000+', label: 'Books Available' },
                { icon: Users, count: '1M+', label: 'Happy Readers' },
                { icon: Star, count: '4.9/5', label: 'Average Rating' },
                { icon: BookMarked, count: '100+', label: 'Categories' }
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="w-12 h-12 mx-auto mb-4 text-white">
                    <stat.icon className="w-full h-full" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{stat.count}</h3>
                  <p className="text-white/75">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}