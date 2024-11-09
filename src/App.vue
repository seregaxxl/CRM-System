<script setup lang="ts">

</script>

<template>
  <router-view/>
</template>

<style>
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

body {
  margin: 0;
  display: flex;
  justify-content: center;
}

main {
  display: block;
  width: 280px;
}

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

</style>
