import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faBell,
  faCog,
  faUser,
  faSignOutAlt,
  faBars,
  faTimes,
  faExternalLinkAlt,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

export function AdminHeader({ onMenuToggle, isMobileMenuOpen }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 w-full sticky top-0 z-40 transition-all duration-300">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">

        {/* Left Section - Menu Button */}
        <div className="flex items-center lg:w-1/4 w-auto">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors mr-3"
          >
            {isMobileMenuOpen ? (
              <FontAwesomeIcon icon={faTimes} className="w-4 h-4 text-gray-600" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>

        {/* Center Section - Search Bar (Fixed Alignment) */}
        <div className="hidden lg:flex flex-1 justify-start px-6">
          <div className="relative w-full max-w-md">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
            />
            <input
              type="text"
              placeholder="Search books, orders, users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition-colors"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end lg:w-1/4 space-x-2 lg:space-x-3">
          {/* Visit Site */}
          <Link
            to="/"
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors border border-emerald-600"
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3" />
            <span className="hidden sm:inline text-xs">Visit Site</span>
          </Link>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 relative"
              title="Notifications"
            >
              <FontAwesomeIcon icon={faBell} className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <p className="px-4 py-2 text-sm text-gray-600">No new notifications</p>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="relative">
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
              title="Settings"
            >
              <FontAwesomeIcon icon={faCog} className="w-4 h-4" />
            </button>
            {isSettingsOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <p className="px-4 py-2 text-sm text-gray-600">Settings coming soon</p>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="w-3 h-3 text-white" />
              </div>
              <div className="hidden md:block text-left max-w-32">
                <div className="text-sm font-medium text-gray-900 truncate">{user?.name || 'Admin'}</div>
                <div className="text-xs text-gray-500 truncate">Administrator</div>
              </div>
              <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3 text-gray-500 hidden md:block" />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={logout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
