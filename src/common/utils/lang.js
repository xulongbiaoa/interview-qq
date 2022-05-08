import { LOCALES_MAP } from 'common/config/localeConfig';
const getBrowserSettingLangMap = () => {
  let browserLang = navigator.language || navigator.userLanguage;

  const filterLangs = Object.keys(LOCALES_MAP).filter(
    (item) => !browserLang.includes(item),
  );
  if (filterLangs && filterLangs.length > 0) {
    return LOCALES_MAP[filterLangs[0]].key;
  }

  return 'en';
};

const getDefaultLang = () => {
  let userSettingLang = localStorage.getItem('lang');
  let defaultLang = userSettingLang || getBrowserSettingLangMap();
  document.getElementsByTagName('html')[0].lang = defaultLang;
  if (userSettingLang) {
    // 重置localStorage 中的lang 将 en-US 等替换为 en, zh-CN zh-HK 保持不变
    localStorage.setItem('lang', defaultLang);
  }
  return defaultLang;
};

export { getDefaultLang };
