import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faHeart, 
  faComment, 
  faShare,
  faQuoteLeft,
  faStar
} from '@fortawesome/free-solid-svg-icons';

export function SocialActivity({ 
  liveReviews = [], 
  readingProgress = [], 
  trendingQuotes = [],
  onQuoteLike,
  className = ""
}) {
  const [likedQuotes, setLikedQuotes] = useState(new Set());

  const handleQuoteLike = (quoteId) => {
    const newLikedQuotes = new Set(likedQuotes);
    if (newLikedQuotes.has(quoteId)) {
      newLikedQuotes.delete(quoteId);
    } else {
      newLikedQuotes.add(quoteId);
    }
    setLikedQuotes(newLikedQuotes);
    onQuoteLike?.(quoteId);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <div className="border-b border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FontAwesomeIcon icon={faUsers} className="w-5 h-5 mr-2 text-blue-600" />
          Social Activity
        </h3>
      </div>

      <div className="p-4 space-y-6">
        {/* Trending Quotes */}
        {trendingQuotes.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <FontAwesomeIcon icon={faQuoteLeft} className="w-4 h-4 mr-2 text-purple-600" />
              Trending Quotes
            </h4>
            <div className="space-y-3">
              {trendingQuotes.map((quote, index) => (
                <div key={quote.id || index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                  <p className="text-gray-800 italic mb-3">"{quote.text}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <FontAwesomeIcon icon={faHeart} className="w-4 h-4 mr-1 text-red-500" />
                        {quote.likes || 0}
                      </span>
                      <span className="flex items-center">
                        <FontAwesomeIcon icon={faShare} className="w-4 h-4 mr-1" />
                        {quote.shares || 0}
                      </span>
                    </div>
                    <button
                      onClick={() => handleQuoteLike(quote.id)}
                      className={`p-2 rounded-full transition-colors ${
                        likedQuotes.has(quote.id)
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reading Progress from Friends */}
        {readingProgress.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <FontAwesomeIcon icon={faUsers} className="w-4 h-4 mr-2 text-blue-600" />
              Friends Reading This Book
            </h4>
            <div className="space-y-2">
              {readingProgress.map((friend, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {friend.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{friend.name}</div>
                    <div className="text-sm text-gray-600">{friend.progress}% complete</div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className="bg-blue-600 h-1 rounded-full"
                        style={{ width: `${friend.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Reviews */}
        {liveReviews.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <FontAwesomeIcon icon={faComment} className="w-4 h-4 mr-2 text-green-600" />
              Recent Reviews
            </h4>
            <div className="space-y-3">
              {liveReviews.map((review, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {review.user?.charAt(0) || 'U'}
                      </div>
                      <span className="font-medium text-gray-900">{review.user}</span>
                    </div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map(star => (
                        <FontAwesomeIcon 
                          key={star}
                          icon={faStar} 
                          className={`w-3 h-3 ${
                            star <= (review.rating || 0)
                              ? 'text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{review.time}</span>
                    <button className="flex items-center hover:text-red-500 transition-colors">
                      <FontAwesomeIcon icon={faHeart} className="w-3 h-3 mr-1" />
                      {review.likes || 0}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

