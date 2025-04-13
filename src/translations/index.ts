
import ptTranslations from './pt';
import enTranslations from './en';
import esTranslations from './es';
import { Language, Translations } from '../types/language';

const translations: Record<Language, Translations> = {
  pt: ptTranslations,
  en: enTranslations,
  es: esTranslations
};

export const getTranslations = (language: Language = 'pt'): Translations => {
  return translations[language] || ptTranslations;
};

export default translations;
