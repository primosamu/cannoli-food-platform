
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations } from '../types/language';
import { getTranslations } from '../translations';

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Translations;
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

  // Store language preference in localStorage
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
    
    // Force language update throughout the app
    document.dispatchEvent(new CustomEvent('language-changed', { detail: language }));
    
    console.log("Language set to:", language);
  }, [language]);
  
  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
    if (savedLanguage && ['en', 'pt', 'es'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const value = {
    language,
    setLanguage,
    translations: getTranslations(language),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Re-export types from the new modular structure
export type { Language, Translations };

