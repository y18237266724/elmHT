// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './config/rem'
import App from './App'
import router from './router/index.js'
import store from './store/index.js'

//Element-ui框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import Axios from "axios";
Axios.defaults.withCredentials=true;
Vue.prototype.Axios=Axios


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
