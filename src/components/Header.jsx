import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
  Settings,
  BookOpen,
  Grid3X3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Home,
  Heart,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../hooks/useTranslation';
import { EnhancedSearchBar } from './EnhancedSearchBar';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const megaMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setIsMegaMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsMegaMenuOpen(false);
    setIsSearchExpanded(false);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Simplified contact info
  const contactInfo = [
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: Mail, text: 'support@ikirezi.com' },
  ];

  // Enhanced mega menu structure for bookstore
  const megaMenuCategories = {
    fiction: {
      title: 'Fiction',
      icon: BookOpen,
      color: 'emerald',
      subcategories: [
        { name: 'Literary Fiction', count: 1250, path: '/fiction/literary' },
        { name: 'Contemporary', count: 890, path: '/fiction/contemporary' },
        { name: 'Historical Fiction', count: 650, path: '/fiction/historical' },
        { name: 'Short Stories', count: 320, path: '/fiction/short-stories' }
      ]
    },
    nonfiction: {
      title: 'Non-Fiction',
      icon: BookOpen,
      color: 'amber',
      subcategories: [
        { name: 'Biography & Memoir', count: 980, path: '/nonfiction/biography' },
        { name: 'History', count: 750, path: '/nonfiction/history' },
        { name: 'Science & Technology', count: 620, path: '/nonfiction/science' },
        { name: 'Self-Help', count: 890, path: '/nonfiction/self-help' }
      ]
    },
    genres: {
      title: 'Popular Genres',
      icon: BookOpen,
      color: 'emerald',
      subcategories: [
        { name: 'Romance', count: 1100, path: '/genres/romance' },
        { name: 'Mystery & Thriller', count: 920, path: '/genres/mystery' },
        { name: 'Fantasy', count: 780, path: '/genres/fantasy' },
        { name: 'Science Fiction', count: 650, path: '/genres/sci-fi' }
      ]
    },
    children: {
      title: 'Children & YA',
      icon: BookOpen,
      color: 'amber',
      subcategories: [
        { name: 'Picture Books', count: 450, path: '/children/picture-books' },
        { name: 'Middle Grade', count: 380, path: '/children/middle-grade' },
        { name: 'Young Adult', count: 720, path: '/children/young-adult' },
        { name: 'Educational', count: 290, path: '/children/educational' }
      ]
    }
  };

  const featuredBooks = [
    { title: "The Midnight Library", author: "Matt Haig", price: 24.99, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&h=180&fit=crop", path: "/books/midnight-library" },
    { title: "Atomic Habits", author: "James Clear", price: 27.99, cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=120&h=180&fit=crop", path: "/books/atomic-habits" },
    { title: "Dune", author: "Frank Herbert", price: 32.99, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=120&h=180&fit=crop", path: "/books/dune" }
  ];

  const quickLinks = [
    { name: 'Bestsellers', icon: Award, path: '/bestsellers' },
    { name: 'New Releases', icon: BookOpen, path: '/new-releases' },
    { name: 'Award Winners', icon: Award, path: '/awards' },
    { name: 'Staff Picks', icon: Heart, path: '/staff-picks' }
  ];

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={closeAllMenus} />
      )}

      <header className={`bg-white sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg border-b border-gray-200' : 'shadow-sm'
        }`}>
        {/* Top Info Bar - Simplified */}
        <div className="bg-amber-500/80 border-b border-gray-200 hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-2 text-xs text-gray-900">
              {/* Contact Information Only */}
              <div className="flex items-center space-x-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <item.icon className="w-3 h-3 text-emerald-600" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Simple Welcome Message */}
              <div className="text-gray-900">
                {t('home.free_shipping_description')}
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 z-50"
              onClick={closeAllMenus}
            >
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Ikirezi</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
              <Link
                to="/"
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 relative group ${isActive('/')
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
              >
                <span className="flex items-center">
                  <Home className="w-4 h-4 mr-2" />
                  {t('nav.home')}
                </span>
                {isActive('/') && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-emerald-600 rounded-full"></div>
                )}
              </Link>

              <Link
                to="/books"
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 relative group ${isActive('/books')
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
              >
                <span className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t('nav.books')}
                </span>
                {isActive('/books') && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-emerald-600 rounded-full"></div>
                )}
              </Link>

              {/* Categories with Mega Menu */}
              <div className="relative" ref={megaMenuRef}>
                <Link to={`/categories`}>
                  <button
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                    onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center relative group ${isMegaMenuOpen || isActive('/categories')
                        ? 'text-emerald-600 bg-emerald-50'
                        : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                      }`}
                  >
                    <Grid3X3 className="w-4 h-4 mr-2" />
                    {t('nav.categories')}
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''
                      }`} />
                    {(isMegaMenuOpen || isActive('/categories')) && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-emerald-600 rounded-full"></div>
                    )}
                  </button>
                </Link>

                {/* Enhanced Mega Menu - Professional Bookstore Style */}
                {isMegaMenuOpen && (
                  <div
                    className="rounded-lg absolute left-[200px] transform -translate-x-1/2 top-full w-screen max-w-7xl bg-white shadow-2xl border border-gray-200 z-50 mt-2 transition duration-200"
                    onMouseLeave={() => setIsMegaMenuOpen(false)}
                  >
                    <div className="p-8">
                      {/* Featured Books Section */}
                      <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                          <Award className="w-5 h-5 mr-2 text-amber-500" />
                          {t('nav.featured')}
                        </h3>
                        <div className="grid grid-cols-3 gap-6">
                          {featuredBooks.map((book) => (
                            <Link
                              key={book.title}
                              to={book.path}
                              className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-emerald-50 transition-all duration-300 border border-transparent hover:border-emerald-200"
                              onClick={closeAllMenus}
                            >
                              <img
                                src={book.cover}
                                alt={book.title}
                                className="w-16 h-20 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors duration-200 line-clamp-2">
                                  {book.title}
                                </h4>
                                <p className="text-sm text-gray-600 mb-1">{book.author}</p>
                                <p className="text-lg font-bold text-emerald-600">${book.price}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Categories Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {Object.entries(megaMenuCategories).map(([key, category]) => (
                          <div key={key} className="space-y-4">
                            <h4 className={`text-lg font-bold flex items-center text-gray-900`}>
                              <category.icon className="w-5 h-5 mr-2 text-emerald-600" />
                              {category.title}
                            </h4>
                            <div className="space-y-2">
                              {category.subcategories.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.path}
                                  className="block text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200 group"
                                  onClick={closeAllMenus}
                                >
                                  <span className="font-medium">{sub.name}</span>
                                  <span className="text-xs text-gray-400 ml-2 group-hover:text-emerald-400">
                                    ({sub.count})
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Quick Links Footer */}
                      <div className="border-t border-gray-200 mt-8 pt-6">
                        <div className="flex flex-wrap gap-4">
                          {quickLinks.map((link) => (
                            <Link
                              key={link.name}
                              to={link.path}
                              className="flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 font-medium group"
                              onClick={closeAllMenus}
                            >
                              <link.icon className={`w-4 h-4 mr-2 ${link.name.includes('Bestsellers') || link.name.includes('Award') ? 'text-amber-500' : 'text-emerald-600'
                                }`} />
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop Search Bar */}
            <div className="hidden lg:block flex-1 max-w-lg mx-8">
              <EnhancedSearchBar />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>

              {/* Search Icon for Mobile */}
              <button
                className="lg:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200 rounded-md hover:bg-gray-50"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200 rounded-md hover:bg-gray-50"
                aria-label={t('nav.cart', { count: itemCount })}
                onClick={closeAllMenus}
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200 rounded-md hover:bg-gray-50"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block text-sm font-medium">
                    {user ? user.name : 'Account'}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>

                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition-colors duration-150"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          {t('nav.profile')}
                        </Link>

                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition-colors duration-150"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-3" />
                          {t('nav.orders')}
                        </Link>

                        <Link
                          to="/wishlist"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition-colors duration-150"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Heart className="w-4 h-4 mr-3" />
                          {t('nav.wishlist')}
                        </Link>

                        {user.role === 'admin' && (
                          <Link
                            to="/admin"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition-colors duration-150"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Award className="w-4 h-4 mr-3" />
                            Admin Dashboard
                          </Link>
                        )}

                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors duration-150 border-t border-gray-100 mt-2"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          {t('nav.logout')}
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition-colors duration-150"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4 mr-3" />
                          {t('nav.login')}
                        </Link>
                        <Link
                          to="/register"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition-colors duration-150 border-t border-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          {t('nav.signup')}
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200 rounded-md hover:bg-gray-50"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Expanded Mobile Search */}
          {isSearchExpanded && (
            <div className="lg:hidden pb-4">
              <EnhancedSearchBar onClose={() => setIsSearchExpanded(false)} />
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden fixed top-0 left-0 w-80 h-full bg-white shadow-xl z-50 transform transition-transform duration-300"
          >
            <div className="p-6 h-full overflow-y-auto">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <Link
                  to="/"
                  className="flex items-center space-x-3"
                  onClick={closeAllMenus}
                >
                  <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">I</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">Ikirezi</span>
                </Link>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-4">
                <Link
                  to="/"
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium"
                  onClick={closeAllMenus}
                >
                  <Home className="w-5 h-5 mr-3" />
                  Home
                </Link>

                <Link
                  to="/books"
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium"
                  onClick={closeAllMenus}
                >
                  <BookOpen className="w-5 h-5 mr-3" />
                  All Books
                </Link>

                {/* Mobile Categories Accordion */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="px-4 py-3 font-medium text-gray-900">{t('nav.categories')}</div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {Object.values(megaMenuCategories).flatMap(cat =>
                      cat.subcategories.slice(0, 4).map(sub => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="px-3 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-gray-50 rounded transition-colors duration-200"
                          onClick={closeAllMenus}
                        >
                          {sub.name}
                        </Link>
                      ))
                    )}
                  </div>
                </div>

                {/* Mobile Quick Links */}
                <div className="border-t border-gray-200 pt-4">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="flex items-center px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      onClick={closeAllMenus}
                    >
                      <link.icon className="w-5 h-5 mr-3" />
                      {link.name}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Mobile User Section */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                {user ? (
                  <div className="space-y-3">
                    <div className="px-4 py-2">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      className="block w-full text-center py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium"
                      onClick={closeAllMenus}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block w-full text-center py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-emerald-600 hover:text-emerald-600 transition-colors duration-200 font-medium"
                      onClick={closeAllMenus}
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}