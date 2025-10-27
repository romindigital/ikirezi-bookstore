import { useLanguage } from '../context/LanguageContext';
import { t } from '../utils/i18n';

export function useTranslation() {
  const { currentLanguage } = useLanguage();

  const translate = (key, params = {}) => {
    return t(key, currentLanguage, params);
  };

  return {
    t: translate,
    currentLanguage
  };
}
