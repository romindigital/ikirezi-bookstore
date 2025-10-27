import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  Target, 
  Trophy, 
  MessageCircle,
  Lightbulb,
  Bookmark,
  Share2,
  Heart,
  Star,
  Zap,
  Coffee,
  Moon,
  Sun
} from 'lucide-react';

export function ReadingCompanion({ 
  bookId, 
  userId, 
  currentPage = 0,
  totalPages = 300,
  className = ""
}) {
  const [readingSession, setReadingSession] = useState(null);
  const [goals, setGoals] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const [readingTime, setReadingTime] = useState(0);

  // Mock data
  const mockData = {
    readingSession: {
      currentPage: currentPage,
      totalPages: totalPages,
      readingTime: readingTime,
      wordsPerMinute: 250,
      estimatedTimeLeft: Math.ceil((totalPages - currentPage) / 250 * 60),
      progress: (currentPage / totalPages) * 100
    },
    goals: {
      daily: { target: 20, current: 15, unit: 'pages' },
      weekly: { target: 140, current: 89, unit: 'pages' },
      monthly: { target: 4, current: 2, unit: 'books' }
    },
    achievements: [
      { id: 1, title: 'First Steps', description: 'Read your first 10 pages', icon: '👶', unlocked: true },
      { id: 2, title: 'Page Turner', description: 'Read 50 pages in one session', icon: '📖', unlocked: true },
      { id: 3, title: 'Speed Reader', description: 'Read 100 pages in under 2 hours', icon: '⚡', unlocked: false },
      { id: 4, title: 'Book Worm', description: 'Complete 5 books this month', icon: '🐛', unlocked: false }
    ],
    tips: [
      'Take breaks every 30 minutes to maintain focus',
      'Find a comfortable reading position',
      'Use a bookmark to track your progress',
      'Try reading in different environments'
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setReadingSession(mockData.readingSession);
        setGoals(mockData.goals);
        setAchievements(mockData.achievements);
      } catch (error) {
        console.error('Failed to fetch reading companion data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookId, userId, currentPage, totalPages]);

  // Reading timer
  useEffect(() => {
    let interval;
    if (isReading) {
      interval = setInterval(() => {
        setReadingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isReading]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startReading = () => {
    setIsReading(true);
  };

  const pauseReading = () => {
    setIsReading(false);
  };

  const updateProgress = (page) => {
    setReadingSession(prev => ({
      ...prev,
      currentPage: page,
      progress: (page / totalPages) * 100,
      estimatedTimeLeft: Math.ceil((totalPages - page) / 250 * 60)
    }));
  };

  if (loading) {
    return (
      <div className={`${className} bg-white rounded-xl shadow-lg p-6`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} bg-white rounded-xl shadow-lg p-6`}>
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900">Reading Companion</h3>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={isReading ? pauseReading : startReading}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
              isReading 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isReading ? 'Pause' : 'Start'} Reading
          </button>
        </div>
      </div>

      {/* Reading Progress */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-900">Reading Progress</h4>
          <div className="text-sm text-gray-600">
            {readingSession?.currentPage} / {readingSession?.totalPages} pages
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${readingSession?.progress || 0}%` }}
          ></div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{formatTime(readingTime)}</div>
            <div className="text-sm text-gray-600">Reading Time</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{readingSession?.wordsPerMinute}</div>
            <div className="text-sm text-gray-600">WPM</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{readingSession?.estimatedTimeLeft}m</div>
            <div className="text-sm text-gray-600">Time Left</div>
          </div>
        </div>
      </div>

      {/* Reading Goals */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Reading Goals</h4>
        <div className="space-y-3">
          {Object.entries(goals || {}).map(([period, goal]) => (
            <div key={period} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 capitalize">{period} Goal</span>
                <span className="text-sm text-gray-600">
                  {goal.current} / {goal.target} {goal.unit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Achievements</h4>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                achievement.unlocked
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{achievement.icon}</span>
                <span className="text-sm font-medium text-gray-900">{achievement.title}</span>
              </div>
              <p className="text-xs text-gray-600">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Tips */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          <h4 className="font-semibold text-gray-900">Reading Tips</h4>
        </div>
        <div className="space-y-2">
          {mockData.tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-2">
        <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
          <Bookmark className="w-4 h-4" />
          Bookmark
        </button>
        <button className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </button>
        <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2">
          <Heart className="w-4 h-4" />
          Like
        </button>
      </div>
    </div>
  );
}