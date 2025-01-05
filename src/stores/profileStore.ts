import { defineStore } from 'pinia'
import { ref } from 'vue';
import {refreshProfile} from '../api/auth';
import { UserData } from '../types/authTypes';

export const useProfileStore = defineStore('profileStore', () => {
    const profileData = ref<UserData | null>(null);
    const profilesData = ref<UserData[] | null>(null);
    const totalAmount = ref<number>(0);
    async function fetchProfileData ():Promise<void> {
        try {
          const res = await refreshProfile()
          profileData.value = res.data
        } catch (error) {
          console.error('Failed to fetch profile data', error);
        }
      };
      return { profileData,profilesData,totalAmount, fetchProfileData };
});