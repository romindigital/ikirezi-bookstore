import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { SEOHead } from '../components/SEOHead';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Play,
  Pause,
  BookOpen,
  ShoppingCart,
  Plus,
  Quote,
  Clock,
  Award
} from 'lucide-react';

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndices, setCurrentIndices] = useState({
    featured: 0,
    newArrivals: 0,
    bestselling: 0
  });

  const slideIntervalRef = useRef(null);
  const rowRefs = useRef({});
  const { addToCart } = useCart();

  // Featured Hero Books
  const featuredHeroBooks = [
    {
      id: 1,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      title: "The Midnight Library",
      author: "Matt Haig",
      rating: 4.5,
      price: 24.99,
      description: "A novel about all the choices that go into a life well lived."
    },
    {
      id: 2,
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
      title: "Dune",
      author: "Frank Herbert",
      rating: 4.9,
      price: 32.99,
      description: "Science fiction's supreme masterpiece, a story of myth and mystery."
    },
    {
      id: 3,
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
      title: "Atomic Habits",
      author: "James Clear",
      rating: 4.8,
      price: 27.99,
      description: "Tiny changes, remarkable results. An easy way to build good habits."
    }
  ];

  const featuredBooks = [
    { id: 1, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop", title: "The Midnight Library", rating: 4.5, price: 24.99 },
    { id: 2, cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=300&fit=crop", title: "Atomic Habits", rating: 4.8, price: 27.99 },
    { id: 3, cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=300&fit=crop", title: "Project Hail Mary", rating: 4.7, price: 29.99 },
    { id: 4, cover: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=200&h=300&fit=crop", title: "The Silent Patient", rating: 4.6, price: 26.99 },
    { id: 5, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop", title: "Dune", rating: 4.9, price: 32.99 },
    { id: 6, cover: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=200&h=300&fit=crop", title: "Thinking, Fast and Slow", rating: 4.7, price: 28.99 },
    { id: 7, cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop", title: "The Goldfinch", rating: 4.4, price: 31.99 },
    { id: 8, cover: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=200&h=300&fit=crop", title: "The Overstory", rating: 4.5, price: 29.99 },
    { id: 9, cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop", title: "Educated", rating: 4.8, price: 27.99 },
    { id: 10, cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=200&h=300&fit=crop", title: "The Alchemist", rating: 4.6, price: 23.99 }
  ];


  // Smooth auto-slide for hero with fade transitions
  useEffect(() => {
    if (isPlaying) {
      slideIntervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          const nextSlide = (prev + 1) % featuredHeroBooks.length;
          // Smooth transition with opacity change
          const heroImage = document.querySelector('.hero-book-image');
          if (heroImage) {
            heroImage.style.opacity = '0';
            setTimeout(() => {
              setCurrentSlide(nextSlide);
              heroImage.style.opacity = '1';
            }, 300);
          }
          return nextSlide;
        });
      }, 4000); // Faster auto-play: 4 seconds instead of 5
    } else {
      clearInterval(slideIntervalRef.current);
    }

    return () => clearInterval(slideIntervalRef.current);
  }, [isPlaying, featuredHeroBooks.length]);

  // Smooth scroll animations on scroll with enhanced transitions
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay for smooth sequential animations
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
          }, index * 200); // 200ms delay between each section for smoother cascading effect
        }
      });
    }, observerOptions);

    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach((section) => {
      // Set initial state
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Enhanced carousel functionality
  const booksPerView = 4; // Number of books visible at once

  const smoothScrollRow = (section, direction = 1) => {
    const container = rowRefs.current[section];
    if (!container) return;
    const amount = Math.round(container.clientWidth * 0.9) * direction;
    container.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const nextCarouselSlide = (section) => smoothScrollRow(section, 1);
  const prevCarouselSlide = (section) => smoothScrollRow(section, -1);


  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredHeroBooks.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredHeroBooks.length) % featuredHeroBooks.length);

  const handleQuickAdd = (book, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
  };

  // Reusable Book Card Component with Lazy Loading
  const BookCard = ({ book, showAddToCart = true }) => (
    <Link
      to={`/books/${book.id}`}
      className="flex-none w-40 sm:w-48 md:w-56 group relative"
    >
      <div className="aspect-[3/4] mb-3 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />

        {showAddToCart && (
          <button
            onClick={(e) => handleQuickAdd(book, e)}
            className="absolute top-2 right-2 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-emerald-700 shadow-lg"
            aria-label={`Add ${book.title} to cart`}
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors text-sm md:text-base">
          {book.title}
        </h3>

        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(book.rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({book.rating})</span>
        </div>

        <div className="text-lg font-bold text-emerald-600">
          ${book.price}
        </div>
      </div>
    </Link>
  );

  // Modern Swiper-based Carousel Section Component
  const CarouselSection = ({ title, books, sectionKey, bgColor = "bg-white" }) => (
    <section className={`py-12 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => prevCarouselSlide(sectionKey)}
              className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md"
              aria-label={`Previous ${title.toLowerCase()}`}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-emerald-600" />
            </button>
            <button
              onClick={() => nextCarouselSlide(sectionKey)}
              className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md"
              aria-label={`Next ${title.toLowerCase()}`}
            >
              <ChevronRight className="w-5 h-5 text-gray-600 hover:text-emerald-600" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={(el) => { if (el) rowRefs.current[sectionKey] = el; }}
            className="flex overflow-x-auto"
          >
            {books.map((book) => (
              <div key={book.id} className="flex-none px-3" style={{ width: `${100 / booksPerView}%` }}>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <SEOHead 
        title="Ikirezi Bookstore - Premium Book Collection"
        description="Discover your next great read. Professional bookstore with curated collections, new arrivals, and bestselling titles."
        keywords="books, bookstore, reading, literature, new books, bestsellers"
      />
      
<main className="min-h-screen bg-white">
  {/* Amazon-Style Multi-Zone Hero Section */}
  <section className="relative py-12 bg-gradient-to-br from-emerald-50 via-white to-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        {/* Main Featured Book - Left (2/3 width) */}
        <div className="lg:col-span-2 relative group">
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <img
              src={featuredHeroBooks[currentSlide].cover}
              alt={featuredHeroBooks[currentSlide].title}
              className="hero-book-image w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-in-out cursor-pointer"
              style={{ transition: 'opacity 0.3s ease-in-out, transform 0.7s ease-in-out' }}
              onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredHeroBooks.length)}
              title="Click to see next featured book"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            
            {/* Book Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="inline-flex items-center px-3 py-1 bg-emerald-600 rounded-full text-sm font-medium mb-4">
                Featured Book
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {featuredHeroBooks[currentSlide].title}
              </h1>
              <p className="text-lg text-gray-200 mb-4">
                by {featuredHeroBooks[currentSlide].author}
              </p>
              <p className="text-gray-300 mb-6 max-w-2xl">
                {featuredHeroBooks[currentSlide].description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(featuredHeroBooks[currentSlide].rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-400'
                        }`}
                      />
                    ))}
                    <span className="text-gray-300 ml-2">({featuredHeroBooks[currentSlide].rating})</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    ${featuredHeroBooks[currentSlide].price}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Link
                    to={`/books/${featuredHeroBooks[currentSlide].id}`}
                    className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                  >
                    View Details
                  </Link>
                  <button className="px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Controls */}
            <div className="absolute top-6 right-6 flex items-center space-x-2">
              {/* Previous Slide Button */}
              <button
                onClick={prevSlide}
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200 group"
                title="Previous book"
              >
                <ChevronLeft className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>

              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200 group"
                title={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
              >
                {isPlaying ? <Pause className="w-4 h-4 group-hover:scale-110 transition-transform" /> : <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />}
              </button>

              {/* Next Slide Button */}
              <button
                onClick={nextSlide}
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200 group"
                title="Next book"
              >
                <ChevronRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>

              {/* Slide Indicators */}
              <div className="flex space-x-1 ml-2">
                {featuredHeroBooks.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                      index === currentSlide ? 'bg-white scale-125 shadow-lg' : 'bg-white/50 hover:bg-white/80'
                    }`}
                    title={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side Promos - Right (1/3 width) */}
        <div className="flex flex-col gap-6">
          {/* Deal of the Day */}
          <Link 
            to="/deals"
            className="relative h-44 rounded-xl overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&h=200&fit=crop"
              alt="Deal of the Day"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/60 flex items-center p-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-semibold">Limited Time</span>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Deal of the Day</h3>
                <p className="text-emerald-100 text-sm">Up to 50% off selected titles</p>
                <div className="flex items-center space-x-2 mt-3">
                  <div className="px-2 py-1 bg-white/20 rounded text-xs text-white">
                    12:34:56
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Award Winners */}
          <Link 
            to="/awards"
            className="relative h-44 rounded-xl overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop"
              alt="Award Winners"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-purple-700/60 flex items-center p-6">
              <div>
                <Award className="w-6 h-6 text-yellow-400 mb-2" />
                <h3 className="text-white font-bold text-xl mb-1">Award Winners</h3>
                <p className="text-purple-100 text-sm">Celebrated literary works</p>
              </div>
            </div>
          </Link>

          {/* New Releases */}
          <Link 
            to="/new-releases"
            className="relative h-44 rounded-xl overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=200&fit=crop"
              alt="New Releases"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/60 flex items-center p-6">
              <div>
                <BookOpen className="w-6 h-6 text-white mb-2" />
                <h3 className="text-white font-bold text-xl mb-1">New Releases</h3>
                <p className="text-blue-100 text-sm">Fresh stories this week</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Quick Category Tiles */}
      <div className="mt-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Shop by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'Fiction', icon: '📚', color: 'from-blue-500 to-cyan-500' },
            { name: 'Business', icon: '💼', color: 'from-green-500 to-emerald-500' },
            { name: 'Science', icon: '🔬', color: 'from-purple-500 to-violet-500' },
            { name: 'Technology', icon: '💻', color: 'from-orange-500 to-red-500' },
            { name: 'Arts', icon: '🎨', color: 'from-pink-500 to-rose-500' },
            { name: 'History', icon: '📜', color: 'from-yellow-500 to-amber-500' },
          ].map((category, index) => (
            <Link
              key={index}
              to={`/categories/${category.name.toLowerCase()}`}
              className="group bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{category.icon}</span>
              </div>
              <h4 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                {category.name}
              </h4>
            </Link>
          ))}
        </div>
      </div>

      {/* Personalized Recommendations */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recommended For You</h3>
          <Link 
            to="/recommendations" 
            className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center"
          >
            See all <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {featuredBooks.slice(0, 6).map((book) => (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              className="group text-center"
            >
              <div className="relative mb-3">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-lg group-hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                />
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-emerald-700">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <h4 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-emerald-600 transition-colors duration-300 mb-1">
                {book.title}
              </h4>
              <div className="flex items-center justify-center space-x-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(book.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-emerald-600 font-bold">${book.price}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>

  {/* Rest of your existing sections remain the same */}
  <section className="py-12 bg-gradient-to-r from-gray-900 to-emerald-900 text-white">
    {/* ... existing banner ad code ... */}
  </section>

  <CarouselSection
    title="Featured Books"
    books={featuredBooks}
    sectionKey="featured"
    bgColor="bg-emerald-50"
  />

    {/* Waterstones-Style Trending Now */}
  <section className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Trending Now</h2>
          <p className="text-xl text-gray-600">What everyone's reading this week</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button className="w-3 h-3 bg-emerald-600 rounded-full"></button>
            <button className="w-3 h-3 bg-gray-300 rounded-full"></button>
            <button className="w-3 h-3 bg-gray-300 rounded-full"></button>
          </div>
          <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            View All
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { rank: 1, title: 'The Midnight Library', author: 'Matt Haig', change: '+2', trend: 'up' },
          { rank: 2, title: 'Atomic Habits', author: 'James Clear', change: '-1', trend: 'down' },
          { rank: 3, title: 'Project Hail Mary', author: 'Andy Weir', change: '+1', trend: 'up' },
          { rank: 4, title: 'The Silent Patient', author: 'Alex Michaelides', change: 'new', trend: 'new' },
        ].map((book, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                book.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                book.rank === 2 ? 'bg-gray-300 text-gray-900' :
                book.rank === 3 ? 'bg-orange-400 text-orange-900' :
                'bg-emerald-600 text-white'
              }`}>
                {book.rank}
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                book.trend === 'up' ? 'text-green-600' :
                book.trend === 'down' ? 'text-red-600' :
                'text-blue-600'
              }`}>
                {book.trend === 'new' ? (
                  <span className="font-semibold">NEW</span>
                ) : (
                  <>
                    <span>{book.change}</span>
                  </>
                )}
              </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{book.title}</h3>
            <p className="text-gray-600 mb-4">by {book.author}</p>
            <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>

    {/* Amazon-Style Deal Zone */}
  <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Limited Time Deals</h2>
        <p className="text-xl text-gray-600">Don't miss out on these exclusive offers</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Bestseller Deal', discount: '40%', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop', originalPrice: 29.99, salePrice: 17.99 },
          { title: 'New Release', discount: '25%', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop', originalPrice: 24.99, salePrice: 18.74 },
          { title: 'Classic Literature', discount: '30%', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop', originalPrice: 19.99, salePrice: 13.99 },
          { title: 'Award Winner', discount: '35%', image: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=400&fit=crop', originalPrice: 32.99, salePrice: 21.44 },
        ].map((deal, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="relative">
              <img src={deal.image} alt={deal.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                -{deal.discount}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{deal.title}</h3>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-lg font-bold text-emerald-600">${deal.salePrice}</span>
                <span className="text-sm text-gray-500 line-through">${deal.originalPrice}</span>
              </div>
              <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  
</main>
    </>
  );
}
