import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faShareAlt, 
  faStar, 
  faPlus, 
  faMinus, 
  faShoppingCart, 
  faArrowLeft,
  faPlay,
  faBookOpen,
  faBrain,
  faEye,
  faClock,
  faUsers,
  faBookmark,
  faChartLine,
  faVolumeUp,
  faPalette,
  faUsersRays,
  faTrophy,
  faMagic,
  faExpand,
  faCompress,
  faRobot,
  faGamepad,
  faMicrophone,
  faMapMarkerAlt,
  faHistory,
  faGraduationCap,
  faSync,
  faDownload,
  faUniversalAccess,
  faVideo,
  faCommentDots,
  faCalendar,
  faGlobe,
  faLandmark,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import { Scan } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { RatingStars } from '../components/RatingStars';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Recommendations } from '../components/Recommendations';
import { AdvancedImageGallery } from '../components/AdvancedImageGallery';
import { AdvancedReviews } from '../components/AdvancedReviews';
import { AIRecommendations } from '../components/AIRecommendations';
import { InteractiveBookPreview } from '../components/InteractiveBookPreview';
import { formatPrice, formatPriceWithDiscount } from '../utils/formatPrice';
import { calculateDiscount } from '../utils/calculateDiscount';
import { bookService } from '../services/bookService';

// New Advanced Components
import { Book3DPreview } from '../components/Book3DPreview';
import { DynamicBackground } from '../components/DynamicBackground';
import { ReadingSimulator } from '../components/ReadingSimulator';
import { LiveReadingStats } from '../components/LiveReadingStats';
import { CommunityDiscussion } from '../components/CommunityDiscussion';
import { PersonalizedRecommendations } from '../components/PersonalizedRecommendations';
import { BookAnalyticsDashboard } from '../components/BookAnalyticsDashboard';
import { ReadingCompanion } from '../components/ReadingCompanion';
import { FormatSelector } from '../components/FormatSelector';
import { PriceAlertSystem } from '../components/PriceAlertSystem';
import { ARBookPreview } from '../components/ARBookPreview';
import { AdaptiveContent } from '../components/AdaptiveContent';
import { AmbientSoundscape } from '../components/AmbientSoundscape';
import { VisualTimeline } from '../components/VisualTimeline';
import { ReadingAchievements } from '../components/ReadingAchievements';
import { BookClubIntegration } from '../components/BookClubIntegration';
import { ProgressiveImageLoading } from '../components/ProgressiveImageLoading';
import { AccessibilityPanel } from '../components/AccessibilityPanel';
import { OfflineReading } from '../components/OfflineReading';
import { AuthorLive } from '../components/AuthorLive';
import { BehindTheScenes } from '../components/BehindTheScenes';
import { CulturalContext } from '../components/CulturalContext';
import { StudyGuide } from '../components/StudyGuide';
import { LiveInventory } from '../components/LiveInventory';
import { SocialActivity } from '../components/SocialActivity';

export function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, getItemQuantity, updateQuantity } = useCart();
  const { user } = useAuth();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [bookAnalytics, setBookAnalytics] = useState(null);
  const [readingLists, setReadingLists] = useState([]);
  const [socialStats, setSocialStats] = useState(null);
  
  // Advanced State Management
  const [dominantColor, setDominantColor] = useState('#6366f1');
  const [readingProgress, setReadingProgress] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState('paperback');
  const [arActive, setArActive] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [contentMode, setContentMode] = useState('beginner');
  const [soundscapeActive, setSoundscapeActive] = useState(false);
  const [showStudyGuide, setShowStudyGuide] = useState(false);
  const [liveReaders, setLiveReaders] = useState(0);
  const [realTimeStock, setRealTimeStock] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [achievements, setAchievements] = useState([]);

  const bookRef = useRef(null);
  const audioRef = useRef(null);

  // Enhanced Data Fetching
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const [
          bookData, 
          reviewsData, 
          analyticsData, 
          socialData,
          culturalData,
          authorData,
          liveData,
          inventoryData
        ] = await Promise.all([
          bookService.getBookById(id),
          bookService.getBookReviews(id),
          bookService.getBookAnalytics(id),
          bookService.getBookSocialStats(id),
          bookService.getCulturalContext(id),
          bookService.getAuthorInsights(id),
          bookService.getLiveReadingData(id),
          bookService.getLiveInventory(id)
        ]);
        
        setBook(bookData);
        setReviews(reviewsData);
        setBookAnalytics(analyticsData);
        setSocialStats(socialData);
        setDominantColor(bookData.dominantColor || '#6366f1');
        setRealTimeStock(inventoryData.stock);
        setLiveReaders(liveData.currentReaders);
        
        // Extract color palette from book cover
        extractDominantColor(bookData.image);
        
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

  // Real-time updates
  useEffect(() => {
    const liveUpdates = setInterval(async () => {
      if (book) {
        const [liveData, inventoryData] = await Promise.all([
          bookService.getLiveReadingData(id),
          bookService.getLiveInventory(id)
        ]);
        setLiveReaders(liveData.currentReaders);
        setRealTimeStock(inventoryData.stock);
      }
    }, 30000);

    return () => clearInterval(liveUpdates);
  }, [book, id]);

  const extractDominantColor = async (imageUrl) => {
    // Simulate color extraction from book cover
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
    setDominantColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  const handleAddToCart = () => {
    if (book) {
      for (let i = 0; i < quantity; i++) {
        addToCart(book);
      }
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= realTimeStock) {
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
          text: `Check out this book: ${book.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleReadingProgress = (progress) => {
    setReadingProgress(progress);
    // Unlock achievements based on progress
    if (progress >= 25 && !achievements.includes('quarter_reader')) {
      setAchievements(prev => [...prev, 'quarter_reader']);
    }
    if (progress >= 50 && !achievements.includes('halfway_there')) {
      setAchievements(prev => [...prev, 'halfway_there']);
    }
    if (progress >= 100 && !achievements.includes('book_completed')) {
      setAchievements(prev => [...prev, 'book_completed']);
    }
  };

  if (loading) {
    return <LoadingSpinner size="xl" text="Loading book details..." className="min-h-screen" />;
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h2>
          <p className="text-gray-600 mb-6">The book you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const discount = calculateDiscount(book.price, book.discountPercent || 0);
  const isInCartItem = isInCart(book.id);
  const cartQuantity = getItemQuantity(book.id);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Dynamic Background */}
      <DynamicBackground 
        dominantColor={dominantColor}
        mood={book.genre?.toLowerCase().includes('mystery') ? 'dark' : 'light'}
        adaptiveToContent={true}
        intensity={0.1}
      />

      {/* Ambient Soundscape */}
      {soundscapeActive && (
        <AmbientSoundscape 
          mood={book.genre}
          locationSounds={book.setting}
          timePeriod={book.publishedYear > 2000 ? 'modern' : 'historical'}
          onVolumeChange={(vol) => console.log('Volume:', vol)}
        />
      )}

      {/* AR Book Preview */}
      {arActive && (
        <ARBookPreview 
          book={book}
          onClose={() => setArActive(false)}
          virtualShelfPlacement={true}
          bookSizeVisualization={true}
        />
      )}

      {/* Accessibility Panel */}
      <AccessibilityPanel 
        isOpen={accessibilityMode}
        onClose={() => setAccessibilityMode(false)}
        textToSpeech={book.description}
        dyslexiaFriendlyFont={true}
        highContrastMode={false}
        readingGuide={true}
        onSettingsChange={(settings) => {
          // Apply accessibility settings
          document.documentElement.style.fontSize = settings.fontSize;
        }}
      />

      {/* Study Guide Modal */}
      {showStudyGuide && (
        <StudyGuide 
          book={book}
          onClose={() => setShowStudyGuide(false)}
          chapterSummaries={book.chapterSummaries}
          discussionQuestions={book.discussionQuestions}
          vocabularyLists={book.vocabulary}
        />
      )}

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Advanced Header with Quick Actions */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200 transition-all hover:scale-105"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 mr-2" />
            Back
          </button>

          <div className="flex items-center space-x-3">
            {/* Accessibility Toggle */}
            <button
              onClick={() => setAccessibilityMode(true)}
              className="p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-white transition-all hover:scale-110"
              title="Accessibility Settings"
            >
              <FontAwesomeIcon icon={faUniversalAccess} className="w-5 h-5 text-gray-600" />
            </button>

            {/* Soundscape Toggle */}
            <button
              onClick={() => setSoundscapeActive(!soundscapeActive)}
              className={`p-3 rounded-lg border transition-all hover:scale-110 ${
                soundscapeActive 
                  ? 'bg-purple-100 border-purple-300 text-purple-600' 
                  : 'bg-white/80 backdrop-blur-sm border-gray-200 text-gray-600'
              }`}
              title="Ambient Soundscape"
            >
              <FontAwesomeIcon icon={faVolumeUp} className="w-5 h-5" />
            </button>

            {/* AR Preview */}
            <button
              onClick={() => setArActive(true)}
              className="p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-white transition-all hover:scale-110"
              title="AR Preview"
            >
              <Scan className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Visual Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Advanced Book Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 3D Book Preview */}
              <div className="space-y-4">
                <Book3DPreview 
                  coverImage={book.image}
                  backCoverImage={book.backCoverImage || book.image}
                  samplePages={book.samplePages || []}
                  onPageFlip={(page) => handleReadingProgress(page)}
                  interactive={true}
                  autoRotate={true}
                />
                
                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105"
                  >
                    <FontAwesomeIcon icon={faPlay} className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={handleWishlistToggle}
                    className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                      isWishlisted
                        ? 'bg-red-100 text-red-700 border border-red-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <FontAwesomeIcon icon={faHeart} className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    <span>{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
                  </button>
                </div>
              </div>

              {/* Advanced Image Gallery with Zoom */}
              <div className="space-y-4">
                <ProgressiveImageLoading 
                  images={[
                    { url: book.image, type: 'cover', lowRes: book.imageLowRes },
                    { url: book.image, type: 'back', lowRes: book.imageLowRes },
                    { url: book.image, type: 'spine', lowRes: book.imageLowRes },
                    { url: book.image, type: 'preview', lowRes: book.imageLowRes }
                  ]}
                  title={book.title}
                  zoomable={true}
                  comparisonSlider={true}
                  onImageChange={(image) => console.log('Image changed:', image)}
                />

                {/* Color Palette Extraction */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <FontAwesomeIcon icon={faPalette} className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-700">Color Palette</span>
                  </div>
                  <div className="flex space-x-2">
                    {[dominantColor, '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'].map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        title={`Color ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Social Activity */}
            <SocialActivity 
              liveReviews={reviews.filter(r => r.isLive)}
              readingProgress={socialStats?.friendsProgress || []}
              trendingQuotes={bookAnalytics?.popularQuotes || []}
              onQuoteLike={(quote) => console.log('Liked quote:', quote)}
            />

            {/* Community Discussion */}
            <CommunityDiscussion 
              liveChat={book.discussionThread}
              readerQuestions={book.faqs || []}
              authorResponses={book.authorNotes || []}
              onNewMessage={(message) => console.log('New message:', message)}
            />
          </div>

          {/* Right Column - Book Details & Actions */}
          <div className="space-y-6">
            {/* Book Details Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6 border border-white/20">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2 leading-tight">{book.title}</h1>
                <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
                
                {/* Rating with Advanced Analytics */}
                <div className="flex items-center space-x-4 mb-6">
                  <RatingStars rating={book.rating || 0} size="lg" showNumber />
                  <span className="text-gray-600">({book.reviewCount || 0} reviews)</span>
                </div>

                {/* Live Reading Stats */}
                <LiveReadingStats 
                  currentReaders={liveReaders}
                  popularHighlights={bookAnalytics?.popularPassages || []}
                  readingGroups={bookAnalytics?.activeGroups || []}
                  onJoinGroup={(groupId) => console.log('Join group:', groupId)}
                />

                {/* Advanced Analytics Dashboard */}
                {bookAnalytics && (
                  <BookAnalyticsDashboard 
                    readingTimeDistribution={bookAnalytics.readingPatterns}
                    difficultyProgression={bookAnalytics.complexityMap}
                    emotionalArc={bookAnalytics.sentimentAnalysis}
                    characterNetwork={bookAnalytics.characterRelationships}
                    className="mb-6"
                  />
                )}
              </div>

              {/* Real-time Price & Stock */}
              <LiveInventory 
                stockCount={realTimeStock}
                priceChanges={book.priceHistory || []}
                demandMetrics={bookAnalytics?.purchaseVelocity || 'high'}
                onPriceAlert={() => setPriceAlertActive(true)}
              />

              {/* Price Display */}
              <div className="space-y-2">
                {discount.hasDiscount ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(discount.finalPrice)}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(book.price)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Save {formatPrice(discount.discountAmount)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(book.price)}
                  </span>
                )}
              </div>

              {/* Format Selector */}
              <FormatSelector 
                formats={book.availableFormats || ['Paperback', 'Hardcover', 'eBook', 'Audiobook']}
                bundlePricing={book.bundleDeals}
                subscriptionOptions={book.subscriptionPlans}
                giftWrapping={true}
                selectedFormat={selectedFormat}
                onFormatChange={setSelectedFormat}
              />

              {/* Quantity and Add to Cart */}
              {realTimeStock > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold text-gray-700">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <FontAwesomeIcon icon={faMinus} className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300 min-w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= realTimeStock}
                        className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={isInCartItem}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
                      isInCartItem
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
                    <span>
                      {isInCartItem ? `In Cart (${cartQuantity})` : 'Add to Cart'}
                    </span>
                  </button>
                </div>
              )}

              {/* Price Alert System */}
              <PriceAlertSystem 
                notifyOnPriceDrop={true}
                wishlistIntegration={isWishlisted}
                stockNotification={realTimeStock === 0}
                currentPrice={discount.finalPrice}
                onAlertSet={(alert) => console.log('Alert set:', alert)}
              />

              {/* Reading Achievements */}
              <ReadingAchievements 
                pagesRead={readingProgress}
                chaptersCompleted={Math.floor(readingProgress / 10)}
                themesDiscovered={book.themes?.length || 0}
                quotesCollected={achievements.length}
                achievementsUnlocked={achievements}
                onAchievementClick={(achievement) => console.log('Achievement:', achievement)}
              />

              {/* Quick Actions Row */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
                <button className="flex items-center justify-center space-x-2 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <FontAwesomeIcon icon={faShareAlt} className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
                <button 
                  onClick={() => setShowStudyGuide(true)}
                  className="flex items-center justify-center space-x-2 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <FontAwesomeIcon icon={faGraduationCap} className="w-4 h-4" />
                  <span className="text-sm">Study</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
                  <span className="text-sm">Sample</span>
                </button>
              </div>
            </div>

            {/* Book Club Integration */}
            <BookClubIntegration 
              joinClubs={book.relatedClubs || []}
              scheduleDiscussions={book.upcomingEvents || []}
              sharedAnnotations={book.communalNotes || []}
              onJoinClub={(clubId) => console.log('Join club:', clubId)}
            />

            {/* Offline Reading */}
            <OfflineReading 
              cacheSampleChapter={true}
              syncReadingProgress={true}
              downloadBookData={true}
              onDownloadStart={() => console.log('Download starting...')}
            />
          </div>
        </div>

        {/* Advanced Tabs System */}
        <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
          <div className="border-b border-gray-200 px-8 pt-8">
            <div className="flex items-center justify-between">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'reviews', label: `Reviews (${reviews.length})` },
                  { id: 'details', label: 'Details' },
                  { id: 'analytics', label: 'Analytics' },
                  { id: 'cultural', label: 'Context' },
                  { id: 'author', label: 'Author' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>

              {/* Content Mode Selector */}
              <AdaptiveContent 
                beginnerMode={simplifiedSummary}
                expertMode={criticalAnalysis}
                scholarMode={academicReferences}
                fanMode={behindTheScenes}
                currentMode={contentMode}
                onModeChange={setContentMode}
              />
            </div>
          </div>

          <div className="py-8 px-8">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">{book.description}</p>
                </div>
                
                {/* Reading Simulator */}
                <ReadingSimulator 
                  sampleChapter={book.sampleChapter}
                  readingSpeed="average"
                  onReadingComplete={(time) => console.log('Reading time:', time)}
                  highlightQuotes={book.notableQuotes}
                  onProgressUpdate={handleReadingProgress}
                />

                {/* Reading Companion */}
                <ReadingCompanion 
                  characterTracker={book.characters || []}
                  timelineVisualization={book.events || []}
                  themeAnalysis={book.themes || []}
                  vocabularyBuilder={book.complexWords || []}
                  onCharacterSelect={(character) => console.log('Selected character:', character)}
                />
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <AdvancedReviews 
                  reviews={reviews}
                  onReviewSubmit={(review) => console.log('New review:', review)}
                  reviewAnalysis={bookAnalytics?.reviewSentiment}
                />
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="font-semibold text-gray-900 text-lg">Book Details</h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Format:</span>
                      <span className="text-gray-900 font-medium">{book.format || 'Paperback'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Dimensions:</span>
                      <span className="text-gray-900 font-medium">{book.dimensions || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Weight:</span>
                      <span className="text-gray-900 font-medium">{book.weight || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Publisher:</span>
                      <span className="text-gray-900 font-medium">{book.publisher}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Published:</span>
                      <span className="text-gray-900 font-medium">{book.publishedYear}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="font-semibold text-gray-900 text-lg">Shipping & Support</h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Free Shipping:</span>
                      <span className="text-green-600 font-medium">Orders over $50</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Delivery Time:</span>
                      <span className="text-gray-900 font-medium">3-5 business days</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Return Policy:</span>
                      <span className="text-gray-900 font-medium">30 days</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Support:</span>
                      <span className="text-gray-900 font-medium">24/7 Available</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && bookAnalytics && (
              <div className="space-y-6">
                <VisualTimeline 
                  publicationHistory={book.publicationHistory || []}
                  adaptationTimeline={book.adaptations || []}
                  culturalImpact={book.culturalImpact || []}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                    <h5 className="font-semibold text-gray-900 mb-3">Reading Insights</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Average Completion Time</span>
                        <span className="font-medium">{bookAnalytics.averageCompletionTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Most Highlighted Passage</span>
                        <span className="font-medium">{bookAnalytics.mostHighlighted}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                    <h5 className="font-semibold text-gray-900 mb-3">Reader Demographics</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Primary Audience</span>
                        <span className="font-medium">{bookAnalytics.primaryAudience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Age Group</span>
                        <span className="font-medium">{bookAnalytics.ageGroup}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cultural' && (
              <CulturalContext 
                historicalEvents={book.historicalBackground || []}
                geographicalSettings={book.locations || []}
                literaryMovements={book.literaryMovement || []}
                onLocationSelect={(location) => console.log('Selected location:', location)}
              />
            )}

            {activeTab === 'author' && (
              <div className="space-y-6">
                <AuthorLive 
                  upcomingEvents={book.authorEvents || []}
                  qnaSessions={book.authorQna || []}
                  writingProcess={book.authorInsights || []}
                  onEventJoin={(eventId) => console.log('Join event:', eventId)}
                />
                <BehindTheScenes 
                  manuscriptImages={book.manuscriptImages || []}
                  editorialNotes={book.editorialProcess || []}
                  inspirationSources={book.inspirations || []}
                />
              </div>
            )}
          </div>
        </div>

        {/* Advanced Recommendations */}
        <div className="mt-12 space-y-8">
          <PersonalizedRecommendations 
            basedOnReadingHistory={user?.readingHistory || []}
            similarToneAndStyle={book.attributes || []}
            moodBasedSuggestions={user?.preferences?.mood || 'neutral'}
            readingLevelAdaptive={true}
          />
          
          <AIRecommendations 
            book={book}
            userPreferences={user?.preferences}
            contextAware={true}
          />
        </div>
      </div>

      {/* Interactive Book Preview Modal */}
      {showPreview && (
        <InteractiveBookPreview 
          book={book}
          onClose={() => setShowPreview(false)}
          onReadingStart={() => console.log('Reading started')}
        />
      )}
    </div>
  );
}