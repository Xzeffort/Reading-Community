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
import Bookmarks from '@/components/Bookmarks'
import Notification from '@/components/Notification'
import LikeNotification from '@/components/notification/Like'
import FollowNotification from '@/components/notification/Follow'
import CommentNotification from '@/components/notification/Comment'
import OthersNotification from '@/components/notification/Others'
import ChatsNotification from '@/components/notification/Chat'
import ChatContent from '@/components/notification/ChatContent'

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
    },
    {
      path: '/bookmarks',
      name: 'Bookmarks',
      component: Bookmarks
    },
    {
      path: '/notifications',
      component: Notification,
      redirect: '/notifications/comments',
      children: [
        {
          path: 'comments',
          name: 'CommentNotification',
          component: CommentNotification
        },
        {
          path: 'likes',
          name: 'LikeNotification',
          component: LikeNotification
        },
        {
          path: 'follows',
          name: 'FollowNotification',
          component: FollowNotification
        },
        {
          path: 'others',
          name: 'OthersNotification',
          component: OthersNotification
        },
        {
          path: 'chats',
          name: 'ChatsNotification',
          component: ChatsNotification
        },
        {
          path: 'chats/:id',
          name: 'ChatContent',
          component: ChatContent
        }
      ]
    }
  ]
})
