import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrophy, 
  faStar, 
  faBook, 
  faHeart,
  faLock,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

export function ReadingAchievements({ 
  pagesRead = 0, 
  chaptersCompleted = 0, 
  themesDiscovered = 0, 
  quotesCollected = 0,
  achievementsUnlocked = [],
  onAchievementClick,
  className = ""
}) {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const achievements = [
    {
      id: 'first_page',
      name: 'First Steps',
      description: 'Read your first page',
      icon: faBook,
      color: 'blue',
      unlocked: pagesRead > 0,
      progress: Math.min(pagesRead, 1),
      maxProgress: 1
    },
    {
      id: 'quarter_reader',
      name: 'Quarter Reader',
      description: 'Read 25% of the book',
      icon: faStar,
      color: 'green',
      unlocked: pagesRead >= 25,
      progress: Math.min(pagesRead, 25),
      maxProgress: 25
    },
    {
      id: 'halfway_there',
      name: 'Halfway There',
      description: 'Read 50% of the book',
      icon: faTrophy,
      color: 'yellow',
      unlocked: pagesRead >= 50,
      progress: Math.min(pagesRead, 50),
      maxProgress: 50
    },
    {
      id: 'book_completed',
      name: 'Book Master',
      description: 'Complete the entire book',
      icon: faTrophy,
      color: 'purple',
      unlocked: pagesRead >= 100,
      progress: Math.min(pagesRead, 100),
      maxProgress: 100
    },
    {
      id: 'theme_explorer',
      name: 'Theme Explorer',
      description: 'Discover all themes',
      icon: faHeart,
      color: 'pink',
      unlocked: themesDiscovered >= 5,
      progress: Math.min(themesDiscovered, 5),
      maxProgress: 5
    },
    {
      id: 'quote_collector',
      name: 'Quote Collector',
      description: 'Collect 10 memorable quotes',
      icon: faStar,
      color: 'orange',
      unlocked: quotesCollected >= 10,
      progress: Math.min(quotesCollected, 10),
      maxProgress: 10
    }
  ];

  const handleAchievementClick = (achievement) => {
    setSelectedAchievement(achievement);
    onAchievementClick?.(achievement);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FontAwesomeIcon icon={faTrophy} className="w-5 h-5 mr-2 text-yellow-600" />
          Reading Achievements
        </h3>
        <div className="text-sm text-gray-600">
          {achievementsUnlocked.length} / {achievements.length} unlocked
        </div>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            onClick={() => handleAchievementClick(achievement)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              achievement.unlocked
                ? `border-${achievement.color}-500 bg-${achievement.color}-50`
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                achievement.unlocked
                  ? `bg-${achievement.color}-100 text-${achievement.color}-600`
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {achievement.unlocked ? (
                  <FontAwesomeIcon icon={achievement.icon} className="w-6 h-6" />
                ) : (
                  <FontAwesomeIcon icon={faLock} className="w-6 h-6" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-semibold ${
                    achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.name}
                  </h4>
                  {achievement.unlocked && (
                    <FontAwesomeIcon icon={faCheck} className={`w-4 h-4 text-${achievement.color}-600`} />
                  )}
                </div>
                
                <p className={`text-sm ${
                  achievement.unlocked ? 'text-gray-700' : 'text-gray-500'
                }`}>
                  {achievement.description}
                </p>
                
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{achievement.progress} / {achievement.maxProgress}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        achievement.unlocked
                          ? `bg-${achievement.color}-600`
                          : 'bg-gray-400'
                      }`}
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievement Details Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedAchievement.name}
              </h3>
              <button
                onClick={() => setSelectedAchievement(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FontAwesomeIcon icon={faLock} className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-center mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                selectedAchievement.unlocked
                  ? `bg-${selectedAchievement.color}-100 text-${selectedAchievement.color}-600`
                  : 'bg-gray-100 text-gray-400'
              }`}>
                <FontAwesomeIcon icon={selectedAchievement.icon} className="w-8 h-8" />
              </div>
              
              <p className="text-gray-700 mb-4">{selectedAchievement.description}</p>
              
              <div className="text-sm text-gray-600">
                Progress: {selectedAchievement.progress} / {selectedAchievement.maxProgress}
              </div>
            </div>
            
            <button
              onClick={() => setSelectedAchievement(null)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
