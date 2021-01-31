"use strict";

import Vue from 'vue';
import axios from "axios";
import store from '../store/index';

axios.interceptors.request.use(
    function(config) {
        const user = store.state.auth.user;
        if (user) {
            config.headers["Authorization"] = 'Bearer ' + user.token;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }  
);

// Full config:  https://github.com/axios/axios#request-config
let configuration = {
  baseURL: 'http://localhost:5000',
  params: {}
};

const _axios = axios.create(configuration);

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
