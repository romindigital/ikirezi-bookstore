import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Share, 
  Star, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowLeft,
  Play,
  BookOpen,
  Clock,
  Users,
  Award,
  Palette,
  Eye,
  Download,
  GraduationCap
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { RatingStars } from '../components/RatingStars';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Recommendations } from '../components/Recommendations';
import { formatPrice } from '../utils/formatPrice';
import { calculateDiscount } from '../utils/calculateDiscount';
import { bookService } from '../services/bookService';

export function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { user } = useAuth();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('paperback');

  const bookRef = useRef(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const [bookData, reviewsData] = await Promise.all([
          bookService.getBookById(id),
          bookService.getBookReviews(id)
        ]);
        
        setBook(bookData);
        setReviews(reviewsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (book) {
      for (let i = 0; i < quantity; i++) {
        addToCart(book);
      }
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book.title,
          text: `Check out "${book.title}" by ${book.author}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return <LoadingSpinner size="xl" text="Loading book details..." className="min-h-screen" />;
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h2>
          <p className="text-gray-600 mb-6">The book you're looking for doesn't exist or may have been removed.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors font-medium"
            >
              Browse Books
            </button>
          </div>
        </div>
      </div>
    );
  }

  const discount = calculateDiscount(book.price, book.discountPercent || 0);
  const isInCartItem = isInCart(book.id);
  const cartQuantity = getItemQuantity(book.id);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleWishlistToggle}
                className={`p-2 rounded-lg transition-colors ${
                  isWishlisted 
                    ? 'bg-red-50 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={handleShare}
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Share className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Book Cover & Visuals */}
          <div className="space-y-6">
            {/* Main Book Cover */}
            <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center">
              <img
                src={book.image}
                alt={book.title}
                className="w-full max-w-sm h-auto shadow-2xl rounded-lg"
              />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Play className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors font-medium">
                <Download className="w-4 h-4" />
                <span>Sample</span>
              </button>
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              
              <div className="flex items-center space-x-4 mb-6">
                <RatingStars rating={book.rating || 0} size="lg" showNumber />
                <span className="text-gray-600">({book.reviewCount || 0} reviews)</span>
              </div>
            </div>

            {/* Format Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Format</h3>
              <div className="flex space-x-3">
                {['Paperback', 'Hardcover', 'eBook', 'Audiobook'].map((format) => (
                  <button
                    key={format}
                    onClick={() => setSelectedFormat(format.toLowerCase())}
                    className={`px-4 py-2 rounded-lg border transition-colors font-medium ${
                      selectedFormat === format.toLowerCase()
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Stock */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {discount.hasDiscount ? (
                  <>
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(discount.finalPrice)}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(book.price)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Save {formatPrice(discount.discountAmount)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(book.price)}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Ships in 3-5 business days</span>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 10}
                    className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isInCartItem}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-3 ${
                  isInCartItem
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>
                  {isInCartItem ? `In Cart (${cartQuantity})` : 'Add to Cart'}
                </span>
              </button>
            </div>

            {/* Quick Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <BookOpen className="w-4 h-4" />
                <span>Free preview available</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>Join book clubs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Tabs */}
        <div className="mt-16 border-t border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'description', label: 'Description' },
              { id: 'details', label: 'Details' },
              { id: 'reviews', label: `Reviews (${reviews.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">{book.description}</p>
                
                {book.keyFeatures && (
                  <div className="mt-8">
                    <h4 className="font-semibold text-gray-900 mb-4">Key Features</h4>
                    <ul className="space-y-2">
                      {book.keyFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3 text-gray-700">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="font-semibold text-gray-900 text-lg">Book Details</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Publisher</span>
                      <span className="text-gray-900 font-medium">{book.publisher}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Published</span>
                      <span className="text-gray-900 font-medium">{book.publishedYear}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Pages</span>
                      <span className="text-gray-900 font-medium">{book.pages || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Language</span>
                      <span className="text-gray-900 font-medium">English</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h4 className="font-semibold text-gray-900 text-lg">Shipping & Support</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Free Shipping</span>
                      <span className="text-green-600 font-medium">Orders over $50</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Delivery</span>
                      <span className="text-gray-900 font-medium">3-5 business days</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Returns</span>
                      <span className="text-gray-900 font-medium">30 days</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                    <p className="text-gray-600">Be the first to review this book.</p>
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-gray-600">
                            {review.author?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.author || 'Anonymous'}</h4>
                          <div className="flex items-center space-x-2">
                            <RatingStars rating={review.rating} size="sm" />
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <Recommendations 
            bookId={book.id}
            category={book.category}
            limit={6}
          />
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Book Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="prose max-w-none">
                <h4 className="text-xl font-bold mb-4">Sample Chapter</h4>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    This is a preview of the book content. The full version includes detailed chapters,
                    illustrations, and additional resources that will help you get the most out of this book.
                  </p>
                  <p>
                    To access the complete content, please purchase the book. You'll get instant access
                    to all chapters, downloadable resources, and future updates.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setShowPreview(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={handleAddToCart}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Purchase Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}