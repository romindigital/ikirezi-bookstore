import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faShoppingCart, 
  faUser, 
  faBars, 
  faTimes, 
  faSignOutAlt, 
  faCog, 
  faHome, 
  faBook, 
  faTh, 
  faInfoCircle,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../hooks/useTranslation';
import { SearchBar } from './SearchBar';
import { EnhancedSearchBar } from './EnhancedSearchBar';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MegaMenu } from './MegaMenu';
import { Breadcrumb } from './Breadcrumb';
import { MobileBottomNav } from './MobileBottomNav';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleMegaMenu = () => setIsMegaMenuOpen(!isMegaMenuOpen);
  const closeMegaMenu = () => setIsMegaMenuOpen(false);

  // Check if current page is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="desktop-container">
          <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 desktop-hover-scale">
            <div className="w-12 h-12 bg-gradient-to-br from-custom-primary-green to-custom-accent-green rounded-lg flex items-center justify-center">
              <span className="text-custom-white font-bold desktop-text-2xl">I</span>
            </div>
            <span className="desktop-text-2xl font-bold text-custom-dark-grey">Ikirezi</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center desktop-gap">
            <Link 
              to="/" 
              className={`desktop-text-lg font-medium desktop-hover-scale px-3 py-2 rounded-lg transition-all flex items-center ${
                isActive('/') 
                  ? 'text-custom-primary-green bg-green-50' 
                  : 'text-custom-dark-grey hover:text-custom-primary-green hover:bg-gray-50'
              }`}
            >
              <FontAwesomeIcon icon={faHome} className="w-4 h-4 mr-2" />
              {t('nav.home')}
            </Link>
            
            {/* Categories with Mega Menu */}
            <div className="relative">
              <button
                onClick={toggleMegaMenu}
                className={`desktop-text-lg font-semibold px-6 py-3 rounded-2xl transition-all duration-500 flex items-center group relative overflow-hidden ${
                  isMegaMenuOpen
                    ? 'text-white shadow-2xl shadow-green-500/30 border-2 border-white/20' 
                    : 'text-custom-dark-grey hover:text-custom-primary-green hover:bg-gray-50'
                }`}
                style={{
                  background: isMegaMenuOpen 
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 30%, #047857 60%, #065f46 100%)'
                    : 'transparent'
                }}
              >
                {/* Background for open state */}
                <div className={`absolute inset-0 bg-gradient-to-br from-custom-primary-green via-custom-accent-green to-custom-primary-green opacity-0 transition-all duration-500 ${isMegaMenuOpen ? 'opacity-100' : ''}`}></div>
                
                <div className="flex items-center relative z-10">
                  <FontAwesomeIcon 
                    icon={faTh} 
                    className={`w-5 h-5 mr-3 transition-all duration-500 ${
                      isMegaMenuOpen 
                        ? 'scale-110 rotate-6 text-white drop-shadow-lg' 
                        : 'text-custom-dark-grey'
                    }`} 
                  />
                  <span className={`font-bold text-lg transition-all duration-500 ${
                    isMegaMenuOpen ? 'text-white drop-shadow-lg' : 'text-custom-dark-grey'
                  }`}>
                    {t('nav.categories')}
                  </span>
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`w-4 h-4 ml-3 transition-all duration-500 ${
                      isMegaMenuOpen 
                        ? 'rotate-180 text-white scale-110 drop-shadow-lg' 
                        : 'text-custom-dark-grey'
                    }`} 
                  />
                </div>
                
                {/* Pulse indicators when menu is open */}
                {isMegaMenuOpen && (
                  <>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full animate-ping shadow-lg"></div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-custom-primary-green rounded-full animate-pulse shadow-lg"></div>
                  </>
                )}
                
                {/* Ripple effect on click */}
                <div className="absolute inset-0 rounded-2xl bg-white/40 opacity-0 group-active:opacity-100 group-active:scale-150 transition-all duration-300"></div>
              </button>
              <MegaMenu isOpen={isMegaMenuOpen} onClose={closeMegaMenu} />
            </div>
            
            <Link 
              to="/books" 
              className={`desktop-text-lg font-medium desktop-hover-scale px-3 py-2 rounded-lg transition-all flex items-center ${
                isActive('/books') 
                  ? 'text-custom-primary-green bg-green-50' 
                  : 'text-custom-dark-grey hover:text-custom-primary-green hover:bg-gray-50'
              }`}
            >
              <FontAwesomeIcon icon={faBook} className="w-4 h-4 mr-2" />
              {t('nav.books')}
            </Link>
            
            <Link 
              to="/about" 
              className={`desktop-text-lg font-medium desktop-hover-scale px-3 py-2 rounded-lg transition-all flex items-center ${
                isActive('/about') 
                  ? 'text-custom-primary-green bg-green-50' 
                  : 'text-custom-dark-grey hover:text-custom-primary-green hover:bg-gray-50'
              }`}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="w-4 h-4 mr-2" />
              {t('nav.about')}
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <EnhancedSearchBar />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center desktop-gap">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-3 text-custom-dark-grey hover:text-custom-primary-green transition-colors focus:ring-4 focus:ring-green-300 focus:outline-none rounded-lg desktop-hover-scale"
              aria-label={t('nav.cart', { count: itemCount })}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="w-7 h-7" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-3 p-3 text-custom-dark-grey hover:text-custom-primary-green transition-colors desktop-hover-scale rounded-lg hover:bg-gray-50"
                >
                  <FontAwesomeIcon icon={faUser} className="w-7 h-7" />
                  <span className="hidden sm:block desktop-text-lg font-medium">{user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center px-6 py-3 desktop-text-lg text-gray-700 hover:bg-gray-100 desktop-hover-scale"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FontAwesomeIcon icon={faCog} className="w-5 h-5 mr-4" />
                      {t('nav.profile')}
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center px-6 py-3 desktop-text-lg text-gray-700 hover:bg-gray-100 desktop-hover-scale"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FontAwesomeIcon icon={faCog} className="w-5 h-5 mr-4" />
                        {t('nav.admin')}
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-6 py-3 desktop-text-lg text-gray-700 hover:bg-gray-100 desktop-hover-scale"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 mr-4" />
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center desktop-gap">
                <Link
                  to="/login"
                  className="desktop-text-lg text-custom-dark-grey hover:text-custom-primary-green font-medium desktop-hover-scale px-4 py-2 rounded-lg hover:bg-gray-50 transition-all"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="desktop-button bg-gradient-to-r from-custom-primary-green to-custom-accent-green text-custom-white hover:from-primary-700 hover:to-accent-600 desktop-hover-lift"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-custom-dark-grey hover:text-custom-primary-green"
            >
              {isMenuOpen ? <FontAwesomeIcon icon={faTimes} className="w-6 h-6" /> : <FontAwesomeIcon icon={faBars} className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="px-4">
                <EnhancedSearchBar />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <Link
                  to="/"
                  className="flex items-center px-4 py-2 text-custom-dark-grey hover:text-custom-primary-green hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faHome} className="w-4 h-4 mr-3" />
                  {t('nav.home')}
                </Link>
                <Link
                  to="/books"
                  className="flex items-center px-4 py-2 text-custom-dark-grey hover:text-custom-primary-green hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faBook} className="w-4 h-4 mr-3" />
                  {t('nav.books')}
                </Link>
                <Link
                  to="/categories"
                  className="flex items-center px-4 py-2 text-custom-dark-grey hover:text-custom-primary-green hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faTh} className="w-4 h-4 mr-3" />
                  {t('nav.categories')}
                </Link>
                <Link
                  to="/about"
                  className="flex items-center px-4 py-2 text-custom-dark-grey hover:text-custom-primary-green hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="w-4 h-4 mr-3" />
                  {t('nav.about')}
                </Link>
              </nav>

              {/* Mobile User Actions */}
              {!user && (
                <div className="px-4 space-y-2">
                  <Link
                    to="/login"
                    className="block w-full text-center py-2 text-custom-dark-grey hover:text-custom-primary-green"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center bg-gradient-to-r from-custom-primary-green to-custom-accent-green text-custom-white py-2 rounded-lg hover:from-primary-700 hover:to-accent-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.signup')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
        </div>
      </header>
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb />
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </>
  );
}
