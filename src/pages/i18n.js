// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
import translationEN from '../../public/locales/en/common.json';
import translationEL from '../../public/locales/el/common.json';

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  el: {
    translation: translationEL,
  },
};

i18n
  .use(initReactI18next) // Passes i18n instance to react-i18next.
  .init({
    resources,
    lng: 'en', // Default language
    keySeparator: false, // We do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
