<script lang="ts" setup>
import bgImg from '../assets/bg-image-login.png'

</script>
<template>
<main>
    <div class="flex-container">
        <section class="page-layout">
            <div class="half-background-img">
                <img :src="bgImg" alt="fine image for half of background">
            </div>
            <router-view />
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
</style>