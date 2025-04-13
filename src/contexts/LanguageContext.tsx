
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Translations, Language } from '../types/language';
import ptTranslations from '../translations/pt';
import enTranslations from '../translations/en';
import esTranslations from '../translations/es';

interface LanguageContextProps {
  translations: Translations;
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');
  const [translations, setTranslations] = useState<Translations>(ptTranslations);

  useEffect(() => {
    switch (language) {
      case 'pt':
        setTranslations(ptTranslations);
        break;
      case 'en':
        setTranslations(enTranslations);
        break;
      case 'es':
        setTranslations(esTranslations);
        break;
      default:
        setTranslations(ptTranslations);
    }
  }, [language]);

  const value = {
    translations,
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Re-export types from the modular structure
export type { Translations };
