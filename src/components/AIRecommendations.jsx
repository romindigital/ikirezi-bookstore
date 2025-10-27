import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBrain, 
  faBook, 
  faHeart, 
  faShoppingCart,
  faStar,
  faEye,
  faChevronRight,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/formatPrice';
import { calculateDiscount } from '../utils/calculateDiscount';

export function AIRecommendations({ bookId, currentBook, onBookClick }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendationType, setRecommendationType] = useState('similar');
  const [userPreferences, setUserPreferences] = useState(null);
  
  const { addToCart, isInCart } = useCart();
  const { user } = useAuth();

  // AI-powered recommendation types
  const recommendationTypes = [
    { id: 'similar', label: 'Similar Books', icon: faBook, description: 'Books with similar themes and style' },
    { id: 'trending', label: 'Trending Now', icon: faStar, description: 'Popular books in your area' },
    { id: 'personalized', label: 'For You', icon: faBrain, description: 'AI-curated based on your preferences' },
    { id: 'complementary', label: 'Complete the Series', icon: faBook, description: 'Related books and series' }
  ];

  useEffect(() => {
    fetchRecommendations();
    if (user) {
      fetchUserPreferences();
    }
  }, [bookId, recommendationType, user]);

  const fetchUserPreferences = async () => {
    try {
      // Simulate fetching user preferences
      const preferences = {
        favoriteGenres: ['Fiction', 'Mystery', 'Romance'],
        readingLevel: 'Intermediate',
        preferredAuthors: ['Author A', 'Author B'],
        priceRange: { min: 10, max: 50 },
        readingTime: 'Evening'
      };
      setUserPreferences(preferences);
    } catch (err) {
      console.error('Error fetching user preferences:', err);
    }
  };

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate AI recommendation API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockRecommendations = generateMockRecommendations();
      setRecommendations(mockRecommendations);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateMockRecommendations = () => {
    const baseBooks = [
      {
        id: 101,
        title: "The Silent Echo",
        author: "Sarah Johnson",
        price: 24.99,
        discountPercent: 15,
        rating: 4.5,
        reviewCount: 128,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
        categories: ["Fiction", "Mystery"],
        aiScore: 0.95,
        reason: "Similar themes and writing style"
      },
      {
        id: 102,
        title: "Digital Dreams",
        author: "Michael Chen",
        price: 19.99,
        discountPercent: 0,
        rating: 4.2,
        reviewCount: 89,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop",
        categories: ["Science Fiction", "Technology"],
        aiScore: 0.88,
        reason: "Based on your interest in tech themes"
      },
      {
        id: 103,
        title: "Ocean's Whisper",
        author: "Emma Rodriguez",
        price: 22.99,
        discountPercent: 20,
        rating: 4.7,
        reviewCount: 203,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop",
        categories: ["Romance", "Adventure"],
        aiScore: 0.92,
        reason: "Matches your reading preferences"
      },
      {
        id: 104,
        title: "The Last Chapter",
        author: "David Kim",
        price: 27.99,
        discountPercent: 10,
        rating: 4.3,
        reviewCount: 156,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop",
        categories: ["Drama", "Literary Fiction"],
        aiScore: 0.85,
        reason: "Similar emotional depth and character development"
      }
    ];

    return baseBooks.map(book => ({
      ...book,
      aiInsights: generateAIInsights(book),
      personalizedNote: generatePersonalizedNote(book)
    }));
  };

  const generateAIInsights = (book) => {
    return {
      readingTime: `${Math.floor(Math.random() * 8) + 4} hours`,
      difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
      mood: ['Inspiring', 'Thoughtful', 'Adventurous', 'Romantic'][Math.floor(Math.random() * 4)],
      bestFor: ['Weekend reading', 'Commute', 'Before bed', 'Deep dive'][Math.floor(Math.random() * 4)]
    };
  };

  const generatePersonalizedNote = (book) => {
    if (!userPreferences) return null;
    
    const notes = [
      `Based on your love for ${userPreferences.favoriteGenres[0]} books`,
      `Perfect for your ${userPreferences.readingTime} reading sessions`,
      `Matches your preferred ${userPreferences.readingLevel} reading level`,
      `Similar to books you've enjoyed recently`
    ];
    
    return notes[Math.floor(Math.random() * notes.length)];
  };

  const handleAddToCart = (book) => {
    addToCart(book);
  };

  const handleBookClick = (book) => {
    if (onBookClick) {
      onBookClick(book);
    }
  };

  const getRecommendationTitle = () => {
    const type = recommendationTypes.find(t => t.id === recommendationType);
    return type ? type.label : 'Recommendations';
  };

  const getRecommendationDescription = () => {
    const type = recommendationTypes.find(t => t.id === recommendationType);
    return type ? type.description : '';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center justify-center space-x-3">
          <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin text-blue-600" />
          <span className="text-gray-600">AI is analyzing your preferences...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load recommendations</p>
          <button
            onClick={fetchRecommendations}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faBrain} className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">AI Recommendations</h3>
              <p className="text-sm text-gray-600">{getRecommendationDescription()}</p>
            </div>
          </div>
        </div>

        {/* Recommendation Type Selector */}
        <div className="flex flex-wrap gap-2">
          {recommendationTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setRecommendationType(type.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                recommendationType === type.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FontAwesomeIcon icon={type.icon} className="w-4 h-4" />
              <span className="text-sm font-medium">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((book) => {
            const discount = calculateDiscount(book.price, book.discountPercent || 0);
            const isInCartItem = isInCart(book.id);

            return (
              <div
                key={book.id}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleBookClick(book)}
              >
                {/* Book Image */}
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* AI Score Badge */}
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {Math.round(book.aiScore * 100)}% match
                  </div>
                  
                  {/* Discount Badge */}
                  {discount.hasDiscount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      -{book.discountPercent}%
                    </div>
                  )}
                </div>

                {/* Book Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                      {book.title}
                    </h4>
                    <p className="text-sm text-gray-600">{book.author}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className={`w-3 h-3 ${
                            i < Math.floor(book.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({book.reviewCount})</span>
                  </div>

                  {/* AI Insights */}
                  <div className="space-y-1">
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Reading time:</span> {book.aiInsights.readingTime}
                    </div>
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Mood:</span> {book.aiInsights.mood}
                    </div>
                    {book.personalizedNote && (
                      <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {book.personalizedNote}
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      {discount.hasDiscount ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">
                            {formatPrice(discount.finalPrice)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(book.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(book.price)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(book);
                      }}
                      disabled={isInCartItem}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        isInCartItem
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} className="w-3 h-3 mr-1" />
                      {isInCartItem ? 'In Cart' : 'Add to Cart'}
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle wishlist
                      }}
                      className="py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faHeart} className="w-3 h-3" />
                    </button>
                  </div>

                  {/* AI Reason */}
                  <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                    <FontAwesomeIcon icon={faBrain} className="w-3 h-3 mr-1" />
                    {book.reason}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="text-center mt-6">
          <button className="flex items-center space-x-2 mx-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
            <span>View More Recommendations</span>
            <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
