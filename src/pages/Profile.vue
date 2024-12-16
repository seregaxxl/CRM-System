<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import SideBar from '../components/common/SideBar.vue';
import loaderComponent from '../components/common/loaderComponent.vue';
import { useTokensStore } from '../stores/loginStore';
import { refreshProfile } from '../api';
import { UserData } from '../types/authTypes';

const authStore = useTokensStore()
const profileData = ref<UserData | null>(null)
const fetchProfileData = async ():Promise<void> => {
  try {
    const res = await refreshProfile(authStore.accessToken)
    profileData.value = res.data
  } catch (error) {
    console.error('Failed to fetch profile data', error);
  }
};
onMounted( () => {
    fetchProfileData();
})

</script>

<template>
  <main>
    <div class="profile-layout">
        <nav>
      <SideBar />
    </nav>
    <loaderComponent v-if="!profileData"/>
    <section class="profile">
        <a-descriptions title="User Info">
        <a-descriptions-item label="UserName">{{ profileData?.username }}</a-descriptions-item>
        <a-descriptions-item label="Telephone">{{ profileData?.phoneNumber ? profileData?.phoneNumber : 'No phone number saved' }}</a-descriptions-item>
        <a-descriptions-item label="Email Address"> {{ profileData?.email }}</a-descriptions-item>
  </a-descriptions>
    </section>
    </div>
  </main>
</template>

<style scoped>
.text {
  text-align: center;
}
.profile-layout {
    display: flex;
}
.profile {
    padding: 10px;
}
</style>
