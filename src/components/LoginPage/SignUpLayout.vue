<script lang="ts" setup>
import CreateForm from './CreateForm.vue'
import logo from '../../assets/loginLogo.png'

interface Emits {
  (event: 'created', login: boolean): void;
}

const emit = defineEmits<Emits>()

function created () {
    emit('created', false)
}

function back () {
    emit('created', true)
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
        <CreateForm @created="created" />
        <a href="#" @click="back" > Back to login</a>
    </section>
</template>
<style scoped>
.signup {
    margin-top: 40px;
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