import {createRouter, createWebHistory} from 'vue-router'

import Home from "@/pages/Home.vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const SignIn = () => import('@/components/auth/SignIn.vue')
const SignUpLayout  =() => import('@/layouts/SignUpLayout.vue')
const Backpacks = () => import('@/pages/Backpacks.vue')
const Cups = () => import('@/pages/Cups.vue')
const Hoodies = () => import('@/pages/Hoodies.vue')
const Tshirts = () => import('@/pages/Tshirts.vue')
const Cabinet = () => import('@/pages/Cabinet.vue')

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
    path: '/vkhid',
    component: SignUpLayout,
    children: [ { path: '', name: 'login__uk', component: SignIn }],
  },
  {
    path: '/login',
    component: SignUpLayout,
    children: [ { path: '', name: 'login__en', component: SignIn }],
  },
  { path: '/:locale/cabinet',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'cabinet',
        component: Cabinet,
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
]

const index = createRouter({
  history: createWebHistory(),
  routes,
})
export default index;