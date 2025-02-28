import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "@/store/user.js"
import { useBasketStore } from "@/store/basket.js";
import { jwtDecode } from "jwt-decode"
import Cookies from 'js-cookie'
import Home from "@/pages/HomePage.vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const SignIn = () => import('@/components/auth/SignIn.vue')
const ForgotPassword = () => import('@/components/auth/ForgotPassword.vue')
const SignUpLayout  =() => import('@/layouts/SignUpLayout.vue')
const StockBackpacks = () => import('@/pages/StockBackpacks.vue')
const StockCups = () => import('@/pages/StockCups.vue')
const ProductPage = () => import('@/pages/ProductPage.vue')
const UserCabinet = () => import('@/pages/UserCabinet.vue')

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '',  name: `home__uk`, component: Home },
      { path: 'en',  name: `home__en`, component: Home },
    ],
  },
  {
    path: '/vkhid', component: SignUpLayout,
    children: [{ path: '', name: 'login__uk', component: SignIn }],
  },
  {
    path: '/login', component: SignUpLayout,
    children: [{ path: '', name: 'login__en', component: SignIn }],
  },
  {
    path: '/zabuv-parol', component: SignUpLayout,
    children: [{ path: '', name: 'forgot__uk', component: ForgotPassword }],
  },
  {
    path: '/forgot-password', component: SignUpLayout,
    children: [{ path: '', name: 'forgot__en', component: ForgotPassword }],
  },
  {
    path: '/kabinet', component: DefaultLayout,
    children: [{ path: '', name: 'cabinet__uk', component: UserCabinet }],
  },
  {
    path: '/cabinet', component: DefaultLayout,
    children: [{ path: '', name: 'cabinet__en', component: UserCabinet }],
  },
  {
    path: '/rukzaky', component: DefaultLayout,
    children: [{ path: '', name: 'backpacks__uk', component: StockBackpacks }]
  },
  {
    path: '/backpacks', component: DefaultLayout,
    children: [{ path: '', name: 'backpacks__en', component: StockBackpacks }]
  },
  {
    path: '/chashky', component: DefaultLayout,
    children: [{ path: '', name: 'cups__uk', component: StockCups }]
  },
  {
    path: '/cups', component: DefaultLayout,
    children: [{ path: '', name: 'cups__en', component: StockCups}]
  },
  {
    path: '/khudi', component: DefaultLayout,
    children: [{path: '', name: 'hoodies__uk', component: ProductPage, props: {
        categoryId: 1,
        filters: {
          sex: true,
          size: true,
          color: true,
          isNew: true
        }
      }
    }]
  },
  {
    path: '/hoodies', component: DefaultLayout,
    children: [{path: '', name: 'hoodies__en', component: ProductPage, props: {
        categoryId: 1,
        filters: {
          sex: true,
          size: true,
          color: true,
          isNew: true
        }
      }}]
  },
  {
    path: '/futbolky', component: DefaultLayout,
    children: [{path: '', name: 'tshirts__uk', component: ProductPage, props: {
        categoryId: 2,
        filters: {
          sex: true,
          size: true,
          color: true,
          isNew: true
        }
      }}]
  },
  {
    path: '/tshirts', component: DefaultLayout,
    children: [{path: '', name: 'tshirts__en', component: ProductPage, props: {
        categoryId: 2,
        filters: {
          sex: true,
          size: true,
          color: true,
          isNew: true
        }
      }}]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const basketStore = useBasketStore()
  const lang = from.name?.includes('__uk') ? 'uk' : 'en'
  let token = Cookies.get('auth-token')
  if (token) {
    const decoded = jwtDecode(token)
    if (new Date() - new Date(decoded.exp * 1000) > 0) {
      Cookies.remove('auth-token')
      token = ''
    }
  }
  else {
    basketStore.clearBasket()
  }

  if (to.path.includes('cabinet') && !userStore.isLoggedInAndHasToken) next({ name: `login__${lang}` })
  else next()
})
export default router;