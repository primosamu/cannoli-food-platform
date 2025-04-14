
import React, { createContext, useContext } from 'react';
import { Translations } from '../types/language';
import ptTranslations from '../translations/pt';
import enTranslations from '../translations/en';
import esTranslations from '../translations/es';

// Define the shape of our context
interface LanguageContextProps {
  translations: Translations; // Use the full Translations type
}

// Create the context with undefined as initial value
const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Custom hook to access the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Language provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use Portuguese translations as the default
  const translations = ptTranslations;

  const value = {
    translations,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Re-export types
export type { Translations };
