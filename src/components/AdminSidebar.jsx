import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt, faBookOpen, faUsers, faShoppingCart, faChartBar, faCog,
  faFileAlt, faBox, faCreditCard, faComments, faChevronLeft, faChevronRight,
  faChevronDown, faSignOutAlt, faUser
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: faTachometerAlt,
    children: []
  },
  {
    name: 'Books',
    href: '/admin/books',
    icon: faBookOpen,
    children: [
      { name: 'All Books', href: '/admin/books' },
      { name: 'Add New Book', href: '/admin/books/add' }
    ]
  },
  { name: 'Orders', href: '/admin/orders', icon: faShoppingCart, children: [] },
  { name: 'Analytics', href: '/admin/analytics', icon: faChartBar, children: [] },
  { name: 'Reports', href: '/admin/reports', icon: faFileAlt, children: [] },
  { name: 'Inventory', href: '/admin/inventory', icon: faBox, children: [] },
  { name: 'Users', href: '/admin/users', icon: faUsers, children: [] },
];

export function AdminSidebar({ isCollapsed, setIsCollapsed }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (itemName) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  return (
    <div className={`bg-white border-r border-gray-200 text-gray-700 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } h-screen flex flex-col`}>

      {/* Logo + Collapse Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">I</span>
          </div>
          {!isCollapsed && (
            <div>
              <span className="text-lg font-semibold text-gray-900">Ikirezi</span>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
        >
          <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} className="w-3 h-3" />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems[item.name];

          return (
            <div key={item.name}>
              {hasChildren ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.name)}
                    className={`flex items-center w-full rounded-lg transition-colors group ${
                      isCollapsed ? 'px-3 py-3 justify-center' : 'px-3 py-2.5'
                    } ${
                      isActive || item.children.some(child => location.pathname === child.href)
                        ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`flex-shrink-0 ${isCollapsed ? 'w-4 h-4' : 'w-4 h-4 mr-3'} ${
                        isActive || item.children.some(child => location.pathname === child.href)
                          ? 'text-emerald-600'
                          : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                    />
                    {!isCollapsed && (
                      <>
                        <span className="text-sm font-medium flex-1 text-left">{item.name}</span>
                        <FontAwesomeIcon
                          icon={isExpanded ? faChevronDown : faChevronRight}
                          className="w-3 h-3 text-gray-400"
                        />
                      </>
                    )}
                  </button>

                  {!isCollapsed && isExpanded && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children.map((child) => {
                        const isChildActive = location.pathname === child.href;
                        return (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors group text-sm ${
                              isChildActive
                                ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <span className={`${
                              isChildActive ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'
                            }`}>
                              {child.name}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href}
                  className={`flex items-center rounded-lg transition-colors group ${
                    isCollapsed ? 'px-3 py-3 justify-center' : 'px-3 py-2.5'
                  } ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`flex-shrink-0 ${isCollapsed ? 'w-4 h-4' : 'w-4 h-4 mr-3'} ${
                      isActive ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  />
                  {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

    </div>
  );
}
