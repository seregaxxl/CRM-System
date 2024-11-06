<script setup lang="ts">
import navBar from '../components/navBar.vue';
import taskForm from '../components/taskForm.vue';
import toDoListInternal from '../components/toDoListInternal.vue';
import { isLoading } from '../store/loadingEventBus'

import {getAllTasks} from '../api/index'
import { onMounted } from 'vue';

onMounted(async () => {
    await getAllTasks('all')
})

</script>

<template>
    <main class="main">
        <div v-if="isLoading" class="loader"></div>
        <section v-else class="main">
            <taskForm/>
            <navBar/>
            <toDoListInternal/>    
        </section>
    </main>

</template>

<style scoped>
.main {
    background-color: #F1F4F9;
}
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
