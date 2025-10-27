import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faThumbsUp, 
  faThumbsDown, 
  faFilter,
  faSort,
  faChevronDown,
  faUser,
  faCalendar,
  faFlag
} from '@fortawesome/free-solid-svg-icons';
import { RatingStars } from './RatingStars';

export function AdvancedReviews({ bookId, reviews, onReviewSubmit }) {
  // Default reviews data if none provided
  const defaultReviews = [
    {
      id: 1,
      user: { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' },
      rating: 5,
      title: 'Absolutely amazing!',
      comment: 'This book completely changed my perspective on life. The writing is beautiful and the story is captivating.',
      date: '2024-01-15',
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      user: { name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
      rating: 4,
      title: 'Great read',
      comment: 'Really enjoyed this book. The characters are well-developed and the plot keeps you engaged throughout.',
      date: '2024-01-10',
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      user: { name: 'Emily Rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
      rating: 5,
      title: 'Must read!',
      comment: 'One of the best books I\'ve read this year. Highly recommend to anyone looking for a great story.',
      date: '2024-01-08',
      helpful: 15,
      verified: true
    },
    {
      id: 4,
      user: { name: 'David Thompson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
      rating: 4,
      title: 'Solid book',
      comment: 'Good story with interesting themes. The writing style is engaging and easy to follow.',
      date: '2024-01-05',
      helpful: 6,
      verified: false
    },
    {
      id: 5,
      user: { name: 'Maria Garcia', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face' },
      rating: 5,
      title: 'Perfect!',
      comment: 'This book exceeded all my expectations. The author\'s writing is masterful and the story is unforgettable.',
      date: '2024-01-03',
      helpful: 20,
      verified: true
    }
  ];

  const reviewsData = reviews || defaultReviews;
  const [filteredReviews, setFilteredReviews] = useState(reviewsData);
  const [sortBy, setSortBy] = useState('newest');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    helpful: false,
    verified: false
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Filter and sort reviews
  useEffect(() => {
    let filtered = [...reviewsData];

    // Filter by rating
    if (ratingFilter !== 'all') {
      const rating = parseInt(ratingFilter);
      filtered = filtered.filter(review => review.rating === rating);
    }

    // Sort reviews
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'highest':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'most_helpful':
        filtered.sort((a, b) => (b.helpfulVotes || 0) - (a.helpfulVotes || 0));
        break;
    }

    setFilteredReviews(filtered);
  }, [reviewsData, sortBy, ratingFilter]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (onReviewSubmit) {
      onReviewSubmit({
        ...newReview,
        bookId,
        createdAt: new Date().toISOString()
      });
    }
    setNewReview({ rating: 5, title: '', comment: '', helpful: false, verified: false });
    setShowReviewForm(false);
  };

  const handleHelpfulVote = (reviewId, isHelpful) => {
    // This would typically make an API call
    console.log(`Voted ${isHelpful ? 'helpful' : 'not helpful'} for review ${reviewId}`);
  };

  const handleReportReview = (reviewId) => {
    // This would typically make an API call
    console.log(`Reported review ${reviewId}`);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviewsData.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const getAverageRating = () => {
    if (reviewsData.length === 0) return 0;
    const sum = reviewsData.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviewsData.length).toFixed(1);
  };

  const ratingDistribution = getRatingDistribution();
  const averageRating = getAverageRating();

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating}</div>
            <div className="flex justify-center mb-2">
              <RatingStars rating={parseFloat(averageRating)} size="lg" />
            </div>
            <div className="text-gray-600">Based on {reviewsData.length} reviews</div>
          </div>
          
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center space-x-2">
                <span className="text-sm font-medium w-8">{rating}</span>
                <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-400" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${reviewsData.length > 0 ? (ratingDistribution[rating] / reviewsData.length) * 100 : 0}%` 
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8 text-right">
                  {ratingDistribution[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faFilter} className="w-4 h-4" />
            <span>Filters</span>
            <FontAwesomeIcon icon={faChevronDown} className={`w-3 h-3 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faSort} className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
              <option value="most_helpful">Most Helpful</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Write a Review
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Rating:</span>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating *
              </label>
              <RatingStars 
                rating={newReview.rating} 
                onRatingChange={(rating) => setNewReview({...newReview, rating})}
                interactive={true}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Title
              </label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Summarize your review"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review *
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Share your thoughts about this book..."
                required
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newReview.helpful}
                  onChange={(e) => setNewReview({...newReview, helpful: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">This review was helpful</span>
              </label>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <RatingStars rating={review.rating} size="sm" />
                      <span className="text-sm text-gray-500">
                        <FontAwesomeIcon icon={faCalendar} className="w-3 h-3 mr-1" />
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleReportReview(review.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faFlag} className="w-4 h-4" />
                </button>
              </div>
              
              {review.title && (
                <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
              )}
              
              <p className="text-gray-700 mb-4">{review.comment}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleHelpfulVote(review.id, true)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faThumbsUp} className="w-4 h-4" />
                    <span className="text-sm">Helpful ({review.helpfulVotes || 0})</span>
                  </button>
                  <button
                    onClick={() => handleHelpfulVote(review.id, false)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faThumbsDown} className="w-4 h-4" />
                    <span className="text-sm">Not Helpful ({review.notHelpfulVotes || 0})</span>
                  </button>
                </div>
                
                {review.helpful && (
                  <span className="text-sm text-green-600 font-medium">
                    ✓ This review was helpful
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No reviews match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
