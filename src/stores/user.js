import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    account: '',
    name: '',
    is_admin: false,
    token: '',
    id: ''
  }),
  actions: {
    setUserInfo({ account, name, is_admin, token, id }) {
      this.account = account;
      this.name = name;
      this.is_admin = is_admin;
      this.token = token;
      this.id = id;
    },
    clearUserInfo() {
      this.account = '';
      this.name = '';
      this.is_admin = '';
      this.token = '';
      this.id = '';
      this.persistToLocalStorage();
    },
    persistToLocalStorage() {
      localStorage.setItem('id', this.id);
      localStorage.setItem('token', this.token);
      localStorage.setItem('account', this.account);
      localStorage.setItem('name', this.name);
      localStorage.setItem('is_admin', this.is_admin ? 'true' : 'false');
    },
    loadFromLocalStorage() {
      this.id = localStorage.getItem('id') || '';
      this.token = localStorage.getItem('token') || '';
      this.account = localStorage.getItem('account') || '';
      this.name = localStorage.getItem('name') || '';
      this.is_admin = localStorage.getItem('is_admin') === 'true';
    }
  },
  persist: false
});