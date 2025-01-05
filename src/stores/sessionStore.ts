import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useSessionStore = defineStore('sessionStore', () => {
    const isAuth = ref<boolean>(false);
    function authentication ():void {
          isAuth.value = true
      };
    function failedAuthentication ():void {
        isAuth.value = false
    };
      return { isAuth, authentication, failedAuthentication };
});