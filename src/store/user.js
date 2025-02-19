import { defineStore } from 'pinia'
import Cookies from "js-cookie";
import { addFav, removeFav } from "@/services/favourites.service.js";

export const useUserStore = defineStore('initStore', {
  state: () => ({
    user: {},
    favourites: [],
  }),
  persist: true,
  getters: {
    isLoggedInAndHasToken({ user }) {
      const token = Cookies.get('auth-token')
      return !!(Object.keys(user).length && token.length)
    },
    userFavourites({ favourites }) {
      return favourites
    }
  },
  actions: {
    async addFavourite(id) {
      const fav = {
        userId: this.user.id || 0,
        productId: id
      }
      this.favourites.push(fav)
      if (this.isLoggedInAndHasToken) {
        await addFav({ userId: this.user.id, productId: id })
      }
    },
    async removeFavourite(id) {
      const index = this.favourites.findIndex(fav => fav.productId === id)
      this.favourites.splice(index, 1)
      if (this.isLoggedInAndHasToken) {
        await removeFav({ userId: this.user.id, productId: id })
      }
    }
  }
})