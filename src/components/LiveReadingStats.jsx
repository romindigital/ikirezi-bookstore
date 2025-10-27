import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faEye, 
  faBookOpen, 
  faComments,
  faHeart,
  faShare
} from '@fortawesome/free-solid-svg-icons';

export function LiveReadingStats({ 
  currentReaders = 0, 
  popularHighlights = [], 
  readingGroups = [], 
  onJoinGroup,
  className = ""
}) {
  const [liveStats, setLiveStats] = useState({
    currentReaders,
    totalViews: 0,
    activeGroups: readingGroups.length,
    recentActivity: []
  });

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        currentReaders: Math.max(0, prev.currentReaders + Math.floor(Math.random() * 3) - 1),
        totalViews: prev.totalViews + Math.floor(Math.random() * 5)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900 flex items-center">
          <FontAwesomeIcon icon={faEye} className="w-4 h-4 mr-2 text-blue-600" />
          Live Reading Activity
        </h4>
        <div className="flex items-center space-x-1 text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{liveStats.currentReaders}</div>
          <div className="text-sm text-gray-600">Reading Now</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{liveStats.totalViews}</div>
          <div className="text-sm text-gray-600">Total Views</div>
        </div>
      </div>

      {popularHighlights.length > 0 && (
        <div className="mb-4">
          <h5 className="font-medium text-gray-700 mb-2 flex items-center">
            <FontAwesomeIcon icon={faBookOpen} className="w-4 h-4 mr-2" />
            Popular Highlights
          </h5>
          <div className="space-y-2">
            {popularHighlights.slice(0, 3).map((highlight, index) => (
              <div key={index} className="bg-white/60 rounded-lg p-3">
                <p className="text-sm text-gray-700 italic">"{highlight.text}"</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{highlight.page} people highlighted</span>
                  <div className="flex items-center space-x-2">
                    <button className="text-red-500 hover:text-red-600">
                      <FontAwesomeIcon icon={faHeart} className="w-3 h-3" />
                    </button>
                    <button className="text-blue-500 hover:text-blue-600">
                      <FontAwesomeIcon icon={faShare} className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {readingGroups.length > 0 && (
        <div>
          <h5 className="font-medium text-gray-700 mb-2 flex items-center">
            <FontAwesomeIcon icon={faUsers} className="w-4 h-4 mr-2" />
            Active Reading Groups
          </h5>
          <div className="space-y-2">
            {readingGroups.slice(0, 2).map((group, index) => (
              <div key={index} className="bg-white/60 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-gray-800">{group.name}</div>
                  <div className="text-xs text-gray-600">{group.members} members</div>
                </div>
                <button
                  onClick={() => onJoinGroup?.(group.id)}
                  className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
