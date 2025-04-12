
import React, { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/contexts/LanguageContext';

export const LanguageSelector = () => {
  const { language, setLanguage, translations } = useLanguage();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
    // Force a re-render of the entire app by triggering a small state update
    document.dispatchEvent(new CustomEvent('language-changed'));
  };

  // Force a re-render when language changes to ensure UI updates
  useEffect(() => {
    // This effect ensures that the component re-renders when language changes
    const handleLanguageEvent = () => {
      // This is just to force a re-render when the language-changed event is dispatched
      console.log("Language changed to:", language);
    };
    
    document.addEventListener('language-changed', handleLanguageEvent);
    
    return () => {
      document.removeEventListener('language-changed', handleLanguageEvent);
    };
  }, [language]);

  return (
    <Select onValueChange={handleLanguageChange} value={language} defaultValue={language}>
      <SelectTrigger className="w-[130px]">
        <Globe className="h-4 w-4 mr-2" />
        <SelectValue placeholder={translations.language || "Language"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{translations.english}</SelectItem>
        <SelectItem value="pt">{translations.portuguese}</SelectItem>
        <SelectItem value="es">{translations.spanish}</SelectItem>
      </SelectContent>
    </Select>
  );
};
