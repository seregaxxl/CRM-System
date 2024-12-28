<script setup lang="ts">
</script>

<template>
  <a-config-provider
        :theme="{
        token: {
            colorPrimary: '#7F265B',
        },
        }"
    > 
    <router-view/>
  </a-config-provider>
</template>

<style>
* {
padding: 0;
margin: 0;
box-sizing: content-box;
}
#app {
  height: 100vh;
}
</style>
