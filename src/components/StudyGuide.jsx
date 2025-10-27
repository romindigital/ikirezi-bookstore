import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faQuestionCircle, 
  faBook, 
  faLightbulb,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

export function StudyGuide({ 
  book, 
  onClose, 
  chapterSummaries = [], 
  discussionQuestions = [], 
  vocabularyLists = [],
  className = ""
}) {
  const [activeTab, setActiveTab] = useState('summaries');
  const [selectedChapter, setSelectedChapter] = useState(null);

  if (!book) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${className}`}>
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FontAwesomeIcon icon={faGraduationCap} className="w-5 h-5 mr-2 text-blue-600" />
            Study Guide: {book.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('summaries')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'summaries' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FontAwesomeIcon icon={faBook} className="w-4 h-4 mr-2" />
                Chapter Summaries
              </button>
              <button
                onClick={() => setActiveTab('questions')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'questions' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FontAwesomeIcon icon={faQuestionCircle} className="w-4 h-4 mr-2" />
                Discussion Questions
              </button>
              <button
                onClick={() => setActiveTab('vocabulary')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'vocabulary' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FontAwesomeIcon icon={faLightbulb} className="w-4 h-4 mr-2" />
                Vocabulary
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {activeTab === 'summaries' && (
              <div className="space-y-4">
                {chapterSummaries.length > 0 ? (
                  chapterSummaries.map((summary, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Chapter {summary.chapter}</h4>
                      <p className="text-sm text-gray-700 mb-3">{summary.summary}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {summary.keyThemes}
                        </span>
                        <span className="text-xs text-gray-600">{summary.pages} pages</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <FontAwesomeIcon icon={faBook} className="w-8 h-8 mx-auto mb-2" />
                    <p>No chapter summaries available</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'questions' && (
              <div className="space-y-4">
                {discussionQuestions.length > 0 ? (
                  discussionQuestions.map((question, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{question.question}</h4>
                      <p className="text-sm text-gray-700 mb-3">{question.context}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {question.difficulty}
                        </span>
                        <span className="text-xs text-gray-600">{question.chapter} chapter</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <FontAwesomeIcon icon={faQuestionCircle} className="w-8 h-8 mx-auto mb-2" />
                    <p>No discussion questions available</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'vocabulary' && (
              <div className="space-y-4">
                {vocabularyLists.length > 0 ? (
                  vocabularyLists.map((vocab, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{vocab.word}</h4>
                      <p className="text-sm text-gray-700 mb-3">{vocab.definition}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          {vocab.difficulty}
                        </span>
                        <span className="text-xs text-gray-600">{vocab.chapter} chapter</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <FontAwesomeIcon icon={faLightbulb} className="w-8 h-8 mx-auto mb-2" />
                    <p>No vocabulary lists available</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
