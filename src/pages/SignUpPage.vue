<script lang="ts" setup>
import CreateForm from '../components/SignUpPage/CreateForm.vue'
import logo from '../assets/loginLogo.png'
import { useRouter } from 'vue-router';

const router = useRouter()

function toLogin () {
    router.push({ name: 'Login' })
}

</script>
<template>
    <section class="signup">
        <div class="logo-n-text">
            <div class="logo">
                <img :src="logo" alt="">
            </div>
            <div class="login-header">
                <h1>Create an Account</h1>
            </div>
        </div>
        <CreateForm @created="toLogin" />
        <router-link :to="{ name: 'Login' }">Back to login</router-link>
    </section>
</template>
<style scoped>
.signup {
    margin: auto;
    margin-top: 20px;
    color: #525252;
}
.login-header {
    margin-top: 20px;
    padding-left: 20px;
}
h1 {
    font-size: 32px;
    line-height: 32px;
    font-weight: bold;
}
h2 {
    font-size: 16px;
    line-height: 22px;
    font-weight: lighter;
}
</style>