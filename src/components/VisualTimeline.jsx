import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendar, 
  faBook, 
  faFilm, 
  faTrophy,
  faArrowRight,
  faClock,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';

export function VisualTimeline({ 
  publicationHistory = [], 
  adaptationTimeline = [], 
  culturalImpact = [],
  className = ""
}) {
  const [activeTab, setActiveTab] = useState('publication');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const timelineData = {
    publication: publicationHistory,
    adaptations: adaptationTimeline,
    cultural: culturalImpact
  };

  const getEventIcon = (event) => {
    if (event.type === 'publication') return faBook;
    if (event.type === 'adaptation') return faFilm;
    if (event.type === 'award') return faTrophy;
    if (event.type === 'cultural') return faTrophy;
    return faCalendar;
  };

  const getEventColor = (event) => {
    if (event.type === 'publication') return 'blue';
    if (event.type === 'adaptation') return 'green';
    if (event.type === 'award') return 'yellow';
    if (event.type === 'cultural') return 'purple';
    return 'gray';
  };

  const handleEventClick = (event) => {
    setSelectedEvent(selectedEvent?.id === event.id ? null : event);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FontAwesomeIcon icon={faCalendar} className="w-5 h-5 mr-2 text-blue-600" />
            Visual Timeline
          </h3>
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('publication')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'publication' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Publication
            </button>
            <button
              onClick={() => setActiveTab('adaptations')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'adaptations' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Adaptations
            </button>
            <button
              onClick={() => setActiveTab('cultural')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'cultural' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Cultural Impact
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
          
          {/* Timeline Events */}
          <div className="space-y-8">
            {timelineData[activeTab].map((event, index) => {
              const icon = getEventIcon(event);
              const color = getEventColor(event);
              const isSelected = selectedEvent?.id === event.id;
              
              return (
                <div key={event.id || index} className="relative">
                  {/* Timeline Dot */}
                  <div className={`absolute left-6 w-4 h-4 bg-${color}-600 rounded-full border-4 border-white shadow-lg z-10`}></div>
                  
                  {/* Event Content */}
                  <div 
                    className={`ml-16 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? `border-${color}-500 bg-${color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <FontAwesomeIcon 
                            icon={icon} 
                            className={`w-4 h-4 text-${color}-600`}
                          />
                          <h4 className="font-semibold text-gray-900">{event.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full bg-${color}-100 text-${color}-700`}>
                            {event.year}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3">{event.description}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <FontAwesomeIcon icon={faClock} className="w-3 h-3 mr-1" />
                            {event.date}
                          </span>
                          {event.location && (
                            <span className="flex items-center">
                              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3 mr-1" />
                              {event.location}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <FontAwesomeIcon 
                        icon={faArrowRight} 
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          isSelected ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                    
                    {/* Expanded Details */}
                    {isSelected && event.details && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="space-y-3">
                          {event.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="text-sm text-gray-600">
                              <span className="font-medium">{detail.label}:</span> {detail.value}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Summary */}
        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Timeline Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{publicationHistory.length}</div>
              <div className="text-sm text-gray-600">Publications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{adaptationTimeline.length}</div>
              <div className="text-sm text-gray-600">Adaptations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{culturalImpact.length}</div>
              <div className="text-sm text-gray-600">Cultural Events</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
