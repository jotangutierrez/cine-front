// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './main.css'
import axios from 'axios'
import VueTailwind from 'vue-tailwind'

Vue.use(VueTailwind)

const base = axios.create({
  baseURL: 'http://localhost:3000/v1'
})
Vue.prototype.$http = base
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, VueTailwind },
  template: '<App/>'
})
