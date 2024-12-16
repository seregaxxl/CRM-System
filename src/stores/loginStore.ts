import { defineStore } from 'pinia'
import { refreshToken } from '../api';

export const useTokensStore = defineStore('tokensStore', {
  state: () => ({
    accessToken: '',
    refreshToken: '',
  }),
  actions: {
    async refreshAccessToken() {
      console.log('refreshing token')
      if (!this.refreshToken) {
        return false; 
      }
      try {
        const response = await refreshToken(this.refreshToken)
        this.accessToken = response.data.accessToken;
        return true; 
      } catch (error) {
        this.accessToken = '';
        this.refreshToken = '';
        return false; 
      }
    },
  },
});