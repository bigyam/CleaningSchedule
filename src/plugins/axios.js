"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
let config = {
  baseURL: 'http://localhost:5000'
};

const _axios = axios.create(config);

// //testing interceptor method to deal with needing to refresh on login
// _axios.interceptors.request.use(
//     function(config) {
//         const token = localStorage.getItem("user");
//         console.log('token: ', token);
//         if (token) {
//             config.headers["Authorization"] = 'Bearer ' + token;
//         }
//         return config;
//         },
//     function(error) {
//         console.log('interceptor error')
//         return Promise.reject(error);
//     }  
// );

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
