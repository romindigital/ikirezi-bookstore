import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faCalendar, 
  faComments, 
  faVideo,
  faClock,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

export function AuthorLive({ 
  upcomingEvents = [], 
  qnaSessions = [], 
  writingProcess = [],
  onEventJoin,
  className = ""
}) {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FontAwesomeIcon icon={faUser} className="w-5 h-5 mr-2 text-blue-600" />
            Author Live
          </h3>
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'events' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveTab('qna')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'qna' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Q&A
            </button>
            <button
              onClick={() => setActiveTab('process')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'process' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Writing Process
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'events' && (
          <div className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                      <p className="text-sm text-gray-700 mb-3">{event.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <FontAwesomeIcon icon={faCalendar} className="w-4 h-4 mr-1" />
                          {event.date}
                        </span>
                        <span className="flex items-center">
                          <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-1" />
                          {event.time}
                        </span>
                        <span className="flex items-center">
                          <FontAwesomeIcon icon={faUsers} className="w-4 h-4 mr-1" />
                          {event.attendees} attendees
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onEventJoin?.(event.id)}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Join
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <FontAwesomeIcon icon={faCalendar} className="w-8 h-8 mx-auto mb-2" />
                <p>No upcoming events</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'qna' && (
          <div className="space-y-4">
            {qnaSessions.length > 0 ? (
              qnaSessions.map((session, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{session.title}</h4>
                    <span className="text-sm text-gray-600">{session.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{session.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faComments} className="w-4 h-4 mr-1" />
                      {session.questions} questions
                    </span>
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faUsers} className="w-4 h-4 mr-1" />
                      {session.participants} participants
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <FontAwesomeIcon icon={faComments} className="w-8 h-8 mx-auto mb-2" />
                <p>No Q&A sessions scheduled</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'process' && (
          <div className="space-y-4">
            {writingProcess.length > 0 ? (
              writingProcess.map((process, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{process.title}</h4>
                  <p className="text-sm text-gray-700 mb-3">{process.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {process.category}
                    </span>
                    <span className="text-xs text-gray-600">{process.date}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <FontAwesomeIcon icon={faUser} className="w-8 h-8 mx-auto mb-2" />
                <p>No writing process insights available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
