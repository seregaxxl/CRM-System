<script lang="ts" setup>
</script>
<template>
    <section class="create-account">
        <div>
            <span class="not-registered"> Not registered Yet?</span>
            <router-link :to="{ name: 'SignUp' }">Create an account</router-link>
        </div>
    </section>
</template>
<style scoped>
.create-account {
    font-size: 18px;
}
.not-registered {
    color: #525252;
}
span {
margin-right: 10px;
}
</style>