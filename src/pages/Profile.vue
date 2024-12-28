<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import loaderComponent from '../components/common/loaderComponent.vue';
import { UserData } from '../types/authTypes';
import authModule from '../api/auth';

const profileData = ref<UserData | null>(null)
const fetchProfileData = async ():Promise<void> => {
  try {
    const res = await authModule.refreshProfile()
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
  <loaderComponent v-if="!profileData"/>
  <section class="profile">
    <a-descriptions title="User Info">
      <a-descriptions-item label="UserName">{{ profileData?.username }}</a-descriptions-item>
      <a-descriptions-item label="Telephone">{{ profileData?.phoneNumber ? profileData?.phoneNumber : 'No phone number saved' }}</a-descriptions-item>
      <a-descriptions-item label="Email Address"> {{ profileData?.email }}</a-descriptions-item>
    </a-descriptions>
  </section>
</template>

<style scoped>
.text {
  text-align: center;
}
.profile {
    padding: 10px;
}
</style>
