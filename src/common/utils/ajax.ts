import axios from 'axios';
import { baseURL } from './constants';
import Cookies from 'js-cookie';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

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
      if (token) {
        // config.headers.common.Authorization = `Bearer ${token}`;
        config.headers.common.Authorization = `${token}`;
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
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    const { response } = error;
    if (response) {
      const { status } = response;
      const errortext = codeMessage[status] || response.statusText;
      const error: any = new Error(errortext);
      error.name = response.status;
      error.response = response;
      throw error;
    } else {
      throw error;
    }
  },
);

export default axios;
