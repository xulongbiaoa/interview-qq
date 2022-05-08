import axios from 'axios';
import { baseURL } from './constants';
import Cookies from 'js-cookie';
import userStore from 'stores/UserStore';
import { LOCALES_MAP } from '../config';

const API_ROOT =
  process.env.NODE_ENV === 'development' ? '/api/' : baseURL || '/';

axios.defaults.timeout = 30000;
axios.defaults.baseURL = API_ROOT;
// axios.defaults.withCredentials = true;
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // set jwt header
    // fix logout cors header Authorization bug
    if (config.baseURL === API_ROOT) {
      const token = Cookies.get(process.env.REACT_APP_USER_JWT_TOKEN);
      if (!userStore.isWatcher && token) {
        // config.headers.common.Authorization = `Bearer ${token}`;
        config.headers.common.Authorization = `${token}`;
      }
    }

    // add default params (likes puid\access_key\lang)
    if (
      !config.url.startsWith('public') &&
      config.baseURL === axios.defaults.baseURL
    ) {
      const separator = config.url.startsWith('/') ? '' : '/';
      config.url = `${process.env.REACT_APP_API_VERSION}${separator}${config.url}`;
      const lang = localStorage.getItem('lang');

      let params = {};

      // filter /poster/*.json
      if (config.url && !/poster.*\.json/.test(config.url)) {
        if (lang) {
          params.lang = LOCALES_MAP[lang].key;
        }
      }
      if (config.method === 'post') {
        config.data = { ...params, ...config.data };
      } else {
        config.params = {
          ...params,
          ...(config.params || {}),
        };
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    const { err_no, err_msg, data, message: resMsg } = response.data;
    // 接口正常，返回 { err_no, err_msg, data }
    if (response.status >= 200 && response.status < 400) {
      if (response.config.baseURL !== axios.defaults.baseURL) {
        if (response.config.baseURL === process.env.REACT_APP_USER_CENTER) {
          return response;
        }
        return response.data;
      }
      // 接口错误，404、500 等，返回错误
      if (err_no === 0 || response.config.url.indexOf('.json') > -1) {
        return {
          success: true,
          data,
        };
      }

      if (err_no) {
        switch (err_no.toString()) {
          case '20014':
          case '20015':
          default:
            break;
        }
      }
    }
    let err_data = { msg: 'Unrecognized' }; // 默认为未识别的错误
    if (data) {
      if (typeof data === 'string') {
        err_data.msg = data;
      } else if (typeof data === 'object') {
        err_data.msg = resMsg;
        err_data.data = data;
      }
      if (data.message) {
        err_data.msg = data.message;
      }
    }
    if (err_no && err_no > 0) {
      err_data.err_no = err_no;
    }
    return Promise.reject(err_data);
  },
  (err) => {
    if (err.response) {
      const code = err.response.status;

      if (code >= 500) {
        //return message.error('Server Error'); //handleRedirect['50x'];
        return;
      } else if (err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return {
      error: err,
    };
  },
);

export default axios;
