import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faBookOpen, 
  faUsers, 
  faShoppingCart, 
  faChartBar, 
  faCog, 
  faUpload,
  faFileAlt,
  faBox,
  faCreditCard,
  faComments,
  faBell,
  faChevronLeft,
  faChevronRight,
  faSignOutAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: faTachometerAlt },
  { name: 'Books', href: '/admin/books', icon: faBookOpen },
  { name: 'Users', href: '/admin/users', icon: faUsers },
  { name: 'Analytics', href: '/admin/analytics', icon: faChartBar },
  { name: 'Orders', href: '/admin/orders', icon: faShoppingCart },
  { name: 'Reports', href: '/admin/reports', icon: faFileAlt },
  { name: 'Inventory', href: '/admin/inventory', icon: faBox },
  { name: 'Payments', href: '/admin/payments', icon: faCreditCard },
  { name: 'Messages', href: '/admin/messages', icon: faComments },
  { name: 'Settings', href: '/admin/settings', icon: faCog },
];

export function AdminSidebar({ isCollapsed, setIsCollapsed }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className={`bg-gray-900 text-white transition-all duration-300 shadow-2xl ${
      isCollapsed ? 'w-16' : 'w-64'
    } h-full flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faBookOpen} className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">Ikirezi</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {isCollapsed ? <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" /> : <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-2 rounded-lg transition-colors group ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} flex-shrink-0`} />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-700 p-4">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name || 'Admin User'}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.email || 'admin@example.com'}
              </p>
            </div>
          )}
          {!isCollapsed && (
            <button
              onClick={logout}
              className="p-1 rounded-lg hover:bg-gray-700 transition-colors"
              title="Logout"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
