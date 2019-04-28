// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './config/rem'
import router from './router/index.js'
import store from './store/index.js'

import App from './App'
// import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

import Axios from "axios";
Vue.prototype.Axios=Axios

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
