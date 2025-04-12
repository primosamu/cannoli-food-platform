
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
  };

  return (
    <Select onValueChange={handleLanguageChange} defaultValue={language}>
      <SelectTrigger className="w-[130px]">
        <Globe className="h-4 w-4 mr-2" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{translations.english}</SelectItem>
        <SelectItem value="pt">{translations.portuguese}</SelectItem>
        <SelectItem value="es">{translations.spanish}</SelectItem>
      </SelectContent>
    </Select>
  );
};
