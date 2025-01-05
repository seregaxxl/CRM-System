<script lang="ts" setup>
import loaderComponent from '../components/common/loaderComponent.vue';
import { useProfileStore } from '../stores/profileStore';

const profileStore = useProfileStore()
const profileData = profileStore.profileData
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
