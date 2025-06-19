import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    name: '', // 用户姓名
    is_admin: null, // 0=管理员，1=普通用户
    token: ''
  }),
  actions: {
    setUserInfo({ username, name, is_admin, token }) {
      this.username = username
      this.name = name
      this.is_admin = is_admin
      this.token = token
    },
    clearUserInfo() {
      this.username = ''
      this.name = ''
      this.is_admin = null
      this.token = ''
    }
  },
  persist: true
})