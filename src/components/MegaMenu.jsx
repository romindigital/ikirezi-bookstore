import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronRight, 
  faBook, 
  faStar, 
  faArrowRight,
  faTimes,
  faSearch,
  faBolt,
  faChartLine,
  faClock,
  faFilter,
  faSort,
  faEye,
  faHeart,
  faShoppingCart,
  faBookmark,
  faThumbsUp,
  faFire,
  faTh
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../hooks/useTranslation';
import { bookService } from '../services/bookService';

export function MegaMenu({ isOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { t } = useTranslation();

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

  // Enhanced category data with subcategories
  const enhancedCategories = [
    {
      id: 1,
      name: 'Fiction',
      icon: '📚',
      bookCount: 1250,
      subcategories: ['Literary Fiction', 'Historical Fiction', 'Contemporary Fiction', 'Classic Literature'],
      trending: true,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      name: 'Mystery',
      icon: '🔍',
      bookCount: 890,
      subcategories: ['Crime Thriller', 'Detective Stories', 'Cozy Mystery', 'Psychological Thriller'],
      trending: true,
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 3,
      name: 'Romance',
      icon: '💕',
      bookCount: 1100,
      subcategories: ['Contemporary Romance', 'Historical Romance', 'Paranormal Romance', 'Romantic Comedy'],
      trending: false,
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 4,
      name: 'Sci-Fi',
      icon: '🚀',
      bookCount: 750,
      subcategories: ['Space Opera', 'Cyberpunk', 'Dystopian', 'Time Travel'],
      trending: true,
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 5,
      name: 'Fantasy',
      icon: '🧙‍♂️',
      bookCount: 980,
      subcategories: ['Epic Fantasy', 'Urban Fantasy', 'Dark Fantasy', 'Young Adult Fantasy'],
      trending: true,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 6,
      name: 'Thriller',
      icon: '⚡',
      bookCount: 650,
      subcategories: ['Psychological Thriller', 'Action Thriller', 'Legal Thriller', 'Military Thriller'],
      trending: false,
      color: 'from-red-500 to-orange-600'
    },
    {
      id: 7,
      name: 'Biography',
      icon: '👤',
      bookCount: 420,
      subcategories: ['Autobiography', 'Memoir', 'Historical Biography', 'Celebrity Biography'],
      trending: false,
      color: 'from-yellow-500 to-amber-600'
    },
    {
      id: 8,
      name: 'History',
      icon: '📜',
      bookCount: 380,
      subcategories: ['World History', 'Military History', 'Cultural History', 'Ancient History'],
      trending: false,
      color: 'from-amber-600 to-orange-700'
    },
    {
      id: 9,
      name: 'Non-Fiction',
      icon: '📖',
      bookCount: 850,
      subcategories: ['Philosophy', 'Politics', 'Economics', 'Social Sciences'],
      trending: false,
      color: 'from-indigo-500 to-blue-600'
    },
    {
      id: 10,
      name: 'Self-Help',
      icon: '💪',
      bookCount: 320,
      subcategories: ['Personal Development', 'Psychology', 'Motivation', 'Productivity'],
      trending: true,
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: 11,
      name: 'Business',
      icon: '💼',
      bookCount: 280,
      subcategories: ['Entrepreneurship', 'Management', 'Marketing', 'Finance'],
      trending: false,
      color: 'from-slate-500 to-gray-600'
    },
    {
      id: 12,
      name: 'Science',
      icon: '🔬',
      bookCount: 190,
      subcategories: ['Physics', 'Biology', 'Chemistry', 'Mathematics'],
      trending: false,
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      fetchMegaMenuData();
    }
  }, [isOpen]);

  // Filter and sort categories
  useEffect(() => {
    let filtered = [...enhancedCategories];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(category => 
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.subcategories.some(sub => 
          sub.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    // Sort categories
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => (b.bookCount || 0) - (a.bookCount || 0));
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'trending':
        filtered.sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return (b.bookCount || 0) - (a.bookCount || 0);
        });
        break;
      default:
        break;
    }
    
    setFilteredCategories(filtered);
  }, [searchQuery, sortBy]);

  const fetchMegaMenuData = async () => {
    try {
      setLoading(true);
      const [categoriesData, booksData] = await Promise.all([
        bookService.getCategories(),
        bookService.getFeaturedBooks()
      ]);
      
      setCategories(categoriesData.slice(0, 12)); // Show top 12 categories
      setFeaturedBooks(booksData.slice(0, 6)); // Show 6 featured books
    } catch (error) {
      console.error('Error fetching mega menu data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 z-40 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Mega Menu */}
      <div 
        className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-200 z-50 animate-in slide-in-from-top-2 duration-300"
        onMouseEnter={() => setHoveredCategory(null)}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <div className="desktop-container py-8">
          {/* Header with Search and Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-custom-primary-green to-custom-accent-green bg-clip-text text-transparent">
                {t('nav.browse_categories')}
              </h2>
              <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-500">
                <FontAwesomeIcon icon={faBook} className="w-4 h-4" />
                <span>{categories.length} categories available</span>
              </div>
            </div>
            
            {/* Search and Sort Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Bar */}
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
                />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-primary-green focus:border-transparent w-full sm:w-64"
                />
              </div>
              
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-primary-green focus:border-transparent"
              >
                <option value="popular">Most Popular</option>
                <option value="alphabetical">A-Z</option>
                <option value="trending">Trending</option>
              </select>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Categories Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <FontAwesomeIcon icon={faFire} className="w-5 h-5 text-orange-500 mr-2" />
                  {t('nav.popular_categories')}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                  <span>{filteredCategories.length} categories</span>
                </div>
              </div>
              
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl h-24 mb-3"></div>
                      <div className="bg-gray-200 rounded h-4 mb-2"></div>
                      <div className="bg-gray-200 rounded h-3 w-3/4 mb-1"></div>
                      <div className="bg-gray-200 rounded h-3 w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredCategories.map((category, index) => (
                    <div
                      key={category.id}
                      className="group relative"
                      onMouseEnter={() => setHoveredCategory(category.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <Link
                        to={`/books?category=${category.name.toLowerCase()}`}
                        className="block p-4 rounded-xl border border-gray-200 hover:border-custom-primary-green hover:shadow-lg transition-all duration-300 bg-white hover:bg-gradient-to-br hover:from-green-50 hover:to-accent-50 transform hover:-translate-y-1"
                        onClick={(e) => {
                          if (window.innerWidth < 1024) {
                            e.preventDefault();
                            setActiveSubmenu(activeSubmenu === category.id ? null : category.id);
                          } else {
                            onClose();
                          }
                        }}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {/* Trending Badge */}
                        {category.trending && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                            <FontAwesomeIcon icon={faChartLine} className="w-3 h-3 mr-1" />
                            Trending
                          </div>
                        )}
                        
                        <div className="text-center">
                          <div className="relative mb-3">
                            <div className={`text-4xl group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3 bg-gradient-to-br ${category.color} bg-clip-text text-transparent`}>
                              {category.icon}
                            </div>
                            {/* Book count badge */}
                            <div className="absolute -bottom-1 -right-1 bg-green-100 text-custom-primary-green text-xs font-semibold px-2 py-1 rounded-full">
                              {category.bookCount}
                            </div>
                          </div>
                          
                          <h4 className="font-bold text-gray-900 group-hover:text-custom-primary-green transition-colors text-sm mb-1">
                            {category.name}
                          </h4>
                          
                          <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                            <FontAwesomeIcon icon={faBook} className="w-3 h-3" />
                            <span>{category.bookCount} books</span>
                          </div>
                          
                          {/* Hover arrow */}
                          <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <FontAwesomeIcon 
                              icon={faArrowRight} 
                              className="w-4 h-4 text-custom-primary-green mx-auto transform group-hover:translate-x-1 transition-transform" 
                            />
                          </div>
                        </div>
                      </Link>

                      {/* Advanced Submenu - Desktop */}
                      {hoveredCategory === category.id && (
                        <div className="hidden lg:block absolute top-0 left-full ml-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-in slide-in-from-left-2 duration-300">
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                <span className="text-2xl mr-2">{category.icon}</span>
                                {category.name}
                              </h3>
                              <div className="text-sm text-gray-500">
                                {category.bookCount} books
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-gray-700 mb-3">Subcategories</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {category.subcategories.map((subcategory, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    to={`/books?category=${category.name.toLowerCase()}&subcategory=${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="block p-2 text-sm text-gray-600 hover:text-green-primary hover:bg-green-50 rounded-lg transition-colors"
                                    onClick={onClose}
                                  >
                                    {subcategory}
                                  </Link>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Link
                                to={`/books?category=${category.name.toLowerCase()}`}
                                className="flex-1 bg-gradient-to-r from-green-primary to-accent-500 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:from-green-dark hover:to-accent-600 transition-all duration-300 text-center"
                                onClick={onClose}
                              >
                                View All
                              </Link>
                              <Link
                                to={`/books?category=${category.name.toLowerCase()}&sort=featured`}
                                className="flex-1 bg-gray-100 text-gray-700 text-sm font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center"
                                onClick={onClose}
                              >
                                Featured
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Mobile Submenu */}
                      {activeSubmenu === category.id && (
                        <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-in slide-in-from-top-2 duration-300">
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                <span className="text-xl mr-2">{category.icon}</span>
                                {category.name}
                              </h3>
                              <button
                                onClick={() => setActiveSubmenu(null)}
                                className="p-1 text-gray-400 hover:text-gray-600"
                              >
                                <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-gray-700 mb-3">Subcategories</h4>
                              <div className="space-y-2">
                                {category.subcategories.map((subcategory, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    to={`/books?category=${category.name.toLowerCase()}&subcategory=${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="block p-3 text-sm text-gray-600 hover:text-green-primary hover:bg-green-50 rounded-lg transition-colors border border-gray-100"
                                    onClick={onClose}
                                  >
                                    {subcategory}
                                  </Link>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Link
                                to={`/books?category=${category.name.toLowerCase()}`}
                                className="block w-full bg-gradient-to-r from-green-primary to-accent-500 text-white text-sm font-semibold py-3 px-4 rounded-lg hover:from-green-dark hover:to-accent-600 transition-all duration-300 text-center"
                                onClick={onClose}
                              >
                                View All {category.name} Books
                              </Link>
                              <Link
                                to={`/books?category=${category.name.toLowerCase()}&sort=featured`}
                                className="block w-full bg-gray-100 text-gray-700 text-sm font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center"
                                onClick={onClose}
                              >
                                Featured {category.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* View All Categories Link */}
              <div className="mt-8 text-center">
                <Link
                  to="/categories"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-primary to-accent-500 text-white font-semibold rounded-xl hover:from-green-dark hover:to-accent-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
                  onClick={onClose}
                >
                  <FontAwesomeIcon icon={faBook} className="w-5 h-5 mr-2" />
                  {t('nav.view_all_categories')}
                  <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Featured Books Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <FontAwesomeIcon icon={faStar} className="w-5 h-5 text-yellow-500 mr-2" />
                  {t('nav.featured_books')}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                  <span>Updated daily</span>
                </div>
              </div>
              
              {loading ? (
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse flex space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className="bg-gray-200 rounded-lg w-16 h-20"></div>
                      <div className="flex-1">
                        <div className="bg-gray-200 rounded h-4 mb-2"></div>
                        <div className="bg-gray-200 rounded h-3 w-3/4 mb-2"></div>
                        <div className="bg-gray-200 rounded h-3 w-1/2 mb-2"></div>
                        <div className="bg-gray-200 rounded h-3 w-1/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {featuredBooks.map((book, index) => (
                    <Link
                      key={book.id}
                      to={`/book/${book.id}`}
                      className="flex space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-accent-50 transition-all duration-300 group border border-gray-100 hover:border-green-200 hover:shadow-md"
                      onClick={onClose}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex-shrink-0 relative">
                        <img
                          src={book.coverImage || '/placeholder-book.jpg'}
                          alt={book.title}
                          className="w-16 h-20 object-cover rounded-lg border-2 border-gray-200 group-hover:border-green-primary transition-colors shadow-sm group-hover:shadow-md"
                        />
                        {/* Bestseller Badge */}
                        {index < 2 && (
                          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                            Bestseller
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 group-hover:text-green-primary transition-colors text-sm mb-1 line-clamp-2">
                          {book.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2 truncate">
                          by {book.author}
                        </p>
                        
                        {/* Rating */}
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FontAwesomeIcon
                                key={i}
                                icon={faStar}
                                className={`w-3 h-3 ${
                                  i < Math.floor(book.rating || 0)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 ml-2 font-medium">
                            {book.rating || 0}
                          </span>
                        </div>
                        
                        {/* Price and Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-green-primary">
                              ${book.price}
                            </span>
                            {book.originalPrice && book.originalPrice > book.price && (
                              <span className="text-xs text-gray-400 line-through">
                                ${book.originalPrice}
                              </span>
                            )}
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                              <FontAwesomeIcon icon={faHeart} className="w-3 h-3" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-green-primary transition-colors">
                              <FontAwesomeIcon icon={faBookmark} className="w-3 h-3" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-green-500 transition-colors">
                              <FontAwesomeIcon icon={faShoppingCart} className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* View All Books Link */}
              <div className="mt-6">
                <Link
                  to="/books"
                  className="block w-full text-center py-3 px-4 bg-gradient-to-r from-green-primary to-accent-500 text-white font-semibold rounded-xl hover:from-green-dark hover:to-accent-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
                  onClick={onClose}
                >
                  <FontAwesomeIcon icon={faBook} className="w-4 h-4 mr-2" />
                  {t('nav.view_all_books')}
                  <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <FontAwesomeIcon icon={faFilter} className="w-5 h-5 text-purple-500 mr-2" />
                Quick Filters
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FontAwesomeIcon icon={faSort} className="w-4 h-4" />
                <span>Popular filters</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                to="/books?sort=featured"
                className="flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-accent-50 transition-all duration-300 group border border-gray-100 hover:border-green-200 hover:shadow-md"
                onClick={onClose}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-primary to-accent-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={faStar} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-gray-700 group-hover:text-green-primary text-sm">
                    {t('nav.featured')}
                  </span>
                  <p className="text-xs text-gray-500">Editor's picks</p>
                </div>
              </Link>
              
              <Link
                to="/books?sort=newest"
                className="flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-accent-50 transition-all duration-300 group border border-gray-100 hover:border-green-200 hover:shadow-md"
                onClick={onClose}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-light to-green-primary rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={faBook} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-gray-700 group-hover:text-green-primary text-sm">
                    {t('nav.new_releases')}
                  </span>
                  <p className="text-xs text-gray-500">Latest books</p>
                </div>
              </Link>
              
              <Link
                to="/books?sort=bestselling"
                className="flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-accent-50 transition-all duration-300 group border border-gray-100 hover:border-green-200 hover:shadow-md"
                onClick={onClose}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-green-primary rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={faChartLine} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-gray-700 group-hover:text-green-primary text-sm">
                    {t('nav.bestsellers')}
                  </span>
                  <p className="text-xs text-gray-500">Top sellers</p>
                </div>
              </Link>
              
              <Link
                to="/books?sort=discounted"
                className="flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-accent-50 transition-all duration-300 group border border-gray-100 hover:border-green-200 hover:shadow-md"
                onClick={onClose}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-dark to-accent-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={faBolt} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-gray-700 group-hover:text-green-primary text-sm">
                    {t('nav.on_sale')}
                  </span>
                  <p className="text-xs text-gray-500">Great deals</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
