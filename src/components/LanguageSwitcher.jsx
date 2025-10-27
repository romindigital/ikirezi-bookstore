import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../utils/i18n';
import { useLanguage } from '../context/LanguageContext';

export function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-amber-600 transition-colors focus:ring-4 focus:ring-blue-300 focus:outline-none rounded-lg"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" aria-hidden="true" />
        <span className="text-sm font-medium">
          {SUPPORTED_LANGUAGES[currentLanguage]?.nativeName || 'English'}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20 border border-gray-200">
            {Object.entries(SUPPORTED_LANGUAGES).map(([code, language]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                  currentLanguage === code ? 'bg-amber-50 text-amber-700' : 'text-gray-700'
                }`}
                aria-label={`Switch to ${language.name}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg" aria-hidden="true">
                    {code === 'en' && '🇺🇸'}
                    {code === 'rw' && '🇷🇼'}
                    {code === 'fr' && '🇫🇷'}
                  </span>
                  <div className="text-left">
                    <div className="font-medium">{language.nativeName}</div>
                    <div className="text-xs text-gray-500">{language.name}</div>
                  </div>
                </div>
                {currentLanguage === code && (
                  <Check className="w-4 h-4 text-amber-600" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

