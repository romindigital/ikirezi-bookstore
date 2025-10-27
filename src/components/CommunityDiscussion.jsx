import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faComments, 
  faUser, 
  faHeart, 
  faReply, 
  faThumbsUp,
  faQuestionCircle,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons';

export function CommunityDiscussion({ 
  liveChat = [], 
  readerQuestions = [], 
  authorResponses = [], 
  onNewMessage,
  className = ""
}) {
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onNewMessage?.(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FontAwesomeIcon icon={faComments} className="w-5 h-5 mr-2 text-blue-600" />
            Community Discussion
          </h3>
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'chat' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Live Chat
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'questions' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Q&A
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'chat' && (
          <div className="space-y-4">
            {/* Live Chat Messages */}
            <div className="max-h-64 overflow-y-auto space-y-3">
              {liveChat.length > 0 ? (
                liveChat.map((message, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm text-gray-900">{message.user}</span>
                        <span className="text-xs text-gray-500">{message.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{message.text}</p>
                      <div className="flex items-center space-x-3 mt-2">
                        <button className="text-gray-500 hover:text-red-500 transition-colors">
                          <FontAwesomeIcon icon={faHeart} className="w-3 h-3" />
                        </button>
                        <button className="text-gray-500 hover:text-blue-500 transition-colors">
                          <FontAwesomeIcon icon={faReply} className="w-3 h-3" />
                        </button>
                        <button className="text-gray-500 hover:text-green-500 transition-colors">
                          <FontAwesomeIcon icon={faThumbsUp} className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <FontAwesomeIcon icon={faComments} className="w-8 h-8 mx-auto mb-2" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              )}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share your thoughts..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="space-y-4">
            {/* Reader Questions */}
            <div className="space-y-3">
              {readerQuestions.length > 0 ? (
                readerQuestions.map((question, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <FontAwesomeIcon icon={faQuestionCircle} className="w-5 h-5 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>by {question.asker}</span>
                          <span>{question.time}</span>
                          <span>{question.upvotes} upvotes</span>
                        </div>
                        {question.answer && (
                          <div className="mt-3 p-3 bg-white rounded-lg border-l-4 border-green-400">
                            <div className="flex items-center space-x-2 mb-2">
                              <FontAwesomeIcon icon={faLightbulb} className="w-4 h-4 text-green-600" />
                              <span className="font-medium text-green-800">Author Response</span>
                            </div>
                            <p className="text-gray-700">{question.answer}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <FontAwesomeIcon icon={faQuestionCircle} className="w-8 h-8 mx-auto mb-2" />
                  <p>No questions yet. Ask something!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
