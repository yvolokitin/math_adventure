import { useLanguageContext } from './LanguageContext';
import translations from './translations';
import { TranslationKey } from './types';

export function useTranslation() {
  const { language } = useLanguageContext();
  
  const t = (key: TranslationKey) => {
    const translation = translations[language]?.[key];
    if (!translation) {
      console.warn(`Translation missing for key "${key}" in language "${language}"`);
      return translations['en'][key];
    }
    return translation;
  };

  return { t, language };
}