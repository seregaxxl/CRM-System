<script lang="ts" setup>
import LoginForm from '../components/LoginPage/LoginForm.vue';
import CreateAccountLink from '../components/LoginPage/CreateAccountLink.vue';
import logo from '../assets/loginLogo.png'

</script>
<template>
    <section class="login-layout">
        <div class="logo-n-text">
            <div class="logo">
                <img :src="logo" alt="">
            </div>
            <div class="login-header">
                <h1>Login to your Account</h1>
                <h2> See what is going on with your business</h2>
            </div>
        </div>
        <LoginForm />
        <CreateAccountLink/>
    </section>
</template>
<style scoped>
.login-layout {
    margin: auto;
    margin-top: 10vh;
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