import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBox, 
  faChartLine, 
  faBell, 
  faFire,
  faCheckCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

export function LiveInventory({ 
  stockCount = 0, 
  priceChanges = [], 
  demandMetrics = 'medium',
  onPriceAlert,
  className = ""
}) {
  const [liveStock, setLiveStock] = useState(stockCount);
  const [stockStatus, setStockStatus] = useState('in-stock');

  useEffect(() => {
    setLiveStock(stockCount);
    
    if (stockCount === 0) {
      setStockStatus('out-of-stock');
    } else if (stockCount < 10) {
      setStockStatus('low-stock');
    } else {
      setStockStatus('in-stock');
    }
  }, [stockCount]);

  const getStatusColor = () => {
    switch (stockStatus) {
      case 'in-stock': return 'green';
      case 'low-stock': return 'yellow';
      case 'out-of-stock': return 'red';
      default: return 'gray';
    }
  };

  const getStatusIcon = () => {
    switch (stockStatus) {
      case 'in-stock': return faCheckCircle;
      case 'low-stock': return faExclamationTriangle;
      case 'out-of-stock': return faExclamationTriangle;
      default: return faBox;
    }
  };

  const getDemandIcon = () => {
    return demandMetrics === 'high' ? faFire : faChartLine;
  };

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900 flex items-center">
          <FontAwesomeIcon icon={faBox} className="w-4 h-4 mr-2 text-blue-600" />
          Live Inventory
        </h4>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600">Live</span>
        </div>
      </div>

      <div className="space-y-3">
        {/* Stock Status */}
        <div className="bg-white rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon 
                icon={getStatusIcon()} 
                className={`w-5 h-5 text-${getStatusColor()}-600`}
              />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {liveStock} units available
                </div>
                <div className={`text-xs text-${getStatusColor()}-600 capitalize`}>
                  {stockStatus.replace('-', ' ')}
                </div>
              </div>
            </div>
            {stockStatus === 'low-stock' && (
              <button
                onClick={onPriceAlert}
                className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors"
              >
                <FontAwesomeIcon icon={faBell} className="w-3 h-3 mr-1" />
                Alert Me
              </button>
            )}
          </div>
        </div>

        {/* Demand Metrics */}
        <div className="bg-white rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon 
                icon={getDemandIcon()} 
                className={`w-5 h-5 ${demandMetrics === 'high' ? 'text-orange-600' : 'text-blue-600'}`}
              />
              <div>
                <div className="text-sm font-medium text-gray-900">Demand</div>
                <div className={`text-xs capitalize ${
                  demandMetrics === 'high' ? 'text-orange-600' : 'text-blue-600'
                }`}>
                  {demandMetrics}
                </div>
              </div>
            </div>
            {demandMetrics === 'high' && (
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                Trending
              </span>
            )}
          </div>
        </div>

        {/* Price Changes */}
        {priceChanges.length > 0 && (
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm font-medium text-gray-900 mb-2">Recent Price Changes</div>
            <div className="space-y-1">
              {priceChanges.slice(0, 3).map((change, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{change.date}</span>
                  <span className={`font-medium ${
                    change.direction === 'up' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {change.direction === 'up' ? '+' : '-'}${change.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

