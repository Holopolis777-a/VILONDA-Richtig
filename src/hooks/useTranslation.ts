import { translations } from '../i18n/translations';

type TranslationFunction = (key: string) => string;

interface UseTranslationReturn {
  t: TranslationFunction;
}

export function useTranslation(): UseTranslationReturn {
  const translate: TranslationFunction = (key: string) => {
    try {
      const result = key.split('.').reduce<any>((obj, k) => obj?.[k], translations);
      return result || key;
    } catch {
      return key;
    }
  };

  return {
    t: translate,
  };
}
