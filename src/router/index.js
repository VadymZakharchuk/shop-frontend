import {createRouter, createWebHistory} from 'vue-router'

import Home from "@/pages/Home.vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const SignIn = import('@/components/auth/SignIn.vue')
const SignUpLayout  = import("@/layouts/SignUpLayout.vue")
const Backpacks = () => import('@/pages/Backpacks.vue')
const Cups = () => import('@/pages/Cups.vue')
const Hoodies = () => import('@/pages/Hoodies.vue')
const Tshirts = () => import('@/pages/Tshirts.vue')
const Account = () => import('@/pages/Account.vue')

const routes = [
  {
    path: '/:locale',
    component: DefaultLayout,
    children: [
      {
        path: '/uk',
        name: `home__uk`,
        component: Home,
      },
      {
        path: '/en',
        name: 'home__en',
        component: Home,
      },
    ],
  },
  { path: '/:locale/login',
    name: 'login',
    component: SignUpLayout,
    children: [
      {
        path: '',
        name: 'SignIn',
        component: SignIn,
      }
    ],
  },
  { path: '/uk/rukzaky', name: 'backpacks__uk', component: Backpacks },
  { path: '/en/backpacks', name: 'backpacks__en', component: Backpacks },
  { path: '/uk/chashky', name: 'cups__uk', component: Cups },
  { path: '/en/cups', name: 'cups__en', component: Cups },
  { path: '/uk/khudi', name: 'hoodies__uk', component: Hoodies },
  { path: '/en/hoodies', name: 'hoodies__en', component: Hoodies },
  { path: '/uk/futbolky', name: 'tshirts__uk', component: Tshirts },
  { path: '/en/tshirts', name: 'tshirts__en', component: Tshirts },
  { path: '/uk/kabinet', name: 'account__uk', component: Account },
  { path: '/en/account', name: 'account__en', component: Account },

]

const index = createRouter({
  history: createWebHistory(),
  routes,
})
export default index;