<script lang="ts" setup>
import SideBar from '../components/common/SideBar.vue';
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