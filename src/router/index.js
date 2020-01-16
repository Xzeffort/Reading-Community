import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ForgetPassword from '@/components/ForgetPassword'
import Article from '@/components/Article'
import User from '@/components/User'
import RecommendationUsers from '@/components/RecommendationUsers'
import NewCollection from '@/components/NewCollection'
import Collection from '@/components/Collection'
import EditCollection from '@/components/EditCollection'
import NoteBook from '@/components/NoteBook'
import Subscription from '@/components/Subscription'
import UserSubscription from '@/components/subscription/UserSubscription'
import IndexSubscription from '@/components/subscription/Index'
import CollectionSubscription from '@/components/subscription/CollectionSubscription'
import NoteBookSubscription from '@/components/subscription/NoteBookSubscription'

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
    },
    {
      path: '/c/:id',
      name: 'Collection',
      component: Collection
    },
    {
      path: '/collections/new',
      name: 'NewCollection',
      component: NewCollection
    },
    {
      path: '/collections/:id/edit',
      name: 'EditCollection',
      component: EditCollection
    },
    {
      path: '/nb/:id',
      name: 'NoteBook',
      component: NoteBook
    },
    {
      path: '/subscription',
      name: 'Subscription',
      component: Subscription,
      children: [
        {
          path: '',
          name: 'IndexSubscription',
          component: IndexSubscription
        },
        {
          path: ':id/user',
          name: 'UserSubscription',
          component: UserSubscription
        },
        {
          path: ':id/collection',
          name: 'CollectionSubscription',
          component: CollectionSubscription
        },
        {
          path: ':id/notebook',
          name: 'NoteBookSubscription',
          component: NoteBookSubscription
        }
      ]
    }
  ]
})
