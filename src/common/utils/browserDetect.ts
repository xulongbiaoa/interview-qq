const u = navigator.userAgent;
export const browser = {
  safari: /Version.+Safari/.test(u),
  chrome: /Chrome/.test(u),
  firefox: /Firefox/.test(u),
  ie: /MSIE/.test(u),
  opera: /Opera/.test(u),
  trident: u.indexOf('Trident') > -1,
  presto: u.indexOf('Presto') > -1,
  webKit: u.indexOf('AppleWebKit') > -1,
  gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
  mobile: !!u.match(/AppleWebKit.*Mobile.*/),
  ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
  android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
  iPhone: u.indexOf('iPhone') > -1,
  iPad: u.indexOf('iPad') > -1,
  webApp: u.indexOf('Safari') === -1,
};
