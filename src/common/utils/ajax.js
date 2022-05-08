import axios from 'axios';
import { baseURL } from './constants';
import Cookies from 'js-cookie';
import userStore from 'stores/UserStore';
import { LOCALES_MAP } from '../config';

const API_ROOT =
  process.env.NODE_ENV === 'development' ? '/api/' : baseURL || '/';
//axios.defaults.headers.post['Content-Type'] = 'application/json';
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

      const puid = localStorage.getItem('puid');
      let params = {};

      // filter /poster/*.json
      if (config.url && !/poster.*\.json/.test(config.url)) {
        if (lang) {
          params.lang = LOCALES_MAP[lang].serverLang;
        }
        if (userStore.isUserReadOnly) {
          // 观察者模式，去掉 Authorization，添加 access_key
          if (userStore.isWatcher) {
            params.access_key = global.access_key;
          }
          if (global.puid) {
            params.puid = global.puid;
          }
        } else if (userStore.isShared) {
          params.puid = global.puid;
        } else if (puid) {
          params.puid = puid;
        }
      }

      // 不用携带puid请求参数的接口列表
      const excludePuidApiPrefixList = [
        'sub-account/create',
        'invite/check',
        'invite/createInviteCode',
        'invite/inviterInfo',
        'invite/inviteeList',
        'invite/inviterRebate',
      ];

      if (
        excludePuidApiPrefixList.some((item) => config.url.indexOf(item) >= 0)
      ) {
        delete params.puid;
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
      /** 
       * 登录相关错误码
       * 'jose' => [
        20001 => 'permissions denied',
        20010 => '签名不正确',
        20011 => '时间戳过期',
        20012 => '签发人不正确',
        20013 => '',
        20014 => 'UID格式不正确',
        20015 => '验证错误',
        20016 => '序列化错误',
        20017 => 'IP 不正确',
        10010 => '观察者过期'
       ]
       */
      if (err_no) {
        switch (err_no.toString()) {
          case '20014':
          case '20015':
          case '20016':
          case '20017':
            userStore.logout();
            break;
          // 观察者模式，单access_key无puid，平滑处理，不出现错误页面
          case '20020':
            if (userStore.isUserReadOnly) {
              // 观察者模式下失效
              if (userStore.isWatcher && global.access_key) {
                if (err_msg && err_msg.puid) {
                  global.puid = err_msg.puid;
                }
              }
            }
            break;
          case '20001':
          case '20010':
          case '20011':
          case '20012':
            if (userStore.isUserReadOnly) {
              // 观察者模式下失效
              if (userStore.isWatcher && global.access_key) {
                userStore.watcherIncorrect();
              }
            } else if (!userStore.isRefreshingNewToken) {
              userStore.requestJWTToken(true);
            }
            break;
          case '10010': // 后端新加此码来指定观察者链接过期
            // remove cached account, then request account again
            // localStorage.removeItem('accountInfo');
            // localStorage.removeItem('puid');
            // userStore.initAccount();
            // userStore.getAccount();
            if (userStore.isUserReadOnly) {
              // 观察者模式下失效
              if (userStore.isWatcher && global.access_key) {
                userStore.watcherDelete(err_msg);
              }
            } else {
              // remove cached account, then request account again
              localStorage.removeItem('accountInfo');
              localStorage.removeItem('puid');
              // userStore.initAccount();
              // userStore.getAccount();
            }
            break;
          default:
            break;
        }
      }
      // if (handleRedirect[err_no]) {
      //   return handleRedirect[err_no](data);
      // }
      // return message.error(
      //   typeof err_msg === 'string' ? err_msg : JSON.stringify(err_msg)
      // );
    }
    //return message.error(err_msg);
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
    } else if (err_msg) {
      if (typeof err_msg === 'string') {
        err_data.msg = err_msg;
      } else if (typeof err_msg === 'object') {
        err_data.data = err_msg;
        //err_data.msg = JSON.stringify(err_msg);
        err_data.msg = resMsg || JSON.stringify(err_msg);
      }
      // 保证返回的错误.message字段跟new Error().message 同名
      if (resMsg) {
        err_data.msg = resMsg;
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
