const getBrowserSettingLangMap = () => {
  let browserLang = navigator.language || navigator.userLanguage;
  return browserLang || 'en';
};

const getDefaultLang = () => {
  let userSettingLang = localStorage.getItem('lang');
  let defaultLang = userSettingLang || getBrowserSettingLangMap();
  document.getElementsByTagName('html')[0].lang = defaultLang;

  if (!defaultLang.startsWith('zh')) {
    defaultLang = defaultLang.substring(0, 2);
  }

  if (userSettingLang) {
    // 重置localStorage 中的lang 将 en-US 等替换为 en, zh-CN zh-HK 保持不变
    localStorage.setItem('lang', defaultLang);
  }
  return defaultLang;
};

export { getDefaultLang };
