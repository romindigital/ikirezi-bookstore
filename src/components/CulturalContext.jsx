import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faHistory, 
  faBook, 
  faGlobe,
  faArrowRight,
  faClock
} from '@fortawesome/free-solid-svg-icons';

export function CulturalContext({ 
  historicalEvents = [], 
  geographicalSettings = [], 
  literaryMovements = [],
  onLocationSelect,
  className = ""
}) {
  const [activeTab, setActiveTab] = useState('historical');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    onLocationSelect?.(location);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FontAwesomeIcon icon={faGlobe} className="w-5 h-5 mr-2 text-blue-600" />
            Cultural Context
          </h3>
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('historical')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'historical' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Historical
            </button>
            <button
              onClick={() => setActiveTab('geographical')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'geographical' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Geographical
            </button>
            <button
              onClick={() => setActiveTab('literary')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'literary' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Literary
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'historical' && (
          <div className="space-y-4">
            {historicalEvents.length > 0 ? (
              <div className="space-y-3">
                {historicalEvents.map((event, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-start space-x-3">
                      <FontAwesomeIcon icon={faHistory} className="w-5 h-5 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                        <p className="text-sm text-gray-700 mb-3">{event.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-1" />
                            {event.year}
                          </span>
                          <span className="flex items-center">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-1" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <FontAwesomeIcon icon={faHistory} className="w-8 h-8 mx-auto mb-2" />
                <p>No historical events available</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'geographical' && (
          <div className="space-y-4">
            {geographicalSettings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {geographicalSettings.map((location, index) => (
                  <div 
                    key={index}
                    onClick={() => handleLocationClick(location)}
                    className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-green-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{location.name}</h4>
                        <p className="text-sm text-gray-700 mb-3">{location.description}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            {location.type}
                          </span>
                          <span className="text-xs text-gray-600">{location.country}</span>
                        </div>
                      </div>
                      <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-8 h-8 mx-auto mb-2" />
                <p>No geographical settings available</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'literary' && (
          <div className="space-y-4">
            {literaryMovements.length > 0 ? (
              <div className="space-y-3">
                {literaryMovements.map((movement, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <FontAwesomeIcon icon={faBook} className="w-5 h-5 text-purple-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{movement.name}</h4>
                        <p className="text-sm text-gray-700 mb-3">{movement.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-1" />
                            {movement.period}
                          </span>
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            {movement.characteristics}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <FontAwesomeIcon icon={faBook} className="w-8 h-8 mx-auto mb-2" />
                <p>No literary movements available</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Location Details Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedLocation.name}</h3>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-3">
                <p className="text-gray-700">{selectedLocation.description}</p>
                <div className="text-sm text-gray-600">
                  <div>Type: {selectedLocation.type}</div>
                  <div>Country: {selectedLocation.country}</div>
                  {selectedLocation.significance && (
                    <div>Significance: {selectedLocation.significance}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
