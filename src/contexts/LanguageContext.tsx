
import React, { createContext, useContext } from 'react';
import { Translations } from '../types/language';
import ptTranslations from '../translations/pt';
import { menuTranslations } from '../translations/pt/menu';

interface LanguageContextProps {
  translations: {
    menuTranslations: typeof menuTranslations;
  };
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
  // Fixed to Portuguese translations
  const translations = {
    menuTranslations: menuTranslations,
  };

  const value = {
    translations,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Re-export types from the modular structure
export type { Translations };
