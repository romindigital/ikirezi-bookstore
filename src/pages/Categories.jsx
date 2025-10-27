import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookCard } from '../components/BookCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { SEOHead } from '../components/SEOHead';
import { 
  BookOpen, 
  TrendingUp, 
  Star, 
  Users,
  ArrowRight,
  Search
} from 'lucide-react';
import { bookService } from '../services/bookService';
import { trackPageView, trackInteraction } from '../services/analyticsService';

export function Categories() {
  const [categories, setCategories] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryIcons = {
    'Fiction': '📚',
    'Mystery': '🔍',
    'Romance': '💕',
    'Sci-Fi': '🚀',
    'Fantasy': '🧙‍♂️',
    'Thriller': '⚡',
    'Biography': '👤',
    'History': '📜',
    'Non-Fiction': '📖',
    'Self-Help': '💪',
    'Business': '💼',
    'Science': '🔬',
    'Art': '🎨',
    'Poetry': '📝',
    'Children': '🧸'
  };

  useEffect(() => {
    try {
      trackPageView('categories', 'Categories Page', window.location.href);
    } catch (err) {
      console.error('Error tracking page view:', err);
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch categories with book counts
      const categoriesData = await bookService.getCategories();
      console.log('Categories data:', categoriesData);
      
      // Ensure categories is an array
      if (Array.isArray(categoriesData)) {
        setCategories(categoriesData);
      } else {
        console.warn('Categories data is not an array:', categoriesData);
        setCategories([]);
      }
      
      // Fetch some featured books
      try {
        const booksData = await bookService.getFeaturedBooks();
        console.log('Featured books data:', booksData);
        if (Array.isArray(booksData)) {
          setFeaturedBooks(booksData.slice(0, 6));
        } else {
          setFeaturedBooks([]);
        }
      } catch (bookError) {
        console.warn('Error fetching featured books:', bookError);
        setFeaturedBooks([]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryName) => {
    try {
      trackInteraction('click', 'category_browse', categoryName);
    } catch (err) {
      console.error('Error tracking interaction:', err);
    }
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
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="desktop-container relative z-10 text-center">
            <h1 className="desktop-text-5xl font-bold text-white mb-6">
              Explore <span className="text-yellow-300">Categories</span>
            </h1>
            <p className="desktop-text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Discover books across {categories.length} different categories. 
              From timeless classics to contemporary bestsellers, find your perfect genre.
            </p>
            
            <div className="flex justify-center">
              <Link
                to="/books"
                className="inline-flex items-center px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 desktop-hover-lift group"
              >
                <Search className="w-5 h-5 mr-2" />
                Browse All Books
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20">
          <div className="desktop-container">
            <div className="text-center mb-16">
              <h2 className="desktop-text-4xl font-bold text-gray-900 mb-4">
                All <span className="gradient-text-primary">Categories</span>
              </h2>
              <p className="desktop-text-xl text-gray-600 max-w-2xl mx-auto">
                Choose from our wide selection of book categories and discover your next favorite read
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {categories && categories.length > 0 ? categories.map((category, index) => {
                try {
                  return (
                    <Link
                      key={category.name || index}
                      to={`/books?category=${category.name.toLowerCase()}`}
                      onClick={() => handleCategoryClick(category.name)}
                      className="group premium-shadow-lg rounded-2xl p-6 text-center desktop-hover-lift scale-in bg-white/80 backdrop-blur-sm border border-white/20 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center text-3xl">
                        {categoryIcons[category.name] || '📖'}
                      </div>
                      <h3 className="desktop-text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {category.name || 'Unknown Category'}
                      </h3>
                      <p className="desktop-text-lg text-gray-600 font-medium mb-2">
                        {category.count?.toLocaleString() || category.bookCount?.toLocaleString() || '0'} books
                      </p>
                      <div className="flex items-center justify-center text-blue-600 group-hover:text-blue-700">
                        <span className="desktop-text-lg font-medium">Explore</span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                } catch (err) {
                  console.error('Error rendering category:', err, category);
                  return null;
                }
              }) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No categories available</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured Books */}
        <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50">
          <div className="desktop-container">
            <div className="text-center mb-16">
              <h2 className="desktop-text-4xl font-bold text-gray-900 mb-4">
                Featured <span className="gradient-text-primary">Books</span>
              </h2>
              <p className="desktop-text-xl text-gray-600 max-w-2xl mx-auto">
                Discover some of our most popular and highly-rated books across different categories
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {featuredBooks && featuredBooks.length > 0 ? featuredBooks.map((book, index) => {
                try {
                  return (
                    <div 
                      key={book.id || index}
                      className="scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <BookCard book={book} />
                    </div>
                  );
                } catch (err) {
                  console.error('Error rendering featured book:', err, book);
                  return null;
                }
              }) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No featured books available</p>
                </div>
              )}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/books"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all duration-300 desktop-hover-lift group"
              >
                View All Books
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
          <div className="desktop-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="desktop-text-3xl font-bold">50,000+</h3>
                <p className="desktop-text-lg text-gray-300">Books Available</p>
              </div>
              
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="desktop-text-3xl font-bold">1M+</h3>
                <p className="desktop-text-lg text-gray-300">Happy Readers</p>
              </div>
              
              <div className="space-y-4">
                <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="desktop-text-3xl font-bold">4.9/5</h3>
                <p className="desktop-text-lg text-gray-300">Average Rating</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

