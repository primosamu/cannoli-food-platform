
import ptTranslations from './pt';
import { Translations } from '../types/language';

// Only export Portuguese translations
export const getTranslations = (): Translations => {
  return ptTranslations;
};

export default { pt: ptTranslations };
