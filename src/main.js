import './assets/main.scss'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router/index.js'

import { createApp } from 'vue'
import App from './App.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'uk',
  fallbackLocale: 'en',
  messages: {
    en: {
      message: {
        hello: 'i18n works'
      }
    },
    uk: {
      message: {
        hello: 'інтернаціоналізація працює'
      }
    }
  }
})
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(i18n)
app.use(pinia)
app.use(router)

app.mount('#app')
