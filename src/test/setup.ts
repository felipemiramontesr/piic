import '@testing-library/jest-dom';
import { vi } from 'vitest';
import esTranslations from '../locales/es.json';

// Helper to resolve nested keys in translations
const getTranslation = (key: string) => {
  const parts = key.split('.');
  let value: any = esTranslations;
  for (const part of parts) {
    if (value && typeof value === 'object') {
      value = value[part];
    } else {
      return key;
    }
  }
  return value || key;
};

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => getTranslation(key),
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: 'es',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));
