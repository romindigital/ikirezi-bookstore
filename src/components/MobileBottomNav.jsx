import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faBook, 
  faTh, 
  faShoppingCart, 
  faUser,
  faSearch,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../hooks/useTranslation';

export function MobileBottomNav() {
  const location = useLocation();
  const { user } = useAuth();
  const { itemCount } = useCart();
  const { t } = useTranslation();

  const navigationItems = [
    {
      name: t('nav.home'),
      href: '/',
      icon: faHome,
      exact: true
    },
    {
      name: t('nav.search'),
      href: '/search',
      icon: faSearch
    },
    {
      name: t('nav.categories'),
      href: '/categories',
      icon: faTh
    },
    {
      name: t('nav.books'),
      href: '/books',
      icon: faBook
    },
    {
      name: t('nav.cart'),
      href: '/cart',
      icon: faShoppingCart,
      badge: itemCount > 0 ? itemCount : null
    }
  ];

  const isActive = (href, exact = false) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navigationItems.map((item) => {
          const active = isActive(item.href, item.exact);
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center p-2 min-w-0 flex-1 relative ${
                active 
                  ? 'text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              } transition-colors`}
              aria-label={item.name}
            >
              <div className="relative">
                <FontAwesomeIcon 
                  icon={item.icon} 
                  className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-gray-500'}`}
                />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 truncate max-w-full ${
                active ? 'font-medium' : 'font-normal'
              }`}>
                {item.name}
              </span>
              {active && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full"></div>
              )}
            </Link>
          );
        })}
        
        {/* User Profile or Login */}
        <Link
          to={user ? '/profile' : '/login'}
          className={`flex flex-col items-center justify-center p-2 min-w-0 flex-1 relative ${
            isActive('/profile') || isActive('/login')
              ? 'text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          } transition-colors`}
          aria-label={user ? t('nav.profile') : t('nav.login')}
        >
          <FontAwesomeIcon 
            icon={faUser} 
            className={`w-5 h-5 ${
              isActive('/profile') || isActive('/login') 
                ? 'text-blue-600' 
                : 'text-gray-500'
            }`}
          />
          <span className={`text-xs mt-1 truncate max-w-full ${
            isActive('/profile') || isActive('/login') 
              ? 'font-medium' 
              : 'font-normal'
          }`}>
            {user ? t('nav.profile') : t('nav.login')}
          </span>
          {(isActive('/profile') || isActive('/login')) && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full"></div>
          )}
        </Link>
      </div>
    </nav>
  );
}
