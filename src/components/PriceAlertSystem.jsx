import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faBellSlash, 
  faDollarSign, 
  faChartLine,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

export function PriceAlertSystem({ 
  notifyOnPriceDrop = true, 
  wishlistIntegration = false, 
  stockNotification = false, 
  currentPrice,
  onAlertSet,
  className = ""
}) {
  const [alerts, setAlerts] = useState({
    priceDrop: false,
    stockRestock: false,
    wishlistPrice: false
  });
  const [priceThreshold, setPriceThreshold] = useState(currentPrice * 0.8);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleAlertToggle = (alertType) => {
    setAlerts(prev => ({
      ...prev,
      [alertType]: !prev[alertType]
    }));
  };

  const handleSaveAlerts = () => {
    const alertData = {
      priceDrop: alerts.priceDrop,
      stockRestock: alerts.stockRestock,
      wishlistPrice: alerts.wishlistPrice,
      priceThreshold,
      email,
      phone
    };
    onAlertSet?.(alertData);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FontAwesomeIcon icon={faBell} className="w-5 h-5 mr-2 text-blue-600" />
          Price Alert System
        </h3>
        <div className="text-sm text-gray-600">
          Stay updated on price changes
        </div>
      </div>

      <div className="space-y-6">
        {/* Price Drop Alert */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faChartLine} className="w-5 h-5 text-green-600" />
              <div>
                <h4 className="font-semibold text-gray-900">Price Drop Alert</h4>
                <p className="text-sm text-gray-600">Get notified when the price drops</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={alerts.priceDrop}
                onChange={() => handleAlertToggle('priceDrop')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
          
          {alerts.priceDrop && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alert me when price drops below:
                </label>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faDollarSign} className="w-4 h-4 text-gray-600" />
                  <input
                    type="number"
                    value={priceThreshold}
                    onChange={(e) => setPriceThreshold(parseFloat(e.target.value))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    step="0.01"
                    min="0"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Current price: ${currentPrice}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stock Restock Alert */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faBell} className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="font-semibold text-gray-900">Stock Restock Alert</h4>
                <p className="text-sm text-gray-600">Get notified when item is back in stock</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={alerts.stockRestock}
                onChange={() => handleAlertToggle('stockRestock')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Wishlist Price Alert */}
        {wishlistIntegration && (
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faBell} className="w-5 h-5 text-purple-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Wishlist Price Alert</h4>
                  <p className="text-sm text-gray-600">Get notified about wishlist items</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={alerts.wishlistPrice}
                  onChange={() => handleAlertToggle('wishlistPrice')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        )}

        {/* Notification Preferences */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-4">Notification Preferences</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveAlerts}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
            <span>Save Alerts</span>
          </button>
        </div>

        {/* Alert Status */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Alert Status</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Price Drop Alert</span>
              <div className="flex items-center space-x-2">
                {alerts.priceDrop ? (
                  <>
                    <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">Active</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faTimes} className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Inactive</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Stock Restock Alert</span>
              <div className="flex items-center space-x-2">
                {alerts.stockRestock ? (
                  <>
                    <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">Active</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faTimes} className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Inactive</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
