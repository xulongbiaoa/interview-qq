import { range } from 'lodash';
const isProduction = process.env.NODE_ENV === 'production';
const baseURL = isProduction
  ? process.env.PUBLIC_URL || process.env.REACT_APP_API_ROOT
  : process.env.REACT_APP_PROXY_TARGET;
const helpBaseURL = 'https://help.pool.btc.com';

export { isProduction, baseURL, helpBaseURL };

const COMMON_MAX_LIMIT_LENGTH = 100;

const LIMIT_GROUP_NAME_LENGTH = {
  max: 20,
  min: 3,
};

const HASHRATE_UNIT_ARRAY = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

const HASHRATE_UNIT_MAPPING = HASHRATE_UNIT_ARRAY.reduce(function (
  acc,
  cur,
  i,
) {
  acc[cur] = Math.pow(10, 3 * i);
  // min hashrate set to 0
  if (acc[cur] === 1) {
    acc[cur] = 0;
  }
  return acc;
},
{});
// only could read property, could not enumerable
Object.defineProperty(HASHRATE_UNIT_MAPPING, 'minScaleUnit', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: { key: '', value: HASHRATE_UNIT_MAPPING[''] },
});
Object.defineProperty(HASHRATE_UNIT_MAPPING, 'maxScaleUnit', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: { key: 'Y', value: HASHRATE_UNIT_MAPPING['Y'] },
});

// grin 默认算法模式
const GRIN_DEFAULT_ALGORITHM = '29';

// 语言枚举
const I18N_LANG = {
  zh: 'zh-CN',
  'zh-hk': 'zh-HK',
  en: 'en',
  ru: 'ru',
  es: 'es',
};

// 机枪收款地址 绑定状态
const OTC_ADDRESS_STATUS = {
  OTC_SETTLEMENT: 'otc', // 闪兑模式
  ORIGINAL_SETTLEMENT: 'origin', // 原币模式
};

const EARNING_HISTORY_STATUS = {
  // OTC 支付中
  PENDING_OTC_IN_THE_PAYMENT: 'PENDING_OTC_IN_THE_PAYMENT',
  // OTC 待兑换
  PENDING_OTC_WAIT_EXCHANGE: 'PENDING_OTC_WAIT_EXCHANGE',
  // OTC 兑换中
  PENDING_OTC_IN_EXCHANGE: 'PENDING_OTC_IN_EXCHANGE',
  // OTC 待支付
  PENDING_OTC_WAIT_PAYMENT: 'PENDING_OTC_WAIT_PAYMENT',
  // OTC 已支付
  PENDING_OTC_PAID: 'PENDING_OTC_PAID',
};

export {
  COMMON_MAX_LIMIT_LENGTH,
  LIMIT_GROUP_NAME_LENGTH,
  HASHRATE_UNIT_MAPPING,
  HASHRATE_UNIT_ARRAY,
  GRIN_DEFAULT_ALGORITHM,
  I18N_LANG,
  OTC_ADDRESS_STATUS,
  EARNING_HISTORY_STATUS,
};

export const DEFAULT_CURRENCY = 'CNY';
export const DEFAULT_ELECTRIC_CN = 0.3;
export const DEFAULT_ELECTRIC_EN = 0.07;

export const currencyConfig = {
  currencyList: ['CNY', 'USD'],
  get currency() {
    return localStorage.getItem('currency') || DEFAULT_CURRENCY;
  },
};

export const electricConfig = {
  electricListCN: range(0, 101, 1).map((n) => n / 100),
  electricListEN: range(0, 202, 2).map((n) => n / 1000),
  electricCN: DEFAULT_ELECTRIC_CN,
  electricEN: DEFAULT_ELECTRIC_EN,
  get electricList() {
    return currencyConfig.currency === DEFAULT_CURRENCY
      ? electricConfig.electricListCN
      : electricConfig.electricListEN;
  },
  get electric() {
    return currencyConfig.currency === DEFAULT_CURRENCY
      ? electricConfig.electricCN
      : electricConfig.electricEN;
  },
};

export const WATCHER_AUTHORITIES_VALUES = {
  DASHBOARD: 'Dashboard',
  MINERS: 'Miners',
  EARNINGS: 'Earnings',
  GETCOIN: 'GetCoin',
};
/**
 * 观察者权限点
 */
export const WATCHER_AUTHORITIES = [
  {
    key: WATCHER_AUTHORITIES_VALUES.DASHBOARD,
    value: WATCHER_AUTHORITIES_VALUES.DASHBOARD,
    tip: true, // 标签文案带有说明
    disabled: true, // 不可更改
    alwaysSelect: true, // 必选
  },
  {
    key: WATCHER_AUTHORITIES_VALUES.MINERS,
    value: WATCHER_AUTHORITIES_VALUES.MINERS,
    defaultSelect: true, // 默认勾选
  },
  {
    key: WATCHER_AUTHORITIES_VALUES.EARNINGS,
    value: WATCHER_AUTHORITIES_VALUES.EARNINGS,
  },
  {
    key: WATCHER_AUTHORITIES_VALUES.GETCOIN,
    value: WATCHER_AUTHORITIES_VALUES.GETCOIN,
  },
];

/**
 * 多地址操作类型，值也对应发送验证码传给后端的action
 */
export const MULT_ADDRESS_OP_TYPE = {
  None: 'none', // 初始不编辑状态
  AddAddress: 'create_address', // 添加地址
  UpdateAddress: 'change_address', // 修改地址
  DeleteAddress: 'delete_address', // 删除地址
  UpdateProportion: 'change_proportion', // 调整比例
  UpdateRemark: 'update_remark', //修改备注
  UpdateMinpay: 'update_minpay', // 调整起付金额
};

export const KeyCode = {
  ENTER: 13,
  UP: 38,
  DOWN: 40,
};
