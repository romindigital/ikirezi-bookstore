import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookCard } from './BookCard';
import { LoadingSpinner } from './LoadingSpinner';
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  Heart, 
  Star,
  ArrowRight,
  BookOpen,
  Zap
} from 'lucide-react';

export function PersonalizedRecommendations({ 
  bookId, 
  userId, 
  limit = 6,
  showTitle = true,
  className = ""
}) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('similar');

  // Mock data for demonstration
  const mockRecommendations = {
    similar: [
      {
        id: 1,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        price: 12.99,
        originalPrice: 16.99,
        rating: 4.5,
        reviewCount: 2847,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
        category: "Thriller",
        isNew: false,
        isBestseller: true,
        reason: "Similar psychological thriller with unexpected twists"
      },
      {
        id: 2,
        title: "Gone Girl",
        author: "Gillian Flynn",
        price: 11.99,
        originalPrice: 15.99,
        rating: 4.3,
        reviewCount: 1923,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
        category: "Mystery",
        isNew: false,
        isBestseller: true,
        reason: "Fans of psychological suspense love this"
      },
      {
        id: 3,
        title: "The Girl on the Train",
        author: "Paula Hawkins",
        price: 10.99,
        originalPrice: 14.99,
        rating: 4.1,
        reviewCount: 3456,
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=400&fit=crop",
        category: "Thriller",
        isNew: false,
        isBestseller: false,
        reason: "Unreliable narrator, similar to your current read"
      }
    ],
    trending: [
      {
        id: 4,
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        price: 13.99,
        originalPrice: 17.99,
        rating: 4.7,
        reviewCount: 4567,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop",
        category: "Fiction",
        isNew: true,
        isBestseller: true,
        reason: "Trending in your reading circles"
      },
      {
        id: 5,
        title: "Project Hail Mary",
        author: "Andy Weir",
        price: 14.99,
        originalPrice: 19.99,
        rating: 4.8,
        reviewCount: 2890,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop",
        category: "Sci-Fi",
        isNew: false,
        isBestseller: true,
        reason: "Popular among sci-fi enthusiasts"
      },
      {
        id: 6,
        title: "The Midnight Library",
        author: "Matt Haig",
        price: 12.99,
        originalPrice: 16.99,
        rating: 4.4,
        reviewCount: 3124,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
        category: "Fiction",
        isNew: false,
        isBestseller: false,
        reason: "Philosophical fiction, trending this month"
      }
    ],
    ai: [
      {
        id: 7,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        price: 11.99,
        originalPrice: 15.99,
        rating: 4.6,
        reviewCount: 1234,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
        category: "Non-Fiction",
        isNew: false,
        isBestseller: false,
        reason: "AI detected interest in psychology and finance"
      },
      {
        id: 8,
        title: "Atomic Habits",
        author: "James Clear",
        price: 13.99,
        originalPrice: 17.99,
        rating: 4.7,
        reviewCount: 5678,
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=400&fit=crop",
        category: "Self-Help",
        isNew: false,
        isBestseller: true,
        reason: "Based on your reading patterns and goals"
      },
      {
        id: 9,
        title: "Educated",
        author: "Tara Westover",
        price: 12.99,
        originalPrice: 16.99,
        rating: 4.5,
        reviewCount: 2345,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop",
        category: "Biography",
        isNew: false,
        isBestseller: false,
        reason: "AI suggests you'd enjoy this memoir"
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRecommendations(mockRecommendations[activeTab] || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [activeTab, bookId, userId]);

  const tabs = [
    { id: 'similar', label: 'Similar Books', icon: BookOpen, color: 'blue' },
    { id: 'trending', label: 'Trending', icon: TrendingUp, color: 'green' },
    { id: 'ai', label: 'AI Picks', icon: Brain, color: 'purple' }
  ];

  if (loading) {
    return (
      <div className={`${className}`}>
        {showTitle && (
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-purple-600" />
            <h3 className="text-2xl font-bold text-gray-900">Personalized for You</h3>
            <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
          </div>
        )}
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">Failed to load recommendations</div>
          <button 
            onClick={() => window.location.reload()}
            className="text-blue-600 hover:text-blue-800"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {showTitle && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-purple-600" />
            <h3 className="text-2xl font-bold text-gray-900">Personalized for You</h3>
            <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
          </div>
          <Link 
            to="/recommendations" 
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? `bg-white text-${tab.color}-600 shadow-sm`
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.slice(0, limit).map((book, index) => (
          <div key={book.id} className="group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:-translate-y-1">
              {/* Book Image */}
              <div className="relative">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                {book.isNew && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    NEW
                  </div>
                )}
                {book.isBestseller && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    BESTSELLER
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-full font-semibold transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Book Details */}
              <div className="p-4">
                <h4 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {book.title}
                </h4>
                <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(book.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {book.rating} ({book.reviewCount.toLocaleString()})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">${book.price}</span>
                  {book.originalPrice > book.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ${book.originalPrice}
                    </span>
                  )}
                </div>

                {/* Reason */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{book.reason}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4" />
                    Add to Wishlist
                  </button>
                  <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
                    <BookOpen className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-8">
        <Link
          to="/recommendations"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Brain className="w-5 h-5" />
          Get More Recommendations
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}