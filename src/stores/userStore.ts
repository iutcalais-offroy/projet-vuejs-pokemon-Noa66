import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId') || '',
  }),
  actions: {
    login(token: string, userId: string) {
      this.token = token;
      this.userId = userId;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
    },
    logout() {
      this.token = '';
      this.userId = '';
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
