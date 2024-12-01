<script setup lang="ts">
import navBar from '../components/navBar.vue';
import loaderComponent from '../components/loaderComponent.vue';
import taskForm from '../components/taskForm.vue';
import List from '../components/List.vue';
import SideBar from '../components/SideBar.vue';
import { onMounted, ref } from 'vue';
import { Filter } from '../types';

import {getAllTasks} from '../api/index'
import { AllTasks } from '../types'



const tasks = ref<AllTasks>({info: { all: 0, completed: 0, inWork: 0 },
    data: [],})
const isLoading = ref<boolean>(true)
const activeTabLocal = ref<Filter>('all')

function changeActiveTab (activeTab:Filter) {
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
    <main>
        <nav>
            <SideBar/>
        </nav>
        <section class="main">
            <a-flex :vertical="true" class="layout">
                <taskForm @dataUpdated="updateData"/>
                <navBar :info="tasks.info" @activeTab="changeActiveTab"/>
                <List :tasks="tasks.data" @dataUpdated="updateData"/>    
            </a-flex>
            <loaderComponent v-if="isLoading"/>
        </section>
    </main>

</template>

<style scoped>
.main {
    display: flex;
    justify-content: center;
}
.layout {
    margin: 0;
    background-color: #F1F4F9;
    padding: 20px;
}
</style>
