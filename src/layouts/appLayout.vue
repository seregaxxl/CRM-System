<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import SideBar from '../components/common/SideBar.vue';
import { refreshAccessToken } from '../api/auth';
import { useProfileStore } from '../stores/profileStore';
import { useSessionStore } from '../stores/sessionStore';
import { useRouter } from 'vue-router';
import { routeNames } from '../router';

const profileStore = useProfileStore()
const sessionStore = useSessionStore()
const router = useRouter()

async function checkLogin () {
    if (sessionStorage.refreshToken) {
    try {
        const success = await refreshAccessToken(sessionStorage.refreshToken);
        if (success) {
        sessionStore.authentication()
    } else {
        sessionStore.failedAuthentication()
        router.push({ name: routeNames.login })
    }
        } catch(e) {
            sessionStore.failedAuthentication()
            router.push({ name: routeNames.login })
        } 
    }
}

onMounted(()=>{
    profileStore.fetchProfileData()
    checkLogin()
})

watch(
  () => sessionStore.isAuth,
  () => {
    checkLogin(); 
  }
);

</script>

<template>
    <div class="app-layout">
        <nav>
            <SideBar/>
        </nav>
        <div class="container">
            <router-view />
        </div>
        
    </div>
</template>

<style scoped>
.app-layout {
    display: flex;
}
.container {
    margin: auto;
}
</style>