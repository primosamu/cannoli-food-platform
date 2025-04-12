
import React from 'react';
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
    document.dispatchEvent(new CustomEvent('language-changed', { detail: value }));
  };

  return (
    <Select onValueChange={handleLanguageChange} value={language}>
      <SelectTrigger className="w-[180px]">
        <Globe className="h-4 w-4 mr-2" />
        <SelectValue placeholder={translations.language} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pt">{translations.portuguese}</SelectItem>
        <SelectItem value="en">{translations.english}</SelectItem>
        <SelectItem value="es">{translations.spanish}</SelectItem>
      </SelectContent>
    </Select>
  );
};
