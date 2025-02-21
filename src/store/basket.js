import { defineStore } from 'pinia'

export const useBasketStore = defineStore('basketStore', {
  state: () => ({
    basket: [],
  }),
  persist: true,
  getters: {
    userBasket({ basket }) {
      return basket
    }
  },
  actions: {
    clearBasket() {
      this.basket = []
    }
  }
})
