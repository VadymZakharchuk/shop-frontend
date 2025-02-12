import Cookies from 'js-cookie'
import { createWebHistory, createRouter } from 'vue-router'

import ProfileRoutes from './profile.routes'
import SignupRoutes from './signup.routes'

const SignIn = () => import('@/views/Auth/SignIn.vue')
const ResetPassword = () => import('@/views/Auth/ResetPassword.vue')
const NotFound = () => import('@/views/NotFound.vue')
const ForgotPassword = () => import('@/views/Auth/ForgotPassword.vue')
const SignUpLayout = () => import('@/layouts/SignUpLayout.vue')
const MainLayout = () => import('@/layouts/MainLayout.vue')
const MediaGallery = () => import('@/components/MediaGallery/MediaGallery')
const NewsFeed = () => import('@/views/NewsFeed.vue')

const childrenNotFound = [
  {
    path: '',
    name: 'NotFound',
    meta: { auth: true, name: 'Page not found' },
    component: NotFound,
  },
]

const routes = [
  {
    path: '/',
    component: SignUpLayout,
    children: SignupRoutes(),
  },
  {
    path: '/signin',
    name: 'SignIn',
    meta: {
      name: 'authentication',
    },
    component: SignUpLayout,
    children: [
      {
        path: '',
        name: 'SignIn',
        component: SignIn,
      },
    ],
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    meta: {
      name: 'authentication',
    },
    component: SignUpLayout,
    children: [
      {
        path: '',
        name: 'ForgotPassword',
        component: ForgotPassword,
      },
    ],
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    meta: {
      name: 'authentication',
    },
    component: SignUpLayout,
    children: [
      {
        path: '',
        name: 'ResetPassword',
        component: ResetPassword,
      },
    ],
  },
  {
    path: '/profile',
    name: 'Profile',
    component: MainLayout,
    children: ProfileRoutes(),
  },
  {
    path: '/gallery',
    name: 'MediaGallery',
    component: MediaGallery,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    component: MainLayout,
    children: childrenNotFound,
  },
  {
    path: '/newsfeed',
    component: NewsFeed,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (!Cookies.get('auth-token')) {
      next('/signin')
    } else {
      next()
    }
  } else if (Cookies.get('auth-token') && to.meta.name === 'authentication') {
    next('/profile')
  } else {
    next()
  }
})

export default router
