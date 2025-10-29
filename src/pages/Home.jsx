import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../hooks/useTranslation';
import { SEOHead } from '../components/SEOHead';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Play,
  Pause,
  BookOpen,
  Plus,
  Clock,
  Award
} from 'lucide-react';

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const slideIntervalRef = useRef(null);
  const { addToCart } = useCart();
  const { t } = useTranslation();

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
  ];

  const trendingBooks = [
    { id: 1, rank: 1, title: 'The Midnight Library', author: 'Matt Haig', change: '+2', trend: 'up', rating: 4.5, price: 24.99 },
    { id: 2, rank: 2, title: 'Atomic Habits', author: 'James Clear', change: '-1', trend: 'down', rating: 4.8, price: 27.99 },
    { id: 3, rank: 3, title: 'Project Hail Mary', author: 'Andy Weir', change: '+1', trend: 'up', rating: 4.7, price: 29.99 },
    { id: 4, rank: 4, title: 'The Silent Patient', author: 'Alex Michaelides', change: 'new', trend: 'new', rating: 4.6, price: 26.99 },
  ];

  const dealBooks = [
    { id: 1, title: 'Bestseller Deal', discount: '40%', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop', originalPrice: 29.99, salePrice: 17.99 },
    { id: 2, title: 'New Release', discount: '25%', cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop', originalPrice: 24.99, salePrice: 18.74 },
    { id: 3, title: 'Classic Literature', discount: '30%', cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop', originalPrice: 19.99, salePrice: 13.99 },
    { id: 4, title: 'Award Winner', discount: '35%', cover: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=400&fit=crop', originalPrice: 32.99, salePrice: 21.44 },
  ];

  // Smooth auto-slide for hero
  useEffect(() => {
    if (isPlaying) {
      slideIntervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredHeroBooks.length);
      }, 5000);
    }
    return () => clearInterval(slideIntervalRef.current);
  }, [isPlaying, featuredHeroBooks.length]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredHeroBooks.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredHeroBooks.length) % featuredHeroBooks.length);

  const handleQuickAdd = (book, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
  };

  // Modern Book Card Component
  const BookCard = ({ book, showAddToCart = true }) => (
    <Link
      to={`/books/${book.id}`}
      className="flex-none w-40 sm:w-48 md:w-56 group relative overflow-hidden"
    >
      <div className="aspect-[3/4] mb-4 overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {showAddToCart && (
          <button
            onClick={(e) => handleQuickAdd(book, e)}
            className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm text-emerald-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-emerald-600 hover:text-white shadow-lg hover:scale-110"
            aria-label={`Add ${book.title} to cart`}
          >
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="space-y-2 px-1">
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-300 text-sm md:text-base leading-tight">
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

  // Carousel Section Component
  const CarouselSection = ({ title, books, sectionKey, bgColor = "bg-white", viewAllLink = "/books" }) => {
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
      if (scrollContainerRef.current) {
        const scrollAmount = 300;
        scrollContainerRef.current.scrollBy({
          left: direction * scrollAmount,
          behavior: 'smooth'
        });
      }
    };

    return (
      <section className={`py-12 ${bgColor} animate-on-scroll`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => scroll(-1)}
                  className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => scroll(1)}
                  className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <Link 
                to={viewAllLink}
                className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center"
              >
                {t('common.view_all')} <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide space-x-6 pb-4 -mx-4 px-4"
            >
              {books.map((book) => (
                <div key={book.id} className="flex-none">
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <SEOHead 
        title={t('home.title') + ' - Ikirezi Bookstore'}
        description={t('home.subtitle')}
        keywords="books, bookstore, reading, literature, new books, bestsellers"
      />
      
      <main className="min-h-screen bg-white overflow-x-hidden">
        {/* Enhanced Hero Section */}
        <section className="relative py-8 md:py-12 bg-gradient-to-br from-emerald-50 via-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Main Featured Book */}
              <div className="lg:col-span-2 relative group animate-on-scroll">
                <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="relative w-full h-full">
                    {featuredHeroBooks.map((book, index) => (
                      <div
                        key={book.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                          index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                          <div className="inline-flex items-center px-3 py-1 bg-emerald-600 rounded-full text-sm font-medium mb-3">
                            {t('nav.featured')}
                          </div>
                          <h1 className="text-2xl md:text-4xl font-bold mb-2 leading-tight">
                            {book.title}
                          </h1>
                          <p className="text-lg text-gray-200 mb-3">
                            by {book.author}
                          </p>
                          <p className="text-gray-300 mb-4 max-w-2xl text-sm md:text-base">
                            {book.description}
                          </p>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 md:w-5 md:h-5 ${
                                      i < Math.floor(book.rating) 
                                        ? 'text-yellow-400 fill-current' 
                                        : 'text-gray-400'
                                    }`}
                                  />
                                ))}
                                <span className="text-gray-300 ml-2 text-sm">({book.rating})</span>
                              </div>
                              <div className="text-xl md:text-2xl font-bold text-white">
                                ${book.price}
                              </div>
                            </div>
                            
                            <div className="flex space-x-3">
                              <Link
                                to={`/books/${book.id}`}
                                className="px-4 py-2 md:px-6 md:py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all duration-300 hover:scale-105 text-sm md:text-base"
                              >
                                {t('nav.book_details')}
                              </Link>
                              <button 
                                onClick={(e) => handleQuickAdd(book, e)}
                                className="px-4 py-2 md:px-6 md:py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 text-sm md:text-base"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Enhanced Controls */}
                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <button
                      onClick={prevSlide}
                      className="w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={nextSlide}
                      className="w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {featuredHeroBooks.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide 
                            ? 'bg-white scale-125 shadow-lg' 
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Side Promos */}
              <div className="flex flex-col gap-4 lg:gap-6 animate-on-scroll">
                {[
                  {
                    title: "Deal of the Day",
                    description: "Up to 50% off selected titles",
                    image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&h=200&fit=crop",
                    gradient: "from-emerald-900/80 to-emerald-700/60",
                    icon: Clock,
                    link: "/deals"
                  },
                  {
                    title: "Award Winners",
                    description: "Celebrated literary works",
                    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop",
                    gradient: "from-purple-900/80 to-purple-700/60",
                    icon: Award,
                    link: "/awards"
                  },
                  {
                    title: "New Releases",
                    description: "Fresh stories this week",
                    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=200&fit=crop",
                    gradient: "from-blue-900/80 to-blue-700/60",
                    icon: BookOpen,
                    link: "/new-releases"
                  }
                ].map((promo, index) => (
                  <Link 
                    key={index}
                    to={promo.link}
                    className="relative h-32 md:h-44 rounded-2xl overflow-hidden group flex-1"
                  >
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${promo.gradient} flex items-center p-4 md:p-6`}>
                      <div>
                        <promo.icon className="w-4 h-4 md:w-6 md:h-6 text-yellow-400 mb-1 md:mb-2" />
                        <h3 className="text-white font-bold text-lg md:text-xl mb-1">{promo.title}</h3>
                        <p className="text-emerald-100 text-xs md:text-sm">{promo.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Category Tiles */}
            <div className="mt-12 animate-on-scroll">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('home.categories')}</h3>
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
    {[
      {
        name: 'Fiction',
        icon: '📖',
        image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop',
        preview: ['The Midnight Library', 'The Goldfinch']
      },
      {
        name: 'Business',
        icon: '💼',
        image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=400&h=300&fit=crop',
        preview: ['Atomic Habits', 'Thinking, Fast and Slow']
      },
      {
        name: 'Science',
        icon: '🔬',
        image: 'https://images.unsplash.com/photo-1581090700227-1e7e8f3f7f3e?w=400&h=300&fit=crop',
        preview: ['Project Hail Mary', 'The Overstory']
      },
      {
        name: 'Technology',
        icon: '💻',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
        preview: ['Dune', 'Educated']
      },
      {
        name: 'Arts',
        icon: '🎨',
        image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=400&h=300&fit=crop',
        preview: ['The Silent Patient', 'The Alchemist']
      },
      {
        name: 'History',
        icon: '📜',
        image: 'https://images.unsplash.com/photo-1603570419960-3c3f9f3f3f3f?w=400&h=300&fit=crop',
        preview: ['The Covenant of Water', 'The Wager']
      }
    ].map((category, index) => (
      <Link
        key={index}
        to={`/categories/${category.name.toLowerCase()}`}
        className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
      >
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 flex flex-col justify-end">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-white text-xl">{category.icon}</span>
            <h4 className="text-white font-semibold text-lg">{category.name}</h4>
          </div>
          <ul className="text-sm text-gray-200 space-y-1">
            {category.preview.map((title, i) => (
              <li key={i} className="truncate">{title}</li>
            ))}
          </ul>
        </div>
      </Link>
    ))}
  </div>
</div>

          </div>
        </section>

        {/* Featured Books Carousel */}
        <CarouselSection
          title={t('home.featured_books')}
          books={featuredBooks}
          sectionKey="featured"
          bgColor="bg-white"
        />

        {/* Trending Now Section */}
        <section className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-on-scroll">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{t('nav.trending')}</h2>
              <p className="text-lg md:text-xl text-gray-600">{t('home.trending_description')}</p>
              </div>
              <Link 
                to="/trending"
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 hover:scale-105 hidden md:block"
              >
                {t('common.view_all')}
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {trendingBooks.map((book) => (
                <div key={book.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      book.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                      book.rank === 2 ? 'bg-gray-300 text-gray-900' :
                      book.rank === 3 ? 'bg-orange-400 text-orange-900' :
                      'bg-emerald-600 text-white'
                    }`}>
                      {book.rank}
                    </div>
                    <div className={`flex items-center space-x-1 text-sm font-semibold ${
                      book.trend === 'up' ? 'text-green-600' :
                      book.trend === 'down' ? 'text-red-600' :
                      'text-blue-600'
                    }`}>
                      {book.trend === 'new' ? (
                        <span>NEW</span>
                      ) : (
                        <>
                          <span>{book.change}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={book.cover || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=150&fit=crop"}
                      alt={book.title}
                      className="w-16 h-24 object-cover rounded-lg shadow-sm"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 line-clamp-2 mb-1">{book.title}</h3>
                      <p className="text-gray-600 text-sm">by {book.author}</p>
                      <div className="flex items-center space-x-1 mt-2">
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
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-emerald-600">${book.price}</div>
                    <button 
                      onClick={(e) => handleQuickAdd(book, e)}
                      className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-all duration-300 hover:scale-105"
                    >
                      {t('book.add_to_cart')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deal Zone Section */}
        <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50 animate-on-scroll">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('nav.on_sale')}</h2>
              <p className="text-lg md:text-xl text-gray-600">{t('home.deals_description')}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dealBooks.map((deal) => (
                <div key={deal.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative">
                    <img 
                      src={deal.cover} 
                      alt={deal.title} 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                    />
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      -{deal.discount}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">{deal.title}</h3>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl font-bold text-emerald-600">${deal.salePrice}</span>
                      <span className="text-lg text-gray-500 line-through">${deal.originalPrice}</span>
                    </div>
                    <button className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-all duration-300 hover:scale-105 font-semibold">
                      {t('book.add_to_cart')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals Carousel */}
        <CarouselSection
          title={t('nav.new_releases')}
          books={featuredBooks.slice(0, 6)}
          sectionKey="new-arrivals"
          bgColor="bg-gray-50"
          viewAllLink="/new-arrivals"
        />
      </main>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </>
  );
}