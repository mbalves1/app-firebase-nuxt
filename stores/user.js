import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: 'Vanessa',
  }),
  actions: {
    getUser() {
      return this.user
    }
  }
})