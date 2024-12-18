import { defineStore } from 'pinia'
import { refreshToken } from '../api';

export const useTokensStore = defineStore('tokensStore', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  }),
  actions: {

    setTokens(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    },
    setTokensSave(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    },
    clearTokens() {
      this.accessToken = null;
      this.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    async refreshAccessToken() {
      if (!this.refreshToken) {
        console.log('no token')
        return false; 
      }
      try {
        console.log(localStorage.refreshToken)
        const response = await refreshToken(localStorage.refreshToken)
        console.log(response.data)
        if (response.data?.accessToken) {
          this.setTokens(response.data.accessToken, response.data.refreshToken || '');
          return true;
        }
        console.log('problem with the server')
        return false; 
      } catch (error) {
        this.clearTokens();
        return false; 
      }
    },
  },
});