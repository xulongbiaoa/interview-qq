const explorerBaseURL = process.env.REACT_APP_EXPLORER_URL;
/**
 * 导航菜单配置项
 */
export const getNavigationItems = (lang: string) => {
  const explorerURL = `${explorerBaseURL}/${lang}`;
  return [
    {
      slug: 'nav-explorer',
      path: explorerURL,
      level: 1,
      isOuterLink: true,
      subItems: [
        {
          slug: 'nav-explorer-btc',
          path: `${explorerURL}/btc`,
          isSpecificChain: true,
          tag: 'BTC',
          iconName: 'icon_chain_btc',
          isOuterLink: true,
          level: 2,
        },
        {
          slug: 'nav-explorer-eth',
          path: `${explorerURL}/eth`,
          isSpecificChain: true,
          tag: 'ETH',
          iconName: 'icon_chain_eth',
          isOuterLink: true,
          level: 2,
        },
        {
          slug: 'nav-explorer-bch',
          path: `${explorerURL}/bch`,
          isSpecificChain: true,
          tag: 'BCH',
          iconName: 'icon_chain_bch',
          isOuterLink: true,
          level: 2,
        },
        {
          slug: 'nav-explorer-ltc',
          path: `${explorerURL}/ltc`,
          isSpecificChain: true,
          tag: 'LTC',
          iconName: 'icon_chain_ltc',
          isOuterLink: true,
          level: 2,
        },
      ],
    },
    {
      slug: 'nav-pool',
      path: '/',
      level: 1,
      subNavExtendWidth: 0,
      subItems: [
        {
          slug: 'nav-pool-home',
          path: '/',
          iconName: 'icon_pool_home',
          level: 2,
        },
        {
          slug: 'nav-pool-data',
          path: '/pool-stats',
          iconName: 'icon_pool_data',
          level: 2,
        },

        {
          slug: 'nav-pool-tools',
          path: '/tools',
          iconName: 'icon_pool_tools',
          level: 2,
        },
      ],
    },

    {
      slug: 'nav-app',
      path: '/app-download',
      level: 1,
    },
    {
      slug: 'nav-collaborate',
      path: '/bitdeer',
      level: 1,
      hide: lang && lang.indexOf('zh') > -1, // 繁体简体中文下不显示
    },
  ];
};
