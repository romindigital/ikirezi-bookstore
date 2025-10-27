import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ArrowRight, 
  BookOpen, 
  Users, 
  Star, 
  Award,
  Sparkles,
  Zap,
  TrendingUp,
  Heart,
  Search,
  Clock,
  Shield,
  Truck,
  Gift,
  BookMarked,
  Flame,
  Crown
} from 'lucide-react';
import { AnimatedStat } from './AnimatedCounter';
import { AnimatedTitle } from './TypewriterText';
import { SearchBar } from './SearchBar';
import { useTranslation } from '../hooks/useTranslation';

export function AdvancedHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [currentTrendingBook, setCurrentTrendingBook] = useState(0);
  const heroRef = useRef(null);
  const { t } = useTranslation();

  const trendingBooks = [
    { 
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo", 
      author: "Taylor Jenkins Reid", 
      price: 15.99, 
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop&q=80",
      coverColor: "from-pink-500 to-rose-600",
      spineColor: "from-pink-600 to-rose-700",
      accentColor: "bg-pink-100",
      textColor: "text-pink-900"
    },
    { 
      id: 2,
      title: "Atomic Habits", 
      author: "James Clear", 
      price: 18.99, 
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&q=80",
      coverColor: "from-blue-500 to-indigo-600",
      spineColor: "from-blue-600 to-indigo-700",
      accentColor: "bg-blue-100",
      textColor: "text-blue-900"
    },
    { 
      id: 3,
      title: "Rich Dad Poor Dad", 
      author: "Robert Kiyosaki", 
      price: 16.99, 
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&q=80",
      coverColor: "from-green-500 to-emerald-600",
      spineColor: "from-green-600 to-emerald-700",
      accentColor: "bg-green-100",
      textColor: "text-green-900"
    },
    { 
      id: 4,
      title: "The Midnight Library", 
      author: "Matt Haig", 
      price: 17.99, 
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&q=80",
      coverColor: "from-purple-500 to-violet-600",
      spineColor: "from-purple-600 to-violet-700",
      accentColor: "bg-purple-100",
      textColor: "text-purple-900"
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrendingBook((prev) => (prev + 1) % trendingBooks.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [trendingBooks.length]);

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.5}px)`,
  };

  const mouseParallaxStyle = {
    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
  };

  return (
    <section 
      ref={heroRef}
      className="hero-container"
      aria-labelledby="hero-heading"
    >
      {/* Animated Background */}
      <div className="hero-parallax" style={parallaxStyle}>
        <div className="hero-particles">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="particle" />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="hero-content" style={{ paddingTop: '2rem' }}>
        <div className="desktop-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="hero-text">
              {/* Trust Badges */}
              <div className="mb-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white/90 backdrop-blur-sm border border-white/20">
                  <Crown className="w-4 h-4 mr-2" />
                  #1 Online Bookstore
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-custom-primary-green/20 text-green-100 backdrop-blur-sm border border-custom-primary-green/30">
                  <Shield className="w-4 h-4 mr-2" />
                  Secure Shopping
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-custom-accent-green/20 text-green-100 backdrop-blur-sm border border-custom-accent-green/30">
                  <Truck className="w-4 h-4 mr-2" />
                  Free Shipping
                </span>
              </div>

              {/* Main Headline */}
              <AnimatedTitle 
                id="hero-heading"
                staticText="Find Your Next"
                dynamicTexts={[
                  "Bestseller",
                  "Page-Turner", 
                  "Masterpiece",
                  "Adventure",
                  "Inspiration"
                ]}
              />

              <p className="hero-subtitle">
                Over 50,000 books from top authors. Get personalized recommendations, 
                exclusive deals, and free shipping on orders over $25.
              </p>

              {/* Search Bar */}
              <div className="mb-6">
                <SearchBar />
              </div>

              {/* Action Buttons */}
              <div className="hero-buttons">
                <Link
                  to="/books"
                  className="hero-button-primary group"
                  aria-label="Explore our book collection"
                >
                  <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Browse All Books
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/books?sort=bestseller"
                  className="hero-button-secondary group"
                  aria-label="View bestsellers"
                >
                  <Flame className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Bestsellers
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Quick Categories */}
              <div className="mb-6">
                <p className="text-white/80 text-sm mb-3 font-medium">Popular Categories:</p>
                <div className="flex flex-wrap gap-2">
                  {['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Biography'].map((category) => (
                    <Link
                      key={category}
                      to={`/categories/${category.toLowerCase()}`}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white/90 text-sm rounded-full transition-all duration-200 hover:scale-105"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Enhanced Stats */}
              <div className="hero-stats">
                <AnimatedStat 
                  number={50000} 
                  label="Books" 
                  icon={BookOpen}
                  delay={0}
                />
                <AnimatedStat 
                  number={1000000} 
                  label="Happy Readers" 
                  icon={Users}
                  delay={200}
                />
                <AnimatedStat 
                  number={4.9} 
                  label="Rating" 
                  icon={Star}
                  delay={400}
                />
                <AnimatedStat 
                  number={24} 
                  label="Support" 
                  icon={Award}
                  delay={600}
                  suffix="/7"
                />
              </div>
            </div>

            {/* Right Content - Trending Books Showcase */}
            <div className="hero-image" style={{ transform: 'translateY(10%)' }}>
              <div className="hero-image-container" style={mouseParallaxStyle}>
                {/* Trending Book Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Flame className="w-5 h-5 text-orange-400" />
                    <span className="text-white font-semibold">Trending Now</span>
                  </div>
                  
                  <div className="space-y-3">
                    {trendingBooks.map((book, index) => (
                      <div 
                        key={index}
                        className={`group transition-all duration-500 ${
                          index === currentTrendingBook 
                            ? 'scale-105 animate-pulse' 
                            : 'hover:scale-102'
                        }`}
                      >
                        {/* Realistic Book Design */}
                        <div className="relative flex items-start gap-3">
                          {/* Book Cover */}
                          <div className={`relative w-16 h-20 bg-gradient-to-br ${book.coverColor} rounded-sm shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-rotate-1 group-hover:-translate-y-1 ${
                            index === currentTrendingBook ? 'ring-2 ring-yellow-400/50' : ''
                          }`}
                               style={{
                                 boxShadow: index === currentTrendingBook 
                                   ? '0 4px 8px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 20px rgba(255, 193, 7, 0.3)'
                                   : '0 4px 8px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
                               }}>
                            {/* Book Spine */}
                            <div className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${book.spineColor} rounded-l-sm`}></div>
                            
                            {/* Book Cover Content */}
                            <div className="absolute inset-0 p-1.5 flex flex-col justify-between">
                              {/* Title Area */}
                              <div className="text-center">
                                <div className={`w-2 h-2 ${book.accentColor} rounded-full mx-auto mb-1.5 shadow-sm`}></div>
                                <div className="text-white text-xs font-bold leading-tight px-1 text-center">
                                  {book.title.split(' ').slice(0, 2).join(' ')}
                                </div>
                              </div>
                              
                              {/* Author */}
                              <div className="text-center">
                                <div className="text-white/90 text-xs font-medium leading-tight px-1 text-center">
                                  {book.author.split(' ').slice(0, 2).join(' ')}
                                </div>
                              </div>
                              
                              {/* Decorative Line */}
                              <div className="w-full h-px bg-white/40 mx-1"></div>
                              
                              {/* Rating Stars */}
                              <div className="flex justify-center space-x-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-1.5 h-1.5 ${
                                      i < Math.floor(book.rating) 
                                        ? 'text-yellow-300 fill-current' 
                                        : 'text-white/40'
                                    }`} 
                                  />
                                ))}
                              </div>
                            </div>
                            
                            {/* Book Shadow */}
                            <div className="absolute inset-0 bg-black/20 rounded-sm"></div>
                            
                            {/* Page Curl Effect */}
                            <div className="absolute top-0 right-0 w-2 h-2 bg-white/20 rounded-bl-sm"></div>
                            
                            {/* Page Flip Effect */}
                            <div className="absolute top-1 right-1 w-1 h-1 bg-white/30 rounded-full"></div>
                            
                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm"></div>
                            
                            {/* Book Binding Effect */}
                            <div className="absolute left-0 top-0 w-0.5 h-full bg-black/30"></div>
                          </div>
                          
                          {/* Book Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-semibold text-sm mb-1 line-clamp-2 leading-tight">
                              {book.title}
                            </h4>
                            <p className="text-white/80 text-xs mb-2 font-medium">{book.author}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-white text-xs font-semibold">{book.rating}</span>
                              </div>
                              <span className="text-green-400 font-bold text-sm">${book.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Link
                    to="/books?sort=trending"
                    className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white text-center py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    View All Trending
                  </Link>
                </div>

                {/* Floating Elements */}
                <div className="hero-floating-elements">
                  <div className="floating-book">
                    <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="floating-book">
                    <div className="w-full h-full bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="floating-book">
                    <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <BookMarked className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-pink-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 -right-4 w-12 h-12 bg-blue-400/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl"
          style={{
            left: `${mousePosition.x * 0.1}px`,
            top: `${mousePosition.y * 0.1}px`,
            transition: 'all 0.3s ease-out'
          }}
        ></div>
        <div 
          className="absolute w-64 h-64 bg-yellow-400/10 rounded-full blur-2xl"
          style={{
            right: `${mousePosition.x * 0.05}px`,
            bottom: `${mousePosition.y * 0.05}px`,
            transition: 'all 0.3s ease-out'
          }}
        ></div>
        <div 
          className="absolute w-80 h-80 bg-purple-400/5 rounded-full blur-3xl"
          style={{
            left: `${mousePosition.x * 0.03}px`,
            bottom: `${mousePosition.y * 0.08}px`,
            transition: 'all 0.3s ease-out'
          }}
        ></div>
      </div>
    </section>
  );
}

// Interactive Book Preview Component
export function InteractiveBookPreview({ books = [] }) {
  const [activeBook, setActiveBook] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBook((prev) => (prev + 1) % books.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [books.length]);

  if (books.length === 0) return null;

  return (
    <div className="relative">
      <div className="hero-image-container">
        <img
          src={books[activeBook]?.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDQwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMzAwTDE2MCAzNDBIMjQwTDIwMCAzMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iNDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjE4Ij5Cb29rIENvdmVyPC90ZXh0Pgo8L3N2Zz4K'}
          alt={books[activeBook]?.title || 'Book preview'}
          className="hero-image-main"
        />
        
        {/* Book Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
          <h3 className="font-semibold text-lg mb-1">{books[activeBook]?.title}</h3>
          <p className="text-sm opacity-90">by {books[activeBook]?.author}</p>
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < (books[activeBook]?.rating || 0) ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="ml-2 text-sm">({books[activeBook]?.reviewCount || 0})</span>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {books.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveBook(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeBook ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`View book ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
