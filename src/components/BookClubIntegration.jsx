import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faCalendar, 
  faComments, 
  faHeart,
  faPlus,
  faClock
} from '@fortawesome/free-solid-svg-icons';

export function BookClubIntegration({ 
  joinClubs = [], 
  scheduleDiscussions = [], 
  sharedAnnotations = [],
  onJoinClub,
  className = ""
}) {
  const [activeTab, setActiveTab] = useState('clubs');

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FontAwesomeIcon icon={faUsers} className="w-5 h-5 mr-2 text-blue-600" />
            Book Club Integration
          </h3>
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('clubs')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'clubs' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Clubs
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'discussions' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Discussions
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'clubs' && (
          <div className="space-y-4">
            {joinClubs.length > 0 ? (
              joinClubs.map((club, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {club.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{club.name}</h4>
                        <p className="text-sm text-gray-600">{club.members} members</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onJoinClub?.(club.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                      <span>Join</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <FontAwesomeIcon icon={faUsers} className="w-8 h-8 mx-auto mb-2" />
                <p>No book clubs available for this book</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'discussions' && (
          <div className="space-y-4">
            {scheduleDiscussions.length > 0 ? (
              scheduleDiscussions.map((discussion, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{discussion.title}</h4>
                    <span className="text-sm text-gray-600 flex items-center">
                      <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-1" />
                      {discussion.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{discussion.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faUsers} className="w-4 h-4 mr-1" />
                      {discussion.participants} participants
                    </span>
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faComments} className="w-4 h-4 mr-1" />
                      {discussion.comments} comments
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <FontAwesomeIcon icon={faCalendar} className="w-8 h-8 mx-auto mb-2" />
                <p>No scheduled discussions</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
