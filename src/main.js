// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
import store from './stores/store'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.$qs = qs
Vue.use(ElementUI)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

// 在请求头中加token
axios.interceptors.request.use(
  config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    let token = localStorage.getItem('token')
    if (!config.headers.hasOwnProperty('Authorization') && token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
