
import React from 'react';
import { Globe } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLanguage, Language } from '@/contexts/LanguageContext';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, translations } = useLanguage();
  
  const languageOptions: { value: Language; label: string }[] = [
    { value: 'en', label: translations.english },
    { value: 'pt', label: translations.portuguese },
    { value: 'es', label: translations.spanish },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={`cursor-pointer ${language === option.value ? 'font-bold' : ''}`}
            onClick={() => setLanguage(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
