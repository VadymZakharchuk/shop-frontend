import {createRouter, createWebHistory} from 'vue-router'

import Home from "@/components/pages/Home.vue";
import Backpacks from "@/components/pages/Backpacks.vue";
import Cups from "@/components/pages/Cups.vue";
import Hoodies from "@/components/pages/Hoodies.vue";
import Tshirts from "@/components/pages/Tshirts.vue";
import Account from "@/components/pages/Account.vue";

const routes = [
  { path: '/', name: 'home__uk', component: Home },
  { path: '/en', name: 'home__en', component: Home },
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

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router;