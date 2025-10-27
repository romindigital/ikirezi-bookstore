import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUniversalAccess, 
  faEye, 
  faVolumeUp, 
  faTextHeight,
  faPalette,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

export function AccessibilityPanel({ 
  isOpen = false, 
  onClose, 
  textToSpeech = '', 
  dyslexiaFriendlyFont = true, 
  highContrastMode = false, 
  readingGuide = true,
  onSettingsChange,
  className = ""
}) {
  const [settings, setSettings] = useState({
    fontSize: '16px',
    highContrast: false,
    dyslexiaFont: true,
    readingGuide: true,
    textToSpeech: false,
    colorScheme: 'default'
  });

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeech);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${className}`}>
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FontAwesomeIcon icon={faUniversalAccess} className="w-5 h-5 mr-2 text-blue-600" />
            Accessibility Settings
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FontAwesomeIcon icon={faTextHeight} className="w-4 h-4 mr-2" />
              Font Size
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="12"
                max="24"
                value={parseInt(settings.fontSize)}
                onChange={(e) => handleSettingChange('fontSize', `${e.target.value}px`)}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-12">{settings.fontSize}</span>
            </div>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faEye} className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">High Contrast</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={(e) => handleSettingChange('highContrast', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Dyslexia Friendly Font */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faTextHeight} className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Dyslexia Friendly Font</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.dyslexiaFont}
                onChange={(e) => handleSettingChange('dyslexiaFont', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Reading Guide */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faEye} className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Reading Guide</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.readingGuide}
                onChange={(e) => handleSettingChange('readingGuide', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Text to Speech */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faVolumeUp} className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Text to Speech</span>
            </div>
            <button
              onClick={handleTextToSpeech}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Play
            </button>
          </div>

          {/* Color Scheme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FontAwesomeIcon icon={faPalette} className="w-4 h-4 mr-2" />
              Color Scheme
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'default', name: 'Default', colors: ['#ffffff', '#000000'] },
                { id: 'dark', name: 'Dark', colors: ['#1f2937', '#f9fafb'] },
                { id: 'sepia', name: 'Sepia', colors: ['#f7f3e9', '#5d4e37'] }
              ].map((scheme) => (
                <button
                  key={scheme.id}
                  onClick={() => handleSettingChange('colorScheme', scheme.id)}
                  className={`p-2 rounded-lg border-2 transition-all ${
                    settings.colorScheme === scheme.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex space-x-1 mb-1">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: scheme.colors[0] }}
                    />
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: scheme.colors[1] }}
                    />
                  </div>
                  <div className="text-xs text-gray-600">{scheme.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
