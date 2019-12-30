import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ForgetPassword from '@/components/ForgetPassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/sign_in',
      name: 'signIn',
      component: Login
    },
    {
      path: '/sign_up',
      name: 'signUp',
      component: Register
    },
    {
      path: '/users/password/mobile_reset',
      name: 'ForgetPassword',
      component: ForgetPassword
    }
  ]
})
