<script setup lang="ts">
import navBar from '../components/navBar.vue';
import loaderComponent from '../components/loaderComponent.vue';
import taskForm from '../components/taskForm.vue';
import toDoListInternal from '../components/toDoListInternal.vue';
import { onMounted, ref } from 'vue';

import {getAllTasks} from '../api/index'
import { AllTasks } from '../types'


const tasks = ref<AllTasks>({info: { all: 0, completed: 0, inWork: 0 },
    data: [],})
const isLoading = ref<boolean>(true)
const activeTabLocal = ref('all')

function changeActiveTab (activeTab:string) {
    activeTabLocal.value = activeTab; 
    updateData()
}

async function updateData () {
    isLoading.value = true
    try {
        tasks.value = await getAllTasks(activeTabLocal.value)
    } catch (error) {
        console.error("Failed to fetch tasks:", error);
    } finally {
        isLoading.value = false
    }
}


onMounted(async () => {
    updateData()
})

</script>

<template>
    <main class="main">
        <loaderComponent v-if="isLoading"/>
        <section class="main">
            <taskForm @dataUpdated="updateData"/>
            <navBar :info="tasks.info" @activeTab="changeActiveTab"/>
            <toDoListInternal :tasks="tasks.data" @dataUpdated="updateData"/>    
        </section>
    </main>

</template>

<style scoped>
.main {
    background-color: #F1F4F9;
    padding: 20px;
}
</style>
