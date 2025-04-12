
import enTranslations from './en';
import ptTranslations from './pt';
import esTranslations from './es';
import { Language } from '../types/language';

const translations = {
  en: enTranslations,
  pt: ptTranslations,
  es: esTranslations
};

export const getTranslations = (language: Language) => {
  return translations[language];
};

export default translations;
