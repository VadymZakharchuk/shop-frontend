import { defineStore } from 'pinia'
import { addFav, removeFav } from "@/services/favourites.service.js";

export const useUserStore = defineStore('initStore', {
  state: () => ({
    user: {},
    token: '',
    favourites: [],
    rubrics: [],
  }),
  persist: true,
  getters: {
    isLoggedInAndHasToken({ user, token }) {
      return !!(user.id && token)
    },
    userFavourites({ favourites }) {
      return favourites
    },
    appRubrics({ rubrics }) {
      return rubrics
    },
    isAdmin({ user }) {
      return user.isAdmin
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
    },
    clearUser() {
      this.user = {}
      this.token = ''
    },
  }
})
