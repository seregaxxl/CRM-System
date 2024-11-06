<script setup lang="ts">
import { ref, watch } from 'vue';
import {activeTab} from '../store/activeTabBus'
import { allTasks, Task } from '../store/allTasksBus'
import taskElement from './taskElement.vue';

const tasks = ref<Task[]>(allTasks.value.tasks)


watch([activeTab, allTasks.value], async ([newActiveTab]) => {
    switch (newActiveTab) {
        case 'tasks-all' : 
        tasks.value = allTasks.value.tasks
        break
        case 'tasks-in-progress' : 
        tasks.value = allTasks.value.tasks.filter(task => !task.isDone)
        break
        case 'tasks-done' : 
        tasks.value = allTasks.value.tasks.filter(task => task.isDone)
        break
    }    
}) 
</script>

<template>
  <section class="tasks-all">
    <taskElement
      v-for="task in tasks"
      :key="task.id"
      :task="task"
    />
  </section>
</template>


<style scoped>

</style>
