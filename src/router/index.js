import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ForgetPassword from '@/components/ForgetPassword'
import Article from '@/components/Article'
import User from '@/components/User'
import RecommendationUsers from '@/components/RecommendationUsers'

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
    },
    {
      path: '/recommendations/users',
      name: 'RecommendationUsers',
      component: RecommendationUsers
    },
    {
      path: '/p/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/u/:id',
      name: 'User',
      component: User
    }
  ]
})
