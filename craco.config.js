const path = require('path');
const CracoLessPlugin = require('craco-less');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const analyzed = process.env.ANALYZED;
const {
  when,
  whenDev,
  addBeforeLoader,
  loaderByName,
} = require('@craco/craco');

module.exports = {
  babel: {
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: 'css',
        },
      ],
    ],
  },
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target:
          'https://www.fastmock.site/mock/8d575a5d350ca45748f7362780866668/jw',

        changeOrigin: true,
      },
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      const svgSpriteLoader = {
        test: /\.svg$/,
        loader: require.resolve('svg-sprite-loader'),
        include: path.resolve(__dirname, 'src/icons/svg'),
        exclude: /node_modules/,
      };

      // Append svg-sprite-loader before file-loader
      addBeforeLoader(
        webpackConfig,
        loaderByName('file-loader'),
        svgSpriteLoader,
      );

      return webpackConfig;
    },

    plugins: analyzed ? [new BundleAnalyzerPlugin()] : [],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#1A7EE3',
              '@error-color': '#F24646',
              '@tabs-title-font-size': '16px',
              '@table-header-bg': '#fff',
              '@table-row-hover-bg': '#F9FBFD',
              '@table-padding-vertical': '10px',
              '@table-header-cell-split-color': 'transparent',
              '@input-color': '#222549',
              '@text-color': '#222549',
              '@input-placeholder-color': '#8EA6BF',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
    { plugin: new AntdDayjsWebpackPlugin() },
  ],
};
