<script lang="ts" setup>
import LoginLayout from '../components/LoginPage/LoginLayout.vue';
import SignUpLayout from '../components/LoginPage/SignUpLayout.vue';
import bgImg from '../assets/bg-image-login.png'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTokensStore } from '../stores/loginStore';

const authStore = useTokensStore()
const router = useRouter()
const login = ref<boolean>(true)

function loginPage(value:boolean=true) {
    login.value = value
}

async function checkLogin () {
    if (localStorage.refreshToken) {
    try {
        const success = await authStore.refreshAccessToken();
        console.log(success)
        if (success) {
        console.log('ser')
        router.push('/Profile'); 
    } else {
        router.push('/');
    }
        } catch(e) {
            router.push('/');
        } 
    }
}

onMounted(() => {
    checkLogin()
})

</script>
<template>
<main>
    <div class="flex-container">
        <section class="page-layout">
            <div class="half-background-img">
                <img :src="bgImg" alt="fine image for half of background">
            </div>
            <div class="login-layout" v-if="login" >
                <LoginLayout @created="loginPage" />
            </div>   
            <div class="signup-layout" v-else >
                <SignUpLayout @created="loginPage"/>
            </div> 
        </section>
    </div>
</main>
</template>
<style scoped>
main {
    background-color: #FFE6C9;
    height: 100%;
}
.flex-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 50px;
}
.page-layout {
    border-radius: 20px;
    background-color: white;
    width: 95vw;
    display: flex;
    justify-content: space-between;

}
.half-background-img {
    height: 100%;
    padding: 10px;
    width: 60%;
        img {
            height: 100%;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            max-width: 100%;
        }
}
.login-layout {
    width: 30%;
    margin-right: 10%;
}
.signup-layout {
    width: auto;
    margin-right: 10%;
}
</style>