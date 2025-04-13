
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

export const LanguageSelector = () => {
  const { translations } = useLanguage();
  
  // Since we're now fixed to Portuguese, this is just a display component
  // that doesn't allow changing the language
  return (
    <Select value="pt" disabled>
      <SelectTrigger className="w-[180px]">
        <Globe className="h-4 w-4 mr-2" />
        <SelectValue placeholder={translations.portuguese} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pt">{translations.portuguese}</SelectItem>
      </SelectContent>
    </Select>
  );
};
