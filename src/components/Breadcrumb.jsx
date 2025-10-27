import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../hooks/useTranslation';

export function Breadcrumb() {
  const location = useLocation();
  const { t } = useTranslation();

  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbs = [];

    // Always start with home
    breadcrumbs.push({
      name: t('nav.home'),
      path: '/',
      icon: faHome,
      isActive: location.pathname === '/'
    });

    // Build breadcrumbs from path segments
    let currentPath = '';
    pathnames.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathnames.length - 1;
      
      // Skip certain segments that don't need breadcrumbs
      if (segment === 'admin' || segment === 'profile' || segment === 'cart' || segment === 'checkout') {
        return;
      }

      // Generate display name for segment
      let displayName = segment;
      let icon = null;

      switch (segment) {
        case 'books':
          displayName = t('nav.books');
          break;
        case 'categories':
          displayName = t('nav.categories');
          break;
        case 'about':
          displayName = t('nav.about');
          break;
        case 'login':
          displayName = t('nav.login');
          break;
        case 'register':
          displayName = t('nav.signup');
          break;
        default:
          // For book details or other dynamic segments
          if (segment.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            displayName = t('nav.book_details');
          } else {
            // Capitalize first letter and replace hyphens with spaces
            displayName = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
          }
      }

      breadcrumbs.push({
        name: displayName,
        path: currentPath,
        isActive: isLast,
        isClickable: !isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumb on home page or if only one item
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav 
      className="bg-gray-50 border-b border-gray-200 py-3 px-4"
      aria-label="Breadcrumb"
    >
      <div className="desktop-container">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.path} className="flex items-center">
              {index > 0 && (
                <FontAwesomeIcon 
                  icon={faChevronRight} 
                  className="w-3 h-3 text-gray-400 mx-2" 
                  aria-hidden="true"
                />
              )}
              
              {breadcrumb.isClickable ? (
                <Link
                  to={breadcrumb.path}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {breadcrumb.icon && (
                    <FontAwesomeIcon 
                      icon={breadcrumb.icon} 
                      className="w-4 h-4 mr-1" 
                      aria-hidden="true"
                    />
                  )}
                  <span className="truncate max-w-[200px]">{breadcrumb.name}</span>
                </Link>
              ) : (
                <span 
                  className={`flex items-center ${
                    breadcrumb.isActive 
                      ? 'text-gray-900 font-medium' 
                      : 'text-gray-600'
                  }`}
                  aria-current={breadcrumb.isActive ? 'page' : undefined}
                >
                  {breadcrumb.icon && (
                    <FontAwesomeIcon 
                      icon={breadcrumb.icon} 
                      className="w-4 h-4 mr-1" 
                      aria-hidden="true"
                    />
                  )}
                  <span className="truncate max-w-[200px]">{breadcrumb.name}</span>
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
