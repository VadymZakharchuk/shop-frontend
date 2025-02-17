import { defineStore } from 'pinia'
import Cookies from "js-cookie";

export const useUserStore = defineStore('initStore', {
  state: () => ({
    user: {},
  }),
  persist: true,
  getters: {
    isLoggedInAndHasToken({ user }) {
      const token = Cookies.get('auth-token')
      return !!(Object.keys(user).length && token.length)
    },
  }
})