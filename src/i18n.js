import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getDefaultLang } from 'common/utils/lang';
import en from 'i18n/locales/en';
import zhCN from 'i18n/locales/zh-CN';
const backendProps =
  process.env.NODE_ENV === 'production'
    ? {
        backend: { loadPath: `/locales/{{lng}}/{{ns}}.json` },
      }
    : null;

const supportLanguages = ['en', 'zh-CN'];

i18n
  // .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en,
      'zh-CN': zhCN,
    },
    debug: false,
    supportedLngs: supportLanguages,
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    lng: getDefaultLang(),
    load: 'currentOnly',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    ...backendProps,
  });

export default i18n;
