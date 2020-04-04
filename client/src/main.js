import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './router.js'
import service from '@/service'
import './plugins/axios'

Vue.prototype.$http = Vue.prototype.axios;
Vue.prototype.$service = service;

Vue.config.productionTip = false


new Vue({
	router,
	vuetify,
  render: h => h(App),
}).$mount('#app')
