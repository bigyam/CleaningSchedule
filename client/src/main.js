import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './router.js'
import service from '@/service'
import './plugins/axios'

//import axios from 'axios'

//let config = {
//  baseURL: 'http://localhost:5000'
//};
/**const _axios = axios.create({
	baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

window.axios = _axios;
Vue.prototype.$http = _axios;**/

Vue.prototype.$http = Vue.prototype.axios;
Vue.prototype.$service = service;

Vue.config.productionTip = false


new Vue({
	router,
	vuetify,
  render: h => h(App),
}).$mount('#app')
