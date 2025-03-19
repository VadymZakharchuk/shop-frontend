import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "@/store/user.js"
import { jwtDecode } from "jwt-decode"
import Cookies from 'js-cookie'
import Home from "@/pages/HomePage.vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const SignIn = () => import('@/components/auth/SignIn.vue')
const SignUp = () => import('@/components/auth/SignUp.vue')
const ForgotPassword = () => import('@/components/auth/ForgotPassword.vue')
const SignUpLayout  =() => import('@/layouts/SignUpLayout.vue')
const ProductPage = () => import('@/pages/ProductPage.vue')
const ProductDetails = () => import('@/pages/ProductDetails.vue')
const UserCabinet = () => import('@/pages/UserCabinet.vue')
const UserBasket = () => import('@/pages/UserBasket.vue')
const AdminPage = () => import('@/pages/AdminPanel.vue')

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
    path: '/registracia', component: SignUpLayout,
    children: [{ path: '', name: 'register__uk', component: SignUp }],
  },
  {
    path: '/signup', component: SignUpLayout,
    children: [{ path: '', name: 'register__en', component: SignUp }],
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
    path: '/koshik', component: DefaultLayout,
    children: [{ path: '', name: 'basket__uk', component: UserBasket }],
  },
  {
    path: '/basket', component: DefaultLayout,
    children: [{ path: '', name: 'basket__en', component: UserBasket }],
  },
  {
    path: '/admin-storinka', component: DefaultLayout,
    children: [{ path: '', name: 'admin__uk', component: AdminPage }],
  },
  {
    path: '/admin-page', component: DefaultLayout,
    children: [{ path: '', name: 'admin__en', component: AdminPage }],
  },
  {
    path: '/rukzaky', component: DefaultLayout,
    children: [{ path: '', name: 'backpacks__uk', component: ProductPage, props: {
        categoryId: 4,
        filters: {
          sex: false,
          size: false,
          color: true,
          isNew: true
        }
      }
    }]
  },
  {
    path: '/backpacks', component: DefaultLayout,
    children: [{ path: '', name: 'backpacks__en', component: ProductPage, props: {
        categoryId: 4,
        filters: {
          sex: false,
          size: false,
          color: true,
          isNew: true
        }
      }
    }]
  },
  {
    path: '/rukzaky/:id', component: DefaultLayout,
    children: [{path: '', name: 'backpacks-detail__uk', component: ProductDetails, props: {
        categoryId: 4,
      }}]
  },
  {
    path: '/backpacks/:id', component: DefaultLayout,
    children: [{path: '', name: 'backpacks-detail__en', component: ProductDetails, props: {
        categoryId: 4,
      }}]
  },
  {
    path: '/chashky', component: DefaultLayout,
    children: [{ path: '', name: 'cups__uk', component: ProductPage, props: {
        categoryId: 3,
        filters: {
          sex: false,
          size: false,
          color: true,
          isNew: true
        }
      }
    }]
  },
  {
    path: '/cups', component: DefaultLayout,
    children: [{ path: '', name: 'cups__en', component: ProductPage, props: {
        categoryId: 3,
        filters: {
          sex: false,
          size: false,
          color: true,
          isNew: true
        }
      }
    }]
  },
  {
    path: '/chashky/:id', component: DefaultLayout,
    children: [{path: '', name: 'cups-detail__uk', component: ProductDetails, props: {
        categoryId: 3,
      }}]
  },
  {
    path: '/cups/:id', component: DefaultLayout,
    children: [{path: '', name: 'cups-detail__en', component: ProductDetails, props: {
        categoryId: 3,
      }}]
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
    path: '/khudi/:id', component: DefaultLayout,
    children: [{path: '', name: 'hoodie-detail__uk', component: ProductDetails, props: {
        categoryId: 1,
      }}]
  },
  {
    path: '/hoodies/:id', component: DefaultLayout,
    children: [{path: '', name: 'hoodie-detail__en', component: ProductDetails, props: {
        categoryId: 1,
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
  {
    path: '/futbolky/:id', component: DefaultLayout,
    children: [{path: '', name: 'tshirt-detail__uk', component: ProductDetails, props: {
        categoryId: 2,
      }}]
  },
  {
    path: '/tshirts/:id', component: DefaultLayout,
    children: [{path: '', name: 'tshirt-detail__en', component: ProductDetails, props: {
        categoryId: 2,
      }}]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const lang = from.name?.includes('__uk') ? 'uk' : 'en'
  let token = userStore.token
  if (token) {
    const decoded = jwtDecode(token)
    if (new Date() - new Date(decoded.exp * 1000) > 0) {
      userStore.clearUser()
    }
  }
  else {
    userStore.clearUser()
  }

  if (to.path.includes('cabinet') && !userStore.isLoggedInAndHasToken) next({ name: `login__${lang}` })
  else next()
})
export default router;