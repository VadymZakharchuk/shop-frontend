import { defineStore } from 'pinia'

export const useUserStore = defineStore('initStore', {
  state: () => ({
    token: '',
  }),
})