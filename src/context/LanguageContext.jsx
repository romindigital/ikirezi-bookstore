import { createContext, useContext, useState, useEffect } from 'react';
import { getPreferredLanguage, setDocumentDirection } from '../utils/i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const language = getPreferredLanguage();
    setCurrentLanguage(language);
    setDocumentDirection(language);
  }, []);

  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
    setDocumentDirection(languageCode);
    localStorage.setItem('preferred-language', languageCode);
  };

  const value = {
    currentLanguage,
    changeLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
