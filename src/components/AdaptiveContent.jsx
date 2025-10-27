import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faUser, 
  faBook, 
  faLightbulb,
  faCheck,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

export function AdaptiveContent({ 
  beginnerMode = false, 
  expertMode = false, 
  scholarMode = false, 
  fanMode = false,
  currentMode = 'beginner',
  onModeChange,
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);

  const contentModes = [
    {
      id: 'beginner',
      name: 'Beginner',
      description: 'Simple explanations and summaries',
      icon: faGraduationCap,
      color: 'green',
      features: ['Easy language', 'Key concepts highlighted', 'Visual aids']
    },
    {
      id: 'expert',
      name: 'Expert',
      description: 'Detailed analysis and insights',
      icon: faUser,
      color: 'blue',
      features: ['In-depth analysis', 'Technical details', 'Expert commentary']
    },
    {
      id: 'scholar',
      name: 'Scholar',
      description: 'Academic references and citations',
      icon: faBook,
      color: 'purple',
      features: ['Academic sources', 'Citations', 'Research methodology']
    },
    {
      id: 'fan',
      name: 'Fan',
      description: 'Behind-the-scenes and fun facts',
      icon: faLightbulb,
      color: 'orange',
      features: ['Fun facts', 'Behind-the-scenes', 'Community insights']
    }
  ];

  const currentModeData = contentModes.find(mode => mode.id === currentMode) || contentModes[0];

  const handleModeChange = (modeId) => {
    onModeChange?.(modeId);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <FontAwesomeIcon 
          icon={currentModeData.icon} 
          className={`w-4 h-4 text-${currentModeData.color}-600`}
        />
        <span className="text-sm font-medium text-gray-700">{currentModeData.name}</span>
        <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Content Mode</h3>
            <p className="text-sm text-gray-600 mb-4">Choose how you want to experience the content</p>
            
            <div className="space-y-2">
              {contentModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => handleModeChange(mode.id)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    currentMode === mode.id
                      ? `border-${mode.color}-500 bg-${mode.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <FontAwesomeIcon 
                      icon={mode.icon} 
                      className={`w-5 h-5 mt-0.5 text-${mode.color}-600`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{mode.name}</h4>
                        {currentMode === mode.id && (
                          <FontAwesomeIcon icon={faCheck} className={`w-4 h-4 text-${mode.color}-600`} />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{mode.description}</p>
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1">
                          {mode.features.map((feature, index) => (
                            <span 
                              key={index}
                              className={`text-xs px-2 py-1 rounded ${
                                currentMode === mode.id
                                  ? `bg-${mode.color}-100 text-${mode.color}-700`
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                <div className="font-medium mb-1">Current Mode: {currentModeData.name}</div>
                <div>{currentModeData.description}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode Indicator */}
      <div className="mt-2 flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full bg-${currentModeData.color}-500`}></div>
        <span className="text-xs text-gray-600">
          Content adapted for {currentModeData.name.toLowerCase()} level
        </span>
      </div>
    </div>
  );
}
