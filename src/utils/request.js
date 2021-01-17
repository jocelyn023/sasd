import axios from "axios";
import qs from "qs";
import { Toast } from 'vant';

let showDefaultError = true; //错误吐司

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_PROXY_API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;"
  },
  withCredentials: true,
  timeout: 6000, // 请求超时时间
  /**
   * @param {boolean} data.arrayformat true为array[1]:a array[2]:b 形式
   * @returns
   */
  transformRequest: [
    function(data) {
      if (data && data.arrayformat) return qs.stringify(data);
      const s = [];

      let smpData = false;

      for (const key in data) {
        if (data[key] && typeof data[key] === "function") {
          smpData = true;
        }
        if (key == "showDefaultError") {
          showDefaultError = false;
        } else {
          s.push(
            encodeURIComponent(key) +
              "=" +
              encodeURIComponent(data[key] == null ? "" : data[key])
          );
        }
      }
      if (!smpData) {
        return s.join("&");
      } else {
        return data;
      }
    }
  ],
  transformResponse: [
    function(data) {
      return data;
    }
  ]
});

const err = error => {
  if (error.response) {
    const data = error.response.data;

    if (error.response.status === 403) {
      Toast.fail(data.message);
      // 无权限用户直接跳转登录页面
      // store.dispatch("Logout").then(() => {
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 1500);
      // });
    }
    if (
      error.response.status === 401 &&
      !(data.result && data.result.isLogin)
    ) {
      Toast.fail(data.message);
      // store.dispatch("Logout").then(() => {
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 1500);
      // });
    }
  }
  return Promise.reject(error);
};

// request interceptor
service.interceptors.request.use(config => {
  if (config.url.indexOf("openId") === -1) {
    config.url += config.url.indexOf("?") === -1 ? "?" : "&";
    config.url += "openId=1";
  }
  return config;
}, err);

// response interceptor
service.interceptors.response.use(response => {
  // eslint-disable-next-line no-undef
  let data = JSON.parse(response.data);

  if (data.code !== 200) {
    if (showDefaultError) {
      Toast.fail(data.returnMsg);
    }
  }
  return data;
}, err);

export { service as axios };
